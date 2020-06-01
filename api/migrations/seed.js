//get first names, last names, and emails from faker
//use the api to add this data to the table
//this will create new tables for each contact
//get some messages and seed them to each contacts table.
const faker = require('faker');

let contact = {};
for (let i = 0; i < 10; i++) {
    contact.name = faker.name.findName();
    contact.email = faker.internet.email();
    contact.status = faker.name.jobDescriptor();
    console.log(contact);
}