import * as React from 'react';
import './message.css';

export default class Message extends React.Component {
    render() {
        return (            
            <div className="message">
                <p>Hey there! How is the weather over there?</p>                                      
            </div>            
        );
    }
}