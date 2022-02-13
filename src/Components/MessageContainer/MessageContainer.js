import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import {deleteMessageFromUser, auth} from '../../firebase';

const MessageContainer = (props) => {
  console.log(props)

  const closeToast = (messageID) => {
    console.log(messageID);
    const user = auth.currentUser;
    deleteMessageFromUser(user.uid, messageID);
  }

  return (
    <div>
      {props.messageArr.map(message => (
        <ToastContainer style={{width: '100%'}}>
          <Toast style={{width: '100%'}} onClose={() => closeToast(message[0])}>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
              <strong className="me-auto">{message[1].displayName}</strong>
              <small className="text-muted">{message[1].time}</small>
            </Toast.Header>
            <Toast.Body>{message[1].message}</Toast.Body>
          </Toast>
        </ToastContainer>
      ))}
    </div>
  );
}

export default MessageContainer;