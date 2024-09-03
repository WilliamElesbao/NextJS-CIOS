# TM-CIOS - Documentation of the Folder Structure for the Check In & Out System Project

## Folder Structure

The folder structure of the project is organized in a way that separates main functionalities, making maintenance and scalability of the system easier.

### Folder Descriptions

##### `public`

- ###### `/attachments`

  - Location where attachments (images) are saved.

- ###### `/icons`

  - Icons (images) used as static images in the application.

- ###### `/logos`
  - Logos (images) used as static images in the application.

##### `src`

- All the codable parts of the application.

###### `src/app`

- Contains the main routes and pages of the application.

###### `src/components`

- Contains reusable components of the application.

###### `src/lib`

- Contains utility functions and configurations.

    - ###### ` actions.ts`
        Server actions responsible for the system's CRUD operations.
    - ###### ` constants.ts`:
        System constants.
    - ###### ` data.ts`:
        Functions and queries that fetch data for components to display on the screen.
    - ###### ` definitions.ts`:
        Type definitions.
    - ###### ` email-sender.tsx`:
        Email sending function.
    - ###### ` schemas.tsx`:
        Validation schemas (Zod).
    - ###### ` utils.ts`:
        Utility functions.

###### `src/middleware.ts`

- Next.js middleware file.

###### `src/providers`

- Contains context providers.

    - ###### `theme-provider.tsx`: 
        Theme provider.

###### `src/services`

- Contains application services.
    - ###### `/auth`: 
        - Authentication services.
    - ###### `/db`: 
        - Database service.

###### `src/styles`

- Contains CSS style files.

    - `animation.css`: 
        Animation styles.
    - `globals.css`: 
        Global application styles.

###### `.env`

Environment variables for the system:

    # database config
    DATABASE_URL=

    AUTH_SECRET=

    APP_URL=

    AUTH_TRUST_HOST=

    AUTH_URL=

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

This documentation provides an overview of the code organization and folder structure of the Check In & Out System project. Each folder is organized to separate responsibilities and facilitate code navigation and maintenance.
