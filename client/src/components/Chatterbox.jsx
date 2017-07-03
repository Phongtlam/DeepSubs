import React from 'react';
import { FormGroup, Button, FormControl } from 'react-bootstrap';
import Message from './Message';
import '../styles/chatterbox.scss';

class Chatterbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: [],
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(e) {
    this.setState({ input: e.target.value });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    this.setState({ input: '' });
    this.setState(prevState => ({
      messages: prevState.messages.concat([this.state.input]),
    }));
    console.log(this.state.messages)
  }

  render() {
    return (
      <div className="chat-window">
        <div className="chat-header">Welcome to React-Chat</div>
        <div className="msg_container">
          <h4>THIS IS MESSAGE CONTAINER</h4>
          <Message {...this.state} {...this.props} />
        </div>
        <form
          onSubmit={this.onSubmitHandler}
          className="bottom_wrapper clearfix"
        >
          <div className="message_input_wrapper">
            <input
              className="message_input"
              placeholder="Type your message here..."
              onChange={this.onChangeHandler}
              value={this.state.input}
            />
          </div>
          <div className="send_message ">
            <div
              onClick={this.onSubmitHandler}
              className="fa fa-paper-plane-o text"
            > Send</div>
          </div>
        </form>
      </div>
    );
  }
}


export default Chatterbox;
