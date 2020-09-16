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
import * as Mappers from '../models/enterpriseChannelsMappers';
import * as Parameters from '../models/parameters';
/** Class representing a EnterpriseChannels. */
var EnterpriseChannels = /** @class */ (function () {
  /**
   * Create a EnterpriseChannels.
   * @param {AzureBotServiceContext} client Reference to the service client.
   */
  function EnterpriseChannels(client) {
    this.client = client;
  }
  EnterpriseChannels.prototype.checkNameAvailability = function (parameters, options, callback) {
    return this.client.sendOperationRequest(
      {
        parameters: parameters,
        options: options,
      },
      checkNameAvailabilityOperationSpec,
      callback
    );
  };
  EnterpriseChannels.prototype.listByResourceGroup = function (resourceGroupName, options, callback) {
    return this.client.sendOperationRequest(
      {
        resourceGroupName: resourceGroupName,
        options: options,
      },
      listByResourceGroupOperationSpec,
      callback
    );
  };
  /**
   * Creates an Enterprise Channel.
   * @param resourceGroupName The name of the Bot resource group in the user subscription.
   * @param resourceName The name of the Bot resource.
   * @param parameters The parameters to provide for the new Enterprise Channel.
   * @param [options] The optional parameters
   * @returns Promise<Models.EnterpriseChannelsCreateResponse>
   */
  EnterpriseChannels.prototype.create = function (resourceGroupName, resourceName, parameters, options) {
    return this.beginCreate(resourceGroupName, resourceName, parameters, options).then(function (lroPoller) {
      return lroPoller.pollUntilFinished();
    });
  };
  /**
   * Updates an Enterprise Channel.
   * @param resourceGroupName The name of the Bot resource group in the user subscription.
   * @param resourceName The name of the Bot resource.
   * @param [options] The optional parameters
   * @returns Promise<Models.EnterpriseChannelsUpdateResponse>
   */
  EnterpriseChannels.prototype.update = function (resourceGroupName, resourceName, options) {
    return this.beginUpdate(resourceGroupName, resourceName, options).then(function (lroPoller) {
      return lroPoller.pollUntilFinished();
    });
  };
  /**
   * Deletes an Enterprise Channel from the resource group
   * @param resourceGroupName The name of the Bot resource group in the user subscription.
   * @param resourceName The name of the Bot resource.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  EnterpriseChannels.prototype.deleteMethod = function (resourceGroupName, resourceName, options) {
    return this.beginDeleteMethod(resourceGroupName, resourceName, options).then(function (lroPoller) {
      return lroPoller.pollUntilFinished();
    });
  };
  EnterpriseChannels.prototype.get = function (resourceGroupName, resourceName, options, callback) {
    return this.client.sendOperationRequest(
      {
        resourceGroupName: resourceGroupName,
        resourceName: resourceName,
        options: options,
      },
      getOperationSpec,
      callback
    );
  };
  /**
   * Creates an Enterprise Channel.
   * @param resourceGroupName The name of the Bot resource group in the user subscription.
   * @param resourceName The name of the Bot resource.
   * @param parameters The parameters to provide for the new Enterprise Channel.
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  EnterpriseChannels.prototype.beginCreate = function (resourceGroupName, resourceName, parameters, options) {
    return this.client.sendLRORequest(
      {
        resourceGroupName: resourceGroupName,
        resourceName: resourceName,
        parameters: parameters,
        options: options,
      },
      beginCreateOperationSpec,
      options
    );
  };
  /**
   * Updates an Enterprise Channel.
   * @param resourceGroupName The name of the Bot resource group in the user subscription.
   * @param resourceName The name of the Bot resource.
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  EnterpriseChannels.prototype.beginUpdate = function (resourceGroupName, resourceName, options) {
    return this.client.sendLRORequest(
      {
        resourceGroupName: resourceGroupName,
        resourceName: resourceName,
        options: options,
      },
      beginUpdateOperationSpec,
      options
    );
  };
  /**
   * Deletes an Enterprise Channel from the resource group
   * @param resourceGroupName The name of the Bot resource group in the user subscription.
   * @param resourceName The name of the Bot resource.
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  EnterpriseChannels.prototype.beginDeleteMethod = function (resourceGroupName, resourceName, options) {
    return this.client.sendLRORequest(
      {
        resourceGroupName: resourceGroupName,
        resourceName: resourceName,
        options: options,
      },
      beginDeleteMethodOperationSpec,
      options
    );
  };
  EnterpriseChannels.prototype.listByResourceGroupNext = function (nextPageLink, options, callback) {
    return this.client.sendOperationRequest(
      {
        nextPageLink: nextPageLink,
        options: options,
      },
      listByResourceGroupNextOperationSpec,
      callback
    );
  };
  return EnterpriseChannels;
})();
export { EnterpriseChannels };
// Operation Specifications
var serializer = new msRest.Serializer(Mappers);
var checkNameAvailabilityOperationSpec = {
  httpMethod: 'POST',
  path: 'providers/Microsoft.BotService/checkEnterpriseChannelNameAvailability',
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  requestBody: {
    parameterPath: 'parameters',
    mapper: __assign(__assign({}, Mappers.EnterpriseChannelCheckNameAvailabilityRequest), { required: true }),
  },
  responses: {
    200: {
      bodyMapper: Mappers.EnterpriseChannelCheckNameAvailabilityResponse,
    },
    default: {
      bodyMapper: Mappers.ErrorModel,
    },
  },
  serializer: serializer,
};
var listByResourceGroupOperationSpec = {
  httpMethod: 'GET',
  path:
    'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/enterpriseChannels',
  urlParameters: [Parameters.resourceGroupName, Parameters.subscriptionId],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {
      bodyMapper: Mappers.EnterpriseChannelResponseList,
    },
    default: {
      bodyMapper: Mappers.ErrorModel,
    },
  },
  serializer: serializer,
};
var getOperationSpec = {
  httpMethod: 'GET',
  path:
    'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/enterpriseChannels/{resourceName}',
  urlParameters: [Parameters.resourceGroupName, Parameters.resourceName, Parameters.subscriptionId],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {
      bodyMapper: Mappers.EnterpriseChannel,
    },
    default: {
      bodyMapper: Mappers.ErrorModel,
    },
  },
  serializer: serializer,
};
var beginCreateOperationSpec = {
  httpMethod: 'PUT',
  path:
    'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/enterpriseChannels/{resourceName}',
  urlParameters: [Parameters.resourceGroupName, Parameters.resourceName, Parameters.subscriptionId],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  requestBody: {
    parameterPath: 'parameters',
    mapper: __assign(__assign({}, Mappers.EnterpriseChannel), { required: true }),
  },
  responses: {
    200: {
      bodyMapper: Mappers.EnterpriseChannel,
    },
    201: {
      bodyMapper: Mappers.EnterpriseChannel,
    },
    default: {
      bodyMapper: Mappers.ErrorModel,
    },
  },
  serializer: serializer,
};
var beginUpdateOperationSpec = {
  httpMethod: 'PATCH',
  path:
    'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/enterpriseChannels/{resourceName}',
  urlParameters: [Parameters.resourceGroupName, Parameters.resourceName, Parameters.subscriptionId],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  requestBody: {
    parameterPath: {
      location: ['options', 'location'],
      tags: ['options', 'tags'],
      sku: ['options', 'sku'],
      kind: ['options', 'kind'],
      etag: ['options', 'etag'],
      properties: ['options', 'properties'],
    },
    mapper: __assign(__assign({}, Mappers.EnterpriseChannel), { required: true }),
  },
  responses: {
    200: {
      bodyMapper: Mappers.EnterpriseChannel,
    },
    201: {
      bodyMapper: Mappers.EnterpriseChannel,
    },
    default: {
      bodyMapper: Mappers.ErrorModel,
    },
  },
  serializer: serializer,
};
var beginDeleteMethodOperationSpec = {
  httpMethod: 'DELETE',
  path:
    'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/enterpriseChannels/{resourceName}',
  urlParameters: [Parameters.resourceGroupName, Parameters.resourceName, Parameters.subscriptionId],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorModel,
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
      bodyMapper: Mappers.EnterpriseChannelResponseList,
    },
    default: {
      bodyMapper: Mappers.ErrorModel,
    },
  },
  serializer: serializer,
};
//# sourceMappingURL=enterpriseChannels.js.map
