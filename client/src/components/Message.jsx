import React from 'react';
import propTypes from 'prop-types';
import '../styles/message.scss';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.messages.map((one, i) =>
          (<div
            className="message right"
            key={one.id + i}
          >
            <img src={one.img_url} className="avatar" alt="avatar" />
            <div className="text_wrapper">
              <div className="name">{one.username}</div>
              <div className="text">{one.message}</div>
              <div className="time">{one.time}</div>
            </div>
          </div>),
        )}
      </div>
    );
  }
}

// Message.propTypes = {
//   message: propTypes.string,
//   username: propTypes.string,
//   fromMe: propTypes.bool,
// };
//
// Message.defaultProps = {
//   message: '',
//   username: '',
//   fromMe: false,
// };

export default Message;
