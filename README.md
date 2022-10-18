--Setup the database --

in psql run

.CREATE USER shopping_user WITH PASSWORD '123'
.CREATE DATABASE shopping
.GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;


enviroment variable setup

PORT=3000
DATABASE_USER=##
DATABASE_HOST=localhost
DATABASE_dev=shopping
DATABASE_test=shopping_test
USER_PASSWORD=##
DATABASE_PORT=5432
BCRYPT_PASSWORD=##
SALT_ROUND=10
JWT_SECRET=##
ENV= test or dev
JWT_EXPIRES_IN=##

add a database.json file in the root directory and set the missing ### parameters
before testing run migrations db-migrate -e test up
{
    "dev": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "shopping",
      "user": ##,
      "password": ##,
      "port":5432
    },
    "test": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "shopping_test",
      "user": ##,
      "password": ##
    }
  }

set-up 

.npm i to install all dependencies
.db-migrate to apply database 
.db-migrate down to delete database migrations 

starting the App

.npm start:prod for starting the app access via localhost:3000/
.npm run test for runing tests
.npm run format for running the formatter
.npm run lint for running the linter 
.npm start to run app in development




