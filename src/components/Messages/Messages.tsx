import * as React from 'react';
import Message from './Message/Message';
import InputArea from './InputArea/InputArea';

import './messages.css';

export default class Messages extends React.Component {
    render() {
        return (
            <div className="messages">
                <h4>Contact Icon | Contact Name | Contact Description</h4>
                <Message />
                <InputArea />
            </div>
        )
    }
}