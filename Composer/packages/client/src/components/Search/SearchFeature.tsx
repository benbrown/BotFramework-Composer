// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import styled from '@emotion/styled';
import { navigate } from '@reach/router';
import { NeutralColors } from '@uifabric/fluent-theme';
import formatMessage from 'format-message';
import Fuse from 'fuse.js';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { DefaultEffects } from 'office-ui-fabric-react/lib/Styling';
import { Text } from 'office-ui-fabric-react/lib/Text';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { useSearchFeature } from '../../hooks/useSearchFeature';
import { botOpeningState } from '../../recoilModel';

import { renderAssetItem } from './renderAssetItem';
import {
  AssetItem,
  BotBoundAssetData,
  SearchDocumentResult,
  SearchKind,
  SearchResult,
  SearchResultKind,
} from './types';
import { useDebounce } from './useDebounce';

const defaultItemHeight = 32;
const maxResultCount = 5;
const minCharCountRequirement = 3;

const ItemRoot = styled(Stack)({
  '&>label': {
    marginTop: 8,
  },
  '&:not(:first-of-type)': {
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: 'calc(100% - 32px)',
      left: 16,
      top: 0,
      height: 2,
      background: NeutralColors.gray40,
    },
  },
});

const Root = styled(Stack)(({ height }: { height: number }) => ({
  height,
}));

const ItemRow = styled(Stack)({
  fontSize: 12,
  height: defaultItemHeight,
  lineHeight: `${defaultItemHeight}px`,
  cursor: 'pointer',
  '&:hover': {
    position: 'relative',
    '&::after': {
      position: 'absolute',
      content: '""',
      height: '100%',
      width: 'calc(100% + 32px)',
      left: -16,
      right: 16,
      pointerEvents: 'none',
      zIndex: -1,
      background: NeutralColors.gray40,
    },
  },
});

const SmartSearchBox = styled(SearchBox)({
  width: 600,
  background: 'rgba(255,255,255,0.8)',
  border: 'none',
  '&.is-active': { border: 'none', '&::after': { border: 'none' } },
  '&.is-disabled': {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      background: 'rgba(255,255,255,0.7)',
    },
  },
});

const ItemText = styled(Text)({
  fontSize: 12,
});

const renderItem = (item: SearchResult<any>): React.ReactNode => {
  switch (item.kind) {
    case 'documentation':
      return <ItemText>{(item.data as SearchDocumentResult).Title}</ItemText>;
    case 'asset':
      return renderAssetItem(item.data as Fuse.FuseResult<AssetItem<BotBoundAssetData>>);
    case 'command':
      return <ItemText>{item.id}</ItemText>;
  }
};

type SearchResultPaneProps<T> = {
  kind: SearchResultKind;
  label: string;
  items: SearchResult<T>[];
  onClickItem: (kind: SearchResultKind, link: string) => void;
};

const SearchResultPane = <T,>(props: SearchResultPaneProps<T>) => {
  const { kind, label, items, onClickItem } = props;

  return items.length ? (
    <ItemRoot tokens={{ childrenGap: 8, padding: '0 16px' }}>
      <Label styles={{ root: { height: defaultItemHeight } }}>{label}</Label>
      <Root height={Math.min(items.length, maxResultCount) * defaultItemHeight + 8}>
        {items.map((item, idx) => (
          <ItemRow
            key={`item-${item.id}-${idx}`}
            horizontal
            tokens={{ childrenGap: 16 }}
            verticalAlign="center"
            onClick={() => onClickItem(kind, item.linkUrl)}
          >
            <Icon iconName={item.icon} />
            {renderItem(item)}
          </ItemRow>
        ))}
      </Root>
    </ItemRoot>
  ) : null;
};

export const SearchFeature = () => {
  const botOpening = useRecoilValue(botOpeningState);
  const { 0: query, 1: setQuery } = React.useState('');

  const debouncedQuery = useDebounce<string>(query, 300);

  const { items, clear, isSearching } = useSearchFeature(debouncedQuery, minCharCountRequirement);

  React.useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clear();
        setQuery('');
      }
    };

    document.addEventListener('keydown', keydownHandler);

    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, []);

  const documentationItems = React.useMemo(
    () => items.filter((item) => item.kind === 'documentation').slice(0, maxResultCount),
    [items]
  ) as SearchResult<SearchDocumentResult>[];

  const assetItems = React.useMemo(() => items.filter((item) => item.kind === 'asset').slice(0, maxResultCount), [
    items,
  ]) as SearchResult<AssetItem<any>>[];

  const commandItems = React.useMemo(() => items.filter((item) => item.kind === 'command').slice(0, maxResultCount), [
    items,
  ]) as SearchResult<any>[];

  const clickItem = React.useCallback(
    (_: SearchKind, link: string) => {
      console.log(link);
      navigate(link);
      clear();
      setQuery('');
    },
    [setQuery, clear]
  );

  return (
    <Stack grow horizontal horizontalAlign="start" styles={{ root: { position: 'relative' } }} verticalAlign="center">
      <Stack.Item styles={{ root: { position: 'relative' } }}>
        <SmartSearchBox
          autoComplete="off"
          disabled={botOpening}
          placeholder={formatMessage('Search all (or use > for commands, / for assets, and ? for documentation)')}
          styles={{
            iconContainer: {
              display: 'none',
            },
          }}
          onChange={(_, value) => setQuery(value || '')}
        />
        {isSearching && (
          <Spinner
            size={SpinnerSize.medium}
            styles={{
              root: { position: 'absolute', right: 40, top: 6 },
            }}
          />
        )}
      </Stack.Item>
      {items.length && (
        <Stack
          styles={{
            root: {
              position: 'absolute',
              left: 0,
              top: 32,
              width: '100%',
              background: NeutralColors.white,
              zIndex: 102,
              boxShadow: DefaultEffects.elevation8,
            },
          }}
        >
          <SearchResultPane<SearchDocumentResult>
            items={commandItems}
            kind="command"
            label={formatMessage('Commands')}
            onClickItem={clickItem}
          />
          <SearchResultPane<AssetItem<any>>
            items={assetItems}
            kind="asset"
            label={formatMessage('Bot assets')}
            onClickItem={clickItem}
          />
          <SearchResultPane<any>
            items={documentationItems}
            kind="documentation"
            label={formatMessage('Looking for documentation?')}
            onClickItem={clickItem}
          />
        </Stack>
      )}
    </Stack>
  );
};
