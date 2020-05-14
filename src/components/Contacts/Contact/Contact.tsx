import * as React from 'react';
import './contact.css';

type ContactProps = {
    contact: {name: string, status: string},
    key: string,
};

type ContactStates = {

};

export default function Contact (props: ContactProps) {    
    return (
        <div className="contact">
            <p>{props.contact.name}</p>
            <p className="status">{props.contact.status}</p>
        </div>
    )
}