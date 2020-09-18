// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { PublishTarget } from '@bfc/shared';

interface ProvisionDetailProps {
  onDismiss: () => void;
  target: PublishTarget[] | undefined;
}
export const ProvisionDetailPanel: React.FC<ProvisionDetailProps> = (props) => {
  return (
    <Panel isLightDismiss isOpen closeButtonAriaLabel="Close" headerText="Provision Detail" onDismiss={props.onDismiss}>
      {props.target &&
        props.target.map((item, index) => {
          return item.configuration === '{}' ? (
            <ProgressIndicator
              key={index}
              description={item.provisionStatus}
              label={item.name}
              // percentComplete={percentComplete}
            />
          ) : null;
        })}
    </Panel>
  );
};
