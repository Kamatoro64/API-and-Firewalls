FROM postgres:latest
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=quotes-api-test
COPY ./test_db_init.sh /docker-entrypoint-initdb.d/

