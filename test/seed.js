const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./test/test.sqlite');

function seedContactsDatabase(done) {
    db.serialize(function() {
        db.run('DROP TABLE IF EXISTS contacts');
        db.run('CREATE TABLE `contacts` (' +
            '`id` INTEGER NOT NULL, `contact_table_id` TEXT, ' + 
            '`contact_email` TEXT NOT NULL, `contact_name` TEXT NOT NULL, ' +
            'PRIMARY KEY(`id`))');
        db.run("INSERT INTO contacts (contact_email, contact_name) " + 
            "VALUES ('test1@gmail.com', 'testOne')");
        db.run("INSERT INTO contacts (contact_email, contact_name) " + 
            "VALUES ('test2@gmail.com', 'testTwo')", done);
    });
}

module.exports = {
    seedContactsDatabase: seedContactsDatabase,
};