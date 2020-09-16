/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */
import { __assign } from 'tslib';
import * as msRest from '@azure/ms-rest-js';
import * as Mappers from '../models/webTestsMappers';
import * as Parameters from '../models/parameters';
/** Class representing a WebTests. */
var WebTests = /** @class */ (function () {
  /**
   * Create a WebTests.
   * @param {ApplicationInsightsManagementClientContext} client Reference to the service client.
   */
  function WebTests(client) {
    this.client = client;
  }
  WebTests.prototype.listByResourceGroup = function (resourceGroupName, options, callback) {
    return this.client.sendOperationRequest(
      {
        resourceGroupName: resourceGroupName,
        options: options,
      },
      listByResourceGroupOperationSpec,
      callback
    );
  };
  WebTests.prototype.get = function (resourceGroupName, webTestName, options, callback) {
    return this.client.sendOperationRequest(
      {
        resourceGroupName: resourceGroupName,
        webTestName: webTestName,
        options: options,
      },
      getOperationSpec,
      callback
    );
  };
  WebTests.prototype.createOrUpdate = function (resourceGroupName, webTestName, webTestDefinition, options, callback) {
    return this.client.sendOperationRequest(
      {
        resourceGroupName: resourceGroupName,
        webTestName: webTestName,
        webTestDefinition: webTestDefinition,
        options: options,
      },
      createOrUpdateOperationSpec,
      callback
    );
  };
  WebTests.prototype.updateTags = function (resourceGroupName, webTestName, webTestTags, options, callback) {
    return this.client.sendOperationRequest(
      {
        resourceGroupName: resourceGroupName,
        webTestName: webTestName,
        webTestTags: webTestTags,
        options: options,
      },
      updateTagsOperationSpec,
      callback
    );
  };
  WebTests.prototype.deleteMethod = function (resourceGroupName, webTestName, options, callback) {
    return this.client.sendOperationRequest(
      {
        resourceGroupName: resourceGroupName,
        webTestName: webTestName,
        options: options,
      },
      deleteMethodOperationSpec,
      callback
    );
  };
  WebTests.prototype.list = function (options, callback) {
    return this.client.sendOperationRequest(
      {
        options: options,
      },
      listOperationSpec,
      callback
    );
  };
  WebTests.prototype.listByComponent = function (componentName, resourceGroupName, options, callback) {
    return this.client.sendOperationRequest(
      {
        componentName: componentName,
        resourceGroupName: resourceGroupName,
        options: options,
      },
      listByComponentOperationSpec,
      callback
    );
  };
  WebTests.prototype.listByResourceGroupNext = function (nextPageLink, options, callback) {
    return this.client.sendOperationRequest(
      {
        nextPageLink: nextPageLink,
        options: options,
      },
      listByResourceGroupNextOperationSpec,
      callback
    );
  };
  WebTests.prototype.listNext = function (nextPageLink, options, callback) {
    return this.client.sendOperationRequest(
      {
        nextPageLink: nextPageLink,
        options: options,
      },
      listNextOperationSpec,
      callback
    );
  };
  WebTests.prototype.listByComponentNext = function (nextPageLink, options, callback) {
    return this.client.sendOperationRequest(
      {
        nextPageLink: nextPageLink,
        options: options,
      },
      listByComponentNextOperationSpec,
      callback
    );
  };
  return WebTests;
})();
export { WebTests };
// Operation Specifications
var serializer = new msRest.Serializer(Mappers);
var listByResourceGroupOperationSpec = {
  httpMethod: 'GET',
  path: 'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/webtests',
  urlParameters: [Parameters.resourceGroupName, Parameters.subscriptionId],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {
      bodyMapper: Mappers.WebTestListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  serializer: serializer,
};
var getOperationSpec = {
  httpMethod: 'GET',
  path:
    'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/webtests/{webTestName}',
  urlParameters: [Parameters.resourceGroupName, Parameters.subscriptionId, Parameters.webTestName],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {
      bodyMapper: Mappers.WebTest,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  serializer: serializer,
};
var createOrUpdateOperationSpec = {
  httpMethod: 'PUT',
  path:
    'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/webtests/{webTestName}',
  urlParameters: [Parameters.resourceGroupName, Parameters.subscriptionId, Parameters.webTestName],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  requestBody: {
    parameterPath: 'webTestDefinition',
    mapper: __assign(__assign({}, Mappers.WebTest), { required: true }),
  },
  responses: {
    200: {
      bodyMapper: Mappers.WebTest,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  serializer: serializer,
};
var updateTagsOperationSpec = {
  httpMethod: 'PATCH',
  path:
    'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/webtests/{webTestName}',
  urlParameters: [Parameters.resourceGroupName, Parameters.subscriptionId, Parameters.webTestName],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  requestBody: {
    parameterPath: 'webTestTags',
    mapper: __assign(__assign({}, Mappers.TagsResource), { required: true }),
  },
  responses: {
    200: {
      bodyMapper: Mappers.WebTest,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  serializer: serializer,
};
var deleteMethodOperationSpec = {
  httpMethod: 'DELETE',
  path:
    'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/webtests/{webTestName}',
  urlParameters: [Parameters.subscriptionId, Parameters.resourceGroupName, Parameters.webTestName],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  serializer: serializer,
};
var listOperationSpec = {
  httpMethod: 'GET',
  path: 'subscriptions/{subscriptionId}/providers/Microsoft.Insights/webtests',
  urlParameters: [Parameters.subscriptionId],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {
      bodyMapper: Mappers.WebTestListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  serializer: serializer,
};
var listByComponentOperationSpec = {
  httpMethod: 'GET',
  path:
    'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{componentName}/webtests',
  urlParameters: [Parameters.componentName, Parameters.resourceGroupName, Parameters.subscriptionId],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {
      bodyMapper: Mappers.WebTestListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  serializer: serializer,
};
var listByResourceGroupNextOperationSpec = {
  httpMethod: 'GET',
  baseUrl: 'https://management.azure.com',
  path: '{nextLink}',
  urlParameters: [Parameters.nextPageLink],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {
      bodyMapper: Mappers.WebTestListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  serializer: serializer,
};
var listNextOperationSpec = {
  httpMethod: 'GET',
  baseUrl: 'https://management.azure.com',
  path: '{nextLink}',
  urlParameters: [Parameters.nextPageLink],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {
      bodyMapper: Mappers.WebTestListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  serializer: serializer,
};
var listByComponentNextOperationSpec = {
  httpMethod: 'GET',
  baseUrl: 'https://management.azure.com',
  path: '{nextLink}',
  urlParameters: [Parameters.nextPageLink],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {
      bodyMapper: Mappers.WebTestListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  serializer: serializer,
};
//# sourceMappingURL=webTests.js.map
