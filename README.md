# Alhilaal Real Estate

This repository contains a Next.js 13 project that utilizes environment variables for configuration.

## Setup

1. Clone the repository to your local machine.

```
https://github.com/ahmedibradotcom/alhilaal-real-estate.git
```

2. Install the project dependencies.

```
cd alhilaal-real-estate
npm install
```

3. Copy `.env.example` to `.env` file in the root directory of the project.

```
cp .env.example .env
```

Replace `<your-database-url>`, `<your-google-client-id>`, and `<your-google-client-secret>` with your actual values.

## Development

To start the development server, run the following command:

```
npm run dev
```

This will start the Next.js development server and your application will be accessible at [http://localhost:3000](http://localhost:3000).

## Deployment

To deploy the project to a production environment, make sure to set the environment variables on your hosting platform or container.

## Additional Information

-   The `DATABASE_URL` environment variable should contain the URL for your database connection.
-   The `GOOGLE_CLIENT_ID` environment variable should contain the client ID for your Google OAuth application.
-   The `GOOGLE_CLIENT_SECRET` environment variable should contain the client secret for your Google OAuth application.

Make sure to keep the `.env` file private and never commit it to version control to avoid exposing sensitive information.

## License

This project is licensed under the [MIT License](LICENSE).
