import React from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';
import Message from './Message';
import SocketIo from '../socket_io_client/index';
import '../styles/chatterbox.scss';

const getTime = () => {
  const time = new Date();
  let hr = time.getHours();
  let min = time.getMinutes();
  let ampm = 'AM';
  if (hr > 12) {
    hr -= 12;
    ampm = 'PM';
  }
  if (min < 10) {
    min = (`0${min}`).slice(-2);
  }
  const currentTime = `${hr}:${min}${ampm}`;
  return currentTime;
};

const getUniqeId = (id) => {
  const time = new Date().getTime();
  return time + id;
};

class Chatterbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: [],
    };
    this._onChangeHandler = this._onChangeHandler.bind(this);
    this._onSubmitHandler = this._onSubmitHandler.bind(this);
    this._onNewMessage = this._onNewMessage.bind(this);
    this._onReceiveMessage = this._onReceiveMessage.bind(this);
    SocketIo.on('receive-msg', this._onReceiveMessage);
  }

  componentDidUpdate() {
    this._scrollToBottom();
  }

  _onChangeHandler(e) {
    this.setState({ input: e.target.value });
  }

  _onSubmitHandler(e) {
    e.preventDefault();
    if (this.state.input !== '') {
      const uniqueId = this.props.profileData.id + getUniqeId(this.props.profileData.id);
      const newMsg = {
        id: uniqueId,
        username: this.props.profileData.username,
        img_url: this.props.profileData.img_url,
        message: this.state.input,
        time: '',
      };
      SocketIo.emit('send-msg', newMsg);
    }
    this.setState({ input: '' });
  }

  _onReceiveMessage(newMsg) {
    const currentTime = getTime();
    newMsg.time = currentTime;
    this._onNewMessage(newMsg);
  }

  _onNewMessage(newMsg) {
    this.setState(prevState => ({
      messages: prevState.messages.concat([newMsg]),
    }));
  }

  // this is a trick to scroll to bottom of page on new msg added
  _scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    return (
      <div className="chat-window">
        <div className="chat-header">Welcome to React-Chat</div>
        <div className="msg_container">
          <Message {...this.state} {...this.props} />
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={(el) => { this.messagesEnd = el; }}
          />
        </div>
        <form
          onSubmit={this._onSubmitHandler}
          className="bottom_wrapper"
        >
          <div className="message_input_wrapper">
            <input
              className="message_input"
              placeholder="Type your message here..."
              onChange={this._onChangeHandler}
              value={this.state.input}
            />
          </div>
          <div className="send_message ">
            <div
              onClick={this._onSubmitHandler}
              className="fa fa-paper-plane-o text"
            > Send</div>
          </div>
        </form>
      </div>
    );
  }
}


export default Chatterbox;

Chatterbox.propTypes = {
  profileData: propTypes.object,
};

Chatterbox.defaultProps = {
  profileData: {},
};
