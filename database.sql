--database name: 24_hour_cal

CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "userPreferences" (
	"id" serial NOT NULL,
	"person_id" int NOT NULL,
	"type_name" varchar (255) NOT NULL,
	"start_date" timestamp with time zone,
	"end_date" timestamp with time zone,
	"time_duration" TIME,
	"days_out_of_the_week" varchar (255)
);

CREATE TABLE "events" (
	"id" serial NOT NULL,
	"person_id" int NOT NULL,
	"type_name" varchar (255) NOT NULL,
	"event_name" varchar (255) NOT NULL,
	"start_date" timestamp with time zone,
	"end_date" timestamp with time zone,
	"time_duration" TIME,
	"days_out_of_the_week" varchar (255)
);










