import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { hideMessageInChannel, deleteMessageFromUser, auth, groupLookup } from '../../firebase';

const ToastMessage = (props) => {
  console.log(props)

  const [showToast, setShowToast] = useState(true)
  const toggleShowToast = () => setShowToast(!showToast)

  const handleClose = (messageID) => {
    // const responseProp = {
    //   hide: true
    // }
    hideMessageInChannel(props.user, messageID, true)
  }

  const getGroupName = (groupId) => {
    console.log('getGroupName run')
    console.log(groupId)
    console.log(groupLookup(groupId));
    return(groupLookup(groupId))
  }

  if (!props.message[1].hide || !props.message[1].hide[props.user.uid]) {
    if (props.groupSelect[0] === 'All' || props.message[1].groupId === props.groupSelect[0]) {
      return (
        <Toast style={{ width: '100%' }} show={showToast} onClose={() => handleClose(props.message[0])}>
          <Toast.Header>
            {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
            <strong className="me-auto" style={{color: 'black'}}>{props.message[1].displayName}<span style={{fontWeight: '500', color: 'slategray'}}> to {getGroupName(props.message[1].groupId)}</span></strong>
            <small className="text-muted">{props.message[1].time}</small>
          </Toast.Header>
          <Toast.Body>{props.message[1].message}</Toast.Body>
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