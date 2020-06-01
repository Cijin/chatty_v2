const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

function createContactsTable() {
    db.run('CREATE TABLE IF NOT EXISTS `contacts`' + 
        '(`id` INTEGER NOT NULL, `contact_table_id` TEXT, ' +
        '`contact_email` TEXT NOT NULL, `contact_name` TEXT NOT NULL, ' +
        'status TEXT DEFAULT "Using Chatty", is_active NUMBER DEFAULT 0 ' +
        ', PRIMARY KEY(`id`));'
    );
}

export default createContactsTable;