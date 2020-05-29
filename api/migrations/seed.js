//get first names, last names, and emails from faker
//use the api to add this data to the table
//this will create new tables for each contact
//get some messages and seed them to each contacts table.
import faker from 'faker';
import { ContactsHelper } from '../../src/utils/contactsHelper';

for (let i = 0; i < 10; i++) {
    let randomName = faker.name.findName();
    let randomEmail = faker.internet.email();
    let randomStatus = faker.name.jobDescriptor();

    ContactsHelper.addContacts
}