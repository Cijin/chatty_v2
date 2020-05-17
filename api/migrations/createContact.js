const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

function createContactTable (tableName, next) {
    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} ` + 
        `('id' INTEGER NOT NULL, 'messages' TEXT NOT NULL, 'time' TEXT NOT NULL, ` + 
        `PRIMARY KEY('id'));`;

    db.run(sql, function(error) {
        if (error) {
            next(error);
        }  
        else { return; }      
    });
}

module.exports = createContactTable;