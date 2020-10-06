// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { Suspense, useEffect, useMemo, useState, useCallback } from 'react';
import { Breadcrumb, IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import formatMessage from 'format-message';
import { globalHistory, RouteComponentProps } from '@reach/router';
import get from 'lodash/get';
import { DialogInfo, PromptTab, getEditorAPI, registerEditorAPI, FieldNames } from '@bfc/shared';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { JsonEditor } from '@bfc/code-editor';
import { EditorExtension, PluginConfig } from '@bfc/extension-client';
import { useRecoilValue } from 'recoil';

import { LeftRightSplit } from '../../components/Split/LeftRightSplit';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { TestController } from '../../components/TestController/TestController';
import { getBreadcrumbLabel, qnaMatcherKey, TriggerFormData, getDialogData } from '../../utils/dialogUtil';
import { Conversation } from '../../components/Conversation';
import { Toolbar, IToolbarItem } from '../../components/Toolbar';
import { clearBreadcrumb, getFocusPath } from '../../utils/navigation';
import { navigateTo } from '../../utils/navigation';
import { useShell } from '../../shell';
import plugins, { mergePluginConfigs } from '../../plugins';
import { useElectronFeatures } from '../../hooks/useElectronFeatures';
import {
  visualEditorSelectionState,
  userSettingsState,
  dispatcherState,
  schemasState,
  displaySkillManifestState,
  validateDialogSelectorFamily,
  breadcrumbState,
  focusPathState,
  showCreateDialogModalState,
  showAddSkillDialogModalState,
  localeState,
  botProjectSpaceSelector,
  rootBotProjectIdSelector,
} from '../../recoilModel';
import ImportQnAFromUrlModal from '../knowledge-base/ImportQnAFromUrlModal';
import { triggerNotSupported } from '../../utils/dialogValidator';
import { undoFunctionState, undoVersionState } from '../../recoilModel/undo/history';
import { decodeDesignerPathToArrayPath } from '../../utils/convertUtils/designerPathEncoder';

import { WarningMessage } from './WarningMessage';
import { breadcrumbClass, contentWrapper, editorContainer, editorWrapper, pageRoot, visualPanel } from './styles';
import { VisualEditor } from './VisualEditor';
import { PropertyEditor } from './PropertyEditor';

const CreateSkillModal = React.lazy(() => import('../../components/CreateSkillModal'));
const CreateDialogModal = React.lazy(() => import('./createDialogModal'));
const DisplayManifestModal = React.lazy(() => import('../../components/Modal/DisplayManifestModal'));
const ExportSkillModal = React.lazy(() => import('./exportSkillModal'));
const TriggerCreationModal = React.lazy(() => import('../../components/ProjectTree/TriggerCreationModal'));

function onRenderBreadcrumbItem(item, render) {
  return <span>{render(item)}</span>;
}

const getTabFromFragment = () => {
  const tab = window.location.hash.substring(1);

  if (Object.values<string>(PromptTab).includes(tab)) {
    return tab;
  }
};

const DesignPage: React.FC<RouteComponentProps<{ dialogId: string; projectId: string; skillId: string }>> = (props) => {
  const { location, dialogId, projectId = '', skillId = '' } = props;
  const userSettings = useRecoilValue(userSettingsState);
  const botProjectsSpace = useRecoilValue(botProjectSpaceSelector);
  const schemas = useRecoilValue(schemasState(skillId));
  const dialogs = useRecoilValue(validateDialogSelectorFamily(skillId));
  const displaySkillManifest = useRecoilValue(displaySkillManifestState(skillId));
  const breadcrumb = useRecoilValue(breadcrumbState(skillId));
  const focusPath = useRecoilValue(focusPathState(skillId));
  const showCreateDialogModal = useRecoilValue(showCreateDialogModalState(skillId));
  const showAddSkillDialogModal = useRecoilValue(showAddSkillDialogModalState(skillId));
  const locale = useRecoilValue(localeState(skillId));
  const undoFunction = useRecoilValue(undoFunctionState(skillId));
  const undoVersion = useRecoilValue(undoVersionState(skillId));
  const { appLocale } = useRecoilValue(userSettingsState);
  const rootProjectId = useRecoilValue(rootBotProjectIdSelector) ?? projectId;

  const { undo, redo, canRedo, canUndo, commitChanges, clearUndo } = undoFunction;
  const visualEditorSelection = useRecoilValue(visualEditorSelectionState);
  const {
    updateDialog,
    createDialogCancel,
    createDialogBegin,
    createDialog,
    dismissManifestModal,
    setDesignPageLocation,
    navTo,
    //selectTo,
    selectAndFocus,
    addSkillDialogCancel,
    exportToZip,
    onboardingAddCoachMarkRef,
    importQnAFromUrls,
    addSkill,
    addNewSkillToBotProject,
    addExistingSkillToBotProject,
    addRemoteSkillToBotProject,
    removeSkillFromBotProject,
    setCurrentMode,
  } = useRecoilValue(dispatcherState);

  const params = new URLSearchParams(location?.search);
  const selected = decodeDesignerPathToArrayPath(
    dialogs.find((x) => x.id === props.dialogId)?.content,
    params.get('selected') || ''
  );
  const [triggerModalVisible, setTriggerModalVisibility] = useState(false);
  const [dialogJsonVisible, setDialogJsonVisibility] = useState(false);
  const [importQnAModalVisibility, setImportQnAModalVisibility] = useState(false);
  const [currentDialog, setCurrentDialog] = useState<DialogInfo>(dialogs[0]);
  const [exportSkillModalVisible, setExportSkillModalVisible] = useState(false);
  const [warningIsVisible, setWarningIsVisible] = useState(true);
  const shell = useShell('DesignPage', projectId);
  const shellForFlowEditor = useShell('FlowEditor', projectId);
  const shellForPropertyEditor = useShell('PropertyEditor', projectId);
  const { createTrigger } = shell.api;

  useEffect(() => {
    setCurrentMode('design');
  }, []);

  useEffect(() => {
    const currentDialog = dialogs.find(({ id }) => id === dialogId);
    if (currentDialog) {
      setCurrentDialog(currentDialog);
    }
    const rootDialog = dialogs.find(({ isRoot }) => isRoot);
    if (!currentDialog && rootDialog) {
      const { search } = location || {};
      navigateTo(`/bot/${rootProjectId}/skill/${projectId}/dialogs/${rootDialog.id}${search}`);
      return;
    }
    setWarningIsVisible(true);
  }, [dialogId, dialogs, location]);

  // migration: add id to dialog when dialog doesn't have id
  useEffect(() => {
    const currentDialog = dialogs.find(({ id }) => id === dialogId);

    const dialogContent = currentDialog?.content ? Object.assign({}, currentDialog.content) : { emptyDialog: true };
    if (!dialogContent.emptyDialog && !dialogContent.id) {
      dialogContent.id = dialogId;
      updateDialog({ id: dialogId, content: dialogContent, projectId });
    }
  }, [dialogId]);

  useEffect(() => {
    if (location && props.dialogId && props.projectId) {
      const { dialogId, projectId } = props;
      const params = new URLSearchParams(location.search);
      const dialogMap = dialogs.reduce((acc, { content, id }) => ({ ...acc, [id]: content }), {});
      const dialogData = getDialogData(dialogMap, dialogId);
      const selected = decodeDesignerPathToArrayPath(dialogData, params.get('selected') ?? '');
      const focused = decodeDesignerPathToArrayPath(dialogData, params.get('focused') ?? '');

      //make sure focusPath always valid
      const data = getDialogData(dialogMap, dialogId, getFocusPath(selected, focused));
      if (typeof data === 'undefined') {
        const { id } = dialogs.find(({ id }) => id === dialogId) || dialogs.find(({ isRoot }) => isRoot) || {};
        /**
         * It's improper to fallback to `dialogId` directly:
         *   - If 'action' not exists at `focused` path, fallback to trigger path;
         *   - If 'trigger' not exists at `selected` path, fallback to dialog Id;
         *   - If 'dialog' not exists at `dialogId` path, fallback to main dialog.
         */
        if (id) {
          navTo(rootProjectId, projectId, id);
        }
        return;
      }

      setDesignPageLocation(projectId, {
        dialogId,
        selected,
        focused,
        breadcrumb: location.state?.breadcrumb || [],
        promptTab: getTabFromFragment(),
      });
      /* eslint-disable no-underscore-dangle */
      // @ts-ignore
      globalHistory._onTransitionComplete();
      /* eslint-enable */
    }
  }, [location]);

  useEffect(() => {
    registerEditorAPI('Editing', {
      Undo: () => undo(),
      Redo: () => redo(),
    });
    //leave design page should clear the history
    return clearUndo;
  }, []);

  const openImportQnAModal = () => {
    setImportQnAModalVisibility(true);
  };

  const onTriggerCreationDismiss = () => {
    setTriggerModalVisibility(false);
  };

  const openNewTriggerModal = () => {
    setTriggerModalVisibility(true);
  };

  const onTriggerCreationSubmit = async (dialogId: string, formData: TriggerFormData) => {
    createTrigger(dialogId, formData);
  };

  const onCreateDialogComplete = (newDialog) => {
    if (newDialog) {
      navTo(rootProjectId, projectId, newDialog, []);
    }
  };

  const [flowEditorFocused, setFlowEditorFocused] = useState(false);
  const { actionSelected, showDisableBtn, showEnableBtn } = useMemo(() => {
    const actionSelected = Array.isArray(visualEditorSelection) && visualEditorSelection.length > 0;
    if (!actionSelected) {
      return { actionSelected: false, showDisableBtn: false, showEnableBtn: false };
    }
    const selectedActions = visualEditorSelection.map((id) => get(currentDialog?.content, id));
    const showDisableBtn = selectedActions.some((x) => get(x, 'disabled') !== true);
    const showEnableBtn = selectedActions.some((x) => get(x, 'disabled') === true);
    return { actionSelected, showDisableBtn, showEnableBtn };
  }, [visualEditorSelection]);

  useElectronFeatures(actionSelected, flowEditorFocused, canUndo(), canRedo());

  const EditorAPI = getEditorAPI();
  const toolbarItems: IToolbarItem[] = [
    {
      type: 'dropdown',
      text: formatMessage('Add'),
      align: 'left',
      dataTestid: 'AddFlyout',
      buttonProps: {
        iconProps: { iconName: 'Add' },
      },
      menuProps: {
        items: [
          {
            'data-testid': 'FlyoutNewDialog',
            key: 'adddialog',
            text: formatMessage('Add new dialog'),
            onClick: () => {
              createDialogBegin([], onCreateDialogComplete, projectId);
            },
          },
          {
            'data-testid': 'FlyoutNewTrigger',
            key: 'addtrigger',
            text: formatMessage(`Add new trigger on {displayName}`, {
              displayName: currentDialog?.displayName ?? '',
            }),
            onClick: () => {
              openNewTriggerModal();
            },
          },
          {
            'data-testid': 'AddNewKnowledgebase',
            key: 'addKnowledge',
            text: formatMessage(` Add new knowledge base on {displayName}`, {
              displayName: currentDialog?.displayName ?? '',
            }),
            onClick: () => {
              openImportQnAModal();
            },
          },
          {
            'data-testid': 'AddRemoteSkill',
            key: 'addRemoteSkill',
            text: formatMessage(`Add remote skill`, {
              displayName: currentDialog?.displayName ?? '',
            }),
            onClick: () => {
              addRemoteSkillToBotProject(
                'https://onenote-dev.azurewebsites.net/manifests/OneNoteSync-2-1-preview-1-manifest.json',
                'OneNoteSyncer',
                ''
              );
            },
          },
          {
            'data-testid': 'AddLocalSkill',
            key: 'addLocalSkill',
            text: formatMessage(`Add local skill from path`, {
              displayName: currentDialog?.displayName ?? '',
            }),
            onClick: () => {
              addExistingSkillToBotProject('/Users/srravich/Desktop/Archive/GoogleKeepSync');
            },
          },
          {
            'data-testid': 'createNewSkill',
            key: 'createNewSkill',
            text: formatMessage(`Create new Skill`, {
              displayName: currentDialog?.displayName ?? '',
            }),
            onClick: () => {
              addNewSkillToBotProject({
                name: 'newers-bot',
                description: '',
                schemaUrl: '',
                location: '/Users/srravich/Desktop/samples',
                templateId: 'InterruptionSample',
                locale: appLocale,
                qnaKbUrls: [],
              });
            },
          },
          {
            'data-testid': 'removeSkillAtIndex',
            key: 'removeSkillAtIndex',
            text: formatMessage(`Remove a skill`, {
              displayName: currentDialog?.displayName ?? '',
            }),
            onClick: () => {
              const matchedProject: any = botProjectsSpace[botProjectsSpace.length - 1];
              removeSkillFromBotProject(matchedProject.projectId);
            },
          },
        ],
      },
    },
    {
      type: 'dropdown',
      text: formatMessage('Edit'),
      align: 'left',
      dataTestid: 'EditFlyout',
      buttonProps: {
        iconProps: { iconName: 'Edit' },
      },
      menuProps: {
        items: [
          {
            key: 'edit.undo',
            text: formatMessage('Undo'),
            disabled: !canUndo(),
            onClick: undo,
          },
          {
            key: 'edit.redo',
            text: formatMessage('Redo'),
            disabled: !canRedo(),
            onClick: redo,
          },
          {
            key: 'edit.cut',
            text: formatMessage('Cut'),
            disabled: !actionSelected,
            onClick: () => {
              EditorAPI.Actions.CutSelection();
            },
          },
          {
            key: 'edit.copy',
            text: formatMessage('Copy'),
            disabled: !actionSelected,
            onClick: () => {
              EditorAPI.Actions.CopySelection();
            },
          },
          {
            key: 'edit.move',
            text: formatMessage('Move'),
            disabled: !actionSelected,
            onClick: () => {
              EditorAPI.Actions.MoveSelection();
            },
          },
          {
            key: 'edit.delete',
            text: formatMessage('Delete'),
            disabled: !actionSelected,
            onClick: () => {
              EditorAPI.Actions.DeleteSelection();
            },
          },
        ],
      },
    },
    {
      type: 'dropdown',
      text: formatMessage('Disable'),
      align: 'left',
      disabled: !actionSelected,
      buttonProps: {
        iconProps: { iconName: 'RemoveOccurrence' },
      },
      menuProps: {
        items: [
          {
            key: 'disable',
            text: formatMessage('Disable'),
            disabled: !showDisableBtn,
            onClick: () => {
              EditorAPI.Actions.DisableSelection();
            },
          },
          {
            key: 'enable',
            text: formatMessage('Enable'),
            disabled: !showEnableBtn,
            onClick: () => {
              EditorAPI.Actions.EnableSelection();
            },
          },
        ],
      },
    },
    {
      type: 'dropdown',
      text: formatMessage('Export'),
      align: 'left',
      buttonProps: {
        iconProps: { iconName: 'OpenInNewWindow' },
      },
      menuProps: {
        items: [
          {
            key: 'zipexport',
            text: formatMessage('Export assets to .zip'),
            onClick: () => {
              exportToZip(projectId);
            },
          },
          {
            key: 'exportAsSkill',
            text: formatMessage('Export as skill'),
            onClick: () => {
              setExportSkillModalVisible(true);
            },
          },
        ],
      },
    },
    {
      type: 'element',
      element: <TestController projectId={projectId} />,
      align: 'right',
    },
  ];

  function handleBreadcrumbItemClick(_event, item) {
    if (item) {
      const { dialogId, selected, focused, index } = item;
      selectAndFocus(rootProjectId, projectId, dialogId, selected, focused, clearBreadcrumb(breadcrumb, index));
    }
  }

  const breadcrumbItems = useMemo(() => {
    const items =
      dialogs.length > 0
        ? breadcrumb.reduce((result, item, index) => {
            const { dialogId, selected, focused } = item;
            const text = getBreadcrumbLabel(dialogs, dialogId, selected, focused);
            if (text) {
              result.push({
                // @ts-ignore
                index,
                isRoot: !selected && !focused,
                text,
                ...item,
                onClick: handleBreadcrumbItemClick,
              });
            }
            return result;
          }, [] as IBreadcrumbItem[])
        : [];
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', height: '65px' }}>
        <Breadcrumb
          ariaLabel={formatMessage('Navigation Path')}
          data-testid="Breadcrumb"
          items={items}
          maxDisplayedItems={3}
          styles={breadcrumbClass}
          onReduceData={() => undefined}
          onRenderItem={onRenderBreadcrumbItem}
        />
        <div style={{ padding: '10px' }}>
          <ActionButton
            onClick={() => {
              setDialogJsonVisibility((current) => !current);
            }}
          >
            {dialogJsonVisible ? formatMessage('Hide code') : formatMessage('Show code')}
          </ActionButton>
        </div>
      </div>
    );
  }, [dialogs, breadcrumb, dialogJsonVisible]);

  async function handleCreateDialogSubmit(dialogName, dialogData) {
    await createDialog({ id: dialogName, content: dialogData, projectId });
    commitChanges();
  }

  const addNewBtnRef = useCallback((addNew) => {
    onboardingAddCoachMarkRef({ addNew });
  }, []);

  const cancelImportQnAModal = () => {
    setImportQnAModalVisibility(false);
  };

  const handleCreateQnA = async (urls: string[]) => {
    cancelImportQnAModal();
    const formData = {
      $kind: qnaMatcherKey,
      errors: { $kind: '', intent: '', event: '', triggerPhrases: '', regEx: '', activity: '' },
      event: '',
      intent: '',
      regEx: '',
      triggerPhrases: '',
    };
    const dialog = dialogs.find((d) => d.id === dialogId);
    if (dialogId && dialog) {
      const url = `/bot/${projectId}/knowledge-base/${dialogId}`;
      const triggers = get(dialog, FieldNames.Events, []);
      if (triggers.some((t) => t.type === qnaMatcherKey)) {
        navigateTo(url);
      } else {
        createTrigger(dialogId, formData, url);
      }
      // import qna from urls
      if (urls.length > 0) {
        await importQnAFromUrls({ id: `${dialogId}.${locale}`, urls, projectId });
      }
    }
  };

  const pluginConfig: PluginConfig = useMemo(() => {
    const sdkUISchema = schemas?.ui?.content ?? {};
    const userUISchema = schemas?.uiOverrides?.content ?? {};
    return mergePluginConfigs({ uiSchema: sdkUISchema }, plugins, { uiSchema: userUISchema });
  }, [schemas?.ui?.content, schemas?.uiOverrides?.content]);

  if (!dialogId) {
    return <LoadingSpinner />;
  }

  const selectedTrigger = currentDialog?.triggers.find((t) => t.id === selected);
  const withWarning = triggerNotSupported(currentDialog, selectedTrigger);

  return (
    <React.Fragment>
      <div css={pageRoot}>
        <div css={contentWrapper} role="main">
          <div css={{ position: 'relative' }} data-testid="DesignPage-ToolBar">
            <span
              ref={addNewBtnRef}
              css={{ width: 120, height: '100%', position: 'absolute', left: 0, visibility: 'hidden' }}
              data-testid="CoachmarkRef-AddNew"
            />
            <Toolbar toolbarItems={toolbarItems} />
          </div>
        </div>
        <Conversation css={editorContainer}>
          <div css={editorWrapper}>
            <LeftRightSplit initialLeftGridWidth="75%" minLeftPixels={500} minRightPixels={300}>
              <div aria-label={formatMessage('Authoring canvas')} css={visualPanel} role="region">
                {breadcrumbItems}
                {dialogJsonVisible ? (
                  <JsonEditor
                    key={'dialogjson'}
                    editorSettings={userSettings.codeEditor}
                    id={currentDialog.id}
                    schema={schemas.sdk.content}
                    value={currentDialog.content || undefined}
                    onChange={(data) => {
                      updateDialog({ id: currentDialog.id, content: data, projectId });
                    }}
                  />
                ) : withWarning ? (
                  warningIsVisible && (
                    <WarningMessage
                      okText={formatMessage('Change Recognizer')}
                      onCancel={() => {
                        setWarningIsVisible(false);
                      }}
                      onOk={() => navigateTo(`/bot/${projectId}/knowledge-base/all`)}
                    />
                  )
                ) : (
                  <EditorExtension plugins={pluginConfig} projectId={projectId} shell={shellForFlowEditor}>
                    <VisualEditor
                      openNewTriggerModal={openNewTriggerModal}
                      onBlur={() => setFlowEditorFocused(false)}
                      onFocus={() => setFlowEditorFocused(true)}
                    />
                  </EditorExtension>
                )}
              </div>
              <EditorExtension plugins={pluginConfig} projectId={projectId} shell={shellForPropertyEditor}>
                <PropertyEditor key={focusPath + undoVersion} />
              </EditorExtension>
            </LeftRightSplit>
          </div>
        </Conversation>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        {showCreateDialogModal && (
          <EditorExtension plugins={pluginConfig} projectId={projectId} shell={shell}>
            <CreateDialogModal
              isOpen={showCreateDialogModal}
              projectId={projectId}
              onDismiss={() => createDialogCancel(projectId)}
              onSubmit={handleCreateDialogSubmit}
            />
          </EditorExtension>
        )}
        {showAddSkillDialogModal && (
          <CreateSkillModal
            projectId={projectId}
            onDismiss={() => addSkillDialogCancel(projectId)}
            onSubmit={(skill) => addSkill(projectId, skill)}
          />
        )}
        {exportSkillModalVisible && (
          <ExportSkillModal
            isOpen={exportSkillModalVisible}
            projectId={projectId}
            onDismiss={() => setExportSkillModalVisible(false)}
            onSubmit={() => setExportSkillModalVisible(false)}
          />
        )}
        {triggerModalVisible && (
          <TriggerCreationModal
            dialogId={dialogId}
            isOpen={triggerModalVisible}
            projectId={projectId}
            onDismiss={onTriggerCreationDismiss}
            onSubmit={onTriggerCreationSubmit}
          />
        )}
        {importQnAModalVisibility && (
          <ImportQnAFromUrlModal dialogId={dialogId} onDismiss={cancelImportQnAModal} onSubmit={handleCreateQnA} />
        )}
        {displaySkillManifest && (
          <DisplayManifestModal
            manifestId={displaySkillManifest}
            projectId={projectId}
            onDismiss={() => dismissManifestModal(projectId)}
          />
        )}
      </Suspense>
    </React.Fragment>
  );
};

export default DesignPage;
