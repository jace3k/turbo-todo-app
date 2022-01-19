#!/bin/bash
set -e

### READING DB DETAILS FROM ENV
RUN_DB_SERVER=$(grep -oP '^PG_DOCKER_NAME=\K.*' .env)
RUN_DB_NAME=$(grep -oP '^POSTGRES_DATABASE=\K.*' .env)
RUN_DB_PASSWORD=$(grep -oP '^POSTGRES_PASSWORD=\K.*' .env)
###

echo $RUN_DB_SERVER
### FILL VALUES BEFORE RUN SCRIPT
SERVER=$RUN_DB_SERVER
DB=$RUN_DB_NAME
PW=$RUN_DB_PASSWORD
###

echo ">> stopping docker [$SERVER]..."
docker kill $SERVER || : 
docker rm $SERVER || :

echo ">> starting new docker [$SERVER]..."
docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
-e PGPASSWORD=$PW \
-p 5432:5432 \
-d postgres

echo ">> waiting for container..."
sleep 5

echo ">> creating db"
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres
