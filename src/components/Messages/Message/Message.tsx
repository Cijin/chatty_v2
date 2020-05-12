import * as React from 'react';
import './message.css';

type MessageProps = {
    id: string,
    message: string,
};

type MessageState = {};

export default class Message extends React.Component<MessageProps, MessageState> {    
    render() {
        return (            
            <div id={this.props.id} className="message">
                <p>{this.props.message}</p>
            </div>            
        );
    }
}