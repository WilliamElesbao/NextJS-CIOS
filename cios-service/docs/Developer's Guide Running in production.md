# CIOS-SERVICE (PRODUCTION) Deployment Guide

## How to Deploy

This guide provides a step-by-step process to deploy the CIOS-SERVICE application in a production environment.

#### Step 1: Test Locally
Ensure that the project builds successfully locally.

    npm run build

#### Step 2: Commit Changes
Commit all changes to the dev branch.

    git add .
    git commit -m "Your commit message"

#### Step 3: Open a new pull request
Merge `dev` into `prod` branch


### Server Configuration

#### Stop the application using PM2:
Open CMD as Administrator;
If the "cios-service" service is running, stop it
    
    pm2 stop <service_id>

#### Copy and Pasta Files
In your local project, after building the project in Nest, copy the following folders and files and paste them into the server folder (C:\projects\prod\cios-service):
- dist
- prisma (if there are changes in the schema, run npm run generate)
- .env
- src
- package.json

#### Environment Variables
Ensure the .env file contains the following variables:

    # Port
    PORT=3061

    # database config
    DATABASE_URL_003=
    DATABASE_URL_003_PORTAL
    DATABASE_URL_CIOS=

 
#### Prisma Configuration
Check the Prisma schema to ensure it is set to use the production database URL:

cios.prisma    

    // cios.prisma
    generator client {
        provider = "prisma-client-js"
        output   = "../../../../node_modules/@prisma/cios-client"
    }

    datasource db {
        provider = "sqlserver"
        url      = env("DATABASE_URL_CIOS")
    }

sql003.prisma

    // sql003.prisma
    generator client {
        provider = "prisma-client-js"
        output   = "../../../../node_modules/@prisma/sql003-client"
    }

    datasource db {
        provider = "sqlserver"
        url      = env("DATABASE_URL_003")
    }

sql003_portal

    // sql003_portal.prisma
    generator client {
        provider = "prisma-client-js"
        output   = "../../../../node_modules/@prisma/sql003_portal-client"
    }

    datasource db {
        provider = "sqlserver"
        url      = env("DATABASE_URL_003_PORTAL")
    }




If changes were made to the schema, generate the new schema:

    cd C:\projects\prod\cios-service
    npm run generate

#### Install Dependencies
Copy package.json to the project folder on the server, then install dependencies:

    cd C:\projects\prod\cios-service
    npm install

#### Package.json Configuration
Ensure package.json includes the following scripts:

    "scripts": {
        "build": "nest build",
        "start": "cross-env NODE_ENV=production nest start",
        "production": "cross-env NODE_ENV=production pm2 start dist/main.js --name cios-service",
        "generate": "npx prisma generate --schema ./src/infra/data/prisma/sql003.prisma --watch & npx prisma generate --schema ./src/infra/data/prisma/cios.prisma --watch & npx prisma generate --schema ./src/infra/data/prisma/sql003_portal.prisma --watch",
    },

#### Start the application using PM2:
    pm2 start <service_id>

Follow these steps to successfully deploy the CIOS-SERVICE application in a production environment. If you encounter any issues, refer to the logs for more information.

    pm2 logs <service_id>