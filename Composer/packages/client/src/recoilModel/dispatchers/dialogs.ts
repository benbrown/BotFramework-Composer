// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable react-hooks/rules-of-hooks */
import { useRecoilCallback, CallbackInterface } from 'recoil';
import { dialogIndexer, autofixReferInDialog, validateDialog } from '@bfc/indexers';

import {
  dialogsState,
  lgFilesState,
  luFilesState,
  schemasState,
  onCreateDialogCompleteState,
  actionsSeedState,
  showCreateDialogModalState,
} from '../atoms/botState';
import { botStateByProjectIdSelector } from '../selectors';
import { currentProjectIdState } from '../atoms';

import { createLgFileState, removeLgFileState } from './lg';
import { createLuFileState, removeLuFileState } from './lu';
import { removeDialogSchema } from './dialogSchema';

export const dialogsDispatcher = () => {
  const removeDialog = useRecoilCallback(
    (callbackHelpers: CallbackInterface) => async (id: string, projectId: string) => {
      const { set, snapshot } = callbackHelpers;
      const { dialogs } = await snapshot.getPromise(botStateByProjectIdSelector);
      const dialogsFilteredById = dialogs.filter((dialog) => dialog.id !== id);
      const currentProjectId = await snapshot.getPromise(currentProjectIdState);
      set(dialogsState(currentProjectId), dialogsFilteredById);
      //remove dialog should remove all locales lu and lg files and the dialog schema file
      await removeLgFileState(callbackHelpers, { id, projectId });
      await removeLuFileState(callbackHelpers, { id, projectId });
      removeDialogSchema(callbackHelpers, { id, projectId });
    }
  );

  const updateDialog = useRecoilCallback(({ set }: CallbackInterface) => ({ id, content, projectId }) => {
    set(dialogsState(projectId), (dialogs) => {
      return dialogs.map((dialog) => {
        if (dialog.id === id) {
          const fixedContent = JSON.parse(autofixReferInDialog(id, JSON.stringify(content)));
          return { ...dialog, ...dialogIndexer.parse(dialog.id, fixedContent) };
        }
        return dialog;
      });
    });
  });

  const createDialogBegin = useRecoilCallback(
    (callbackHelpers: CallbackInterface) => (actions, onComplete, projectId: string) => {
      const { set } = callbackHelpers;
      set(actionsSeedState(projectId), actions);
      set(onCreateDialogCompleteState(projectId), { func: onComplete });
      set(showCreateDialogModalState(projectId), true);
    }
  );

  const createDialogCancel = useRecoilCallback((callbackHelpers: CallbackInterface) => async (projectId: string) => {
    const { set } = callbackHelpers;
    set(actionsSeedState(projectId), []);
    set(onCreateDialogCompleteState(projectId), { func: undefined });
    set(showCreateDialogModalState(projectId), false);
  });

  const createDialog = useRecoilCallback((callbackHelpers: CallbackInterface) => async ({ id, content, projectId }) => {
    const { set, snapshot } = callbackHelpers;
    const fixedContent = JSON.parse(autofixReferInDialog(id, JSON.stringify(content)));
    const schemas = await snapshot.getPromise(schemasState(projectId));
    const lgFiles = await snapshot.getPromise(lgFilesState(projectId));
    const luFiles = await snapshot.getPromise(luFilesState(projectId));
    const dialog = { isRoot: false, displayName: id, ...dialogIndexer.parse(id, fixedContent) };
    dialog.diagnostics = validateDialog(dialog, schemas.sdk.content, lgFiles, luFiles);
    await createLgFileState(callbackHelpers, { id, content: '' });
    await createLuFileState(callbackHelpers, { id, content: '' });

    set(dialogsState(projectId), (dialogs) => [...dialogs, dialog]);
    set(actionsSeedState(projectId), []);
    set(showCreateDialogModalState(projectId), false);
    const onComplete = (await snapshot.getPromise(onCreateDialogCompleteState(projectId))).func;
    if (typeof onComplete === 'function') {
      setTimeout(() => onComplete(id));
    }
    set(onCreateDialogCompleteState(projectId), { func: undefined });
  });
  return {
    removeDialog,
    createDialog,
    createDialogCancel,
    createDialogBegin,
    updateDialog,
  };
};
