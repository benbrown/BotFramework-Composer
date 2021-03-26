import { PublishTarget, SkillManifestFile } from '@bfc/shared';
import formatMessage from 'format-message';
import { css, Dropdown, Icon, IDropdownOption, PrimaryButton, TextField, TooltipHost } from 'office-ui-fabric-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  botDisplayNameState,
  currentTargetState,
  dispatcherState,
  settingsState,
  skillManifestsState,
} from '../../../../recoilModel';
import { PublishTargets } from '../../../botProject/PublishTargets';
import { iconStyle } from '../../../botProject/runtime-settings/style';
import Publish from '../../../publish/Publish';
import { ContentProps, VERSION_REGEX } from '../constants';

const styles = {
  container: css`
    height: 350px;
    overflow: auto;
  `,
};

const onRenderLabel = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '5px',
      }}
    >
      <div
        style={{
          marginRight: '5px',
          fontWeight: 600,
          fontSize: '14px',
        }}
      >
        {' '}
        {props.label}{' '}
      </div>
      <TooltipHost content={props.ariaLabel}>
        <Icon iconName="Info" styles={iconStyle(props.required)} />
      </TooltipHost>
    </div>
  );
};

export const getManifestId = (
  botName: string,
  skillManifests: SkillManifestFile[],
  { content: { $schema } = {} }: Partial<SkillManifestFile>
): string => {
  const [version] = VERSION_REGEX.exec($schema) || [''];

  let fileId = version ? `${botName}-${version.replace(/\./g, '-')}-manifest` : `${botName}-manifest`;
  let i = -1;

  while (skillManifests.some(({ id }) => id === fileId)) {
    if (i < 0) {
      fileId = fileId.concat(`-${++i}`);
    } else {
      fileId = fileId.substr(0, fileId.lastIndexOf('-')).concat(`-${++i}`);
    }
  }

  return fileId;
};

export const SelectProfile: React.FC<ContentProps> = ({ manifest, setSkillManifest, value, onChange, projectId }) => {
  const [publishingTargets, setPublishingTargets] = useState<PublishTarget[]>([]);
  const [currentTarget, setCurrentTarget] = useState<PublishTarget>();
  const { updateCurrentTarget } = useRecoilValue(dispatcherState);
  const [endpointUrl, setEndpointUrl] = useState<string>();
  const [appId, setAppId] = useState<string>();
  const { id, content } = manifest;
  const botName = useRecoilValue(botDisplayNameState(projectId));
  const skillManifests = useRecoilValue(skillManifestsState(projectId));

  const { ...rest } = content;
  const updateCurrentProfile = useMemo(
    () => (_e, option?: IDropdownOption) => {
      const target = publishingTargets.find((t) => {
        return t.name === option?.key;
      });
      if (target) {
        setCurrentTarget(target);
        updateCurrentTarget(projectId, target);
        const config = JSON.parse(target.configuration);
        setEndpointUrl(`https://${config.hostname}.azurewebsites.net`);
        setAppId(config.settings.MicrosoftAppId);

        setSkillManifest({
          content: {
            ...rest,
            endpoints: [
              {
                protocol: 'BotFrameworkV3',
                name: option?.key,
                endpointUrl: `https://${config.hostname}.azurewebsites.net/api/messages`,
                description: '<description>',
                msAppId: config.settings.MicrosoftAppId,
              },
            ],
          },
          id: id,
        });
      }
    },
    [publishingTargets]
  );

  const isProfileValid = useMemo(
    () => () => {
      if (!publishingTargets) {
        return false;
      }
      const filteredProfile = publishingTargets.filter((item) => {
        const config = JSON.parse(item.configuration);
        return (
          config.settings.MicrosoftAppId &&
          config.hostname &&
          config.settings.MicrosoftAppId.length > 0 &&
          config.hostname.length > 0
        );
      });
      return filteredProfile.length > 0;
    },
    [publishingTargets]
  );

  const publishingOptions = useMemo(() => {
    return publishingTargets.map((t) => ({
      key: t.name,
      text: t.name,
    }));
  }, [publishingTargets]);

  const settings = useRecoilValue(settingsState(projectId));

  const OnEndpointChange = useMemo(
    () => (e, newValue) => {
      setEndpointUrl(newValue);
    },
    [setEndpointUrl]
  );

  const OnAppIdChange = useMemo(
    () => (e, newValue) => {
      setAppId(newValue);
    },
    [setAppId]
  );

  useEffect(() => {
    setPublishingTargets(settings.publishTargets || []);
  }, [settings]);

  useEffect(() => {
    if (!id) {
      const fileId = getManifestId(botName, skillManifests, manifest);
      setSkillManifest({ ...manifest, id: fileId });
    }
  }, []);

  return isProfileValid() ? (
    <div css={styles.container}>
      <Dropdown
        required
        ariaLabel={formatMessage('Select a publishing profile')}
        label={formatMessage('Publishing Profile')}
        options={publishingOptions}
        placeholder={'Select one'}
        styles={{ root: { paddingBottom: '8px' } }}
        onChange={updateCurrentProfile}
      />
      <TextField
        required
        ariaLabel={formatMessage('The endpoint url')}
        label={formatMessage('Endpoint Url')}
        placeholder={'The endpoint url of your web app resource'}
        styles={{ root: { paddingBottom: '8px' } }}
        onChange={OnEndpointChange}
        value={endpointUrl}
        onRenderLabel={onRenderLabel}
      />
      <TextField
        required
        ariaLabel={formatMessage('The app id of your application registration')}
        label={formatMessage('Microsoft App Id')}
        placeholder={'The app id'}
        styles={{ root: { paddingBottom: '8px' } }}
        onChange={OnAppIdChange}
        value={appId}
        onRenderLabel={onRenderLabel}
      />
    </div>
  ) : (
    <div>
      <PublishTargets projectId={projectId}></PublishTargets>
    </div>
  );
};
