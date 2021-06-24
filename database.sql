CREATE DATABASE todo_database;

--\c into todo_database

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);


CREATE DATABASE quote_database;


CREATE TABLE quotes(
    quote_id SERIAL PRIMARY KEY,
    quote VARCHAR(255)
);
