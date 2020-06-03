// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PluginConfig, FlowEditorConfig } from '@bfc/extension';

import { defaultFlowSchema } from '../schema/defaultFlowSchema';
import { defaultFlowWidgets } from '../schema/defaultFlowWidgets';

export const mergePluginConfig = (...plugins: PluginConfig[]): Required<FlowEditorConfig> => {
  const externalWidgets = plugins.map((config) => config.visualSchema?.widgets).filter((x) => x != null);
  const externalSchema = plugins.map((config) => config.visualSchema?.schema).filter((x) => x != null);
  return {
    widgets: Object.assign({}, defaultFlowWidgets, ...externalWidgets),
    schema: Object.assign({}, defaultFlowSchema, ...externalSchema),
  };
};
