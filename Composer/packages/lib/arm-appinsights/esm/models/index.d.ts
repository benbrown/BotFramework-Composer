import { BaseResource, CloudError, AzureServiceClientOptions } from '@azure/ms-rest-azure-js';
import * as msRest from '@azure/ms-rest-js';
export { BaseResource, CloudError };
/**
 * @interface
 * An interface representing ErrorResponse.
 * Error reponse indicates Insights service is not able to process the incoming
 * request. The reason is provided in the error message.
 *
 */
export interface ErrorResponse {
  /**
   * @member {string} [code] Error code.
   */
  code?: string;
  /**
   * @member {string} [message] Error message indicating why the operation
   * failed.
   */
  message?: string;
}
/**
 * @interface
 * An interface representing OperationDisplay.
 * The object that represents the operation.
 *
 */
export interface OperationDisplay {
  /**
   * @member {string} [provider] Service provider: Microsoft.Cdn
   */
  provider?: string;
  /**
   * @member {string} [resource] Resource on which the operation is performed:
   * Profile, endpoint, etc.
   */
  resource?: string;
  /**
   * @member {string} [operation] Operation type: Read, write, delete, etc.
   */
  operation?: string;
}
/**
 * @interface
 * An interface representing Operation.
 * CDN REST API operation
 *
 */
export interface Operation {
  /**
   * @member {string} [name] Operation name: {provider}/{resource}/{operation}
   */
  name?: string;
  /**
   * @member {OperationDisplay} [display] The object that represents the
   * operation.
   */
  display?: OperationDisplay;
}
/**
 * @interface
 * An interface representing Annotation.
 * Annotation associated with an application insights resource.
 *
 */
export interface Annotation {
  /**
   * @member {string} [annotationName] Name of annotation
   */
  annotationName?: string;
  /**
   * @member {string} [category] Category of annotation, free form
   */
  category?: string;
  /**
   * @member {Date} [eventTime] Time when event occurred
   */
  eventTime?: Date;
  /**
   * @member {string} [id] Unique Id for annotation
   */
  id?: string;
  /**
   * @member {string} [properties] Serialized JSON object for detailed
   * properties
   */
  properties?: string;
  /**
   * @member {string} [relatedAnnotation] Related parent annotation if any.
   * Default value: 'null' .
   */
  relatedAnnotation?: string;
}
/**
 * @interface
 * An interface representing InnerError.
 * Inner error
 *
 */
export interface InnerError {
  /**
   * @member {string} [diagnosticcontext] Provides correlation for request
   */
  diagnosticcontext?: string;
  /**
   * @member {Date} [time] Request time
   */
  time?: Date;
}
/**
 * @interface
 * An interface representing AnnotationError.
 * Error associated with trying to create annotation with Id that already exist
 *
 */
export interface AnnotationError {
  /**
   * @member {string} [code] Error detail code and explanation
   */
  code?: string;
  /**
   * @member {string} [message] Error message
   */
  message?: string;
  /**
   * @member {InnerError} [innererror]
   */
  innererror?: InnerError;
}
/**
 * @interface
 * An interface representing APIKeyRequest.
 * An Application Insights component API Key createion request definition.
 *
 */
export interface APIKeyRequest {
  /**
   * @member {string} [name] The name of the API Key.
   */
  name?: string;
  /**
   * @member {string[]} [linkedReadProperties] The read access rights of this
   * API Key.
   */
  linkedReadProperties?: string[];
  /**
   * @member {string[]} [linkedWriteProperties] The write access rights of this
   * API Key.
   */
  linkedWriteProperties?: string[];
}
/**
 * @interface
 * An interface representing ApplicationInsightsComponentAPIKey.
 * Properties that define an API key of an Application Insights Component.
 *
 */
export interface ApplicationInsightsComponentAPIKey {
  /**
   * @member {string} [id] The unique ID of the API key inside an Applciation
   * Insights component. It is auto generated when the API key is created.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly id?: string;
  /**
   * @member {string} [apiKey] The API key value. It will be only return once
   * when the API Key was created.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly apiKey?: string;
  /**
   * @member {string} [createdDate] The create date of this API key.
   */
  createdDate?: string;
  /**
   * @member {string} [name] The name of the API key.
   */
  name?: string;
  /**
   * @member {string[]} [linkedReadProperties] The read access rights of this
   * API Key.
   */
  linkedReadProperties?: string[];
  /**
   * @member {string[]} [linkedWriteProperties] The write access rights of this
   * API Key.
   */
  linkedWriteProperties?: string[];
}
/**
 * @interface
 * An interface representing ApplicationInsightsComponentExportRequest.
 * An Application Insights component Continuous Export configuration request
 * definition.
 *
 */
export interface ApplicationInsightsComponentExportRequest {
  /**
   * @member {string} [recordTypes] The document types to be exported, as comma
   * separated values. Allowed values include 'Requests', 'Event',
   * 'Exceptions', 'Metrics', 'PageViews', 'PageViewPerformance', 'Rdd',
   * 'PerformanceCounters', 'Availability', 'Messages'.
   */
  recordTypes?: string;
  /**
   * @member {string} [destinationType] The Continuous Export destination type.
   * This has to be 'Blob'.
   */
  destinationType?: string;
  /**
   * @member {string} [destinationAddress] The SAS URL for the destination
   * storage container. It must grant write permission.
   */
  destinationAddress?: string;
  /**
   * @member {string} [isEnabled] Set to 'true' to create a Continuous Export
   * configuration as enabled, otherwise set it to 'false'.
   */
  isEnabled?: string;
  /**
   * @member {string} [notificationQueueEnabled] Deprecated
   */
  notificationQueueEnabled?: string;
  /**
   * @member {string} [notificationQueueUri] Deprecated
   */
  notificationQueueUri?: string;
  /**
   * @member {string} [destinationStorageSubscriptionId] The subscription ID of
   * the destination storage container.
   */
  destinationStorageSubscriptionId?: string;
  /**
   * @member {string} [destinationStorageLocationId] The location ID of the
   * destination storage container.
   */
  destinationStorageLocationId?: string;
  /**
   * @member {string} [destinationAccountId] The name of destination storage
   * account.
   */
  destinationAccountId?: string;
}
/**
 * @interface
 * An interface representing ApplicationInsightsComponentExportConfiguration.
 * Properties that define a Continuous Export configuration.
 *
 */
export interface ApplicationInsightsComponentExportConfiguration {
  /**
   * @member {string} [exportId] The unique ID of the export configuration
   * inside an Applciation Insights component. It is auto generated when the
   * Continuous Export configuration is created.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly exportId?: string;
  /**
   * @member {string} [instrumentationKey] The instrumentation key of the
   * Application Insights component.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly instrumentationKey?: string;
  /**
   * @member {string} [recordTypes] This comma separated list of document types
   * that will be exported. The possible values include 'Requests', 'Event',
   * 'Exceptions', 'Metrics', 'PageViews', 'PageViewPerformance', 'Rdd',
   * 'PerformanceCounters', 'Availability', 'Messages'.
   */
  recordTypes?: string;
  /**
   * @member {string} [applicationName] The name of the Application Insights
   * component.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly applicationName?: string;
  /**
   * @member {string} [subscriptionId] The subscription of the Application
   * Insights component.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly subscriptionId?: string;
  /**
   * @member {string} [resourceGroup] The resource group of the Application
   * Insights component.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly resourceGroup?: string;
  /**
   * @member {string} [destinationStorageSubscriptionId] The destination
   * storage account subscription ID.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly destinationStorageSubscriptionId?: string;
  /**
   * @member {string} [destinationStorageLocationId] The destination account
   * location ID.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly destinationStorageLocationId?: string;
  /**
   * @member {string} [destinationAccountId] The name of destination account.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly destinationAccountId?: string;
  /**
   * @member {string} [destinationType] The destination type.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly destinationType?: string;
  /**
   * @member {string} [isUserEnabled] This will be 'true' if the Continuous
   * Export configuration is enabled, otherwise it will be 'false'.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly isUserEnabled?: string;
  /**
   * @member {string} [lastUserUpdate] Last time the Continuous Export
   * configuration was updated.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly lastUserUpdate?: string;
  /**
   * @member {string} [notificationQueueEnabled] Deprecated
   */
  notificationQueueEnabled?: string;
  /**
   * @member {string} [exportStatus] This indicates current Continuous Export
   * configuration status. The possible values are 'Preparing', 'Success',
   * 'Failure'.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly exportStatus?: string;
  /**
   * @member {string} [lastSuccessTime] The last time data was successfully
   * delivered to the destination storage container for this Continuous Export
   * configuration.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly lastSuccessTime?: string;
  /**
   * @member {string} [lastGapTime] The last time the Continuous Export
   * configuration started failing.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly lastGapTime?: string;
  /**
   * @member {string} [permanentErrorReason] This is the reason the Continuous
   * Export configuration started failing. It can be 'AzureStorageNotFound' or
   * 'AzureStorageAccessDenied'.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly permanentErrorReason?: string;
  /**
   * @member {string} [storageName] The name of the destination storage
   * account.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly storageName?: string;
  /**
   * @member {string} [containerName] The name of the destination storage
   * container.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly containerName?: string;
}
/**
 * @interface
 * An interface representing ApplicationInsightsComponentDataVolumeCap.
 * An Application Insights component daily data volumne cap
 *
 */
export interface ApplicationInsightsComponentDataVolumeCap {
  /**
   * @member {number} [cap] Daily data volume cap in GB.
   */
  cap?: number;
  /**
   * @member {number} [resetTime] Daily data volume cap UTC reset hour.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly resetTime?: number;
  /**
   * @member {number} [warningThreshold] Reserved, not used for now.
   */
  warningThreshold?: number;
  /**
   * @member {boolean} [stopSendNotificationWhenHitThreshold] Reserved, not
   * used for now.
   */
  stopSendNotificationWhenHitThreshold?: boolean;
  /**
   * @member {boolean} [stopSendNotificationWhenHitCap] Do not send a
   * notification email when the daily data volume cap is met.
   */
  stopSendNotificationWhenHitCap?: boolean;
  /**
   * @member {number} [maxHistoryCap] Maximum daily data volume cap that the
   * user can set for this component.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly maxHistoryCap?: number;
}
/**
 * @interface
 * An interface representing ApplicationInsightsComponentBillingFeatures.
 * An Application Insights component billing features
 *
 */
export interface ApplicationInsightsComponentBillingFeatures {
  /**
   * @member {ApplicationInsightsComponentDataVolumeCap} [dataVolumeCap] An
   * Application Insights component daily data volumne cap
   */
  dataVolumeCap?: ApplicationInsightsComponentDataVolumeCap;
  /**
   * @member {string[]} [currentBillingFeatures] Current enabled pricing plan.
   * When the component is in the Enterprise plan, this will list both 'Basic'
   * and 'Application Insights Enterprise'.
   */
  currentBillingFeatures?: string[];
}
/**
 * @interface
 * An interface representing ApplicationInsightsComponentQuotaStatus.
 * An Application Insights component daily data volume cap status
 *
 */
export interface ApplicationInsightsComponentQuotaStatus {
  /**
   * @member {string} [appId] The Application ID for the Application Insights
   * component.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly appId?: string;
  /**
   * @member {boolean} [shouldBeThrottled] The daily data volume cap is met,
   * and data ingestion will be stopped.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly shouldBeThrottled?: boolean;
  /**
   * @member {string} [expirationTime] Date and time when the daily data volume
   * cap will be reset, and data ingestion will resume.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly expirationTime?: string;
}
/**
 * @interface
 * An interface representing ApplicationInsightsComponentFeatureCapabilities.
 * An Application Insights component feature capabilities
 *
 */
export interface ApplicationInsightsComponentFeatureCapabilities {
  /**
   * @member {boolean} [supportExportData] Whether allow to use continuous
   * export feature.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly supportExportData?: boolean;
  /**
   * @member {string} [burstThrottlePolicy] Reserved, not used now.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly burstThrottlePolicy?: string;
  /**
   * @member {string} [metadataClass] Reserved, not used now.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly metadataClass?: string;
  /**
   * @member {boolean} [liveStreamMetrics] Reserved, not used now.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly liveStreamMetrics?: boolean;
  /**
   * @member {boolean} [applicationMap] Reserved, not used now.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly applicationMap?: boolean;
  /**
   * @member {boolean} [workItemIntegration] Whether allow to use work item
   * integration feature.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly workItemIntegration?: boolean;
  /**
   * @member {boolean} [powerBIIntegration] Reserved, not used now.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly powerBIIntegration?: boolean;
  /**
   * @member {boolean} [openSchema] Reserved, not used now.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly openSchema?: boolean;
  /**
   * @member {boolean} [proactiveDetection] Reserved, not used now.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly proactiveDetection?: boolean;
  /**
   * @member {boolean} [analyticsIntegration] Reserved, not used now.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly analyticsIntegration?: boolean;
  /**
   * @member {boolean} [multipleStepWebTest] Whether allow to use multiple
   * steps web test feature.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly multipleStepWebTest?: boolean;
  /**
   * @member {string} [apiAccessLevel] Reserved, not used now.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly apiAccessLevel?: string;
  /**
   * @member {string} [trackingType] The applciation insights component used
   * tracking type.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly trackingType?: string;
  /**
   * @member {number} [dailyCap] Daily data volume cap in GB.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly dailyCap?: number;
  /**
   * @member {number} [dailyCapResetTime] Daily data volume cap UTC reset hour.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly dailyCapResetTime?: number;
  /**
   * @member {number} [throttleRate] Reserved, not used now.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly throttleRate?: number;
}
/**
 * @interface
 * An interface representing ApplicationInsightsComponentFeatureCapability.
 * An Application Insights component feature capability
 *
 */
export interface ApplicationInsightsComponentFeatureCapability {
  /**
   * @member {string} [name] The name of the capability.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly name?: string;
  /**
   * @member {string} [description] The description of the capability.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly description?: string;
  /**
   * @member {string} [value] The vaule of the capability.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly value?: string;
  /**
   * @member {string} [unit] The unit of the capability.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly unit?: string;
  /**
   * @member {string} [meterId] The meter used for the capability.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly meterId?: string;
  /**
   * @member {string} [meterRateFrequency] The meter rate of the meter.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly meterRateFrequency?: string;
}
/**
 * @interface
 * An interface representing ApplicationInsightsComponentFeature.
 * An Application Insights component daily data volume cap status
 *
 */
export interface ApplicationInsightsComponentFeature {
  /**
   * @member {string} [featureName] The pricing feature name.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly featureName?: string;
  /**
   * @member {string} [meterId] The meter id used for the feature.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly meterId?: string;
  /**
   * @member {string} [meterRateFrequency] The meter meter rate for the
   * feature's meter.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly meterRateFrequency?: string;
  /**
   * @member {string} [resouceId] Reserved, not used now.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly resouceId?: string;
  /**
   * @member {boolean} [isHidden] Reserved, not used now.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly isHidden?: boolean;
  /**
   * @member {ApplicationInsightsComponentFeatureCapability[]} [capabilities] A
   * list of Application Insigths component feature capability.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly capabilities?: ApplicationInsightsComponentFeatureCapability[];
  /**
   * @member {string} [title] Desplay name of the feature.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly title?: string;
  /**
   * @member {boolean} [isMainFeature] Whether can apply addon feature on to
   * it.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly isMainFeature?: boolean;
  /**
   * @member {string} [supportedAddonFeatures] The add on features on main
   * feature.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly supportedAddonFeatures?: string;
}
/**
 * @interface
 * An interface representing ApplicationInsightsComponentAvailableFeatures.
 * An Application Insights component available features.
 *
 */
export interface ApplicationInsightsComponentAvailableFeatures {
  /**
   * @member {ApplicationInsightsComponentFeature[]} [result] A list of
   * Application Insigths component feature.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly result?: ApplicationInsightsComponentFeature[];
}
/**
 * @interface
 * An interface representing ApplicationInsightsComponentProactiveDetectionConfigurationRuleDefinitions.
 * Static definitions of the ProactiveDetection configuration rule (same values
 * for all components).
 *
 */
export interface ApplicationInsightsComponentProactiveDetectionConfigurationRuleDefinitions {
  /**
   * @member {string} [name] The rule name
   */
  name?: string;
  /**
   * @member {string} [displayName] The rule name as it is displayed in UI
   */
  displayName?: string;
  /**
   * @member {string} [description] The rule description
   */
  description?: string;
  /**
   * @member {string} [helpUrl] URL which displays aditional info about the
   * proactive detection rule
   */
  helpUrl?: string;
  /**
   * @member {boolean} [isHidden] A flag indicating whether the rule is hidden
   * (from the UI)
   */
  isHidden?: boolean;
  /**
   * @member {boolean} [isEnabledByDefault] A flag indicating whether the rule
   * is enabled by default
   */
  isEnabledByDefault?: boolean;
  /**
   * @member {boolean} [isInPreview] A flag indicating whether the rule is in
   * preview
   */
  isInPreview?: boolean;
  /**
   * @member {boolean} [supportsEmailNotifications] A flag indicating whether
   * email notifications are supported for detections for this rule
   */
  supportsEmailNotifications?: boolean;
}
/**
 * @interface
 * An interface representing ApplicationInsightsComponentProactiveDetectionConfiguration.
 * Properties that define a ProactiveDetection configuration.
 *
 * @extends BaseResource
 */
export interface ApplicationInsightsComponentProactiveDetectionConfiguration extends BaseResource {
  /**
   * @member {string} [name] The rule name
   */
  name?: string;
  /**
   * @member {boolean} [enabled] A flag that indicates whether this rule is
   * enabled by the user
   */
  enabled?: boolean;
  /**
   * @member {boolean} [sendEmailsToSubscriptionOwners] A flag that indicated
   * whether notifications on this rule should be sent to subscription owners
   */
  sendEmailsToSubscriptionOwners?: boolean;
  /**
   * @member {string[]} [customEmails] Custom email addresses for this rule
   * notifications
   */
  customEmails?: string[];
  /**
   * @member {string} [lastUpdatedTime] The last time this rule was updated
   */
  lastUpdatedTime?: string;
  /**
   * @member
   * {ApplicationInsightsComponentProactiveDetectionConfigurationRuleDefinitions}
   * [ruleDefinitions] Static definitions of the ProactiveDetection
   * configuration rule (same values for all components).
   */
  ruleDefinitions?: ApplicationInsightsComponentProactiveDetectionConfigurationRuleDefinitions;
}
/**
 * @interface
 * An interface representing ComponentsResource.
 * An azure resource object
 *
 * @extends BaseResource
 */
export interface ComponentsResource extends BaseResource {
  /**
   * @member {string} [id] Azure resource Id
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly id?: string;
  /**
   * @member {string} [name] Azure resource name
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly name?: string;
  /**
   * @member {string} [type] Azure resource type
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly type?: string;
  /**
   * @member {string} location Resource location
   */
  location: string;
  /**
   * @member {{ [propertyName: string]: string }} [tags] Resource tags
   */
  tags?: {
    [propertyName: string]: string;
  };
}
/**
 * @interface
 * An interface representing TagsResource.
 * A container holding only the Tags for a resource, allowing the user to
 * update the tags on a WebTest instance.
 *
 */
export interface TagsResource {
  /**
   * @member {{ [propertyName: string]: string }} [tags] Resource tags
   */
  tags?: {
    [propertyName: string]: string;
  };
}
/**
 * @interface
 * An interface representing ApplicationInsightsComponent.
 * An Application Insights component definition.
 *
 * @extends ComponentsResource
 */
export interface ApplicationInsightsComponent extends ComponentsResource {
  /**
   * @member {string} kind The kind of application that this component refers
   * to, used to customize UI. This value is a freeform string, values should
   * typically be one of the following: web, ios, other, store, java, phone.
   */
  kind: string;
  /**
   * @member {string} [applicationId] The unique ID of your application. This
   * field mirrors the 'Name' field and cannot be changed.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly applicationId?: string;
  /**
   * @member {string} [appId] Application Insights Unique ID for your
   * Application.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly appId?: string;
  /**
   * @member {ApplicationType} applicationType Type of application being
   * monitored. Possible values include: 'web', 'other'. Default value: 'web' .
   */
  applicationType: ApplicationType;
  /**
   * @member {FlowType} [flowType] Used by the Application Insights system to
   * determine what kind of flow this component was created by. This is to be
   * set to 'Bluefield' when creating/updating a component via the REST API.
   * Possible values include: 'Bluefield'. Default value: 'Bluefield' .
   */
  flowType?: FlowType;
  /**
   * @member {RequestSource} [requestSource] Describes what tool created this
   * Application Insights component. Customers using this API should set this
   * to the default 'rest'. Possible values include: 'rest'. Default value:
   * 'rest' .
   */
  requestSource?: RequestSource;
  /**
   * @member {string} [instrumentationKey] Application Insights Instrumentation
   * key. A read-only value that applications can use to identify the
   * destination for all telemetry sent to Azure Application Insights. This
   * value will be supplied upon construction of each new Application Insights
   * component.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly instrumentationKey?: string;
  /**
   * @member {Date} [creationDate] Creation Date for the Application Insights
   * component, in ISO 8601 format.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly creationDate?: Date;
  /**
   * @member {string} [tenantId] Azure Tenant Id.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly tenantId?: string;
  /**
   * @member {string} [hockeyAppId] The unique application ID created when a
   * new application is added to HockeyApp, used for communications with
   * HockeyApp.
   */
  hockeyAppId?: string;
  /**
   * @member {string} [hockeyAppToken] Token used to authenticate
   * communications with between Application Insights and HockeyApp.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly hockeyAppToken?: string;
  /**
   * @member {string} [provisioningState] Current state of this component:
   * whether or not is has been provisioned within the resource group it is
   * defined. Users cannot change this value but are able to read from it.
   * Values will include Succeeded, Deploying, Canceled, and Failed.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly provisioningState?: string;
  /**
   * @member {number} [samplingPercentage] Percentage of the data produced by
   * the application being monitored that is being sampled for Application
   * Insights telemetry.
   */
  samplingPercentage?: number;
}
/**
 * @interface
 * An interface representing ComponentPurgeBodyFilters.
 * User-defined filters to return data which will be purged from the table.
 *
 */
export interface ComponentPurgeBodyFilters {
  /**
   * @member {string} [column] The column of the table over which the given
   * query should run
   */
  column?: string;
  /**
   * @member {string} [operator] A query operator to evaluate over the provided
   * column and value(s).
   */
  operator?: string;
  /**
   * @member {any} [value] the value for the operator to function over. This
   * can be a number (e.g., > 100), a string (timestamp >= '2017-09-01') or
   * array of values.
   */
  value?: any;
  /**
   * @member {string} [key] When filtering over custom dimensions, this key
   * will be used as the name of the custom dimension.
   */
  key?: string;
}
/**
 * @interface
 * An interface representing ComponentPurgeBody.
 * Describes the body of a purge request for an App Insights component
 *
 */
export interface ComponentPurgeBody {
  /**
   * @member {string} table Table from which to purge data.
   */
  table: string;
  /**
   * @member {ComponentPurgeBodyFilters[]} filters The set of columns and
   * filters (queries) to run over them to purge the resulting data.
   */
  filters: ComponentPurgeBodyFilters[];
}
/**
 * @interface
 * An interface representing ComponentPurgeResponse.
 * Response containing operationId for a specific purge action.
 *
 */
export interface ComponentPurgeResponse {
  /**
   * @member {string} operationId Id to use when querying for status for a
   * particular purge operation.
   */
  operationId: string;
}
/**
 * @interface
 * An interface representing ComponentPurgeStatusResponse.
 * Response containing status for a specific purge operation.
 *
 */
export interface ComponentPurgeStatusResponse {
  /**
   * @member {PurgeState} status Status of the operation represented by the
   * requested Id. Possible values include: 'pending', 'completed'
   */
  status: PurgeState;
}
/**
 * @interface
 * An interface representing WorkItemConfiguration.
 * Work item configuration associated with an application insights resource.
 *
 */
export interface WorkItemConfiguration {
  /**
   * @member {string} [connectorId] Connector identifier where work item is
   * created
   */
  connectorId?: string;
  /**
   * @member {string} [configDisplayName] Configuration friendly name
   */
  configDisplayName?: string;
  /**
   * @member {boolean} [isDefault] Boolean value indicating whether
   * configuration is default
   */
  isDefault?: boolean;
  /**
   * @member {string} [id] Unique Id for work item
   */
  id?: string;
  /**
   * @member {string} [configProperties] Serialized JSON object for detailed
   * properties
   */
  configProperties?: string;
}
/**
 * @interface
 * An interface representing WorkItemCreateConfiguration.
 * Work item configuration creation payload
 *
 */
export interface WorkItemCreateConfiguration {
  /**
   * @member {string} [connectorId] Unique connector id
   */
  connectorId?: string;
  /**
   * @member {string} [connectorDataConfiguration] Serialized JSON object for
   * detaile d properties
   */
  connectorDataConfiguration?: string;
  /**
   * @member {boolean} [validateOnly] Boolean indicating validate only
   */
  validateOnly?: boolean;
  /**
   * @member {string} [workItemProperties] Custom work item properties
   */
  workItemProperties?: string;
}
/**
 * @interface
 * An interface representing WorkItemConfigurationError.
 * Error associated with trying to get work item configuration or
 * configurations
 *
 */
export interface WorkItemConfigurationError {
  /**
   * @member {string} [code] Error detail code and explanation
   */
  code?: string;
  /**
   * @member {string} [message] Error message
   */
  message?: string;
  /**
   * @member {InnerError} [innererror]
   */
  innererror?: InnerError;
}
/**
 * @interface
 * An interface representing ApplicationInsightsComponentFavorite.
 * Properties that define a favorite that is associated to an Application
 * Insights component.
 *
 */
export interface ApplicationInsightsComponentFavorite {
  /**
   * @member {string} [name] The user-defined name of the favorite.
   */
  name?: string;
  /**
   * @member {string} [config] Configuration of this particular favorite, which
   * are driven by the Azure portal UX. Configuration data is a string
   * containing valid JSON
   */
  config?: string;
  /**
   * @member {string} [version] This instance's version of the data model. This
   * can change as new features are added that can be marked favorite. Current
   * examples include MetricsExplorer (ME) and Search.
   */
  version?: string;
  /**
   * @member {string} [favoriteId] Internally assigned unique id of the
   * favorite definition.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly favoriteId?: string;
  /**
   * @member {FavoriteType} [favoriteType] Enum indicating if this favorite
   * definition is owned by a specific user or is shared between all users with
   * access to the Application Insights component. Possible values include:
   * 'shared', 'user'
   */
  favoriteType?: FavoriteType;
  /**
   * @member {string} [sourceType] The source of the favorite definition.
   */
  sourceType?: string;
  /**
   * @member {string} [timeModified] Date and time in UTC of the last
   * modification that was made to this favorite definition.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly timeModified?: string;
  /**
   * @member {string[]} [tags] A list of 0 or more tags that are associated
   * with this favorite definition
   */
  tags?: string[];
  /**
   * @member {string} [category] Favorite category, as defined by the user at
   * creation time.
   */
  category?: string;
  /**
   * @member {boolean} [isGeneratedFromTemplate] Flag denoting wether or not
   * this favorite was generated from a template.
   */
  isGeneratedFromTemplate?: boolean;
  /**
   * @member {string} [userId] Unique user id of the specific user that owns
   * this favorite.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly userId?: string;
}
/**
 * @interface
 * An interface representing ApplicationInsightsComponentWebTestLocation.
 * Properties that define a web test location available to an Application
 * Insights Component.
 *
 */
export interface ApplicationInsightsComponentWebTestLocation {
  /**
   * @member {string} [displayName] The display name of the web test location.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly displayName?: string;
  /**
   * @member {string} [tag] Internally defined geographic location tag.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly tag?: string;
}
/**
 * @interface
 * An interface representing WebtestsResource.
 * An azure resource object
 *
 * @extends BaseResource
 */
export interface WebtestsResource extends BaseResource {
  /**
   * @member {string} [id] Azure resource Id
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly id?: string;
  /**
   * @member {string} [name] Azure resource name
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly name?: string;
  /**
   * @member {string} [type] Azure resource type
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly type?: string;
  /**
   * @member {string} location Resource location
   */
  location: string;
  /**
   * @member {{ [propertyName: string]: string }} [tags] Resource tags
   */
  tags?: {
    [propertyName: string]: string;
  };
}
/**
 * @interface
 * An interface representing WebTestGeolocation.
 * Geo-physical location to run a web test from. You must specify one or more
 * locations for the test to run from.
 *
 */
export interface WebTestGeolocation {
  /**
   * @member {string} [location] Location ID for the webtest to run from.
   */
  location?: string;
}
/**
 * @interface
 * An interface representing WebTestPropertiesConfiguration.
 * An XML configuration specification for a WebTest.
 *
 */
export interface WebTestPropertiesConfiguration {
  /**
   * @member {string} [webTest] The XML specification of a WebTest to run
   * against an application.
   */
  webTest?: string;
}
/**
 * @interface
 * An interface representing WebTest.
 * An Application Insights web test definition.
 *
 * @extends WebtestsResource
 */
export interface WebTest extends WebtestsResource {
  /**
   * @member {WebTestKind} [kind] The kind of web test that this web test
   * watches. Choices are ping and multistep. Possible values include: 'ping',
   * 'multistep'. Default value: 'ping' .
   */
  kind?: WebTestKind;
  /**
   * @member {string} syntheticMonitorId Unique ID of this WebTest. This is
   * typically the same value as the Name field.
   */
  syntheticMonitorId: string;
  /**
   * @member {string} webTestName User defined name if this WebTest.
   */
  webTestName: string;
  /**
   * @member {string} [description] Purpose/user defined descriptive test for
   * this WebTest.
   */
  description?: string;
  /**
   * @member {boolean} [enabled] Is the test actively being monitored.
   */
  enabled?: boolean;
  /**
   * @member {number} [frequency] Interval in seconds between test runs for
   * this WebTest. Default value is 300. Default value: 300 .
   */
  frequency?: number;
  /**
   * @member {number} [timeout] Seconds until this WebTest will timeout and
   * fail. Default value is 30. Default value: 30 .
   */
  timeout?: number;
  /**
   * @member {WebTestKind} webTestKind The kind of web test this is, valid
   * choices are ping and multistep. Possible values include: 'ping',
   * 'multistep'. Default value: 'ping' .
   */
  webTestKind: WebTestKind;
  /**
   * @member {boolean} [retryEnabled] Allow for retries should this WebTest
   * fail.
   */
  retryEnabled?: boolean;
  /**
   * @member {WebTestGeolocation[]} locations A list of where to physically run
   * the tests from to give global coverage for accessibility of your
   * application.
   */
  locations: WebTestGeolocation[];
  /**
   * @member {WebTestPropertiesConfiguration} [configuration] An XML
   * configuration specification for a WebTest.
   */
  configuration?: WebTestPropertiesConfiguration;
  /**
   * @member {string} [provisioningState] Current state of this component,
   * whether or not is has been provisioned within the resource group it is
   * defined. Users cannot change this value but are able to read from it.
   * Values will include Succeeded, Deploying, Canceled, and Failed.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly provisioningState?: string;
}
/**
 * @interface
 * An interface representing ApplicationInsightsComponentAnalyticsItemProperties.
 * A set of properties that can be defined in the context of a specific item
 * type. Each type may have its own properties.
 *
 */
export interface ApplicationInsightsComponentAnalyticsItemProperties {
  /**
   * @member {string} [functionAlias] A function alias, used when the type of
   * the item is Function
   */
  functionAlias?: string;
}
/**
 * @interface
 * An interface representing ApplicationInsightsComponentAnalyticsItem.
 * Properties that define an Analytics item that is associated to an
 * Application Insights component.
 *
 */
export interface ApplicationInsightsComponentAnalyticsItem {
  /**
   * @member {string} [id] Internally assigned unique id of the item
   * definition.
   */
  id?: string;
  /**
   * @member {string} [name] The user-defined name of the item.
   */
  name?: string;
  /**
   * @member {string} [content] The content of this item
   */
  content?: string;
  /**
   * @member {string} [version] This instance's version of the data model. This
   * can change as new features are added.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly version?: string;
  /**
   * @member {ItemScope} [scope] Enum indicating if this item definition is
   * owned by a specific user or is shared between all users with access to the
   * Application Insights component. Possible values include: 'shared', 'user'
   */
  scope?: ItemScope;
  /**
   * @member {ItemType} [type] Enum indicating the type of the Analytics item.
   * Possible values include: 'query', 'function', 'folder', 'recent'
   */
  type?: ItemType;
  /**
   * @member {string} [timeCreated] Date and time in UTC when this item was
   * created.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly timeCreated?: string;
  /**
   * @member {string} [timeModified] Date and time in UTC of the last
   * modification that was made to this item.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly timeModified?: string;
  /**
   * @member {ApplicationInsightsComponentAnalyticsItemProperties} [properties]
   */
  properties?: ApplicationInsightsComponentAnalyticsItemProperties;
}
/**
 * @interface
 * An interface representing WorkbookResource.
 * An azure resource object
 *
 * @extends BaseResource
 */
export interface WorkbookResource extends BaseResource {
  /**
   * @member {string} [id] Azure resource Id
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly id?: string;
  /**
   * @member {string} [name] Azure resource name
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly name?: string;
  /**
   * @member {string} [type] Azure resource type
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly type?: string;
  /**
   * @member {string} [location] Resource location
   */
  location?: string;
  /**
   * @member {{ [propertyName: string]: string }} [tags] Resource tags
   */
  tags?: {
    [propertyName: string]: string;
  };
}
/**
 * @interface
 * An interface representing Workbook.
 * An Application Insights workbook definition.
 *
 * @extends WorkbookResource
 */
export interface Workbook extends WorkbookResource {
  /**
   * @member {SharedTypeKind} [kind] The kind of workbook. Choices are user and
   * shared. Possible values include: 'user', 'shared'
   */
  kind?: SharedTypeKind;
  /**
   * @member {string} workbookName The user-defined name of the workbook.
   */
  workbookName: string;
  /**
   * @member {string} serializedData Configuration of this particular workbook.
   * Configuration data is a string containing valid JSON
   */
  serializedData: string;
  /**
   * @member {string} [version] This instance's version of the data model. This
   * can change as new features are added that can be marked workbook.
   */
  version?: string;
  /**
   * @member {string} workbookId Internally assigned unique id of the workbook
   * definition.
   */
  workbookId: string;
  /**
   * @member {SharedTypeKind} sharedTypeKind Enum indicating if this workbook
   * definition is owned by a specific user or is shared between all users with
   * access to the Application Insights component. Possible values include:
   * 'user', 'shared'. Default value: 'shared' .
   */
  sharedTypeKind: SharedTypeKind;
  /**
   * @member {string} [timeModified] Date and time in UTC of the last
   * modification that was made to this workbook definition.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly timeModified?: string;
  /**
   * @member {string} category Workbook category, as defined by the user at
   * creation time.
   */
  category: string;
  /**
   * @member {string[]} [workbookTags] A list of 0 or more tags that are
   * associated with this workbook definition
   */
  workbookTags?: string[];
  /**
   * @member {string} userId Unique user id of the specific user that owns this
   * workbook.
   */
  userId: string;
  /**
   * @member {string} [sourceResourceId] Optional resourceId for a source
   * resource.
   */
  sourceResourceId?: string;
}
/**
 * @interface
 * An interface representing LinkProperties.
 * Contains a sourceId and workbook resource id to link two resources.
 *
 */
export interface LinkProperties {
  /**
   * @member {string} [sourceId] The source Azure resource id
   */
  sourceId?: string;
  /**
   * @member {string} [targetId] The workbook Azure resource id
   */
  targetId?: string;
  /**
   * @member {string} [category] The category of workbook
   */
  category?: string;
}
/**
 * @interface
 * An interface representing ErrorFieldContract.
 * Error Field contract.
 *
 */
export interface ErrorFieldContract {
  /**
   * @member {string} [code] Property level error code.
   */
  code?: string;
  /**
   * @member {string} [message] Human-readable representation of property-level
   * error.
   */
  message?: string;
  /**
   * @member {string} [target] Property name.
   */
  target?: string;
}
/**
 * @interface
 * An interface representing WorkbookError.
 * Error message body that will indicate why the operation failed.
 *
 */
export interface WorkbookError {
  /**
   * @member {string} [code] Service-defined error code. This code serves as a
   * sub-status for the HTTP error code specified in the response.
   */
  code?: string;
  /**
   * @member {string} [message] Human-readable representation of the error.
   */
  message?: string;
  /**
   * @member {ErrorFieldContract[]} [details] The list of invalid fields send
   * in request, in case of validation error.
   */
  details?: ErrorFieldContract[];
}
/**
 * @interface
 * An interface representing FavoritesListOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface FavoritesListOptionalParams extends msRest.RequestOptionsBase {
  /**
   * @member {FavoriteType} [favoriteType] The type of favorite. Value can be
   * either shared or user. Possible values include: 'shared', 'user'. Default
   * value: 'shared' .
   */
  favoriteType?: FavoriteType;
  /**
   * @member {FavoriteSourceType} [sourceType] Source type of favorite to
   * return. When left out, the source type defaults to 'other' (not present in
   * this enum). Possible values include: 'retention', 'notebook', 'sessions',
   * 'events', 'userflows', 'funnel', 'impact', 'segmentation'
   */
  sourceType?: FavoriteSourceType;
  /**
   * @member {boolean} [canFetchContent] Flag indicating whether or not to
   * return the full content for each applicable favorite. If false, only
   * return summary content for favorites.
   */
  canFetchContent?: boolean;
  /**
   * @member {string[]} [tags] Tags that must be present on each favorite
   * returned.
   */
  tags?: string[];
}
/**
 * @interface
 * An interface representing AnalyticsItemsListOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface AnalyticsItemsListOptionalParams extends msRest.RequestOptionsBase {
  /**
   * @member {ItemScope} [scope] Enum indicating if this item definition is
   * owned by a specific user or is shared between all users with access to the
   * Application Insights component. Possible values include: 'shared', 'user'.
   * Default value: 'shared' .
   */
  scope?: ItemScope;
  /**
   * @member {ItemTypeParameter} [type] Enum indicating the type of the
   * Analytics item. Possible values include: 'none', 'query', 'function',
   * 'folder', 'recent'. Default value: 'none' .
   */
  type?: ItemTypeParameter;
  /**
   * @member {boolean} [includeContent] Flag indicating whether or not to
   * return the content of each applicable item. If false, only return the item
   * information.
   */
  includeContent?: boolean;
}
/**
 * @interface
 * An interface representing AnalyticsItemsGetOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface AnalyticsItemsGetOptionalParams extends msRest.RequestOptionsBase {
  /**
   * @member {string} [id] The Id of a specific item defined in the Application
   * Insights component
   */
  id?: string;
  /**
   * @member {string} [name] The name of a specific item defined in the
   * Application Insights component
   */
  name?: string;
}
/**
 * @interface
 * An interface representing AnalyticsItemsPutOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface AnalyticsItemsPutOptionalParams extends msRest.RequestOptionsBase {
  /**
   * @member {boolean} [overrideItem] Flag indicating whether or not to force
   * save an item. This allows overriding an item if it already exists.
   */
  overrideItem?: boolean;
}
/**
 * @interface
 * An interface representing AnalyticsItemsDeleteMethodOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface AnalyticsItemsDeleteMethodOptionalParams extends msRest.RequestOptionsBase {
  /**
   * @member {string} [id] The Id of a specific item defined in the Application
   * Insights component
   */
  id?: string;
  /**
   * @member {string} [name] The name of a specific item defined in the
   * Application Insights component
   */
  name?: string;
}
/**
 * @interface
 * An interface representing WorkbooksListByResourceGroupOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface WorkbooksListByResourceGroupOptionalParams extends msRest.RequestOptionsBase {
  /**
   * @member {string[]} [tags] Tags presents on each workbook returned.
   */
  tags?: string[];
  /**
   * @member {boolean} [canFetchContent] Flag indicating whether or not to
   * return the full content for each applicable workbook. If false, only
   * return summary content for workbooks.
   */
  canFetchContent?: boolean;
}
/**
 * @interface
 * An interface representing ApplicationInsightsManagementClientOptions.
 * @extends AzureServiceClientOptions
 */
export interface ApplicationInsightsManagementClientOptions extends AzureServiceClientOptions {
  /**
   * @member {string} [baseUri]
   */
  baseUri?: string;
}
/**
 * @interface
 * An interface representing the OperationListResult.
 * Result of the request to list CDN operations. It contains a list of
 * operations and a URL link to get the next set of results.
 *
 * @extends Array<Operation>
 */
export interface OperationListResult extends Array<Operation> {
  /**
   * @member {string} [nextLink] URL to get the next set of operation list
   * results if there are any.
   */
  nextLink?: string;
}
/**
 * @interface
 * An interface representing the AnnotationsListResult.
 * Annotations list result.
 *
 * @extends Array<Annotation>
 */
export interface AnnotationsListResult extends Array<Annotation> {}
/**
 * @interface
 * An interface representing the ApplicationInsightsComponentAPIKeyListResult.
 * Describes the list of API Keys of an Application Insights Component.
 *
 * @extends Array<ApplicationInsightsComponentAPIKey>
 */
export interface ApplicationInsightsComponentAPIKeyListResult extends Array<ApplicationInsightsComponentAPIKey> {}
/**
 * @interface
 * An interface representing the ApplicationInsightsComponentListResult.
 * Describes the list of Application Insights Resources.
 *
 * @extends Array<ApplicationInsightsComponent>
 */
export interface ApplicationInsightsComponentListResult extends Array<ApplicationInsightsComponent> {
  /**
   * @member {string} [nextLink] The URI to get the next set of Application
   * Insights component defintions if too many components where returned in the
   * result set.
   */
  nextLink?: string;
}
/**
 * @interface
 * An interface representing the WorkItemConfigurationsListResult.
 * Work item configuration list result.
 *
 * @extends Array<WorkItemConfiguration>
 */
export interface WorkItemConfigurationsListResult extends Array<WorkItemConfiguration> {}
/**
 * @interface
 * An interface representing the ApplicationInsightsWebTestLocationsListResult.
 * Describes the list of web test locations available to an Application
 * Insights Component.
 *
 * @extends Array<ApplicationInsightsComponentWebTestLocation>
 */
export interface ApplicationInsightsWebTestLocationsListResult
  extends Array<ApplicationInsightsComponentWebTestLocation> {}
/**
 * @interface
 * An interface representing the WebTestListResult.
 * A list of 0 or more Application Insights web test definitions.
 *
 * @extends Array<WebTest>
 */
export interface WebTestListResult extends Array<WebTest> {
  /**
   * @member {string} [nextLink] The link to get the next part of the returned
   * list of web tests, should the return set be too large for a single
   * request. May be null.
   */
  nextLink?: string;
}
/**
 * @interface
 * An interface representing the WorkbooksListResult.
 * Workbook list result.
 *
 * @extends Array<Workbook>
 */
export interface WorkbooksListResult extends Array<Workbook> {}
/**
 * Defines values for ApplicationType.
 * Possible values include: 'web', 'other'
 * @readonly
 * @enum {string}
 */
export declare type ApplicationType = 'web' | 'other';
/**
 * Defines values for FlowType.
 * Possible values include: 'Bluefield'
 * @readonly
 * @enum {string}
 */
export declare type FlowType = 'Bluefield';
/**
 * Defines values for RequestSource.
 * Possible values include: 'rest'
 * @readonly
 * @enum {string}
 */
export declare type RequestSource = 'rest';
/**
 * Defines values for PurgeState.
 * Possible values include: 'pending', 'completed'
 * @readonly
 * @enum {string}
 */
export declare type PurgeState = 'pending' | 'completed';
/**
 * Defines values for FavoriteType.
 * Possible values include: 'shared', 'user'
 * @readonly
 * @enum {string}
 */
export declare type FavoriteType = 'shared' | 'user';
/**
 * Defines values for WebTestKind.
 * Possible values include: 'ping', 'multistep'
 * @readonly
 * @enum {string}
 */
export declare type WebTestKind = 'ping' | 'multistep';
/**
 * Defines values for ItemScope.
 * Possible values include: 'shared', 'user'
 * @readonly
 * @enum {string}
 */
export declare type ItemScope = 'shared' | 'user';
/**
 * Defines values for ItemType.
 * Possible values include: 'query', 'function', 'folder', 'recent'
 * @readonly
 * @enum {string}
 */
export declare type ItemType = 'query' | 'function' | 'folder' | 'recent';
/**
 * Defines values for SharedTypeKind.
 * Possible values include: 'user', 'shared'
 * @readonly
 * @enum {string}
 */
export declare type SharedTypeKind = 'user' | 'shared';
/**
 * Defines values for FavoriteSourceType.
 * Possible values include: 'retention', 'notebook', 'sessions', 'events', 'userflows', 'funnel',
 * 'impact', 'segmentation'
 * @readonly
 * @enum {string}
 */
export declare type FavoriteSourceType =
  | 'retention'
  | 'notebook'
  | 'sessions'
  | 'events'
  | 'userflows'
  | 'funnel'
  | 'impact'
  | 'segmentation';
/**
 * Defines values for ItemScopePath.
 * Possible values include: 'analyticsItems', 'myanalyticsItems'
 * @readonly
 * @enum {string}
 */
export declare type ItemScopePath = 'analyticsItems' | 'myanalyticsItems';
/**
 * Defines values for ItemTypeParameter.
 * Possible values include: 'none', 'query', 'function', 'folder', 'recent'
 * @readonly
 * @enum {string}
 */
export declare type ItemTypeParameter = 'none' | 'query' | 'function' | 'folder' | 'recent';
/**
 * Defines values for CategoryType.
 * Possible values include: 'workbook', 'TSG', 'performance', 'retention'
 * @readonly
 * @enum {string}
 */
export declare type CategoryType = 'workbook' | 'TSG' | 'performance' | 'retention';
/**
 * Contains response data for the list operation.
 */
export declare type OperationsListResponse = OperationListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: OperationListResult;
  };
};
/**
 * Contains response data for the listNext operation.
 */
export declare type OperationsListNextResponse = OperationListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: OperationListResult;
  };
};
/**
 * Contains response data for the list operation.
 */
export declare type AnnotationsListResponse = AnnotationsListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: AnnotationsListResult;
  };
};
/**
 * Contains response data for the create operation.
 */
export declare type AnnotationsCreateResponse = Array<Annotation> & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Annotation[];
  };
};
/**
 * Contains response data for the deleteMethod operation.
 */
export declare type AnnotationsDeleteMethodResponse = {
  /**
   * The parsed response body.
   */
  body: any;
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};
/**
 * Contains response data for the get operation.
 */
export declare type AnnotationsGetResponse = Array<Annotation> & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Annotation[];
  };
};
/**
 * Contains response data for the list operation.
 */
export declare type APIKeysListResponse = ApplicationInsightsComponentAPIKeyListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentAPIKeyListResult;
  };
};
/**
 * Contains response data for the create operation.
 */
export declare type APIKeysCreateResponse = ApplicationInsightsComponentAPIKey & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentAPIKey;
  };
};
/**
 * Contains response data for the deleteMethod operation.
 */
export declare type APIKeysDeleteMethodResponse = ApplicationInsightsComponentAPIKey & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentAPIKey;
  };
};
/**
 * Contains response data for the get operation.
 */
export declare type APIKeysGetResponse = ApplicationInsightsComponentAPIKey & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentAPIKey;
  };
};
/**
 * Contains response data for the list operation.
 */
export declare type ExportConfigurationsListResponse = Array<ApplicationInsightsComponentExportConfiguration> & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentExportConfiguration[];
  };
};
/**
 * Contains response data for the create operation.
 */
export declare type ExportConfigurationsCreateResponse = Array<ApplicationInsightsComponentExportConfiguration> & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentExportConfiguration[];
  };
};
/**
 * Contains response data for the deleteMethod operation.
 */
export declare type ExportConfigurationsDeleteMethodResponse = ApplicationInsightsComponentExportConfiguration & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentExportConfiguration;
  };
};
/**
 * Contains response data for the get operation.
 */
export declare type ExportConfigurationsGetResponse = ApplicationInsightsComponentExportConfiguration & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentExportConfiguration;
  };
};
/**
 * Contains response data for the update operation.
 */
export declare type ExportConfigurationsUpdateResponse = ApplicationInsightsComponentExportConfiguration & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentExportConfiguration;
  };
};
/**
 * Contains response data for the get operation.
 */
export declare type ComponentCurrentBillingFeaturesGetResponse = ApplicationInsightsComponentBillingFeatures & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentBillingFeatures;
  };
};
/**
 * Contains response data for the update operation.
 */
export declare type ComponentCurrentBillingFeaturesUpdateResponse = ApplicationInsightsComponentBillingFeatures & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentBillingFeatures;
  };
};
/**
 * Contains response data for the get operation.
 */
export declare type ComponentQuotaStatusGetResponse = ApplicationInsightsComponentQuotaStatus & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentQuotaStatus;
  };
};
/**
 * Contains response data for the get operation.
 */
export declare type ComponentFeatureCapabilitiesGetResponse = ApplicationInsightsComponentFeatureCapabilities & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentFeatureCapabilities;
  };
};
/**
 * Contains response data for the get operation.
 */
export declare type ComponentAvailableFeaturesGetResponse = ApplicationInsightsComponentAvailableFeatures & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentAvailableFeatures;
  };
};
/**
 * Contains response data for the list operation.
 */
export declare type ProactiveDetectionConfigurationsListResponse = Array<
  ApplicationInsightsComponentProactiveDetectionConfiguration
> & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentProactiveDetectionConfiguration[];
  };
};
/**
 * Contains response data for the get operation.
 */
export declare type ProactiveDetectionConfigurationsGetResponse = ApplicationInsightsComponentProactiveDetectionConfiguration & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentProactiveDetectionConfiguration;
  };
};
/**
 * Contains response data for the update operation.
 */
export declare type ProactiveDetectionConfigurationsUpdateResponse = ApplicationInsightsComponentProactiveDetectionConfiguration & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentProactiveDetectionConfiguration;
  };
};
/**
 * Contains response data for the list operation.
 */
export declare type ComponentsListResponse = ApplicationInsightsComponentListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentListResult;
  };
};
/**
 * Contains response data for the listByResourceGroup operation.
 */
export declare type ComponentsListByResourceGroupResponse = ApplicationInsightsComponentListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentListResult;
  };
};
/**
 * Contains response data for the get operation.
 */
export declare type ComponentsGetResponse = ApplicationInsightsComponent & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponent;
  };
};
/**
 * Contains response data for the createOrUpdate operation.
 */
export declare type ComponentsCreateOrUpdateResponse = ApplicationInsightsComponent & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponent;
  };
};
/**
 * Contains response data for the updateTags operation.
 */
export declare type ComponentsUpdateTagsResponse = ApplicationInsightsComponent & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponent;
  };
};
/**
 * Contains response data for the purge operation.
 */
export declare type ComponentsPurgeResponse = ComponentPurgeResponse & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ComponentPurgeResponse;
  };
};
/**
 * Contains response data for the getPurgeStatus operation.
 */
export declare type ComponentsGetPurgeStatusResponse = ComponentPurgeStatusResponse & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ComponentPurgeStatusResponse;
  };
};
/**
 * Contains response data for the listNext operation.
 */
export declare type ComponentsListNextResponse = ApplicationInsightsComponentListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentListResult;
  };
};
/**
 * Contains response data for the listByResourceGroupNext operation.
 */
export declare type ComponentsListByResourceGroupNextResponse = ApplicationInsightsComponentListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentListResult;
  };
};
/**
 * Contains response data for the list operation.
 */
export declare type WorkItemConfigurationsListResponse = WorkItemConfigurationsListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: WorkItemConfigurationsListResult;
  };
};
/**
 * Contains response data for the create operation.
 */
export declare type WorkItemConfigurationsCreateResponse = WorkItemConfiguration & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: WorkItemConfiguration;
  };
};
/**
 * Contains response data for the getDefault operation.
 */
export declare type WorkItemConfigurationsGetDefaultResponse = WorkItemConfiguration & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: WorkItemConfiguration;
  };
};
/**
 * Contains response data for the deleteMethod operation.
 */
export declare type WorkItemConfigurationsDeleteMethodResponse = {
  /**
   * The parsed response body.
   */
  body: any;
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};
/**
 * Contains response data for the list operation.
 */
export declare type FavoritesListResponse = Array<ApplicationInsightsComponentFavorite> & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentFavorite[];
  };
};
/**
 * Contains response data for the get operation.
 */
export declare type FavoritesGetResponse = ApplicationInsightsComponentFavorite & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentFavorite;
  };
};
/**
 * Contains response data for the add operation.
 */
export declare type FavoritesAddResponse = ApplicationInsightsComponentFavorite & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentFavorite;
  };
};
/**
 * Contains response data for the update operation.
 */
export declare type FavoritesUpdateResponse = ApplicationInsightsComponentFavorite & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentFavorite;
  };
};
/**
 * Contains response data for the list operation.
 */
export declare type WebTestLocationsListResponse = ApplicationInsightsWebTestLocationsListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsWebTestLocationsListResult;
  };
};
/**
 * Contains response data for the listByResourceGroup operation.
 */
export declare type WebTestsListByResourceGroupResponse = WebTestListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: WebTestListResult;
  };
};
/**
 * Contains response data for the get operation.
 */
export declare type WebTestsGetResponse = WebTest & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: WebTest;
  };
};
/**
 * Contains response data for the createOrUpdate operation.
 */
export declare type WebTestsCreateOrUpdateResponse = WebTest & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: WebTest;
  };
};
/**
 * Contains response data for the updateTags operation.
 */
export declare type WebTestsUpdateTagsResponse = WebTest & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: WebTest;
  };
};
/**
 * Contains response data for the list operation.
 */
export declare type WebTestsListResponse = WebTestListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: WebTestListResult;
  };
};
/**
 * Contains response data for the listByComponent operation.
 */
export declare type WebTestsListByComponentResponse = WebTestListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: WebTestListResult;
  };
};
/**
 * Contains response data for the listByResourceGroupNext operation.
 */
export declare type WebTestsListByResourceGroupNextResponse = WebTestListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: WebTestListResult;
  };
};
/**
 * Contains response data for the listNext operation.
 */
export declare type WebTestsListNextResponse = WebTestListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: WebTestListResult;
  };
};
/**
 * Contains response data for the listByComponentNext operation.
 */
export declare type WebTestsListByComponentNextResponse = WebTestListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: WebTestListResult;
  };
};
/**
 * Contains response data for the list operation.
 */
export declare type AnalyticsItemsListResponse = Array<ApplicationInsightsComponentAnalyticsItem> & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentAnalyticsItem[];
  };
};
/**
 * Contains response data for the get operation.
 */
export declare type AnalyticsItemsGetResponse = ApplicationInsightsComponentAnalyticsItem & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentAnalyticsItem;
  };
};
/**
 * Contains response data for the put operation.
 */
export declare type AnalyticsItemsPutResponse = ApplicationInsightsComponentAnalyticsItem & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApplicationInsightsComponentAnalyticsItem;
  };
};
/**
 * Contains response data for the listByResourceGroup operation.
 */
export declare type WorkbooksListByResourceGroupResponse = WorkbooksListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: WorkbooksListResult;
  };
};
/**
 * Contains response data for the get operation.
 */
export declare type WorkbooksGetResponse = Workbook & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Workbook;
  };
};
/**
 * Contains response data for the createOrUpdate operation.
 */
export declare type WorkbooksCreateOrUpdateResponse = Workbook & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Workbook;
  };
};
/**
 * Contains response data for the update operation.
 */
export declare type WorkbooksUpdateResponse = Workbook & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Workbook;
  };
};
//# sourceMappingURL=index.d.ts.map
