const baseUrl = 'http://localhost:4000/api';

export const ContactsHelper = {
    
    getContacts: async function () {
        const url = `${baseUrl}/contacts`;

        return await fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No contacts' + response.status);
                }
                return response.json();
            }).then(jsonResponse => {
                return jsonResponse.contacts;
            }).catch(error => {
                console.log(error);
            });
    }
};