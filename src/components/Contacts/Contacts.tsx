import * as React from 'react';
import { ContactsHelper } from '../../utils/contactsHelper';
import Contact from './Contact/Contact';

import './contacts.css';

type Contact = {
    name: string,
    status: string, 
    active: boolean,
};

export default function Contacts () { 
    let prevContact: number = -1
    let currentContact: number = -1

    const [contacts, setContacts] = React.useState([]);

    let contactsArray: Contact[] = [{
        name: "Viivi",
        status: "At the stable",
        active: false,
    }, 
    {
        name: "Linda",
        status: "Cooking",
        active: false,
    },
    {
        name: "Fabid",
        status: "Racing...",
        active: false,
    },
    {
        name: "Jon",
        status: "Diving right now",
        active: false,
    }];
    
    function contactSelected(key: number) {             
        if (currentContact === -1 && prevContact === -1) {
            currentContact = key;
            contactsArray[key].active = true;
            setContacts(contactsArray);
        }

        else if (currentContact === key) {
            return;
        }

        else {
            prevContact = currentContact;
            contacts[currentContact].active = false;
            currentContact = key;
            contacts[key].active = true;
        }
    }

    function appendContacts() {
        contactsArray.map(contact => {
            setContacts(contacts => [
                ...contacts,
                contact,
            ])
        });
    }

    React.useEffect(() => {
       appendContacts();        
    }, [])
        
    return (
        <div className="contacts">
            <h3>Contacts</h3>
            {
                contacts.map((contact, index) => {
                   return <Contact toggleActive={contactSelected}
                        isActive={ contact.active } 
                        key={index} 
                        index={index}
                        contact={contact} />
                })
            }            
        </div>
    )    
}