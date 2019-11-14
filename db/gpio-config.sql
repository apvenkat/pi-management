CREATE TABLE IF NOT EXISTS `gpiolist` (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`name`	TEXT ,
	`description`	TEXT,
	`pin`	INTEGER UNIQUE,
	`type`	TEXT,
	`value`	TEXT 
);