//get first names, last names, and emails from faker
//use the api to add this data to the table
//this will create new tables for each contact
//get some messages and seed them to each contacts table.
const faker = require('faker');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');
const createContactTable = require('./createContact');

function seedContactTable(tableName) {
    //add 10 random paragraphs as messages
    for (let i = 0; i < 10; i++) {
        let msg = faker.lorem.sentences()
        let time = i + ':00';

        const sql = `INSERT INTO ${tableName} (messages, time) VALUES ($msg, $time);`;
        const values = {
            $msg: msg,
            $time: time,
        };

        db.run(sql, values, function(error) {
            if (error) {
                console.log(error);
            }
        });
    }
}

function addToDb(contact) {
    const insertSql = 'INSERT INTO `contacts` (contact_table_id, ' +
        'contact_email, contact_name, status) VALUES ($contactTableId, ' +
        '$contactEmail, $contactName, $contactStatus);';
    const insertValues = {        
        $contactTableId: contact.contactTableId,
        $contactEmail: contact.email,
        $contactName: contact.name,
        $contactStatus: contact.status,
    }
    db.serialize(() => {
        db.run(insertSql, insertValues, function(error) {
            if (error) {
                console.log(error);
            }
        });  
        createContactTable(contact.contactTableId); 
        seedContactTable(contact.contactTableId);
    }) 
}

let contact = {};

for (let i = 1; i <= 10; i++) {
    contact.name = faker.name.findName();
    contact.email = faker.internet.email();
    contact.status = faker.name.jobDescriptor();            
    contact.contactTableId = contact.name.replace(/[^A-Z0-9]/ig, "") + i;

    addToDb(contact);
}