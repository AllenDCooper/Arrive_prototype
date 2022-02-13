import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { deleteMessageFromUser, auth } from '../../firebase';
import ToastMessage from '../ToastMessage/ToastMessage';

const MessageContainer = (props) => {
  console.log(props)

  // const closeToast = (messageID) => {
  //   console.log(messageID);
  //   const user = auth.currentUser;
  //   deleteMessageFromUser(user.uid, messageID);
  // }

  return (
    <div>
      <ToastContainer style={{ width: '100%' }}>
        {props.messageArr.map(message => (
          <ToastMessage message={message} user={props.user}/>
        ))}
      </ToastContainer>
    </div>
  );
}

export default MessageContainer;