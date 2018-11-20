--database name: 24_hour_cal

CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "userpreferences" (
    "id" serial NOT NULL,
    "person_id" int NOT NULL,
    "type_name" varchar (255) NOT NULL,
    "start_date" timestamp with time zone,
    "end_date" timestamp with time zone,
    "time_duration" interval,
    "days_out_of_the_week" varchar (255)
);

CREATE TABLE "events" (
    "id" serial NOT NULL,
    "person_id" int NOT NULL,
    "type_name" varchar (255) NOT NULL,
    "event_name" varchar (255) NOT NULL,
    "start_date" timestamp with time zone,
    "end_date" timestamp with time zone,
    "time_duration" interval,
    "days_out_of_the_week" varchar (255)
);

INSERT INTO userpreferences (person_id, type_name, start_date, end_date, time_duration, days_out_of_the_week) 
VALUES (1, 'Fitness', '2004-10-19 10:23:54+02', '2004-10-19 13:23:54+02', '20 minutes', 'M, W, F');