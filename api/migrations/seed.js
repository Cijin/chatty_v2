//get first names, last names, and emails from faker
//use the api to add this data to the table
//this will create new tables for each contact
//get some messages and seed them to each contacts table.
const faker = require('faker');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');
const createContactTable = require('./createContact');
const createContactsTable = require('./migration');

function addToDb (contact) {
    const insertSql = 'INSERT INTO contacts (contact_table_id, ' +
        'contact_email, contact_name, status) VALUES ($contactTableId, ' +
        '$contactEmail, $contactName, $contactStatus);';
    const insertValues = {        
        $contactTableId: contact.$contactTableId,
        $contactEmail: contact.email,
        $contactName: contact.name,
        $contactStatus: contact.status,
    }

    db.run(insertSql, insertValues, function(error) {
        if (error) {
            console.log(error);
        }
    });
    createContactTable(contact.contactTableId);
}

let contact = {};
createContactsTable();

for (let i = 1; i < 10; i++) {
    contact.name = faker.name.findName();
    contact.email = faker.internet.email();
    contact.status = faker.name.jobDescriptor();            
    contact.contactTableId = contact.name.replace(/[^A-Z0-9]/ig, "_") + i;

    addToDb(contact);
}