/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from '@azure/ms-rest-js';
import * as Models from './models';
import * as Mappers from './models/mappers';
import * as operations from './operations';
import { ApplicationInsightsManagementClientContext } from './applicationInsightsManagementClientContext';

class ApplicationInsightsManagementClient extends ApplicationInsightsManagementClientContext {
  // Operation groups
  operations: operations.Operations;
  annotations: operations.Annotations;
  aPIKeys: operations.APIKeys;
  exportConfigurations: operations.ExportConfigurations;
  componentCurrentBillingFeatures: operations.ComponentCurrentBillingFeatures;
  componentQuotaStatus: operations.ComponentQuotaStatus;
  componentFeatureCapabilities: operations.ComponentFeatureCapabilities;
  componentAvailableFeatures: operations.ComponentAvailableFeatures;
  proactiveDetectionConfigurations: operations.ProactiveDetectionConfigurations;
  components: operations.Components;
  workItemConfigurations: operations.WorkItemConfigurations;
  favorites: operations.Favorites;
  webTestLocations: operations.WebTestLocations;
  webTests: operations.WebTests;
  analyticsItems: operations.AnalyticsItems;
  workbooks: operations.Workbooks;

  /**
   * Initializes a new instance of the ApplicationInsightsManagementClient class.
   * @param credentials Credentials needed for the client to connect to Azure.
   * @param subscriptionId The Azure subscription ID.
   * @param [options] The parameter options
   */
  constructor(
    credentials: msRest.ServiceClientCredentials,
    subscriptionId: string,
    options?: Models.ApplicationInsightsManagementClientOptions
  ) {
    super(credentials, subscriptionId, options);
    this.operations = new operations.Operations(this);
    this.annotations = new operations.Annotations(this);
    this.aPIKeys = new operations.APIKeys(this);
    this.exportConfigurations = new operations.ExportConfigurations(this);
    this.componentCurrentBillingFeatures = new operations.ComponentCurrentBillingFeatures(this);
    this.componentQuotaStatus = new operations.ComponentQuotaStatus(this);
    this.componentFeatureCapabilities = new operations.ComponentFeatureCapabilities(this);
    this.componentAvailableFeatures = new operations.ComponentAvailableFeatures(this);
    this.proactiveDetectionConfigurations = new operations.ProactiveDetectionConfigurations(this);
    this.components = new operations.Components(this);
    this.workItemConfigurations = new operations.WorkItemConfigurations(this);
    this.favorites = new operations.Favorites(this);
    this.webTestLocations = new operations.WebTestLocations(this);
    this.webTests = new operations.WebTests(this);
    this.analyticsItems = new operations.AnalyticsItems(this);
    this.workbooks = new operations.Workbooks(this);
  }
}

// Operation Specifications

export {
  ApplicationInsightsManagementClient,
  ApplicationInsightsManagementClientContext,
  Models as ApplicationInsightsManagementModels,
  Mappers as ApplicationInsightsManagementMappers,
};
export * from './operations';
