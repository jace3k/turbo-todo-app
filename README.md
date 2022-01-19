# Turbo todo app
Simple backend-frontend application to organize your tasks.
### Tech stack
- Nest.js + TypeORM + PostgresQL
- Vue.js
- Docker
- yarn workspaces

### Getting started

1. Build shared library
```
yarn build:shared
```
2. Build backend
```
yarn build:backend
```

or 

```
yarn build:backend:all
```
to build backend + create dockerized postgres database + run migrations 
> remember to prepare .env file with postgres details using sample.env

3. To work with backend, go to backend folder and use
```
yarn run start:dev
```
4. To build backend use
```
yarn run build
```
5. To create new migration use
```
yarn run migration:generate MigrationName
```
It will generate new migration based on your latest entity changes.
6. To run migrations use
```
yarn run migration
```
7. To run tests use
```
yarn run test
```
It will run e2e tests with in memory SQLite database.