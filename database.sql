-- DATABASE is called "prime_app"
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!


--"client_id" INT REFERENCES "client" NOT NULL,

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "team_name" VARCHAR (100) NOT NULL,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "client" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL,
    "user_id" INT REFERENCES "user"
);

CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR (255) NOT NULL,
    "completed_by" VARCHAR (255),
    "completed" VARCHAR (1),
    "client_id" INT REFERENCES "client"
    
);


--to drop tables
DROP TABLE IF EXISTS "tasks";
DROP TABLE IF EXISTS "client";
DROP TABLE IF EXISTS "user";















