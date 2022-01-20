/*
RUN psql -d postgres -U bootcamp43
RUN  \c banka \i src/tables/users.sql
*/

DROP TABLE IF EXISTS comments;

CREATE TABLE comments
(
    id          BIGINT       PRIMARY KEY NOT NULL,
    film_id     TEXT         NOT NULL,
    comment        VARCHAR(500)    NOT NULL,
    ip_address  TEXT         NOT NULL,
    create_date TIMESTAMPTZ  DEFAULT NOW()
);
