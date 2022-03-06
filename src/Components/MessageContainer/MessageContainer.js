import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { deleteMessageFromUser, auth, groupLookup } from '../../firebase';
import ToastMessage from '../ToastMessage/ToastMessage';

const MessageContainer = (props) => {
  console.log(props)

  // const closeToast = (messageID) => {
  //   console.log(messageID);
  //   const user = auth.currentUser;
  //   deleteMessageFromUser(user.uid, messageID);
  // }

  const getGroupObj = (groupId) => {
    console.log('getGroupObj run')
    console.log(groupId)
    console.log(groupLookup(groupId));
    return (groupLookup(groupId))
  }

  return (
    
    <div>
      <ToastContainer style={{ width: '100%' }}>
        {props.messageArr.map(message => (
          <ToastMessage message={message} user={props.user} groupSelect={props.groupSelect} handleGroupSelectChange={props.handleGroupSelectChange} groupObj={getGroupObj(message[1].groupId)} />
        ))}
      </ToastContainer>
    </div>
  );
}

export default MessageContainer;