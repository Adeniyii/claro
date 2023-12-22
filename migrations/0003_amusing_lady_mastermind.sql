ALTER TABLE "files" ADD COLUMN "icon_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "in_trash" text;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "logo" text;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "banner_url" text;--> statement-breakpoint
ALTER TABLE "folders" ADD COLUMN "icon_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "folders" ADD COLUMN "in_trash" text;--> statement-breakpoint
ALTER TABLE "folders" ADD COLUMN "logo" text;--> statement-breakpoint
ALTER TABLE "folders" ADD COLUMN "banner_url" text;--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "icon_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "in_trash" text;--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "logo" text;--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "banner_url" text;