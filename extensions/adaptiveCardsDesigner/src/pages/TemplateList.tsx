// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';
import React, { useMemo } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  CheckboxVisibility,
  SelectionMode,
  Selection,
} from 'office-ui-fabric-react/lib/DetailsList';
import { ScrollablePane, ScrollbarVisibility } from 'office-ui-fabric-react/lib/ScrollablePane';
import formatMessage from 'format-message';

import { Mode, ParsedLgTemplate } from './types';

const Container = styled.div({
  paddingTop: '8px',
});

const tableColumns = [
  {
    key: 'name',
    name: formatMessage('Name'),
    fieldName: 'name',
    minWidth: 150,
    maxWidth: 200,
    data: 'string',
  },
];

type Props = {
  mode: Mode;
  selectedTemplate?: ParsedLgTemplate;
  templates: ParsedLgTemplate[];
  onTemplateSelected: (template: ParsedLgTemplate) => void;
};

export const TemplateList: React.FC<Props> = ({ mode, selectedTemplate, templates, onTemplateSelected }) => {
  const selection = useMemo(() => {
    return new Selection({
      onSelectionChanged: () => {
        const template = selection.getSelection()[0] as ParsedLgTemplate;

        if (template) {
          if (mode === 'create') {
            onTemplateSelected({ name: selectedTemplate?.name || template.name, body: template.body });
          } else {
            onTemplateSelected(template);
          }
        }
      },
    });
  }, [selectedTemplate, onTemplateSelected]);

  return (
    <Container>
      <ScrollablePane
        scrollbarVisibility={ScrollbarVisibility.auto}
        styles={{ root: { minHeight: '250px', position: 'relative', width: '300px' } }}
      >
        <DetailsList
          selection={selection}
          checkboxVisibility={CheckboxVisibility.hidden}
          columns={tableColumns}
          compact={false}
          isHeaderVisible={false}
          items={templates}
          layoutMode={DetailsListLayoutMode.justified}
          selectionMode={SelectionMode.single}
        />
      </ScrollablePane>
    </Container>
  );
};
