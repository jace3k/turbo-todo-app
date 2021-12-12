#!/bin/bash
# source: https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f
set -e

SERVER=""
PW=""
DB=""

echo ">> stopping docker [$SERVER]..."
docker kill $SERVER && docker rm $SERVER

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