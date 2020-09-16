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
import * as Models from '../models';
import * as Mappers from '../models/annotationsMappers';
import * as Parameters from '../models/parameters';
import { ApplicationInsightsManagementClientContext } from '../applicationInsightsManagementClientContext';

/** Class representing a Annotations. */
export class Annotations {
  private readonly client: ApplicationInsightsManagementClientContext;

  /**
   * Create a Annotations.
   * @param {ApplicationInsightsManagementClientContext} client Reference to the service client.
   */
  constructor(client: ApplicationInsightsManagementClientContext) {
    this.client = client;
  }

  /**
   * Gets the list of annotations for a component for given time range
   * @param resourceGroupName The name of the resource group.
   * @param resourceName The name of the Application Insights component resource.
   * @param start The start time to query from for annotations, cannot be older than 90 days from
   * current date.
   * @param end The end time to query for annotations.
   * @param [options] The optional parameters
   * @returns Promise<Models.AnnotationsListResponse>
   */
  list(
    resourceGroupName: string,
    resourceName: string,
    start: string,
    end: string,
    options?: msRest.RequestOptionsBase
  ): Promise<Models.AnnotationsListResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param resourceName The name of the Application Insights component resource.
   * @param start The start time to query from for annotations, cannot be older than 90 days from
   * current date.
   * @param end The end time to query for annotations.
   * @param callback The callback
   */
  list(
    resourceGroupName: string,
    resourceName: string,
    start: string,
    end: string,
    callback: msRest.ServiceCallback<Models.AnnotationsListResult>
  ): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param resourceName The name of the Application Insights component resource.
   * @param start The start time to query from for annotations, cannot be older than 90 days from
   * current date.
   * @param end The end time to query for annotations.
   * @param options The optional parameters
   * @param callback The callback
   */
  list(
    resourceGroupName: string,
    resourceName: string,
    start: string,
    end: string,
    options: msRest.RequestOptionsBase,
    callback: msRest.ServiceCallback<Models.AnnotationsListResult>
  ): void;
  list(
    resourceGroupName: string,
    resourceName: string,
    start: string,
    end: string,
    options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.AnnotationsListResult>,
    callback?: msRest.ServiceCallback<Models.AnnotationsListResult>
  ): Promise<Models.AnnotationsListResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        resourceName,
        start,
        end,
        options,
      },
      listOperationSpec,
      callback
    ) as Promise<Models.AnnotationsListResponse>;
  }

  /**
   * Create an Annotation of an Application Insights component.
   * @param resourceGroupName The name of the resource group.
   * @param resourceName The name of the Application Insights component resource.
   * @param annotationProperties Properties that need to be specified to create an annotation of a
   * Application Insights component.
   * @param [options] The optional parameters
   * @returns Promise<Models.AnnotationsCreateResponse>
   */
  create(
    resourceGroupName: string,
    resourceName: string,
    annotationProperties: Models.Annotation,
    options?: msRest.RequestOptionsBase
  ): Promise<Models.AnnotationsCreateResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param resourceName The name of the Application Insights component resource.
   * @param annotationProperties Properties that need to be specified to create an annotation of a
   * Application Insights component.
   * @param callback The callback
   */
  create(
    resourceGroupName: string,
    resourceName: string,
    annotationProperties: Models.Annotation,
    callback: msRest.ServiceCallback<Models.Annotation[]>
  ): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param resourceName The name of the Application Insights component resource.
   * @param annotationProperties Properties that need to be specified to create an annotation of a
   * Application Insights component.
   * @param options The optional parameters
   * @param callback The callback
   */
  create(
    resourceGroupName: string,
    resourceName: string,
    annotationProperties: Models.Annotation,
    options: msRest.RequestOptionsBase,
    callback: msRest.ServiceCallback<Models.Annotation[]>
  ): void;
  create(
    resourceGroupName: string,
    resourceName: string,
    annotationProperties: Models.Annotation,
    options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.Annotation[]>,
    callback?: msRest.ServiceCallback<Models.Annotation[]>
  ): Promise<Models.AnnotationsCreateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        resourceName,
        annotationProperties,
        options,
      },
      createOperationSpec,
      callback
    ) as Promise<Models.AnnotationsCreateResponse>;
  }

  /**
   * Delete an Annotation of an Application Insights component.
   * @param resourceGroupName The name of the resource group.
   * @param resourceName The name of the Application Insights component resource.
   * @param annotationId The unique annotation ID. This is unique within a Application Insights
   * component.
   * @param [options] The optional parameters
   * @returns Promise<Models.AnnotationsDeleteMethodResponse>
   */
  deleteMethod(
    resourceGroupName: string,
    resourceName: string,
    annotationId: string,
    options?: msRest.RequestOptionsBase
  ): Promise<Models.AnnotationsDeleteMethodResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param resourceName The name of the Application Insights component resource.
   * @param annotationId The unique annotation ID. This is unique within a Application Insights
   * component.
   * @param callback The callback
   */
  deleteMethod(
    resourceGroupName: string,
    resourceName: string,
    annotationId: string,
    callback: msRest.ServiceCallback<any>
  ): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param resourceName The name of the Application Insights component resource.
   * @param annotationId The unique annotation ID. This is unique within a Application Insights
   * component.
   * @param options The optional parameters
   * @param callback The callback
   */
  deleteMethod(
    resourceGroupName: string,
    resourceName: string,
    annotationId: string,
    options: msRest.RequestOptionsBase,
    callback: msRest.ServiceCallback<any>
  ): void;
  deleteMethod(
    resourceGroupName: string,
    resourceName: string,
    annotationId: string,
    options?: msRest.RequestOptionsBase | msRest.ServiceCallback<any>,
    callback?: msRest.ServiceCallback<any>
  ): Promise<Models.AnnotationsDeleteMethodResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        resourceName,
        annotationId,
        options,
      },
      deleteMethodOperationSpec,
      callback
    ) as Promise<Models.AnnotationsDeleteMethodResponse>;
  }

  /**
   * Get the annotation for given id.
   * @param resourceGroupName The name of the resource group.
   * @param resourceName The name of the Application Insights component resource.
   * @param annotationId The unique annotation ID. This is unique within a Application Insights
   * component.
   * @param [options] The optional parameters
   * @returns Promise<Models.AnnotationsGetResponse>
   */
  get(
    resourceGroupName: string,
    resourceName: string,
    annotationId: string,
    options?: msRest.RequestOptionsBase
  ): Promise<Models.AnnotationsGetResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param resourceName The name of the Application Insights component resource.
   * @param annotationId The unique annotation ID. This is unique within a Application Insights
   * component.
   * @param callback The callback
   */
  get(
    resourceGroupName: string,
    resourceName: string,
    annotationId: string,
    callback: msRest.ServiceCallback<Models.Annotation[]>
  ): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param resourceName The name of the Application Insights component resource.
   * @param annotationId The unique annotation ID. This is unique within a Application Insights
   * component.
   * @param options The optional parameters
   * @param callback The callback
   */
  get(
    resourceGroupName: string,
    resourceName: string,
    annotationId: string,
    options: msRest.RequestOptionsBase,
    callback: msRest.ServiceCallback<Models.Annotation[]>
  ): void;
  get(
    resourceGroupName: string,
    resourceName: string,
    annotationId: string,
    options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.Annotation[]>,
    callback?: msRest.ServiceCallback<Models.Annotation[]>
  ): Promise<Models.AnnotationsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        resourceName,
        annotationId,
        options,
      },
      getOperationSpec,
      callback
    ) as Promise<Models.AnnotationsGetResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listOperationSpec: msRest.OperationSpec = {
  httpMethod: 'GET',
  path:
    'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/Annotations',
  urlParameters: [Parameters.resourceGroupName, Parameters.subscriptionId, Parameters.resourceName],
  queryParameters: [Parameters.apiVersion, Parameters.start, Parameters.end],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {
      bodyMapper: Mappers.AnnotationsListResult,
    },
    default: {
      bodyMapper: Mappers.AnnotationError,
    },
  },
  serializer,
};

const createOperationSpec: msRest.OperationSpec = {
  httpMethod: 'PUT',
  path:
    'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/Annotations',
  urlParameters: [Parameters.resourceGroupName, Parameters.subscriptionId, Parameters.resourceName],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  requestBody: {
    parameterPath: 'annotationProperties',
    mapper: {
      ...Mappers.Annotation,
      required: true,
    },
  },
  responses: {
    200: {
      bodyMapper: {
        serializedName: 'parsedResponse',
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'Annotation',
            },
          },
        },
      },
    },
    default: {
      bodyMapper: Mappers.AnnotationError,
    },
  },
  serializer,
};

const deleteMethodOperationSpec: msRest.OperationSpec = {
  httpMethod: 'DELETE',
  path:
    'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/Annotations/{annotationId}',
  urlParameters: [
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.annotationId,
  ],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {
      bodyMapper: {
        serializedName: 'parsedResponse',
        type: {
          name: 'Object',
        },
      },
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  serializer,
};

const getOperationSpec: msRest.OperationSpec = {
  httpMethod: 'GET',
  path:
    'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/Annotations/{annotationId}',
  urlParameters: [
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.annotationId,
  ],
  queryParameters: [Parameters.apiVersion],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {
      bodyMapper: {
        serializedName: 'parsedResponse',
        type: {
          name: 'Sequence',
          element: {
            type: {
              name: 'Composite',
              className: 'Annotation',
            },
          },
        },
      },
    },
    default: {
      bodyMapper: Mappers.AnnotationError,
    },
  },
  serializer,
};
