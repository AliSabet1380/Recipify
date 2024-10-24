ALTER TABLE "recipes" ADD COLUMN "ings" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "recipes" DROP COLUMN IF EXISTS "ing";