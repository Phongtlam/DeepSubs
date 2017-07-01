import React from 'react';
import { FormGroup, InputGroup, Button, FormControl } from 'react-bootstrap';
import Message from './Message';
import '../styles/chatterbox.scss';

class Chatterbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: [],
    };
  }

  render() {
    return (
      <div className="top-bar">
        <h3>THIS IS CHAT</h3>
        <div className="msg_container" id="messageList">
          {this.state.messages.map((message, i) =>
            (<Message
              key={i}
              username={message.username}
              message={message.message}
              fromMe={message.fromMe}
            />),
          )}
        </div>
        {/* <FormGroup>
          <InputGroup>
            <FormControl
              placeholder="Your message here..."
              onChange={this.handleOnChange}
              value={this.state.input}
            />
            <Button
              bsStyle="primary"
              type="submit"
              onClick={this.handleOnSubmit}
            > Send
            </Button>
          </InputGroup>
        </FormGroup> */}
        <form className="chat-input" onSubmit={this.submitHandler}>
          <input
            type="text"
            onChange={this.textChangeHandler}
            value={this.state.chatInput}
            placeholder="Write a message..."
            required
          />
        </form>
      </div>
    );
  }
}


  export default Chatterbox;
