// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { atom } from 'recoil';
import { ProjectTemplate, UserSettings } from '@bfc/shared';

import { StorageFolder, StateError, RuntimeTemplate, AppUpdateState } from '../../store/types';
import { getUserSettings } from '../utils';

export type BotProject = {
  readonly id: string;
  readonly endpoints: string[];
};

export type CurrentUser = {
  token: string | null;
  email?: string;
  name?: string;
  expiration?: number;
  sessionExpired: boolean;
};

const getFullyQualifiedKey = (value: string) => {
  return `App_${value}_State`;
};

export const botProjectsState = atom<BotProject[]>({
  key: getFullyQualifiedKey('botProjects'),
  default: [],
});

// TODO: Add type for recent projects
export const recentProjectsState = atom<any[]>({
  key: getFullyQualifiedKey('recentProjects'),
  default: [],
});

export const templateProjectsState = atom<ProjectTemplate[]>({
  key: getFullyQualifiedKey('templateProjects'),
  default: [],
});

export const storagesState = atom<any[]>({
  key: getFullyQualifiedKey('storages'),
  default: [],
});

export const focusedStorageFolderState = atom<StorageFolder>({
  key: getFullyQualifiedKey('focusedStorageFolder'),
  default: {} as StorageFolder,
});

export const storageFileLoadingStatus = atom<string>({
  key: getFullyQualifiedKey('storageFileLoadingStatus'),
  default: '',
});

export const applicationErrorState = atom<StateError>({
  key: getFullyQualifiedKey('error'),
  default: {} as StateError,
});

export const currentUserState = atom<CurrentUser>({
  key: getFullyQualifiedKey('currentUser'),
  default: {} as CurrentUser,
});

export const visualEditorSelectionState = atom<string[]>({
  key: getFullyQualifiedKey('visualEditorSelection'),
  default: [],
});

export const onboardingState = atom<{
  coachMarkRefs: { [key: string]: any };
  complete: boolean;
}>({
  key: getFullyQualifiedKey('onboarding'),
  default: {
    coachMarkRefs: {},
    complete: false,
  },
});

export const clipboardActionsState = atom<any[]>({
  key: getFullyQualifiedKey('clipboardActions'),
  default: [],
});

export const runtimeTemplatesState = atom<RuntimeTemplate[]>({
  key: getFullyQualifiedKey('runtimeTemplates'),
  default: [],
});

export const userSettingsState = atom<UserSettings>({
  key: getFullyQualifiedKey('userSettings'),
  default: getUserSettings(),
});

export const announcementState = atom<string>({
  key: getFullyQualifiedKey('announcement'),
  default: '',
});

export const appUpdateState = atom<AppUpdateState>({
  key: getFullyQualifiedKey('appUpdate'),
  default: {} as AppUpdateState,
});

export const logEntryListState = atom<string[]>({
  key: getFullyQualifiedKey('logEntryList'),
  default: [],
});
