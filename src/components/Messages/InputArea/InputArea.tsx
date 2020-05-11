import * as React from 'react';
import './inputArea.css';

export default class InputArea extends React.Component {
    render() {
        return (
            <div className="inputArea">
                <input type="text" placeholder="Get Chatty" 
                className="newChat" />
                <i className="material-icons blue">send</i>
            </div>
        );
    }
}