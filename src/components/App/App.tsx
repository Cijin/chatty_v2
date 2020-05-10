import * as React from 'react';
import Contacts from '../Contacts/Contacts';
import Messages from '../Messages/Messages';

import './app.css';

export default class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Contacts />
                <Messages />
            </div>
        );
    }
}