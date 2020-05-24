import * as React from 'react';
import './contact.css';

type ContactProps = {
    contact: {name: string, status: string},
    index: number,
    toggleActive: Function,
    isActive: boolean,
};

export default function Contact (props: ContactProps) {    
    function handleClick() {
        props.toggleActive(props.index);
    }

    return (
        <div className="contact" 
            id={props.isActive ? "active" : "inactive"}
            onClick={handleClick} >
            <p>{props.contact.name}</p>
            <p className="status">{props.contact.status}</p>
        </div>
    )
}