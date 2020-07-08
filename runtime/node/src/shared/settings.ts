// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export interface BotSettings {
  feature: BotFeatureSettings;
  blobStorage: BlobStorageConfiguration;
  microsoftAppId: string;
  microsoftAppPassword: string;
  cosmosDb: CosmosDb;
  applicationInsights: { InstrumentationKey: string };
  luis: LuisSettings;
  telemetry: TelemetryConfiguration;
  [key: string]: any;
}

export interface BotFeatureSettings {
  useShowTypingMiddleware: boolean;
  useInspectionMiddleware: boolean;
  removeRecipientMention: boolean;
}

export interface CosmosDb {
  authKey: string;
  collectionId: string;
  cosmosDBEndpoint: string;
  databaseId: string;
}

export interface BlobStorageConfiguration {
  connectionString: string;
  container: string;
}

export interface LuisSettings {
  name: string;
  authoringKey: string;
  endpointKey: string;
  endpoint: string;
  authoringEndpoint: string;
  authoringRegion: string;
  defaultLanguage: string;
  environment: string;
}

export interface TelemetryConfiguration {
  logPersonalInformation: boolean;
  logActivities: boolean;
}
