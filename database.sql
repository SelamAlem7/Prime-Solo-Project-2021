-- DATABASE is called "solo_project"
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "team_name" VARCHAR (100) NOT NULL,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "client" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL,
    "diagnosis_list" VARCHAR (3000),
    "user_id" INT REFERENCES "user"
);

CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR (255) NOT NULL,
    "completed" BOOLEAN,
    "completed_by" VARCHAR (255),
    "client_id" INT REFERENCES "client"
);