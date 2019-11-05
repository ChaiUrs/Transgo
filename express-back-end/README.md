## Google Cloud Platfrom setup

1. Navigate to Google Cloud Platfrom

2. Create a project

3. Under API & Services, Click Credentials to create a GoogleApiKey for your project

4. Click Library under API & Services

5. In the library, enable the following APIs-
* Maps JavaScript API
* Places API
* Directions API
* Cloud Vision API
* Geocoding API
* Geolocation API
* Distance Matrix API

6. Follow instructions to setup Server

## Server Setup 

1. Within the project directory in command line - `cd` into `express-back-end`. Run `npm install` or `yarn` to install the dependencies.

2. In other terminal within vagrant machine, Run `psql` to enter postgreSQL from command line.

3. Run command `CREATE USER final WITH PASSWORD 'final';` to create user

4. Run command `CREATE DATABASE final_project WITH OWNER = final;` to create database 'finalProject' with user 'final'

5. Create `.env` file under `express-back-end` directory

6. Add the following into .env file - `PGHOST=localhost PGUSER=final PGPASSWORD=final PGDATABASE=final_project PGPORT=5432 PORT=8000 APIKEY=[enter your google api key here]`
 
7. Run `\q` to exit command line postgreSQL

8. To re-enter database from command line postgreSQL, run - `psql final_project final` then enter password: `final`

9. Within the `express-back-end` directory, Run `npm start` or `yarn start`, and go to `localhost:8000` in your browser to start the server.
