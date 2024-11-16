
# Private Clinic

This is a project for managing medical appointments, patients, and doctors for a private clinic.

## Prerequisites

To run this project, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (preferably the LTS version)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (or any compatible database system with cloud service)

## Environment Variables

This project requires the following environment variables to be set in a `.env` file at the root of your project:

```
DB_HOST=hostname
DB_PORT=1234
DB_NAME=defaultdb
DB_USER=admin
DB_PASSWORD=password
DB_SSLMODE=require

JWT_SECRET='a little secret'
```

### Explanation of Variables:

- `DB_HOST`: The address of the PostgreSQL database server.
- `DB_PORT`: The port number for the database connection.
- `DB_NAME`: The name of the database you are using.
- `DB_USER`: The username for the database.
- `DB_PASSWORD`: The password for the database user.
- `DB_SSLMODE`: The SSL connection mode for the database.
- `JWT_SECRET`: The secret key used to sign and verify JWT tokens.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/lukkaku12/privateClinic.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Private-Clinic
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   or if you use Yarn:

   ```bash
   yarn install
   ```

## Running the Application

To run the project in development mode, use the following command:

```bash
npm run start:dev
```

or if you use Yarn:

```bash
yarn start:dev
```

The server will run at `http://localhost:3000`.

## Swagger API Documentation

Once the server is running, you can access the API documentation via Swagger at:

```
http://localhost:3000/api/v1
```

This will provide you with an interactive interface to test the endpoints.

## License

This project is licensed under the MIT License.

## UML

![UML Diagram](uml-diagram.png)
![Usage Case Diagram](http://www.plantuml.com/plantuml/dpng/XP9DJiCm48NtFiMZAofHZe2Ae6ABXDJzr9wc8_cdiXqak0rduMAuReBIf4fNSMQ-cNcUvtNA57FhhBhB1tOCSjAG8fr3nEATjB3Fl00bz3zzyZMSlZLrFYhL8rWzuNxB4KRICNZPYHL31ePXAiffUGb_i6Mj9NYA7O8l74AaA664lWI_b-WAg2NJKjqQX5LNbLgRQOAonuuIrnBAeGYR5uDLTxa-aluxMYxL8tqT_zPID5seD2ETMxBoFP6pLCg7p8ZI73B2VdfTO6EH96LsX4-EiXTD9G2slI9mohy_0raAPMPfKK1BumNeu09y6E2FYht1IOTIPslhuZSfKybgdeWUKbi-AqqmZ6DdNBf0DgRahrCpGouNUTl5wqB6p-6wYh72SVdpm3_EP2rNp58jcPWuqw_wsR-oOyibIRFD7wfX2j3aTb8OIzLt150JkQ5uSexImCHrERNE_W40)