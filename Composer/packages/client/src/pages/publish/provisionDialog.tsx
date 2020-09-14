// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { useState, Fragment, useMemo } from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import formatMessage from 'format-message';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { JsonEditor } from '@bfc/code-editor';

import { PublishTarget } from '@bfc/shared';
import { PublishType } from '../../recoilModel/types';

import { DialogWrapper, DialogTypes } from '../../components/DialogWrapper';

import { CreateNewResource } from './createNewResources';
import { SelectExistedResources } from './selectExistedResources';
import { useRecoilValue } from 'recoil';
import { dispatcherState, userSettingsState, settingsState } from '../../recoilModel';

// import { getAccessTokenInCache } from '../../utils/auth';
interface ProvisionDialogProps {
  onDismiss: () => void;
  // onSubmit: (value: any) => void;
  createNew: (value: any) => void;
  selectedExist: (value: any) => void;
  types: PublishType[];
  targets: PublishTarget[];
  current: PublishTarget | null;
}

const choiceOptions: IChoiceGroupOption[] = [
  { key: 'createNew', text: 'Create New Resources' },
  { key: 'selectExist', text: 'Select Exist Resources' },
];

export const ProvisionDialog: React.FC<ProvisionDialogProps> = (props) => {
  const { getSubscriptions, setPublishTargets } = useRecoilValue(dispatcherState);

  const { userSettings } = useRecoilValue(userSettingsState);
  const { settings } = useRecoilValue(settingsState);

  const [name, setName] = useState(props.current?.name || '');
  const [targetType, setTargetType] = useState<string | undefined>(props.current?.type);
  const [errorMessage, setErrorMsg] = useState('');
  const [choice, setChoice] = useState(choiceOptions[0].key);
  const [currentStep, setCurrentStep] = useState(0);
  const [editInJson, setEditInJson] = useState(false);
  const [config, setConfig] = useState(props.current ? JSON.parse(props.current.configuration) : undefined);

  const targetTypes = useMemo(() => {
    return props.types.map((t) => ({ key: t.name, text: t.description }));
  }, [props.targets]);

  const updateName = useMemo(
    () => (e, newName) => {
      setErrorMsg('');
      setName(newName);
      isNameValid(newName);
    },
    []
  );
  const isNameValid = useMemo(
    () => (newName) => {
      if (!newName || newName.trim() === '') {
        setErrorMsg(formatMessage('Must have a name'));
      } else {
        const exists = !!props.targets?.find((t) => t.name.toLowerCase() === newName?.toLowerCase);

        if (exists) {
          setErrorMsg(formatMessage('A profile with that name already exists.'));
        }
      }
    },
    [props.targets]
  );

  const updateType = useMemo(
    () => (_e, option?: IDropdownOption) => {
      const type = props.types.find((t) => t.name === option?.key);

      if (type) {
        setTargetType(type.name);
      }
    },
    [props.types]
  );

  const isDisable = useMemo(
    () => () => {
      if (!targetType || !name || errorMessage) {
        return true;
      } else {
        return false;
      }
    },
    [targetType, name, errorMessage]
  );

  const choiceChanged = useMemo(
    () => (ev, option) => {
      setChoice(option.key);
    },
    []
  );

  const updateConfig = (newConfig) => {
    setConfig(newConfig);
  };

  const steps = [
    {
      children: (
        <Fragment>
          <form>
            <TextField
              defaultValue={props.current ? props.current.name : ''}
              errorMessage={errorMessage}
              label={formatMessage('Name')}
              placeholder={formatMessage('My Publish Profile')}
              onChange={updateName}
            />
            <Dropdown
              defaultSelectedKey={props.current ? props.current.type : null}
              label={formatMessage('Publish Destination Type')}
              options={targetTypes}
              placeholder={formatMessage('Choose One')}
              onChange={updateType}
            />
            {editInJson ? (
              <JsonEditor
                key={targetType}
                editorSettings={userSettings.codeEditor}
                height={200}
                value={config}
                onChange={updateConfig}
              />
            ) : (
              <ChoiceGroup
                required
                defaultSelectedKey={choiceOptions[0].key}
                label={formatMessage('Create from')}
                options={choiceOptions}
                onChange={choiceChanged}
              />
            )}
          </form>
          <DialogFooter>
            {!editInJson ? (
              <Fragment>
                <DefaultButton text="edit in JSON" onClick={() => setEditInJson(true)} />
                <DefaultButton text={formatMessage('Cancel')} onClick={props.onDismiss} />
                <PrimaryButton
                  disabled={isDisable()}
                  text={formatMessage('Next')}
                  onClick={async () => {
                    if (choice === choiceOptions[0].key) {
                      setCurrentStep(1);
                    } else if (choice === choiceOptions[1].key) {
                      setCurrentStep(2);
                    }
                    await getSubscriptions();
                    // await props.onSubmit({ name: name, type: targetType, choice: choice });
                  }}
                />
              </Fragment>
            ) : (
              <Fragment>
                <DefaultButton text={formatMessage('Cancel')} onClick={props.onDismiss} />
                <PrimaryButton
                  disabled={isDisable()}
                  text={formatMessage('Submit')}
                  onClick={() => {
                    const newTargets = settings.publishTargets?.map((item) => {
                      if (item.name === props.current?.name) {
                        return {
                          ...item,
                          configuration: JSON.stringify(config, null, 2),
                        };
                      } else {
                        return item;
                      }
                    });
                    setPublishTargets(newTargets);
                    props.onDismiss();
                  }}
                />
              </Fragment>
            )}
          </DialogFooter>
        </Fragment>
      ),
    },
    {
      children: (
        <CreateNewResource
          onDismiss={props.onDismiss}
          onSubmit={(value) => {
            // props.onSubmit({ ...value, name: name, type: targetType, choice: choice });
            props.onDismiss();
            props.createNew({ ...value, name: name, type: targetType, choice: choice });
          }}
        />
      ),
    },
    {
      children: (
        <SelectExistedResources
          onDismiss={props.onDismiss}
          onSubmit={(value) => {
            // props.onSubmit({ ...value, name: name, type: targetType, choice: choice });
            props.onDismiss();
            props.selectedExist({ ...value, name: name, type: targetType, choice: choice });
          }}
        />
      ),
    },
  ];
  return (
    <DialogWrapper
      isBlocking
      isOpen
      dialogType={DialogTypes.CreateFlow}
      subText=""
      title={props.current ? formatMessage('Edit a publish profile') : formatMessage('Add a publish profile')}
      onDismiss={props.onDismiss}
    >
      {steps[currentStep].children}
    </DialogWrapper>
  );
};
