import * as React from 'react';
import Contact from './Contact/Contact';

import './contacts.css';

export default class Contacts extends React.Component {
    render() {
        return (
            <div className="contacts">
                <h3>Contacts</h3>
                <Contact />
            </div>
        )
    }
}