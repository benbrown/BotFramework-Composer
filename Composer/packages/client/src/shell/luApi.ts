// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useEffect, useState } from 'react';
import { LuFile, LuIntentSection } from '@bfc/shared';
import { useRecoilValue } from 'recoil';
import formatMessage from 'format-message';

import { projectIdState } from '../recoilModel/atoms/botState';
import { useResolvers } from '../hooks/useResolver';

import { dispatcherState } from './../recoilModel/DispatcherWrapper';
import { focusPathState } from './../recoilModel/atoms/botState';

const fileNotFound = (id: string) => formatMessage(`LU file {id} not found`, { id });
const INTENT_ERROR = formatMessage('intentName is missing or empty');

function createLuApi(
  state: { focusPath: string; projectId: string },
  dispatchers: any, //TODO
  luFileResolver: (id: string) => LuFile | undefined
) {
  const addLuIntent = (id: string, intentName: string, intent: LuIntentSection) => {
    const file = luFileResolver(id);
    if (!file) throw new Error(fileNotFound(id));
    if (!intentName) throw new Error(INTENT_ERROR);

    return dispatchers.createLuIntent({ id: file.id, intent, projectId: state.projectId });
  };

  const updateLuIntent = (id: string, intentName: string, intent: LuIntentSection) => {
    const file = luFileResolver(id);
    if (!file) throw new Error(fileNotFound(id));
    if (!intentName) throw new Error(INTENT_ERROR);

    return dispatchers.updateLuIntent({ id: file.id, intentName, intent, projectId: state.projectId });
  };

  const removeLuIntent = (id: string, intentName: string) => {
    const file = luFileResolver(id);
    if (!file) throw new Error(fileNotFound(id));
    if (!intentName) throw new Error(INTENT_ERROR);

    return dispatchers.removeLuIntent({ id: file.id, intentName, projectId: state.projectId });
  };

  const getLuIntents = (id: string): LuIntentSection[] => {
    if (id === undefined) throw new Error('must have a file id');
    const focusedDialogId = state.focusPath.split('#').shift() || id;
    const file = luFileResolver(focusedDialogId);
    if (!file) throw new Error(fileNotFound(id));
    return file.intents;
  };

  const getLuIntent = (id: string, intentName: string): LuIntentSection | undefined => {
    const file = luFileResolver(id);
    if (!file) throw new Error(fileNotFound(id));
    return file.intents.find(({ Name }) => Name === intentName);
  };

  return {
    addLuIntent,
    getLuIntents,
    getLuIntent,
    updateLuIntent,
    removeLuIntent,
  };
}

export function useLuApi() {
  const focusPath = useRecoilValue(focusPathState);
  const projectId = useRecoilValue(projectIdState);
  const dispatchers = useRecoilValue(dispatcherState);
  const { luFileResolver } = useResolvers();
  const [api, setApi] = useState(createLuApi({ focusPath, projectId }, dispatchers, luFileResolver));

  useEffect(() => {
    const newApi = createLuApi({ focusPath, projectId }, dispatchers, luFileResolver);
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
