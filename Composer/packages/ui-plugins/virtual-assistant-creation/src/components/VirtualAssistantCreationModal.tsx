// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { Fragment, useState } from 'react';
import { RouteComponentProps, Router } from '@reach/router';
import NewBotPage from './newBotPage';
import CustomizeBotPage from './customizeBotPage';
import PreProvisionPage from './preProvisionPage';
import { AppContextDefaultValue } from '../models/stateModels';
import { useShellApi, JSONSchema7 } from '@bfc/extension';

interface VirtualAssistantCreationModalProps
  extends RouteComponentProps<{
    location: string;
  }> {
  // handleCreateNew: (formData: any, );
  onDismiss: () => void;
  handleCreateNew: (formData: any, templateId: string) => Promise<void>;
  formData: any;
}

export const AppContext = React.createContext(AppContextDefaultValue);

export const VirtualAssistantCreationModal: React.FC<VirtualAssistantCreationModalProps> = (props) => {
  const { onDismiss, handleCreateNew, formData } = props;
  const [state, setState] = useState(AppContextDefaultValue.state);
  const { shellApi, ...shellData } = useShellApi();

  const createAndConfigureBot = async () => {
    await handleCreateNew(formData, 'va-core');
    await shellApi.updateLgTemplate('Onboarding.en-us', 'SendActivity_5eOsgQ', '- Hello There Mr. Man');
  };

  return (
    <Fragment>
      <AppContext.Provider value={{ state, setState }}>
        <Router>
          <NewBotPage onDismiss={onDismiss} path="/projects/create/va-core/customize/" default />
          <CustomizeBotPage onDismiss={onDismiss} path="/projects/create/va-core/customize/options" />
          <PreProvisionPage
            onDismiss={onDismiss}
            onSubmit={createAndConfigureBot}
            path="/projects/create/va-core/customize/preProvision"
          />
        </Router>
      </AppContext.Provider>
    </Fragment>
  );
};

export default VirtualAssistantCreationModal;
