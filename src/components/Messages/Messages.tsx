import * as React from 'react';
import Message from './Message/Message';
import InputArea from './InputArea/InputArea';

import './messages.css';

type MessagesProp = {};

type MessagesState = {
    messages: string[],
}

export default class Messages extends React.Component<MessagesProp, MessagesState> {
    constructor (props: MessagesProp) {
        super(props);

        this.state = {
            messages: [],
        }

        this.incomingText = this.incomingText.bind(this);
    }    

    incomingText(newMessage: string) { 
        let updatedMessages: string[] = this.state.messages;
        updatedMessages.push(newMessage);
        this.setState({
            messages: updatedMessages,
        });
    }

    render() {
        return (
            <div className="messages">
                <h4>Contact Icon | Contact Name | Contact Description</h4>
                {                
                    this.state.messages.map((message, index) => {                        
                        return <Message key={String(index)}
                        message={message} />
                    })
                }                
                <InputArea onSend={this.incomingText} />
            </div>
        )
    }
}