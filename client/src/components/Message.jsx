import React from 'react';
import propTypes from 'prop-types';
import '../styles/message.scss';

const Message = (props) => {
  const username = props.profileData.username;
  return (
    <div>
      {props.messages.map((one) => {
        if (one.username === username) {
          return (<div
            className="message right"
            key={one.id}
          >
            <img src={one.img_url} className="avatar" alt="avatar" />
            <div className="text_wrapper">
              <div className="name">{one.username}</div>
              <div className="text">{one.message}</div>
              <div className="time">{one.time}</div>
            </div>
          </div>);
        } else if (one.username === 'Yellow Submarine') {
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
        );
      },
    )}
    </div>
  );
};

Message.propTypes = {
  messages: propTypes.array,
  profileData: propTypes.object,
};

Message.defaultProps = {
  messages: [],
  profileData: {},
};

export default Message;
