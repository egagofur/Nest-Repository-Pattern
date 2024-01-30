# Requirements:

-   NodeJS LTS 16+
-   NestJS 8.4
-   MySQL 5.7
-   RabbitMQ with Delayed Message Plugins
-   Redis

# Quick Start Backoffice:

-   Create Database
-   Run RabbitMQ (by docker : `docker run --name rabbitdock -p5672:5672 heidiks/rabbitmq-delayed-message-exchange:latest`)
-   Run Redis (by docker : `docker run --name redisdock -p6379:6379 -d redis`)
-   Copy file `.env.example` ubah ke `.env` kemudian setting konfigurasinya
-   Run `yarn install`
-   Run `yarn migrate`
-   Run `yarn seed:run`
-   Run `yarn webpack:backoffice:dev` for FE
-   Run `yarn start:dev backoffice` for BE

# Quick Start API:

-   Create Database
-   Run RabbitMQ (by docker : `docker run --name rabbitdock -p5672:5672 heidiks/rabbitmq-delayed-message-exchange:latest`)
-   Run Redis (by docker : `docker run --name redisdock -p6379:6379 -d redis`)
-   Copy file `.env.example` ubah ke `.env` kemudian setting konfigurasinya
-   Run `yarn install`
-   Run `yarn migrate`
-   Run `yarn seed:run`
-   Run `yarn start:dev api` for BE

# Quick Start GraphQL:

-   Create Database
-   Run Redis (by docker : `docker run --name redisdock -p6379:6379 -d redis`)
-   Copy file `.env.example` ubah ke `.env` kemudian setting konfigurasinya
-   Run `yarn install`
-   Run `yarn migrate`
-   Run `yarn seed:run`
-   Run `yarn start:dev graphql` for BE

# Install and run Backoffice:

-   Copy file `.env.example` ubah ke `.env` kemudian setting konfigurasinya
-   Run `yarn install`
-   Run `yarn webpack:backoffice:prod`
-   Run `yarn build`
-   Run `cp -r apps/backoffice/public dist/apps/backoffice` - untuk running UI
-   Run `cp -r apps/backoffice/assets dist/apps/backoffice` - untuk running UI
-   Run `yarn start:prod:backoffice` or `yarn start:dev backoffice` (local)

# Install and run Api:

-   Copy file `.env.example` ubah ke `.env` kemudian setting konfigurasinya
-   Run `yarn install`
-   Run `yarn build`
-   Run `cp -r apps/api/assets dist/apps/api`
-   Run `cp -r apps/api/src/infrastructure/mail dist/apps/api/src/infrastructure`
-   Run `yarn start:prod:api` or `yarn start:dev api` (local)

# Setup Sentry and Logrocket

-   set `SENTRY_DSN` and `TRACES_SAMPLE_RATE` in `.env` for sentry DSN & traces sample rate.
-   set `LOGROCKET_APP_ID` in `.env` for logrocket APP_ID

# Database Commands:

| Command                                  | Description                                              |
| ---------------------------------------- | -------------------------------------------------------- |
| `yarn migrate`                           | Create tables                                            |
| `yarn migrate:create [migration_name]`   | Create migration but is empty                            |
| `yarn migrate:generate [migration_name]` | Generate migration add or changes the entities directory |
| `yarn seed:run`                          | Run the seeder                                           |
| `yarn schema:drop`                       | Drop all tables                                          |

### DB Schema ERD:

We use DBML to create and publish the ERD documentation. Visit [here](https://www.dbml.org/home/#dbdiagram) to show you how to (official documentation)

### Published Edited DBDOCS Commands:

-   Run `yarn dbdocs:publish`

Run Seeder:

```bash
yarn seed:run

// with specific class name
yarn seed:run -s CreateAppProvinceSeeder
yarn seed:run -s CreateAppCitySeeder

// reset database
yarn schema:drop && yarn migrate && yarn seed:run
```

## Project anatomy

```
├── api
│   ├── assets
│   ├── dist
│   ├── src
│   │   ├── cache
│   │   ├── common
│   │   │   ├── constants
│   │   │   ├── enums
│   │   │   ├── filters
│   │   │   ├── interceptors
│   │   │   ├── interface
│   │   │   ├── pipes
│   │   │   ├── request
│   │   │   ├── rules
│   │   │   └── utils
│   │   ├── health
│   │   ├── infrastructure
│   │   │   ├── applications
│   │   │   ├── cache
│   │   │   │   ├── decorators
│   │   │   │   ├── interceptors
│   │   │   │   ├── middlewares
│   │   │   │   └── services
│   │   │   ├── error
│   │   │   ├── mail
│   │   │   │   └── templates
│   │   │   ├── notification
│   │   │   │   └── services
│   │   │   └── schedules
│   │   └── modules
│   │       ├── auth
│   │       │   ├── applications
│   │       │   ├── controllers
│   │       │   │   └── v1
│   │       │   ├── dto
│   │       │   ├── guards
│   │       │   ├── responses
│   │       │   ├── serializers
│   │       │   ├── services
│   │       │   └── strategies
│   │       ├── common
│   │       │   ├── applications
│   │       │   ├── controllers
│   │       │   │   └── v1
│   │       │   ├── dto
│   │       │   └── services
│   │       ├── queue
│   │       │   ├── contants
│   │       │   ├── contracts
│   │       │   └── services
│   │       └── user
│   │           ├── applications
│   │           ├── controllers
│   │           │   └── v1
│   │           ├── request
│   │           ├── responses
│   │           └── services
│   └── storages
├── backoffice
│   ├── app
│   │   ├── Components
│   │   │   ├── atoms
│   │   │   │   └── Button
│   │   │   ├── molecules
│   │   │   │   ├── Breadcrumbs
│   │   │   │   ├── DescriptionContainer
│   │   │   │   ├── Dropdowns
│   │   │   │   ├── Form
│   │   │   │   ├── Headers
│   │   │   │   ├── Pickers
│   │   │   │   ├── Progress
│   │   │   │   ├── RowActionButtons
│   │   │   │   ├── Section
│   │   │   │   └── TimelinesItem
│   │   │   └── organisms
│   │   │       ├── DataTable
│   │   │       ├── FilterSection
│   │   │       │   └── InputCollection
│   │   │       └── FormContainer
│   │   ├── Contexts
│   │   ├── Enums
│   │   ├── Layouts
│   │   │   ├── Login
│   │   │   └── MainLayout
│   │   ├── Modules
│   │   │   ├── Auth
│   │   │   │   ├── ForgotPassword
│   │   │   │   └── Login
│   │   │   ├── Common
│   │   │   ├── Inertia
│   │   │   ├── Notification
│   │   │   ├── Page
│   │   │   ├── Profile
│   │   │   └── User
│   │   ├── Pages
│   │   │   ├── Configs
│   │   │   ├── Iam
│   │   │   │   ├── Permissions
│   │   │   │   ├── RolePermissions
│   │   │   │   ├── Roles
│   │   │   │   └── Users
│   │   │   ├── LogActivities
│   │   │   ├── Notifications
│   │   │   ├── Profile
│   │   │   └── Sample
│   │   │       ├── Detail
│   │   │       └── Form
│   │   ├── Types
│   │   └── Utils
│   ├── assets
│   ├── public
│   │   ├── css
│   │   ├── img
│   │   ├── js
│   │   ├── lib
│   │   │   ├── bootstrap
│   │   │   │   └── dist
│   │   │   │       ├── css
│   │   │   │       └── js
│   │   │   ├── jquery
│   │   │   │   └── dist
│   │   │   ├── jquery-validation
│   │   │   │   └── dist
│   │   │   └── jquery-validation-unobtrusive
│   │   ├── temp
│   │   └── unity
│   │       ├── css
│   │       ├── img
│   │       └── js
│   │           └── lib
│   ├── src
│   │   ├── common
│   │   │   ├── enums
│   │   │   ├── filters
│   │   │   ├── interceptors
│   │   │   ├── interface
│   │   │   ├── pipes
│   │   │   ├── request
│   │   │   ├── rules
│   │   │   └── utils
│   │   ├── infrastructure
│   │   │   ├── ability
│   │   │   ├── applications
│   │   │   ├── cache
│   │   │   │   ├── decorators
│   │   │   │   ├── middlewares
│   │   │   │   └── services
│   │   │   ├── entities
│   │   │   │   └── subscribers
│   │   │   ├── error
│   │   │   ├── event
│   │   │   ├── inertia
│   │   │   │   ├── adapter
│   │   │   │   ├── entities
│   │   │   │   └── middlewares
│   │   │   ├── mail
│   │   │   │   └── templates
│   │   │   ├── notification
│   │   │   │   └── services
│   │   │   ├── redis
│   │   │   ├── sentry
│   │   │   └── serializers
│   │   └── modules
│   │       ├── auth
│   │       │   ├── applications
│   │       │   ├── controllers
│   │       │   ├── guards
│   │       │   ├── requests
│   │       │   ├── responses
│   │       │   ├── serializers
│   │       │   ├── services
│   │       │   └── strategies
│   │       ├── common
│   │       │   └── controllers
│   │       ├── config
│   │       │   ├── applications
│   │       │   ├── controllers
│   │       │   ├── guards
│   │       │   ├── mappers
│   │       │   ├── requests
│   │       │   ├── responses
│   │       │   └── services
│   │       ├── glob
│   │       │   └── service
│   │       ├── iam
│   │       │   ├── applications
│   │       │   ├── controllers
│   │       │   ├── decorators
│   │       │   ├── guards
│   │       │   ├── mappers
│   │       │   ├── middlewares
│   │       │   ├── policies
│   │       │   ├── requests
│   │       │   ├── responses
│   │       │   └── services
│   │       ├── log-activity
│   │       │   ├── applications
│   │       │   ├── controllers
│   │       │   ├── requests
│   │       │   ├── responses
│   │       │   └── services
│   │       ├── main
│   │       │   └── controllers
│   │       ├── notification
│   │       │   ├── applications
│   │       │   ├── controllers
│   │       │   ├── middlewares
│   │       │   ├── requests
│   │       │   └── services
│   │       ├── profile
│   │       │   ├── applications
│   │       │   ├── controllers
│   │       │   ├── requests
│   │       │   ├── responses
│   │       │   └── services
│   │       └── queue
│   │           ├── contants
│   │           ├── contracts
│   │           └── services
│   └── storages
└── graphql
    ├── assets
    ├── public
    └── src
        ├── common
        │   ├── enums
        │   ├── filters
        │   ├── guards
        │   ├── interface
        │   ├── middlewares
        │   ├── request
        │   └── utils
        ├── infrastructure
        │   ├── applications
        │   └── cache
        │       ├── decorators
        │       ├── middlewares
        │       └── services
        └── modules
            ├── auth
            │   ├── applications
            │   ├── resolvers
            │   ├── services
            │   └── types
            └── iam
                ├── applications
                ├── mutations
                ├── resolvers
                ├── services
                └── types
```

# VSCode Extentions

-   [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

# Storybook

-   Join to Project with this [Invitation](https://www.chromatic.com/start?inviteToken=bef9eace42194e5b946ce262cfcdc114&appId=63e99a087b83cb54af1a7d25)
-   Storybook link. [Learn more](https://www.chromatic.com/docs/permalinks)

```
https://<branch>--63e99a087b83cb54af1a7d25.chromatic.com
```
