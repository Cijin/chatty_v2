import * as React from 'react';
import './inputArea.css';

type InputProps = {
    onSend: (input: string) => void;
};

type InputState = {
    newMessage: string;
};

export default class InputArea extends React.Component<InputProps, InputState> {
    constructor(props: InputProps) {
        super(props);

        this.state = {
            newMessage: '',
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick() {
        this.props.onSend(this.state.newMessage);
    }

    handleChange (e: React.ChangeEvent<HTMLInputElement>) {
        let newMessage: string = e.target.value;
        this.setState({
            newMessage: newMessage,
         });
    }
    
    render() {
        return (
            <div className="inputArea">
                <input type="text" placeholder="Get Chatty" 
                className="newChat" onChange={this.handleChange} />
                <i className="material-icons blue" onClick={this.handleClick} >send</i>
            </div>
        );
    }
}