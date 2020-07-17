/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */
import * as msRest from "@azure/ms-rest-js";
import * as Mappers from "../models/componentQuotaStatusMappers";
import * as Parameters from "../models/parameters";
/** Class representing a ComponentQuotaStatus. */
var ComponentQuotaStatus = /** @class */ (function () {
    /**
     * Create a ComponentQuotaStatus.
     * @param {ApplicationInsightsManagementClientContext} client Reference to the service client.
     */
    function ComponentQuotaStatus(client) {
        this.client = client;
    }
    ComponentQuotaStatus.prototype.get = function (resourceGroupName, resourceName, options, callback) {
        return this.client.sendOperationRequest({
            resourceGroupName: resourceGroupName,
            resourceName: resourceName,
            options: options
        }, getOperationSpec, callback);
    };
    return ComponentQuotaStatus;
}());
export { ComponentQuotaStatus };
// Operation Specifications
var serializer = new msRest.Serializer(Mappers);
var getOperationSpec = {
    httpMethod: "GET",
    path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/quotastatus",
    urlParameters: [
        Parameters.resourceGroupName,
        Parameters.subscriptionId,
        Parameters.resourceName
    ],
    queryParameters: [
        Parameters.apiVersion
    ],
    headerParameters: [
        Parameters.acceptLanguage
    ],
    responses: {
        200: {
            bodyMapper: Mappers.ApplicationInsightsComponentQuotaStatus
        },
        default: {
            bodyMapper: Mappers.CloudError
        }
    },
    serializer: serializer
};
//# sourceMappingURL=componentQuotaStatus.js.map