/*
RUN psql -d postgres -U bootcamp43
RUN  \c banka \i src/tables/users.sql
*/

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS comments;

CREATE TABLE comments
(
    id          UUID         PRIMARY KEY DEFAULT uuid_generate_v4 (),
    film_id     INTEGER      NOT NULL,
    comment     VARCHAR(500) NOT NULL,
    ip_address  INET         NOT NULL,
    create_date TIMESTAMPTZ  DEFAULT NOW()
);
