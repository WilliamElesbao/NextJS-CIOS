# TM-CIOS (PRODUCTION) Deployment Guide

## How to Deploy

This guide provides a step-by-step process to deploy the TM-CIOS application in a production environment.

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
If the tm-cios service is running, stop it
    
    pm2 stop <service_id>

#### Git Checkout
Using Git GUI as an administrator, checkout from `prod` branch.

#### Environment Variables
Ensure the .env file contains the following variables:

    # database config
    DATABASE_URL=

    AUTH_SECRET=

    APP_URL="https://cios.tmsa.ind.br"

    AUTH_TRUST_HOST=

    AUTH_URL="https://cios.tmsa.ind.br"


    # nodemailer config
    EMAIL_SERVER_USER=

    EMAIL_SERVER_PASSWORD=

    EMAIL_SERVER_HOST=

    EMAIL_SERVER_PORT=

    EMAIL_FROM=

    # Microsoft Entra ID
    AUTH_MICROSOFT_ENTRA_ID_ID=
    AUTH_MICROSOFT_ENTRA_ID_SECRET=
    AUTH_MICROSOFT_ENTRA_ID_TENANT_ID=
 
#### Prisma Configuration
Check the Prisma schema to ensure it is set to use the production database URL:

    datasource db {
    url = env("DATABASE_URL")
    }

If changes were made to the schema, generate the new schema:

    cd C:\projects\prod\tm-cios
    npx prisma generate

To ensure migrations are applied, run:

    npx prisma migrate dev

    npx prisma generate

#### Install Dependencies
Copy package.json and package-lock.json to the project folder on the server, then install dependencies:

    cd C:\projects\prod\tm-cios
    npm install

#### Package.json Configuration
Ensure package.json includes the following scripts:

    "scripts": {
    "start": "cross-env NODE_ENV=production next start",
    "production": "cross-env NODE_ENV=production pm2 start server.js --name tm-cios"
    }

#### Server.js File
Create a server.js file with the following content:

    const { createServer } = require('http');
    const { parse } = require('url');
    const next = require('next');

    const dev = process.env.NODE_ENV !== 'production';
    const hostname = 'localhost';
    const port = 3060;

    const app = next({ dev, hostname, port });
    const handle = app.getRequestHandler();

    app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
        const parsedUrl = parse(req.url, true);
        const { pathname, query } = parsedUrl;

        if (pathname === '/a') {
            await app.render(req, res, '/a', query);
        } else if (pathname === '/b') {
            await app.render(req, res, '/b', query);
        } else {
            await handle(req, res, parsedUrl);
        }
        } catch (err) {
        console.error('Error occurred handling', req.url, err);
        res.statusCode = 500;
        res.end('internal server error');
        }
    })
        .once('error', (err) => {
        console.error(err);
        process.exit(1);
        })
        .listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
        });
    });

#### Build and Start the Application
In the project directory, run the build command:

    npm run build

#### Start the application using PM2:
    pm2 start <service_id>

Follow these steps to successfully deploy the TM-CIOS application in a production environment. If you encounter any issues, refer to the logs for more information.

    pm2 logs <service_id>