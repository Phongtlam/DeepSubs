import React from 'react';
import propTypes from 'prop-types';
import '../styles/message.scss';
import SocketIo from '../socket_io_client/index';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const username = this.props.profileData.username;
    return (
      <div>
        {this.props.messages.map((one, i) => {
          if (one.username === username) {
            return (<div
              className="message right"
              key={SocketIo.id + i}
            >
              <img src={one.img_url} className="avatar" alt="avatar" />
              <div className="text_wrapper">
                <div className="name">{one.username}</div>
                <div className="text">{one.message}</div>
                <div className="time">{one.time}</div>
              </div>
            </div>);
          } else if (one.username === 'Yellow Sub') {
            return (
              <div
                className="message left"
                key={one.id}
              >
                <img src={one.img_url} className="avatar" alt="avatar" />
                <div className="text_wrapper submarine">
                  <div className="name">{one.username}</div>
                  <div className="text submarine">{one.message}</div>
                  <div className="time">{one.time}</div>
                </div>
              </div>
            );
          }
          return (
            <div
              className="message left"
              key={one.id}
            >
              <img src={one.img_url} className="avatar" alt="avatar" />
              <div className="text_wrapper">
                <div className="name">{one.username}</div>
                <div className="text">{one.message}</div>
                <div className="time">{one.time}</div>
              </div>
            </div>
          )
        },
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
