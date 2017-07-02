import React from 'react';
import propTypes from 'prop-types';

// const Message = (props) => {
//     // Was the message sent by the current user. If so, add a css class
//   const fromMe = props.fromMe ? 'from-me' : '';
//   return (
//     <div className={`message ${fromMe}`}>
//       <div className="username">
//         { props.username }
//       </div>
//       <div className="message-body">
//         { props.message }
//       </div>
//     </div>
//   );
// };

const Message = props => (
  <div>
    {props.messages.map(one =>
      <div>{one}</div>,
    )}
  </div>
);

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
