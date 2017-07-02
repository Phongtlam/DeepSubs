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
      <div>
        <div className="chat-header ui-widget-header">React p2p Chat</div>
        <div className="msg_container" id="messageList">
          <h4>THIS IS MESSAGE CONTAINER</h4>
          <Message {...this.state} />
        </div>
        <form onSubmit={this.onSubmitHandler}>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="Your message here..."
              onChange={this.onChangeHandler}
              value={this.state.input}
            />
            <Button
              className="fa fa-paper-plane-o send-button"
              bsStyle="success"
              type="submit"
              > Send
            </Button>
          </FormGroup>
        </form>
      </div>
    );
  }
}


  export default Chatterbox;
