CREATE TABLE "ngo_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"ngo_id" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"urgency" text,
	"quantity" text,
	"status" "donation_status" DEFAULT 'PENDING',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "ngo_requests" ADD CONSTRAINT "ngo_requests_ngo_id_users_id_fk" FOREIGN KEY ("ngo_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;