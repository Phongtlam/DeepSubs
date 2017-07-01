import React from 'react';
import { FormGroup, Button, FormControl, Modal } from 'react-bootstrap';
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
      <div className="chat-body">
        <h3>This is chat head</h3>
        <div className="msg_container" id="messageList">
          <h4>THIS IS MESSAGE CONTAINER</h4>
          {this.state.messages.map((message, i) =>
            (<Message
              key={i}
              username={message.username}
              message={message.message}
              fromMe={message.fromMe}
            />),
          )}
        </div>
        <FormGroup>
          <FormControl
            type="text"
            placeholder="Your message here..."
            onChange={this.handleOnChange}
            value={this.state.input}
          />
          <Button
            className="fa fa-paper-plane-o"
            bsStyle="success"
            type="submit"
            onClick={this.handleOnSubmit}
          > Send
          </Button>
        </FormGroup>
      </div>
    );
  }
}


  export default Chatterbox;
