import dotenv from 'dotenv';

dotenv.config();

export const config = {
    /**
     * server configuration
     */
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT_API || '3000',
    host: process.env.HOST_API || 'https://api-dev.buangdisini.my.id',

    deposit: {
        aleradyPickMaxTimeWait: {
            inHour: 1,
        },
        expiredDeposit: {
            inHour: 1,
        },
    },

    timezone: process.env.TZ || 'Asia/Jakarta',

    upload: {
        image: {
            maxSize: {
                inMb: +process.env.MAX_SIZE_IMAGE_UPLOAD_IN_MB || 7,
            },
            compressed: {
                quality: 0.8,
                width: 800,
            },
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

    auth: {
        jwt: {
            secret: process.env.JWT_SECRET_KEY || 'secret',
            timeExpired: {
                year: process.env.JWT_EXPIRES_IN_YEAR || 1,
            },
        },
    },

    pushNotif: {
        oneSignal: {
            appId: process.env.ONE_SIGNAL_APP_ID || '',
            restApiKey: process.env.ONE_SIGNAL_REST_API_KEY || '',
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
        gosmsapi: {
            host: process.env.GOSMSAPI_HOST || '',
            user: process.env.GOSMSAPI_USERNAME || '',
            pass: process.env.GOSMSAPI_PASS || '',
        },
    },

    otp: {
        defaultCode: '0000',
        timeExpired: {
            minutes: 5,
        },
        maxTrialResend: +(process.env.MAX_TRIAL_RESEND_OTP || '3'),
        allowRetryAfterMaxRetry: {
            minutes: +(process.env.ALLOW_RETRY_OTP_AFTER_IN_MIN || '5'),
        },
        cooldownResend: {
            minutes: +(process.env.COOLDOWN_RETRY_OTP || '1'),
        },
    },

    /**
     * database configuration
     */
    payment: {
        xendit: {
            subAccount: {
                automotive:
                    process.env.XENDIT_SUB_ACCOUNT_PAYMENT_AUTOMOTIVE ||
                    '626be9a19e71a9b1fe3c6433',
            },
            secretKey:
                process.env.XENDIT_SECRET_KEY ||
                'xnd_development_WLbrAwPTcKgVK6G9EkoGWi6W6dULU92gUPujSuo8Tpwe345sMBjWn4zX56wnn1Qa',
            callbackToken:
                process.env.XENDIT_CALLBACK_TOKEN ||
                '02rs9fVz5W63skXKDKb6GUMrfwTELaUnbG3igwZx5731f8aD',
            host: process.env.XENDIT_HOST || 'https://api.xendit.co',
        },
        expired: {
            minutes: process.env.PAYMENT_TIMEOUT_IN_MINUTES
                ? +process.env.PAYMENT_TIMEOUT_IN_MINUTES
                : 30,
        },
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

    assets: {
        storage: process.env.STORAGE || 'local',
        public: process.env.API_ASSETS || 'apps/api/public',
        temp: process.env.API_TEMP_FILE_ASSETS || 'temp',
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
     * online error log service credentials
     */
    sentry: {
        dsn: process.env.SENTRY_DSN,
        tracesSampleRate: +process.env.TRACES_SAMPLE_RATE || 1.0,
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
     * all external api goes here
     */
    user: {
        profile: {
            defaultUrl:
                'https://storage.googleapis.com/buangdisini-local/uploads%2F5pZGMhrto0H6enFYluKBBlBGz4Kuxrhi5CQ76080eS25LnisbA-b310ee0c20127151136bb96411d9f5e1-compressed-Screen%20Shot%202022-09-24%20at%2018.41.14.png',
        },
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
