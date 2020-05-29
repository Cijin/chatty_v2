//get first names, last names, and emails from faker
//use the api to add this data to the table
//this will create new tables for each contact
//get some messages and seed them to each contacts table.
import faker from 'faker';
import { ContactsHelper } from '../../src/utils/contactsHelper';
import { Contact } from '../../src/shared/types';
import Contact from '../../src/components/Contacts/Contact/Contact';

let contact = new Contact;

for (let i = 0; i < 10; i++) {
    contact.name = faker.name.findName();
    contact.email = faker.internet.email();
    contact.status = faker.name.jobDescriptor();

    ContactsHelper.addContacts(contact);
}