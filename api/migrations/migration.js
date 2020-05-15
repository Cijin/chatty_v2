const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.DATABASE || './database.sqlite');

db.run('CREATE TABLE IF NOT EXISTS `chats`' + 
    '(`id` INTEGER NOT NULL, `contact_table_id` TEXT, ' +
    '`contact_email` TEXT NOT NULL, `contact_name` TEXT NOT NULL, ' +
    'PRIMARY KEY(`id`));'
);

export default function createContactTable (tableName) {
    const sql = 'CREATE TABLE IF NOT EXISTS $tableName ' + 
        '(`id` INTEGER NOT NULL, `messages` TEXT NOT NULL, `time` TEXT NOT NULL);';

    const value = {
        $tableName: tableName,
    };

    db.run(sql, value, function(error) {
        if (error) {
            next(error);
        }        
    });
}