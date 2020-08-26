/* eslint-disable react-hooks/rules-of-hooks */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { useRecoilCallback, CallbackInterface } from 'recoil';
import { dereferenceDefinitions, LuFile, DialogInfo, SensitiveProperties, DialogSetting } from '@bfc/shared';
import { indexer, validateDialog } from '@bfc/indexers';
import objectGet from 'lodash/get';
import objectSet from 'lodash/set';
import isArray from 'lodash/isArray';
import formatMessage from 'format-message';

import lgWorker from '../parsers/lgWorker';
import luWorker from '../parsers/luWorker';
import httpClient from '../../utils/httpUtil';
import { BotStatus } from '../../constants';
import { getReferredFiles } from '../../utils/luUtil';
import luFileStatusStorage from '../../utils/luFileStatusStorage';
import settingStorage from '../../utils/dialogSettingStorage';
import filePersistence from '../persistence/FilePersistence';
import { navigateTo } from '../../utils/navigation';
import languageStorage from '../../utils/languageStorage';
import { designPageLocationState, botDiagnosticsState, botProjectsState, projectMetaDataState } from '../atoms';

import {
  skillManifestsState,
  settingsState,
  localeState,
  luFilesState,
  skillsState,
  schemasState,
  lgFilesState,
  locationState,
  botStatusState,
  botNameState,
  botEnvironmentState,
  dialogsState,
  botOpeningState,
  recentProjectsState,
  templateProjectsState,
  runtimeTemplatesState,
  applicationErrorState,
  templateIdState,
  announcementState,
  boilerplateVersionState,
  dialogSchemasState,
} from './../atoms';
import { logMessage, setError } from './../dispatchers/shared';

const handleProjectFailure = (callbackHelpers: CallbackInterface, ex) => {
  callbackHelpers.set(botOpeningState, false);
  setError(callbackHelpers, ex);
};

const checkProjectUpdates = async () => {
  const workers = [filePersistence, lgWorker, luWorker];

  return Promise.all(workers.map((w) => w.flush()));
};

const processSchema = (projectId: string, schema: any) => ({
  ...schema,
  definitions: dereferenceDefinitions(schema.definitions),
});

// if user set value in terminal or appsetting.json, it should update the value in localStorage
const refreshLocalStorage = (projectId: string, settings: DialogSetting) => {
  for (const property of SensitiveProperties) {
    const value = objectGet(settings, property);
    if (value) {
      settingStorage.setField(projectId, property, value);
    }
  }
};

// merge sensitive values in localStorage
const mergeLocalStorage = (projectId: string, settings: DialogSetting) => {
  const localSetting = settingStorage.get(projectId);
  const mergedSettings = { ...settings };
  if (localSetting) {
    for (const property of SensitiveProperties) {
      const value = objectGet(localSetting, property);
      if (value) {
        objectSet(mergedSettings, property, value);
      } else {
        objectSet(mergedSettings, property, ''); // set those key back, because that were omit after persisited
      }
    }
  }
  return mergedSettings;
};

const updateLuFilesStatus = (projectId: string, luFiles: LuFile[]) => {
  const status = luFileStatusStorage.get(projectId);
  return luFiles.map((luFile) => {
    if (typeof status[luFile.id] === 'boolean') {
      return { ...luFile, published: status[luFile.id] };
    } else {
      return { ...luFile, published: false };
    }
  });
};

const initLuFilesStatus = (projectId: string, luFiles: LuFile[], dialogs: DialogInfo[]) => {
  luFileStatusStorage.checkFileStatus(
    projectId,
    getReferredFiles(luFiles, dialogs).map((file) => file.id)
  );
  return updateLuFilesStatus(projectId, luFiles);
};

export const projectDispatcher = () => {
  const initBotState = async (callbackHelpers: CallbackInterface, data: any, jumpToMain: boolean) => {
    const { snapshot, gotoSnapshot } = callbackHelpers;
    const { files, botName, botEnvironment, location, schemas, settings, id: projectId, diagnostics, skills } = data;
    const curLocation = await snapshot.getPromise(locationState(projectId));
    const storedLocale = languageStorage.get(botName)?.locale;
    const locale = settings.languages.includes(storedLocale) ? storedLocale : settings.defaultLanguage;

    try {
      schemas.sdk.content = processSchema(projectId, schemas.sdk.content);
    } catch (err) {
      const diagnostics = schemas.diagnostics ?? [];
      diagnostics.push(err.message);
      schemas.diagnostics = diagnostics;
    }

    try {
      const { dialogs, dialogSchemas, luFiles, lgFiles, skillManifestFiles } = indexer.index(files, botName, locale);
      let mainDialog = '';
      const verifiedDialogs = dialogs.map((dialog) => {
        if (dialog.isRoot) {
          mainDialog = dialog.id;
        }
        dialog.diagnostics = validateDialog(dialog, schemas.sdk.content, lgFiles, luFiles);
        return dialog;
      });

      const newSnapshot = snapshot.map(({ set }) => {
        set(skillManifestsState(projectId), skillManifestFiles);
        set(luFilesState(projectId), initLuFilesStatus(botName, luFiles, dialogs));
        set(lgFilesState(projectId), lgFiles);
        set(dialogsState(projectId), verifiedDialogs);
        set(dialogSchemasState(projectId), dialogSchemas);
        set(botEnvironmentState(projectId), botEnvironment);
        set(botNameState(projectId), botName);
        if (location !== curLocation) {
          set(botStatusState(projectId), BotStatus.unConnected);
          set(locationState(projectId), location);
        }
        set(skillsState(projectId), skills);
        set(schemasState(projectId), schemas);
        set(localeState(projectId), locale);
        set(botDiagnosticsState(projectId), diagnostics);
        set(botOpeningState, false);

        refreshLocalStorage(projectId, settings);
        const mergedSettings = mergeLocalStorage(projectId, settings);
        set(settingsState(projectId), mergedSettings);
      });
      gotoSnapshot(newSnapshot);
      if (jumpToMain && projectId) {
        const mainUrl = `/bot/${projectId}/dialogs/${mainDialog}`;
        navigateTo(mainUrl);
      }
    } catch (err) {
      callbackHelpers.set(botOpeningState, false);
      setError(callbackHelpers, err);
      navigateTo('/home');
    }
  };

  const removeRecentProject = async (callbackHelpers: CallbackInterface, path: string) => {
    try {
      const {
        set,
        snapshot: { getPromise },
      } = callbackHelpers;
      const currentRecentProjects = await getPromise(recentProjectsState);
      const filtered = currentRecentProjects.filter((p) => p.path !== path);
      set(recentProjectsState, filtered);
    } catch (ex) {
      logMessage(callbackHelpers, `Error removing recent project: ${ex}`);
    }
  };

  const setBotOpeningStatus = async (callbackHelpers: CallbackInterface) => {
    const { set } = callbackHelpers;
    set(botOpeningState, true);
    await checkProjectUpdates();
  };

  const openProject = useRecoilCallback(
    (callbackHelpers: CallbackInterface) => async (path: string, storageId = 'default', relativePath = undefined) => {
      try {
        await setBotOpeningStatus(callbackHelpers);
        const response = await httpClient.put(`/projects/open`, { path, storageId, relativePath });
        await initBotState(callbackHelpers, response.data, true);
        return response.data.id;
      } catch (ex) {
        removeRecentProject(callbackHelpers, path);
        handleProjectFailure(callbackHelpers, ex);
      }
    }
  );

  const fetchProjectById = useRecoilCallback((callbackHelpers: CallbackInterface) => async (projectId: string) => {
    try {
      const response = await httpClient.get(`/projects/${projectId}`);
      await initBotState(callbackHelpers, response.data, false);
    } catch (ex) {
      handleProjectFailure(callbackHelpers, ex);
      navigateTo('/home');
    }
  });

  const createProject = useRecoilCallback(
    (callbackHelpers: CallbackInterface) => async (
      templateId: string,
      name: string,
      description: string,
      location: string,
      schemaUrl?: string
    ) => {
      try {
        await setBotOpeningStatus(callbackHelpers);
        const response = await httpClient.post(`/projects`, {
          storageId: 'default',
          templateId,
          name,
          description,
          location,
          schemaUrl,
        });
        const projectId = response.data.id;
        if (settingStorage.get(projectId)) {
          settingStorage.remove(projectId);
        }
        await initBotState(callbackHelpers, response.data, true);
        return projectId;
      } catch (ex) {
        handleProjectFailure(callbackHelpers, ex);
      }
    }
  );

  const deleteBotProject = useRecoilCallback((callbackHelpers: CallbackInterface) => async (projectId: string) => {
    const { reset } = callbackHelpers;
    try {
      await httpClient.delete(`/projects/${projectId}`);
      luFileStatusStorage.removeAllStatuses(projectId);
      settingStorage.remove(projectId);

      reset(dialogsState(projectId));
      reset(botEnvironmentState(projectId));
      reset(botNameState(projectId));
      reset(botStatusState(projectId));
      reset(locationState(projectId));
      reset(lgFilesState(projectId));
      reset(skillsState(projectId));
      reset(schemasState(projectId));
      reset(luFilesState(projectId));
      reset(settingsState(projectId));
      reset(localeState(projectId));
      reset(skillManifestsState(projectId));
      reset(designPageLocationState(projectId));
    } catch (e) {
      logMessage(callbackHelpers, e.message);
    }
  });

  const saveProjectAs = useRecoilCallback(
    (callbackHelpers: CallbackInterface) => async (projectId, name, description, location) => {
      try {
        await setBotOpeningStatus(callbackHelpers);
        const response = await httpClient.post(`/projects/${projectId}/project/saveAs`, {
          storageId: 'default',
          name,
          description,
          location,
        });
        await initBotState(callbackHelpers, response.data, true);
        return response.data.id;
      } catch (ex) {
        handleProjectFailure(callbackHelpers, ex);
        logMessage(callbackHelpers, ex.message);
      }
    }
  );

  const fetchRecentProjects = useRecoilCallback((callbackHelpers: CallbackInterface) => async () => {
    const { set } = callbackHelpers;
    try {
      const response = await httpClient.get(`/projects/recent`);
      set(recentProjectsState, response.data);
    } catch (ex) {
      set(recentProjectsState, []);
      logMessage(callbackHelpers, `Error in fetching recent projects: ${ex}`);
    }
  });

  const fetchRuntimeTemplates = useRecoilCallback<[], Promise<void>>(
    (callbackHelpers: CallbackInterface) => async () => {
      const { set } = callbackHelpers;
      try {
        const response = await httpClient.get(`/runtime/templates`);
        if (isArray(response.data)) {
          set(runtimeTemplatesState, [...response.data]);
        }
      } catch (ex) {
        // TODO: Handle exceptions
        logMessage(callbackHelpers, `Error fetching runtime templates: ${ex}`);
      }
    }
  );

  const fetchTemplates = useRecoilCallback<[], Promise<void>>((callbackHelpers: CallbackInterface) => async () => {
    try {
      const response = await httpClient.get(`/assets/projectTemplates`);

      const data = response && response.data;

      if (data && Array.isArray(data) && data.length > 0) {
        callbackHelpers.set(templateProjectsState, data);
      }
    } catch (err) {
      // TODO: Handle exceptions
      logMessage(callbackHelpers, `Error fetching runtime templates: ${err}`);
    }
  });

  const setBotStatus = useRecoilCallback<[BotStatus, string], void>(
    ({ set }: CallbackInterface) => (status: BotStatus, projectId: string) => {
      set(botStatusState(projectId), status);
    }
  );

  const createFolder = useRecoilCallback<[string, string], Promise<void>>(
    ({ set }: CallbackInterface) => async (path, name) => {
      const storageId = 'default';
      try {
        await httpClient.post(`/storages/folder`, { path, name, storageId });
      } catch (err) {
        set(applicationErrorState, {
          message: err.message,
          summary: formatMessage('Create Folder Error'),
        });
      }
    }
  );

  const updateFolder = useRecoilCallback<[string, string, string], Promise<void>>(
    ({ set }: CallbackInterface) => async (path, oldName, newName) => {
      const storageId = 'default';
      try {
        await httpClient.put(`/storages/folder`, { path, oldName, newName, storageId });
      } catch (err) {
        set(applicationErrorState, {
          message: err.message,
          summary: formatMessage('Update Folder Name Error'),
        });
      }
    }
  );

  const saveTemplateId = useRecoilCallback<[string], void>(({ set }: CallbackInterface) => (templateId) => {
    if (templateId) {
      set(templateIdState, templateId);
    }
  });

  const updateBoilerplate = useRecoilCallback((callbackHelpers: CallbackInterface) => async (projectId: string) => {
    try {
      await httpClient.post(`/projects/${projectId}/updateBoilerplate`);
      callbackHelpers.set(announcementState, formatMessage('Scripts successfully updated.'));
    } catch (ex) {
      setError(callbackHelpers, ex);
    }
  });

  const getBoilerplateVersion = useRecoilCallback((callbackHelpers: CallbackInterface) => async (projectId: string) => {
    try {
      const response = await httpClient.get(`/projects/${projectId}/boilerplateVersion`);
      const { updateRequired, latestVersion, currentVersion } = response.data;
      callbackHelpers.set(boilerplateVersionState, { updateRequired, latestVersion, currentVersion });
    } catch (ex) {
      setError(callbackHelpers, ex);
    }
  });

  const addToBotProject = useRecoilCallback(
    ({ set }: CallbackInterface) => async (projectId: string, isRootBot: boolean) => {
      set(botProjectsState, (current) => [...current, projectId]);
      set(projectMetaDataState(projectId), {
        isRootBot,
      });
    }
  );

  return {
    openProject,
    createProject,
    deleteBotProject,
    saveProjectAs,
    fetchTemplates,
    fetchProjectById,
    fetchRecentProjects,
    fetchRuntimeTemplates,
    setBotStatus,
    updateFolder,
    createFolder,
    saveTemplateId,
    updateBoilerplate,
    getBoilerplateVersion,
    addToBotProject,
  };
};
