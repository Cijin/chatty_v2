import * as React from 'react';
import Contact from './Contact/Contact';

import './contacts.css';

export default function Contacts () {   
    let contacts: {name: string, status: string}[] = [{
        name: "Viivi",
        status: "Feeling lucky"
    }, 
    {
        name: "Linda",
        status: "Cooking"
    },
    {
        name: "Fabid",
        status: "Racing..."
    },
    {
        name: "Jon",
        status: "Diving right now"
    }
]
        
    return (
        <div className="contacts">
            <h3>Contacts</h3>
            {
                contacts.map((contact, index) => {
                   return <Contact key={String(index)} contact={contact} />
                })
            }            
        </div>
    )    
}