CREATE TABLE `contracts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`abi` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `functions` (
	`contract_id` integer NOT NULL,
	`selector` text NOT NULL,
	`comment` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	PRIMARY KEY(`contract_id`, `selector`),
	FOREIGN KEY (`contract_id`) REFERENCES `contracts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`address` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `contracts_name_unique` ON `contracts` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `contracts_abi_unique` ON `contracts` (`abi`);--> statement-breakpoint
CREATE UNIQUE INDEX `functions_selector_unique` ON `functions` (`selector`);