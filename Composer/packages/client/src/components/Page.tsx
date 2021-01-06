// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx, css, SerializedStyles } from '@emotion/core';
import React from 'react';
import { FontWeights, FontSizes } from 'office-ui-fabric-react/lib/Styling';
import { Toolbar, IToolbarItem } from '@bfc/ui-shared';

import { LeftRightSplit } from '../components/Split/LeftRightSplit';
import { navigateTo, buildURL } from '../utils/navigation';
import { PageMode } from '../recoilModel';
import { colors } from '../constants';

import { NavTree, INavTreeItem } from './NavTree';
import { ProjectTree } from './ProjectTree/ProjectTree';

// -------------------- Styles -------------------- //

export const root = css`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: row;

  label: Page;
`;

export const pageWrapper = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  label: PageWrapper;
`;

export const header = css`
  padding: 5px 20px;
  height: 60px;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;

  label: PageHeader;
`;

export const headerTitle = css`
  font-size: ${FontSizes.xLarge};
  font-weight: ${FontWeights.semibold};

  label: PageHeaderTitle;
`;

export const headerContent = css`
  display: flex;
  align-items: center;
  font-size: ${FontSizes.smallPlus};
  label: PageHeaderContent;
`;

export const main = css`
  margin-left: 2px;
  height: calc(100vh - 165px);
  display: flex;
  border-top: 1px solid ${colors.gray50};
  position: relative;
  nav {
    ul {
      margin-top: 0px;
    }
  }

  label: PageMain;
`;

export const content = (shouldShowEditorError: boolean) => css`
  flex: 4;
  padding: 20px;
  position: relative;
  overflow: auto;
  height: ${shouldShowEditorError ? 'calc(100% - 40px)' : 'calc(100% - 10px)'};
  label: PageContent;
  box-sizing: border-box;
`;

// -------------------- Page -------------------- //

type IPageProps = {
  // TODO: add type
  toolbarItems: IToolbarItem[];
  title: string;
  headerStyle?: SerializedStyles;
  navRegionName: string;
  mainRegionName: string;
  shouldShowEditorError?: boolean;
  onRenderHeaderContent?: () => string | JSX.Element | null;
  'data-testid'?: string;
  useNewTree?: boolean;
  navLinks?: INavTreeItem[];
  pageMode: PageMode;
  showCommonLinks?: boolean;
  projectId?: string;
  skillId?: string;
  dialogId?: string;
  fileId?: string;
};

const Page: React.FC<IPageProps> = (props) => {
  const {
    title,
    navLinks,
    toolbarItems,
    onRenderHeaderContent,
    children,
    navRegionName,
    mainRegionName,
    headerStyle = header,
    shouldShowEditorError = true,
    useNewTree,
    pageMode,
    showCommonLinks = false,
    projectId,
    skillId,
    dialogId,
    fileId,
  } = props;

  return (
    <div css={root} data-testid={props['data-testid']}>
      <div css={pageWrapper}>
        <Toolbar toolbarItems={toolbarItems} />
        <div css={headerStyle}>
          <h1 css={headerTitle}>{title}</h1>
          {onRenderHeaderContent && <div css={headerContent}>{onRenderHeaderContent()}</div>}
        </div>
        <div css={main} role="main">
          <LeftRightSplit initialLeftGridWidth="20%" minLeftPixels={200} minRightPixels={800} pageMode={pageMode}>
            {useNewTree ? (
              <ProjectTree
                defaultSelected={{
                  projectId,
                  skillId,
                  dialogId,
                  lgFileId: pageMode === 'language-generation' && fileId ? fileId : undefined,
                  luFileId: pageMode === 'language-understanding' && fileId ? fileId : undefined,
                }}
                options={{
                  showDelete: false,
                  showTriggers: false,
                  showDialogs: true,
                  showLgImports: pageMode === 'language-generation',
                  showLuImports: pageMode === 'language-understanding',
                  showRemote: false,
                  showMenu: false,
                  showQnAMenu: title === 'QnA',
                  showErrors: false,
                  showCommonLinks,
                }}
                onSelect={(link) => {
                  navigateTo(buildURL(pageMode, link));
                }}
              />
            ) : (
              <NavTree navLinks={navLinks as INavTreeItem[]} regionName={navRegionName} />
            )}
            <div
              aria-label={mainRegionName}
              css={content(shouldShowEditorError)}
              data-testid="PageContent"
              role="region"
            >
              {children}
            </div>
          </LeftRightSplit>
        </div>
      </div>
    </div>
  );
};

export { Page };
