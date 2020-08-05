// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureResourceManangerConfig,
  CosmosDBConfig,
  LuisAuthoringResourceConfig,
  LuisResourceConfig,
  ApplicationInsightsConfig,
  BlobStorageConfig,
  WebAppConfig,
  BotConfig,
  ResourceGroupConfig,
  DeploymentsConfig,
  QnAResourceConfig,
} from './azureResourceManagerConfig';
import { CognitiveServicesManagementClient } from '@azure/arm-cognitiveservices';
import { StorageManagementClient } from '@azure/arm-storage';
import { BotProjectDeployLoggerType } from '../botProjectLoggerType';
import { ApplicationInsightsManagementClient } from '@azure/arm-appinsights';
import { AzureDeploymentOutput } from './azureDeploymentOutput';
import { WebSiteManagementClient } from '@azure/arm-appservice';
import { AzureBotService } from '@azure/arm-botservice';
import { ResourceManagementClient } from '@azure/arm-resources';
import { CosmosDBManagementClient } from '@azure/arm-cosmosdb';
import { SearchManagementClient } from '@azure/arm-search';

export class AzureResourceDeploymentStatus {
  public resourceGroupStatus: DeploymentStatus = DeploymentStatus.NOT_DEPLOY;
  public luisAuthoringStatus: DeploymentStatus = DeploymentStatus.NOT_DEPLOY;
  public luisStatus: DeploymentStatus = DeploymentStatus.NOT_DEPLOY;
  public appInsightsStatus: DeploymentStatus = DeploymentStatus.NOT_DEPLOY;
  public cosmosDBStatus: DeploymentStatus = DeploymentStatus.NOT_DEPLOY;
  public blobStorageStatus: DeploymentStatus = DeploymentStatus.NOT_DEPLOY;
  public webAppStatus: DeploymentStatus = DeploymentStatus.NOT_DEPLOY;
  public botStatus: DeploymentStatus = DeploymentStatus.NOT_DEPLOY;
  public counterStatus: DeploymentStatus = DeploymentStatus.NOT_DEPLOY;
  public qnaStatus: DeploymentStatus = DeploymentStatus.NOT_DEPLOY;
}

export enum DeploymentStatus {
  NOT_DEPLOY = 'NOT_DEPLOYMENT',
  DEPLOYING = 'DEPLOYING',
  DEPLOY_FAIL = 'DEPLOY_FAIL',
  DEPLOY_SUCCESS = 'DEPLOY_SUCCESS',
}

export class AzureResourceMananger {
  // The configuration file for the azure resource
  private config: AzureResourceManangerConfig;

  // Logger
  private logger: any;

  // Credentials
  private creds: any;

  // Subscription id
  private subId: string;

  // The deployment status of the azure resources
  private deployStatus: AzureResourceDeploymentStatus = new AzureResourceDeploymentStatus();

  // The output properties of deployment
  private deploymentOutput: AzureDeploymentOutput;

  constructor(config: AzureResourceManangerConfig) {
    this.config = config;
    this.logger = config.logger;
    this.creds = config.creds;
    this.subId = config.subId;
    this.deploymentOutput = {
      applicationInsights: {},
      cosmosDb: {},
      blobStorage: {},
      luis: {},
      qna: {}
    };
  }

  public getStatus() {
    return this.deployStatus;
  }

  public getOutput() {
    return this.deploymentOutput;
  }

  public async deployResources() {
    if (!this.config) {
      throw new Error('The configuration for AzureResourceMananger is invalid.');
    }

    // Create Resource Group based on the config
    if (this.config.resourceGroup) {
      await this.createResourceGroup(this.config.resourceGroup);
      if (this.deployStatus.resourceGroupStatus != DeploymentStatus.DEPLOY_SUCCESS) {
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: 'Create Resource Group Failed.',
        });
        return;
      }
    }

    if (this.config.createOrNot.appInsights) {
      if (!this.config.appInsights) {
        this.config.appInsights = {
          location: this.config.resourceGroup.location,
          name: this.config.resourceGroup.name,
          resourceGroupName: this.config.resourceGroup.name,
        };
      }
      if (!this.config.appInsights.resourceGroupName) {
        this.config.appInsights.resourceGroupName = this.config.resourceGroup.name;
      }
      if (!this.config.appInsights.location) {
        this.config.appInsights.location = this.config.resourceGroup.location;
      }
      if (!this.config.appInsights.name) {
        this.config.appInsights.name = this.config.resourceGroup.name;
      }

      await this.deployAppInsightsResource(this.config.appInsights);
      if (this.deployStatus.appInsightsStatus != DeploymentStatus.DEPLOY_SUCCESS) {
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: 'Create App Insights Failed.',
        });
        return;
      }
    }

    if (this.config.createOrNot.blobStorage) {
      if (!this.config.blobStorage) {
        this.config.blobStorage = {
          resourceGroupName: this.config.resourceGroup.name,
          name: this.config.resourceGroup.name.toLowerCase().replace('-', '').replace('_', ''),
          location: this.config.resourceGroup.location,
          containerName: 'transcripts',
        };
      }
      if (!this.config.blobStorage.location) {
        this.config.blobStorage.location = this.config.resourceGroup.location;
      }
      if (!this.config.blobStorage.name) {
        this.config.blobStorage.name = this.config.resourceGroup.name.toLowerCase().replace('-', '').replace('_', '');
      }
      if (!this.config.blobStorage.resourceGroupName) {
        this.config.blobStorage.resourceGroupName = this.config.resourceGroup.name;
      }

      await this.deployBlobStorageResource(this.config.blobStorage);
      if (this.deployStatus.blobStorageStatus != DeploymentStatus.DEPLOY_SUCCESS) {
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: 'Create Blob Storage Failed.',
        });
        return;
      }
    }

    if (this.config.createOrNot.luisResource) {
      if (!this.config.luisResource) {
        this.config.luisResource = {
          resourceGroupName: this.config.resourceGroup.name,
          location: this.config.resourceGroup.location,
          accountName: `${this.config.resourceGroup.name}-luis`,
        };
      }
      if (!this.config.luisResource.resourceGroupName) {
        this.config.luisResource.resourceGroupName = this.config.resourceGroup.name;
      }
      if (!this.config.luisResource.location) {
        this.config.luisResource.location = this.config.resourceGroup.location;
      }
      if (!this.config.luisResource.accountName) {
        this.config.luisResource.accountName = `${this.config.resourceGroup.name}-luis`;
      }

      await this.deployLuisResource(this.config.luisResource);
      if (this.deployStatus.luisStatus != DeploymentStatus.DEPLOY_SUCCESS) {
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: 'Create Luis Resource Failed.',
        });
        return;
      }
    }

    if (this.config.createOrNot.luisAuthoringResource) {
      if (!this.config.luisAuthoringResource) {
        this.config.luisAuthoringResource = {
          location: this.config.resourceGroup.location,
          accountName: `${this.config.resourceGroup.name}-luis-Authoring`,
          resourceGroupName: this.config.resourceGroup.name,
        };
      }
      if (!this.config.luisAuthoringResource.resourceGroupName) {
        this.config.luisAuthoringResource.resourceGroupName = this.config.resourceGroup.name;
      }
      if (!this.config.luisAuthoringResource.location) {
        this.config.luisAuthoringResource.location = this.config.resourceGroup.location;
      }
      if (!this.config.luisAuthoringResource.accountName) {
        this.config.luisAuthoringResource.accountName = `${this.config.resourceGroup.name}-luis-Authoring`;
      }

      await this.deployLuisAuthoringResource(this.config.luisAuthoringResource);
      if (this.deployStatus.luisAuthoringStatus != DeploymentStatus.DEPLOY_SUCCESS) {
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: 'Create Luis Authoring Resource Failed.',
        });
        return;
      }
    }

    if (this.config.createOrNot.qnaResource) {
      if (!this.config.qnaResource) {
        this.config.qnaResource = {
          location: this.config.resourceGroup.location,
          accountName: this.config.resourceGroup.name,
          resourceGroupName: this.config.resourceGroup.name
        };
      }
      if (!this.config.qnaResource.resourceGroupName) {
        this.config.qnaResource.resourceGroupName = this.config.resourceGroup.name;
      }
      if (!this.config.qnaResource.location) {
        this.config.qnaResource.location = this.config.resourceGroup.location;
      }
      if (!this.config.qnaResource.accountName) {
        this.config.qnaResource.accountName = this.config.resourceGroup.name;
      }

      await this.deployQnAReource(this.config.qnaResource);
      if (this.deployStatus.qnaStatus != DeploymentStatus.DEPLOY_SUCCESS) {
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: 'Create QnA Maker Resource Failed.',
        });
        return;
      }
    }

    if (this.config.createOrNot.cosmosDB) {
      if (!this.config.cosmosDB) {
        this.config.cosmosDB = {
          resourceGroupName: this.config.resourceGroup.name,
          location: this.config.resourceGroup.location,
          name: this.config.resourceGroup.name.replace('_', '').substr(0, 31).toLowerCase(),
          databaseName: `botstate-db`,
          containerName: `botstate-container`,
        };
      }
      if (!this.config.cosmosDB.resourceGroupName) {
        this.config.cosmosDB.resourceGroupName = this.config.resourceGroup.name;
      }
      if (!this.config.cosmosDB.location) {
        this.config.cosmosDB.location = this.config.resourceGroup.location;
      }
      if (!this.config.cosmosDB.name) {
        this.config.cosmosDB.name = this.config.resourceGroup.name.replace('_', '').substr(0, 31).toLowerCase();
      }
      if (!this.config.cosmosDB.databaseName) {
        this.config.cosmosDB.databaseName = `botstate-db`;
      }
      if (!this.config.cosmosDB.containerName) {
        this.config.cosmosDB.containerName = `botstate-container`;
      }

      await this.deployCosmosDBResource(this.config.cosmosDB);
      if (this.deployStatus.cosmosDBStatus != DeploymentStatus.DEPLOY_SUCCESS) {
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: 'Create Cosmos DB Failed.',
        });
        return;
      }
    }

    if (this.config.createOrNot.webApp) {
      if (!this.config.webApp) {
        this.config.webApp = {
          resourceGroupName: this.config.resourceGroup.name,
          location: this.config.resourceGroup.location,
          name: this.config.resourceGroup.name,
        };
      }
      if (!this.config.webApp.resourceGroupName) {
        this.config.webApp.resourceGroupName = this.config.resourceGroup.name;
      }
      if (!this.config.webApp.location) {
        this.config.webApp.location = this.config.resourceGroup.location;
      }
      if (!this.config.webApp.name) {
        this.config.webApp.name = this.config.resourceGroup.name;
      }

      await this.deployWebAppResource(this.config.webApp);
      if (this.deployStatus.webAppStatus != DeploymentStatus.DEPLOY_SUCCESS) {
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: 'Create Web App Failed.',
        });
        return;
      }
    }

    if (this.config.createOrNot.bot) {
      if (!this.config.bot) {
        this.config.bot = {
          resourceGroupName: this.config.resourceGroup.name,
          location: this.config.resourceGroup.location,
          name: this.config.resourceGroup.name,
          displayName: this.config.resourceGroup.name,
        };
      }
      if (!this.config.bot.resourceGroupName) {
        this.config.bot.resourceGroupName = this.config.resourceGroup.name;
      }
      if (!this.config.bot.location) {
        this.config.bot.location = this.config.resourceGroup.location;
      }
      if (!this.config.bot.name) {
        this.config.bot.name = this.config.resourceGroup.name;
      }
      await this.deployBotResource(this.config.bot);
      if (this.deployStatus.botStatus != DeploymentStatus.DEPLOY_SUCCESS) {
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: 'Create Bot Failed.',
        });
        return;
      }
    }

    if (this.config.createOrNot.deployments) {
      if (!this.config.deployments) {
        this.config.deployments = {
          resourceGroupName: this.config.resourceGroup.name,
          name: '1d41002f-62a1-49f3-bd43-2f3f32a19cbb',
        };
      }

      if (!this.config.deployments.resourceGroupName) {
        this.config.deployments.resourceGroupName = this.config.resourceGroup.name;
      }
      if (!this.config.deployments.name) {
        this.config.deployments.name = '1d41002f-62a1-49f3-bd43-2f3f32a19cbb';
      }

      await this.deployDeploymentCounter(this.config.deployments);
      if (this.deployStatus.counterStatus != DeploymentStatus.DEPLOY_SUCCESS) {
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: 'Create Deployment Counter Failed.',
        });
      }
    }
  }

  private async createResourceGroup(config: ResourceGroupConfig) {
    try {
      if (!config.name) {
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: 'You should provide a valid resource group name.',
        });
        return;
      }

      this.deployStatus.resourceGroupStatus = DeploymentStatus.DEPLOYING;
      const resourceManagementClient = new ResourceManagementClient(this.creds, this.subId);

      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_INFO,
        message: 'Checking the Existence of the Resource Group ...',
      });

      const validateExist = await resourceManagementClient.resourceGroups.checkExistence(config.name);

      if (validateExist.body) {
        // Already Exists a resource group with the provided name
        const resourceGroupGetResult = await resourceManagementClient.resourceGroups.get(config.name);
        if (resourceGroupGetResult._response.status >= 300) {
          // Something went wrong at resource group get
          this.deployStatus.resourceGroupStatus = DeploymentStatus.DEPLOY_FAIL;
          this.logger({
            status: BotProjectDeployLoggerType.PROVISION_ERROR,
            message: resourceGroupGetResult._response.bodyAsText,
          });
          return;
        }

        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_INFO,
          message: `Use the Resource Group: ${config.name} at ${resourceGroupGetResult.location}`,
        });

        // Update the location of rescoureGroup config
        this.config.resourceGroup.location = resourceGroupGetResult.location;
        this.deployStatus.resourceGroupStatus = DeploymentStatus.DEPLOY_SUCCESS;
        return;
      }

      // Create a new resource group
      if (!config.location) {
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: 'You should provide a valid location for resource group',
        });
        return;
      }

      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_INFO,
        message: 'Creating Resource Group ...',
      });

      const resourceGroupResult = await resourceManagementClient.resourceGroups.createOrUpdate(config.name, {
        location: config.location,
      });

      if (resourceGroupResult._response.status >= 300) {
        this.deployStatus.resourceGroupStatus = DeploymentStatus.DEPLOY_FAIL;
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: resourceGroupResult._response.bodyAsText,
        });
        return;
      }

      this.deployStatus.resourceGroupStatus = DeploymentStatus.DEPLOY_SUCCESS;
    } catch (err) {
      this.deployStatus.resourceGroupStatus = DeploymentStatus.DEPLOY_FAIL;
      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_ERROR,
        message: JSON.stringify(err, Object.getOwnPropertyNames(err)),
      });
    }
  }

  private async deployLuisAuthoringResource(config: LuisAuthoringResourceConfig) {
    try {
      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_INFO,
        message: 'Deploying Luis Authoring Resource ...',
      });
      this.deployStatus.luisAuthoringStatus = DeploymentStatus.DEPLOYING;
      const cognitiveServicesManagementClient = new CognitiveServicesManagementClient(this.creds, this.subId);
      const deployResult = await cognitiveServicesManagementClient.accounts.create(
        config.resourceGroupName,
        config.accountName,
        {
          kind: 'LUIS.Authoring',
          sku: {
            name: config.sku ?? 'F0',
          },
          location: config.location ?? this.config.resourceGroup.location,
        }
      );
      if (deployResult._response.status >= 300) {
        this.deployStatus.luisAuthoringStatus = DeploymentStatus.DEPLOY_FAIL;
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: deployResult._response.bodyAsText,
        });
        return;
      }

      const authoringEndpoint = deployResult.properties?.endpoint ?? '';
      const keys = await cognitiveServicesManagementClient.accounts.listKeys(
        config.resourceGroupName,
        config.accountName
      );
      const authoringKey = keys?.key1 ?? '';
      this.deploymentOutput.luis.authoringEndpoint = authoringEndpoint;
      this.deploymentOutput.luis.authoringKey = authoringKey;
      this.deployStatus.luisAuthoringStatus = DeploymentStatus.DEPLOY_SUCCESS;
    } catch (err) {
      this.deployStatus.luisAuthoringStatus = DeploymentStatus.DEPLOY_FAIL;
      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_ERROR,
        message: JSON.stringify(err, Object.getOwnPropertyNames(err)),
      });
    }
  }

  private async deployLuisResource(config: LuisResourceConfig) {
    try {
      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_INFO,
        message: 'Deploying Luis Resource ...',
      });
      this.deployStatus.luisStatus = DeploymentStatus.DEPLOYING;
      const cognitiveServicesManagementClient = new CognitiveServicesManagementClient(this.creds, this.subId);
      const deployResult = await cognitiveServicesManagementClient.accounts.create(
        config.resourceGroupName,
        config.accountName,
        {
          kind: 'LUIS',
          sku: {
            name: config.sku ?? 'S0',
          },
          location: config.location ?? this.config.resourceGroup.location,
        }
      );
      if (deployResult._response.status >= 300) {
        this.deployStatus.luisStatus = DeploymentStatus.DEPLOY_FAIL;
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: deployResult._response.bodyAsText,
        });
        return;
      }

      const endpoint = deployResult.properties?.endpoint ?? '';
      const keys = await cognitiveServicesManagementClient.accounts.listKeys(
        config.resourceGroupName,
        config.accountName
      );
      const endpointKey = keys?.key1 ?? '';
      this.deploymentOutput.luis.endpoint = endpoint;
      this.deploymentOutput.luis.endpointKey = endpointKey;

      this.deployStatus.luisStatus = DeploymentStatus.DEPLOY_SUCCESS;
    } catch (err) {
      this.deployStatus.luisStatus = DeploymentStatus.DEPLOY_FAIL;
      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_ERROR,
        message: JSON.stringify(err, Object.getOwnPropertyNames(err)),
      });
    }
  }

  private async deployAppInsightsResource(config: ApplicationInsightsConfig) {
    try {
      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_INFO,
        message: 'Deploying Application Insights Resource ...',
      });
      this.deployStatus.appInsightsStatus = DeploymentStatus.DEPLOYING;
      const applicationInsightsManagementClient = new ApplicationInsightsManagementClient(this.creds, this.subId);
      const deployResult = await applicationInsightsManagementClient.components.createOrUpdate(
        config.resourceGroupName,
        config.name,
        {
          location: config.location,
          applicationType: config.applicationType ?? 'web',
          kind: 'web',
        }
      );
      if (deployResult._response.status >= 300 || deployResult.provisioningState != 'Succeeded') {
        this.deployStatus.appInsightsStatus = DeploymentStatus.DEPLOY_FAIL;
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: deployResult._response.bodyAsText,
        });
        return;
      }

      // Update output and status
      this.deploymentOutput.applicationInsights.instrumentationKey = deployResult.instrumentationKey;
      this.deployStatus.appInsightsStatus = DeploymentStatus.DEPLOY_SUCCESS;
    } catch (err) {
      this.deployStatus.appInsightsStatus = DeploymentStatus.DEPLOY_FAIL;
      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_ERROR,
        message: JSON.stringify(err, Object.getOwnPropertyNames(err)),
      });
    }
  }

  private async deployCosmosDBResource(config: CosmosDBConfig) {
    try {
      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_INFO,
        message: 'Deploying Cosmos DB Resource ...',
      });
      this.deployStatus.cosmosDBStatus = DeploymentStatus.DEPLOYING;

      // Create DB accounts
      let cosmosDBManagementClient = new CosmosDBManagementClient(this.creds, this.subId);
      const dbAccountDeployResult = await cosmosDBManagementClient.databaseAccounts.createOrUpdate(
        config.resourceGroupName,
        config.name,
        {
          location: config.location,
          locations: [
            {
              locationName: config.location,
              failoverPriority: 0,
            },
          ],
        }
      );

      if (dbAccountDeployResult._response.status >= 300 || dbAccountDeployResult.provisioningState != 'Succeeded') {
        this.deployStatus.blobStorageStatus = DeploymentStatus.DEPLOY_FAIL;
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: dbAccountDeployResult._response.bodyAsText,
        });
        return;
      }

      // Create DB
      const dbDeployResult = await cosmosDBManagementClient.sqlResources.createUpdateSqlDatabase(
        config.resourceGroupName,
        config.name,
        config.databaseName,
        {
          resource: {
            id: 'botstate-db',
          },
          options: {},
        }
      );

      if (dbDeployResult._response.status >= 300) {
        this.deployStatus.blobStorageStatus = DeploymentStatus.DEPLOY_FAIL;
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: dbDeployResult._response.bodyAsText,
        });
        return;
      }

      // Create Container
      const containerCreateResult = await cosmosDBManagementClient.sqlResources.createUpdateSqlContainer(
        config.resourceGroupName,
        config.name,
        config.databaseName,
        config.containerName,
        {
          resource: {
            id: 'botstate-container',
            indexingPolicy: {
              indexingMode: 'Consistent',
              automatic: true,
              includedPaths: [
                {
                  path: '/*',
                },
              ],
              excludedPaths: [
                {
                  path: '/"_etag"/?',
                },
              ],
            },
            partitionKey: {
              paths: ['/id'],
              kind: 'Hash',
            },
            conflictResolutionPolicy: {
              mode: 'LastWriterWins',
              conflictResolutionPath: '/_ts',
            },
          },
          options: {},
        }
      );

      if (containerCreateResult._response.status >= 300) {
        this.deployStatus.blobStorageStatus = DeploymentStatus.DEPLOY_FAIL;
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: containerCreateResult._response.bodyAsText,
        });
        return;
      }

      const authKeyResult = await cosmosDBManagementClient.databaseAccounts.listKeys(
        config.resourceGroupName,
        config.name
      );
      if (authKeyResult._response.status >= 300) {
        this.deployStatus.blobStorageStatus = DeploymentStatus.DEPLOY_FAIL;
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: authKeyResult._response.bodyAsText,
        });
        return;
      }

      const authKey = authKeyResult.primaryMasterKey;
      const cosmosDbEndpoint = dbAccountDeployResult.documentEndpoint;
      this.deploymentOutput.cosmosDb.authKey = authKey;
      this.deploymentOutput.cosmosDb.cosmosDBEndpoint = cosmosDbEndpoint;
      this.deploymentOutput.cosmosDb.databaseId = 'botstate-db';
      this.deploymentOutput.cosmosDb.collectoinId = 'botstate-collection';
      this.deploymentOutput.cosmosDb.containerId = 'botstate-container';

      this.deployStatus.cosmosDBStatus = DeploymentStatus.DEPLOY_SUCCESS;
    } catch (err) {
      this.deployStatus.cosmosDBStatus = DeploymentStatus.DEPLOY_FAIL;
      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_ERROR,
        message: JSON.stringify(err, Object.getOwnPropertyNames(err)),
      });
    }
  }

  private async deployBlobStorageResource(config: BlobStorageConfig) {
    try {
      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_INFO,
        message: 'Deploying Blob Storage Resource ...',
      });
      this.deployStatus.blobStorageStatus = DeploymentStatus.DEPLOYING;
      const storageManagementClient = new StorageManagementClient(this.creds, this.subId);
      const deployResult = await storageManagementClient.storageAccounts.create(config.resourceGroupName, config.name, {
        location: config.location,
        kind: 'StorageV2',
        sku: {
          name: config.sku ?? 'Standard_LRS',
        },
      });
      if (deployResult._response.status >= 300 || deployResult.provisioningState != 'Succeeded') {
        this.deployStatus.blobStorageStatus = DeploymentStatus.DEPLOY_FAIL;
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: deployResult._response.bodyAsText,
        });
        return;
      }

      const accountKeysResult = await storageManagementClient.storageAccounts.listKeys(
        config.resourceGroupName,
        config.name
      );
      const connectionString = accountKeysResult?.keys?.[0].value ?? '';

      this.deploymentOutput.blobStorage.connectionString = connectionString;
      this.deploymentOutput.blobStorage.container = config.containerName ?? 'transcripts';
      this.deployStatus.blobStorageStatus = DeploymentStatus.DEPLOY_SUCCESS;
    } catch (err) {
      this.deployStatus.blobStorageStatus = DeploymentStatus.DEPLOY_FAIL;
      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_ERROR,
        message: JSON.stringify(err, Object.getOwnPropertyNames(err)),
      });
    }
  }

  private async deployWebAppResource(config: WebAppConfig) {
    try {
      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_INFO,
        message: 'Deploying Web App Resource ...',
      });
      this.deployStatus.webAppStatus = DeploymentStatus.DEPLOYING;
      const webSiteManagementClient = new WebSiteManagementClient(this.creds, this.subId);

      // Create new Service Plan
      const servicePlanResult = await webSiteManagementClient.appServicePlans.createOrUpdate(
        config.resourceGroupName,
        config.name,
        {
          location: config.location,
          sku: {
            name: 'S1',
            tier: 'Standard',
            size: 'S1',
            family: 'S',
            capacity: 1,
          },
        }
      );

      if (servicePlanResult._response.status >= 300) {
        this.deployStatus.webAppStatus = DeploymentStatus.DEPLOY_FAIL;
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: servicePlanResult._response.bodyAsText,
        });
        return;
      }

      const webAppName = config.name;
      const webAppResult = await webSiteManagementClient.webApps.createOrUpdate(config.resourceGroupName, config.name, {
        name: webAppName,
        serverFarmId: servicePlanResult.name,
        location: config.location,
        kind: 'app',
        siteConfig: {
          appSettings: [
            {
              name: 'WEBSITE_NODE_DEFAULT_VERSION',
              value: '10.14.1',
            },
            {
              name: 'MicrosoftAppId',
              value: config.appId,
            },
            {
              name: 'MicrosoftAppPassword',
              value: config.appPwd,
            },
          ],
          cors: {
            allowedOrigins: ['https://botservice.hosting.portal.azure.net', 'https://hosting.onecloud.azure-test.net/'],
          },
        },
      });

      if (webAppResult._response.status >= 300) {
        this.deployStatus.webAppStatus = DeploymentStatus.DEPLOY_FAIL;
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: webAppResult._response.bodyAsText,
        });
        return;
      }
      const siteHost = webAppResult?.hostNames?.[0];
      if (!this.config.bot) {
        this.config.bot = {
          resourceGroupName: this.config.resourceGroup.name,
          location: this.config.resourceGroup.location,
          name: this.config.resourceGroup.name,
          displayName: this.config.resourceGroup.name,
        };
      }
      this.config.bot.endpoint = `https://${siteHost}/api/messages`;
      this.deployStatus.webAppStatus = DeploymentStatus.DEPLOY_SUCCESS;
    } catch (err) {
      this.deployStatus.webAppStatus = DeploymentStatus.DEPLOY_FAIL;
      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_ERROR,
        message: JSON.stringify(err, Object.getOwnPropertyNames(err)),
      });
    }
  }

  private async deployBotResource(config: BotConfig) {
    try {
      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_INFO,
        message: 'Deploying Bot Resource ...',
      });
      this.deployStatus.botStatus = DeploymentStatus.DEPLOYING;

      const azureBotSerivce = new AzureBotService(this.creds, this.subId);

      const botResult = await azureBotSerivce.bots.create(config.resourceGroupName, config.name, {
        properties: {
          displayName: config.displayName ?? config.name,
          endpoint: config.endpoint ?? '',
          msaAppId: config.appId ?? '',
        },
        sku: {
          name: 'F0',
        },
        name: config.name,
        location: 'global',
        kind: 'bot',
      });

      if (botResult._response.status >= 300) {
        this.deployStatus.botStatus = DeploymentStatus.DEPLOY_FAIL;
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: botResult._response.bodyAsText,
        });
        return;
      }

      this.deployStatus.botStatus = DeploymentStatus.DEPLOY_SUCCESS;
    } catch (err) {
      this.deployStatus.botStatus = DeploymentStatus.DEPLOY_FAIL;
      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_ERROR,
        message: JSON.stringify(err, Object.getOwnPropertyNames(err)),
      });
    }
  }

  // QnA Resource depends on serveral components, including appinights and web config
  private async deployQnAReource(config: QnAResourceConfig) {
    try {
      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_INFO,
        message: 'Deploying QnA Resource ...',
      });
      this.deployStatus.qnaStatus = DeploymentStatus.DEPLOYING;

      // initialize the name
      const qnaMakerSearchName = `${config.accountName}-search`.toLowerCase().replace('_', '');
      const qnaMakerWebAppName = `${config.accountName}-qnahost`.toLowerCase().replace('_', '');
      const qnaMakerServiceName = `${config.accountName}-qna`;
      // deploy search service
      const searchManagementClient = new SearchManagementClient(this.creds, this.subId);
      const searchServiceDeployResult = await searchManagementClient.services.createOrUpdate(config.resourceGroupName, qnaMakerSearchName, {
        location: config.location,
        sku: {
          name: 'standard'
        },
        replicaCount: 1,
        partitionCount: 1,
        hostingMode: 'default'
      });

      if (searchServiceDeployResult._response.status >= 300) {
        this.deployStatus.qnaStatus = DeploymentStatus.DEPLOY_FAIL;
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: searchServiceDeployResult._response.bodyAsText,
        });
        return;
      }

      // deploy websites
      // Create new Service Plan or update the exisiting service plan created before
      const webSiteManagementClient = new WebSiteManagementClient(this.creds, this.subId);
      const servicePlanName = config.resourceGroupName;
      const servicePlanResult = await webSiteManagementClient.appServicePlans.createOrUpdate(
        config.resourceGroupName,
        servicePlanName,
        {
          location: config.location,
          sku: {
            name: 'S1',
            tier: 'Standard',
            size: 'S1',
            family: 'S',
            capacity: 1,
          },
        }
      );

      if (servicePlanResult._response.status >= 300) {
        this.deployStatus.qnaStatus = DeploymentStatus.DEPLOY_FAIL;
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: servicePlanResult._response.bodyAsText,
        });
        return;
      }

      // deploy or update exisiting app insights component
      const applicationInsightsManagementClient = new ApplicationInsightsManagementClient(this.creds, this.subId);
      const appinsightsName = config.resourceGroupName;
      const appinsightsDeployResult = await applicationInsightsManagementClient.components.createOrUpdate(
        config.resourceGroupName,
        appinsightsName,
        {
          location: config.location,
          applicationType: 'web',
          kind: 'web',
        }
      );
      if (appinsightsDeployResult._response.status >= 300 || appinsightsDeployResult.provisioningState != 'Succeeded') {
        this.deployStatus.qnaStatus = DeploymentStatus.DEPLOY_FAIL;
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: appinsightsDeployResult._response.bodyAsText,
        });
        return;
      }

      // deploy qna host webapp
      const webAppResult = await webSiteManagementClient.webApps.createOrUpdate(config.resourceGroupName, qnaMakerWebAppName, {
        name: qnaMakerWebAppName,
        serverFarmId: servicePlanResult.name,
        location: config.location,
        siteConfig: {
          cors: {
            allowedOrigins: ['*'],
          },
        },
        enabled: true,
      });

      if (webAppResult._response.status >= 300) {
        this.deployStatus.qnaStatus = DeploymentStatus.DEPLOY_FAIL;
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: webAppResult._response.bodyAsText,
        });
        return;
      }

      // add web config for websites
      const azureSearchAdminKey = (await searchManagementClient.adminKeys.get(config.resourceGroupName, qnaMakerSearchName)).primaryKey;
      const appInsightsComponent = await applicationInsightsManagementClient.components.get(config.resourceGroupName, appinsightsName);
      const userAppInsightsKey = appInsightsComponent.instrumentationKey;
      const userAppInsightsName = appinsightsName;
      const userAppInsightsAppId = appInsightsComponent.appId;
      const primaryEndpointKey = `${qnaMakerWebAppName}-PrimaryEndpointKey`;
      const secondaryEndpointKey = `${qnaMakerWebAppName}-SecondaryEndpointKey`;
      const defaultAnswer = 'No good match found in KB.';
      const QNAMAKER_EXTENSION_VERSION = 'latest';

      const webAppConfigUpdateResult = await webSiteManagementClient.webApps.createOrUpdateConfiguration(config.resourceGroupName, qnaMakerWebAppName, {
        appSettings: [
          {
            name: 'AzureSearchName',
            value: qnaMakerSearchName
          },
          {
            name: 'AzureSearchAdminKey',
            value: azureSearchAdminKey,
          },
          {
            name: 'UserAppInsightsKey',
            value: userAppInsightsKey,
          },
          {
            name: 'UserAppInsightsName',
            value: userAppInsightsName,
          },
          {
            name: 'UserAppInsightsAppId',
            value: userAppInsightsAppId,
          },
          {
            name: 'PrimaryEndpointKey',
            value: primaryEndpointKey,
          },
          {
            name: 'SecondaryEndpointKey',
            value: secondaryEndpointKey,
          },
          {
            name: 'DefaultAnswer',
            value: defaultAnswer,
          },
          {
            name: 'QNAMAKER_EXTENSION_VERSION',
            value: QNAMAKER_EXTENSION_VERSION
          }
        ]
      });
      if (webAppConfigUpdateResult._response.status >= 300) {
        this.deployStatus.qnaStatus = DeploymentStatus.DEPLOY_FAIL;
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: webAppConfigUpdateResult._response.bodyAsText,
        });
        return;
      }

      // Create qna account
      const cognitiveServicesManagementClient = new CognitiveServicesManagementClient(this.creds, this.subId);
      const deployResult = await cognitiveServicesManagementClient.accounts.create(
        config.resourceGroupName,
        qnaMakerServiceName,
        {
          kind: 'QnAMaker',
          sku: {
            name: config.sku ?? 'S0',
          },
          location: config.location ?? this.config.resourceGroup.location,
          properties: {
            apiProperties: {
              'qnaRuntimeEndpoint': `https://${webAppResult.hostNames?.[0]}`
            }
          }
        },
      );
      if (deployResult._response.status >= 300) {
        this.deployStatus.qnaStatus = DeploymentStatus.DEPLOY_FAIL;
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: deployResult._response.bodyAsText,
        });
        return;
      }

      const endpoint = webAppResult.hostNames?.[0];
      const keys = await cognitiveServicesManagementClient.accounts.listKeys(
        config.resourceGroupName,
        qnaMakerServiceName
      );
      const subscriptionKey = keys?.key1 ?? '';
      this.deploymentOutput.qna.endpoint = endpoint;
      this.deploymentOutput.qna.subscriptionKey = subscriptionKey;

      this.deployStatus.qnaStatus = DeploymentStatus.DEPLOY_SUCCESS;
    } catch (err) {
      this.deployStatus.qnaStatus = DeploymentStatus.DEPLOY_FAIL;
      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_ERROR,
        message: JSON.stringify(err, Object.getOwnPropertyNames(err)),
      });
    }
  }

  private async deployDeploymentCounter(config: DeploymentsConfig) {
    try {
      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_INFO,
        message: 'Deploying Deployments Counter ...',
      });
      this.deployStatus.counterStatus = DeploymentStatus.DEPLOYING;

      const resourceClient = new ResourceManagementClient(this.creds, this.subId);

      const counterResult = await resourceClient.deployments.createOrUpdate(config.resourceGroupName, config.name, {
        properties: {
          mode: 'Incremental',
          template: {
            $schema: "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
            contentVersion: "1.0.0.0",
            resources: []
          }
        }
      });

      if (counterResult._response.status >= 300) {
        this.deployStatus.counterStatus = DeploymentStatus.DEPLOY_FAIL;
        this.logger({
          status: BotProjectDeployLoggerType.PROVISION_ERROR,
          message: counterResult._response.bodyAsText,
        });
        return;
      }

      this.deployStatus.counterStatus = DeploymentStatus.DEPLOY_SUCCESS;
    } catch (err) {
      this.deployStatus.counterStatus = DeploymentStatus.DEPLOY_FAIL;
      this.logger({
        status: BotProjectDeployLoggerType.PROVISION_ERROR,
        message: JSON.stringify(err, Object.getOwnPropertyNames(err)),
      });
    }
  }
}
