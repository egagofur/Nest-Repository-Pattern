import dotenv from 'dotenv';
import { AuthSchemaEnum } from './common/enums/auth.enum';

dotenv.config();

export const config = {
    /**
     * server configuration
     */
    appName: process.env.APP_NAME_BACKOFFICE || 'Admin Panel',
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT_BACKOFFICE || '3001',
    host: process.env.HOST_BACKOFFICE || 'localhost:3001',

    circuitBreaker: {
        isEnable: process.env.CIRCUIT_BREAKER_IS_ENABLE == 'true',
        maxDown: +process.env.CIRCUIT_BREAKER_MAX_DOWN || 5,
        cooldownOnOpen:
            +process.env.CIRCUIT_BREAKER_COOLDOWN_ON_OPEN_IN_SECOND || 300,
    },

    mode: {
        maintain: {
            isEnable: process.env.MAINTAIN_MODE_IS_ENABLED === 'true',
        },
        pause: {
            isEnable: process.env.PAUSE_MODE_IS_ENABLED === 'true',
            message:
                process.env.PAUSE_MODE_MESSAGE ||
                'Sorry... we are off for now, we will back and inform you',
            startAt: process.env.PAUSE_MODE_START_AT || '1970-01-01 00:00:00',
            endAt: process.env.PAUSE_MODE_END_AT || '1970-01-01 00:00:01',
        },
    },

    activityLog: {
        store: process.env.ACTIVITY_LOG_STORE || 'DB',
        endpoint: {
            isEnabled:
                process.env.ACTIVITY_LOG_ENDPOINT_IS_ENABLED == 'true' || false,
        },
        repository: {
            isEnabled:
                process.env.ACTIVITY_LOG_REPOSITORY_IS_ENABLED == 'true' ||
                false,
        },
    },

    auth: {
        schema: process.env.AUTH_SCHEMA || AuthSchemaEnum.Local,
        ldap: {
            url: process.env.LDAP_URL || 'ldap://ldap.forumsys.com',
        },
        sso: {
            oidc: {
                wellKnownConfigurationUrl:
                    process.env.OIDC_WELL_KNOWN_CONFIGURATION_URL ||
                    'https://keycloak.codespace.id/realms/master/.well-known/openid-configuration',
                issuer: process.env.OIDC_ISSUER || 'http://localhost:3001',
                redirectUri:
                    process.env.OIDC_REDIRECT_URI ||
                    'http://localhost:3001/auth/sso-oidc/callback',
                clientId: process.env.OIDC_CLIENT_ID || 'client_id',
                clientSecret: process.env.OIDC_CLIENT_SECRET || 'client_secret',
                userInfoEndpointWithAuthHeader:
                    !!process.env.OIDC_USER_INFO_ENDPOINT_WITH_AUTH_HEADER ||
                    true,
                scopes: process.env.OIDC_SCOPES || 'openid profile email',
                authorizationEndpoint:
                    process.env.OIDC_AUTHORIZATION_ENDPOINT ||
                    'https://keycloak.codespace.id/realms/master/protocol/openid-connect/auth',
                tokenEndpoint:
                    process.env.OIDC_TOKEN_ENDPOINT ||
                    'https://keycloak.codespace.id/realms/master/protocol/openid-connect/token',
                userInfoEndpoint:
                    process.env.OIDC_USER_INFO_ENDPOINT ||
                    'https://keycloak.codespace.id/realms/master/protocol/openid-connect/userinfo',
            },
        },
    },

    amqp: {
        conn: null,
        url: process.env.AMQP_URL,
        username: process.env.AMQP_USERNAME,
        password: process.env.AMQP_PASSWORD,
    },

    queue: {
        name: process.env.QUEUE_NAME || 'my-queue',
        exchange: process.env.QUEUE_EXCHANGE || 'my-queue-exchange',
        binding: process.env.QUEUE_BINDING || 'my-queue-binding',
    },

    webhook: {
        serverMonitoring: {
            url:
                process.env.WEBHOOK_DISCROD_SERVER_MONITORING_URL ||
                'https://discord.com/api/webhooks/982865728833212466/SFLNC9ulwYCFsh1Wwb7JnYktti1Ura6-GWeA-TkfOimwv-y9I6dcukYLM7bPq2FNCYgd',
        },
    },

    pushNotif: {
        oneSignal: {
            appId: process.env.ONE_SIGNAL_APP_ID || '',
            restApiKey: process.env.ONE_SIGNAL_REST_API_KEY || '',
        },
    },

    otp: {
        defaultCode: '0000',
        timeExpired: {
            minutes: 5,
        },
    },

    cache: {
        ttl: 2880000,
        scope: {
            global: 'global',
            user: 'user',
        },
        name: {
            permissions: {
                detail: 'permission',
                list: 'list-permission',
            },
            roles: {
                detail: 'role',
                list: 'list-role',
            },
            rolePermissions: {
                detail: 'role-permission',
                list: 'list-role-permission',
            },
            users: {
                detail: 'user',
                list: 'list-user',
            },
            notification: {
                detail: 'notification',
                list: 'list-notification',
            },
        },
    },

    mail: {
        smtp: {
            host: process.env.SMTP_HOST || '',
            port: +process.env.SMTP_PORT || 587,
            emailSender: process.env.SMTP_EMAIL_SENDER || '',
            user: process.env.SMTP_USER || '',
            password: process.env.SMTP_PASSWORD || '',
        },
    },

    sms: {
        zenziva: {
            host:
                process.env.ZENZIVA_HOST ||
                'https://gsm.zenziva.net/api/sendsms',
            userKey: process.env.ZENZIVA_USERKEY || '',
            passKey: process.env.ZENZIVA_PASSKEY || '',
        },
    },

    /**
     * redis configuration
     */
    redis: {
        isEnabled: process.env.REDIS_IS_ENABLED || false,
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD || '',
        host: process.env.REDIS_HOST || 'localhost',
    },

    assets: {
        storage: process.env.STORAGE || 'local',
        public: process.env.BACKOFFICE_ASSETS || 'apps/backoffice/public',
        temp: process.env.BACKOFFICE_TEMP_FILE_ASSETS || 'temp',
    },

    product: {
        maxFeatured: process.env.PRODUCT_MAX_FEATURED || 3,
    },

    /**
     * database configuration
     */
    database: {
        dialect: process.env.DB_SERVER,
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        databaseTest: process.env.DB_DATABASE_TEST,
        maxQueryExecutionTimeInMs:
            process.env.DB_MAX_QUERY_EXECUTION_TIME_IN_MS || 0.000001,
    },

    databaseTest: {
        dialect: process.env.DB_SERVER_TEST,
        host: process.env.DB_HOSTNAME_TEST,
        port: process.env.DB_PORT_TEST,
        username: process.env.DB_USERNAME_TEST,
        password: process.env.DB_PASSWORD_TEST,
        database: process.env.DB_DATABASE_TEST,
    },

    /**
     * storage configuration for file uploads
     */
    storage: {
        s3: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            defaultRegion: process.env.AWS_DEFAULT_REGION,
            bucketName: process.env.AWS_BUCKET_NAME,
        },
        gcs: {
            projectId: process.env.GCS_PROJECT_ID,
            pathKeyFileJson: process.env.GCS_PATH_KEY_FILE_JSON,
            bucketName: process.env.GCS_BUCKET_NAME,
        },
        path: './storages',
    },

    /**
     * ethereum javascript library
     */
    web3: {
        httpProvider: process.env.RPC_SERVER,
        websocketProvider: process.env.RPC_SERVER_WS,
    },

    /**
     * platforms information goes here
     */
    platform: {
        privateKey: process.env.PLATFORM_PRIVATE_KEY,
        address: process.env.PLATFORM_ADDRESS,
    },

    /**
     * Sentry configuration
     */
    sentry: {
        dsn: process.env.SENTRY_DSN,
        tracesSampleRate: +process.env.TRACES_SAMPLE_RATE || 1.0,
        publicKey: process.env.SENTRY_PUBLIC_KEY,
        organizationSlug: process.env.SENTRY_ORGANIZATION_SLUG,
        projectIdentifierNumber: process.env.SENTRY_PROJECT_IDENTIFIER_NUMBER,
    },

    /**
     * disable signature validation
     */
    disableSignatureValidation:
        process.env.DISABLE_SIGNATURE_VALIDATION === 'true',

    /**
     * platform default token for each party.
     * used when user create party, deposit, withdraw.
     */
    defaultToken: {
        symbol: process.env.DEFAULT_TOKEN_SYMBOL ?? 'usdc',
        address: process.env.DEFAULT_TOKEN_ADDRESS,
        geckoTokenId: process.env.DEFAULT_TOKEN_ID,
    },

    /**
     * all external api goes here
     */
    api: {
        zerox: process.env.API_0X_URL,
        gecko: process.env.API_GECKO_URL,
    },

    /**
     * used for every calucation on application
     */
    calculation: {
        usdDecimal: 100,
        /**
         * percentage wei is used for fixed percentage value until 2 precision
         * ex: 10 ** 4 or 10000
         * 100%    = 1        = 1000000
         * 1%      = 0.01     = 10000
         * 0.01%   = 0.0001   = 100
         * 0.0001% = 0.000001 = 1
         */
        percentageWei: +process.env.MAX_FEE_PERCENTAGE / 100 || 10000,

        /**
         * 100% in percentageWei based on percentageWei value
         */
        maxPercentage: +process.env.MAX_FEE_PERCENTAGE || 1000000,

        /**
         * used to charge each user transaction on platform
         * value must in percentage wei as defined in percentageWei
         */
        platformFee: +process.env.PLATFORM_FEE || 5000,
    },

    scheduler: {
        partyGain: process.env.PARTY_GAIN_SCHEDULER === 'true' || true,
        transactionSyncRetrial:
            process.env.TRANSACTION_SYNC_RETRIAL_SCHEDULER === 'true' || true,
    },
};
