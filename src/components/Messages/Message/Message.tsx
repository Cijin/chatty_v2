import * as React from 'react';
import './message.css';

type MessageProps = {
    key: string,
    message: string,
};

type MessageState = {};

export default class Message extends React.Component<MessageProps, MessageState> {    
    render() {
        return (            
            <div className="message">
                <p>{this.props.message}</p>
            </div>            
        );
    }
}