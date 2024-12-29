CREATE TABLE `companies` (
	`id` varchar(255) NOT NULL,
	`company_name` varchar(255) NOT NULL,
	`address` text NOT NULL,
	`postal_code` varchar(255) NOT NULL,
	`city` varchar(255) NOT NULL,
	`region` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(255) NOT NULL,
	`tax_id` varchar(255) NOT NULL,
	`nib` varchar(255),
	`description` text NOT NULL,
	`company_fields` text NOT NULL,
	`user_id` int NOT NULL,
	`updated_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `companies_id` PRIMARY KEY(`id`),
	CONSTRAINT `companies_company_name_unique` UNIQUE(`company_name`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`password` varchar(256) NOT NULL,
	`is_verified` boolean DEFAULT false,
	`updated_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `companies` ADD CONSTRAINT `companies_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;