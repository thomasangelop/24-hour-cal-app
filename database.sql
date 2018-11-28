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

CREATE TABLE "user1events" (
    "id" serial NOT NULL,
	"person_id" int NOT NULL,
	"pref_type_name" varchar (255),
	"title" varchar (255) NOT NULL,
	"description" varchar (255) NOT NULL,
	"location" varchar (255) NOT NULL,
    "start" timestamp with time zone NOT NULL,
    "end" timestamp with time zone NOT NULL,
    "text" varchar (255) NOT NULL,
    "color" varchar (255) NOT NULL,
	"days_out_of_the_week" varchar (255)
);