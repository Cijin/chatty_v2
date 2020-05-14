const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.DATABASE || './database.sqlite');

db.run('CREATE TABLE IF NOT EXISTS `chats`' + 
    '(`id` INTEGER NOT NULL, `contact_table_id` INTEGER NOT NULL, ' +
    '`contact_email` TEXT NOT NULL, `contact_name` TEXT NOT NULL, ' +
    'PRIMARY KEY(`id`))'
);