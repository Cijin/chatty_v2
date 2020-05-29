import { Contact } from "../shared/types";

const url = 'http://localhost:4000/api/contacts';

export const ContactsHelper = {
    
    getContacts: async function () {
        return await fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No contacts. Response status: ' + response.status);
                }
                return response.json();
            }).then(jsonResponse => {
                return jsonResponse.contacts;
            }).catch(error => {
                console.log(error);
            });
    },

    addContacts: async function (contact: Contact) {
        const fetchOptions = {
            method: 'POST',            
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contact: contact }),
        };
        
        return await fetch(url, fetchOptions)
                    .then(response => {
                        if (!response.ok) {
                            return new Error('Post failed. Response status: ' + response.status);
                        }
                        return response.json()
                            .then(jsonResponse => {
                                return jsonResponse.contact;
                            });
                    });
    }
};