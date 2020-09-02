// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useEffect, useState } from 'react';
import { LgFile } from '@bfc/shared';
import { useRecoilValue } from 'recoil';
import debounce from 'lodash/debounce';

import { useResolvers } from '../hooks/useResolver';
import { Dispatcher } from '../recoilModel/dispatchers';

import { focusPathState } from './../recoilModel';
import { dispatcherState } from './../recoilModel/DispatcherWrapper';

function createLgApi(
  state: { focusPath: string; projectId: string },
  actions: Dispatcher,
  lgFileResolver: (id: string) => LgFile | undefined
) {
  const getLgTemplates = (id) => {
    if (id === undefined) throw new Error('must have a file id');
    const focusedDialogId = state.focusPath.split('#').shift() || id;
    const file = lgFileResolver(focusedDialogId);
    if (!file) throw new Error(`lg file ${id} not found`);
    return file.templates;
  };

  const updateLgTemplate = async (id: string, templateName: string, templateBody: string) => {
    const file = lgFileResolver(id);
    if (!file) throw new Error(`lg file ${id} not found`);
    if (!templateName) throw new Error(`templateName is missing or empty`);
    const template = { name: templateName, body: templateBody, parameters: [] };

    return await actions.updateLgTemplate({
      id: file.id,
      templateName,
      template,
      projectId: state.projectId,
    });
  };

  const copyLgTemplate = async (id, fromTemplateName, toTemplateName) => {
    const file = lgFileResolver(id);
    if (!file) throw new Error(`lg file ${id} not found`);
    if (!fromTemplateName || !toTemplateName) throw new Error(`templateName is missing or empty`);

    return await actions.copyLgTemplate({
      id: file.id,
      fromTemplateName,
      toTemplateName,
      projectId: state.projectId,
    });
  };

  const removeLgTemplate = async (id, templateName) => {
    const file = lgFileResolver(id);
    if (!file) throw new Error(`lg file ${id} not found`);
    if (!templateName) throw new Error(`templateName is missing or empty`);

    return await actions.removeLgTemplate({
      id: file.id,
      templateName,
      projectId: state.projectId,
    });
  };

  const removeLgTemplates = async (id, templateNames) => {
    const file = lgFileResolver(id);
    if (!file) throw new Error(`lg file ${id} not found`);
    if (!templateNames) throw new Error(`templateName is missing or empty`);

    return await actions.removeLgTemplates({
      id: file.id,
      templateNames,
      projectId: state.projectId,
    });
  };

  return {
    addLgTemplate: updateLgTemplate,
    getLgTemplates,
    updateLgTemplate,
    deboucedUpdateLgTemplate: debounce(updateLgTemplate, 250),
    removeLgTemplate,
    removeLgTemplates,
    copyLgTemplate,
  };
}

export function useLgApi(projectId: string) {
  const focusPath = useRecoilValue(focusPathState(projectId));
  const actions: Dispatcher = useRecoilValue(dispatcherState);
  const { lgFileResolver } = useResolvers(projectId);
  const [api, setApi] = useState(createLgApi({ focusPath, projectId }, actions, lgFileResolver));

  useEffect(() => {
    const newApi = createLgApi({ focusPath, projectId }, actions, lgFileResolver);
    setApi(newApi);

    return () => {
      Object.keys(newApi).forEach((apiName) => {
        if (typeof newApi[apiName].flush === 'function') {
          newApi[apiName].flush();
        }
      });
    };
  }, [projectId, focusPath]);

  return api;
}
