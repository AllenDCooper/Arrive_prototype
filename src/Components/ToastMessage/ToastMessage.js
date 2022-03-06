import React, { useState } from 'react';
import { Button, Toast, ToastContainer } from 'react-bootstrap';
import { hideMessageInChannel, deleteMessageFromUser, auth, groupLookup } from '../../firebase';
import { BsX } from 'react-icons/bs';

const ToastMessage = (props) => {
  console.log(props)

  const [showToast, setShowToast] = useState(true)
  const toggleShowToast = () => setShowToast(!showToast)

  // const [groupID, setGroupID] = useState()

  const handleClose = (messageID) => {
    // const responseProp = {
    //   hide: true
    // }
    hideMessageInChannel(props.user, messageID, true)
  }

  // const getGroupObj = (groupId) => {
  //   console.log('getGroupObj run')
  //   console.log(groupId)
  //   console.log(groupLookup(groupId));
  //   return (groupLookup(groupId))
  // }

  if (!props.message[1].hide || !props.message[1].hide[props.user.uid]) {
    if (props.groupSelect[0] === 'All' || props.message[1].groupId === props.groupSelect[0]) {
      return (
        <Toast style={{ width: '100%' }} show={showToast}>
          <Toast.Header closeButton={false}>
            {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
            <strong className="me-auto" style={{ color: 'black' }}>{props.message[1].displayName}<span style={{ fontWeight: '500', color: 'slategray' }}> to {props.groupObj[0][1].groupName}</span></strong>
            <small className="text-muted">{props.message[1].time}</small>
            <Button variant='light' onClick={() => handleClose(props.message[0])}>
              <BsX />
            </Button>
          </Toast.Header>
          {props.message[1].messageType === 'start-session' ?
            <Toast.Body>
              A session for <span style={{ fontWeight: '700' }}>{props.message[1].message}</span> is starting soon.
              <Button onClick={() => props.handleGroupSelectChange(props.groupObj[0])} variant='link' style={{ padding: '2px 3px 6px 3px' }}>Join now.
              </Button>
            </Toast.Body>
            :
            <Toast.Body>{props.message[1].message}</Toast.Body>
          }
        </Toast>
      )
    }
    return (null)
  }
  else {
    return null
  }
  // else {
  //   return null;
  // }
}

export default ToastMessage;