const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

function createContactTable (tableName) {
    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} ` + 
        `('id' INTEGER NOT NULL, 'messages' TEXT NOT NULL, 'time' TEXT NOT NULL, ` + 
        `PRIMARY KEY('id'));`;

    db.run(sql, error => {
        console.log(error);
    });
}

module.exports = createContactTable;