#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL

    CREATE TABLE quotes(
        quote_id SERIAL PRIMARY KEY,
        quote VARCHAR(255)
    );
EOSQL


