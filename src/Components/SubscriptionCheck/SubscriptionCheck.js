import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Card, Row, Col, Offcanvas, Form, FormControl, Button, Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { auth, subscribeToGroup, unsubscribeToGroup } from '../../firebase';
import EditProfile from '../EditProfile/EditProfile';
import "../NavigationBarInCourse/NavigationBarInCourse";


function SubscriptionCheck(props) {
  console.log(props)
  // console.log(props.group[1].subscribed[props.uid])

  const [subscribe, setSubscribe] = useState(
    props.group[1].subscribed
    ?
    props.group[1].subscribed[props.uid]
    :
    false
    );

  // const checkIfSubscribed = () => {
  //   if (!props.group) {
  //     setSubscribe(false)
  //   } else if (!props.group[1].subscribed) {
  //     setSubscribe(false)
  //   } else if (props.group[1].subscribed[props.uid]) {
  //     setSubscribe(true)
  //   }
  // }


  // const initialSubscription = checkIfSubscribed()
  // const isSubscribedInitial = props.group.subscribed.uid || (props.uid === props.group.subscribed.uid)

  // const [subscribe, setSubscribe] = useState(initialSubscription);

  const toggleSetSubscribe = (isSubscribed) => {
    if (isSubscribed) {
      unsubscribeToGroup(props.uid, props.group[0])
      setSubscribe(false)
    } else {
      console.log('run subscribe to group')
      subscribeToGroup(props.uid, props.group[0], props.user)
      setSubscribe(true)
    }
  }

  return (
    <Card style={{ borderRadius: '0px' }}>
      <Card.Body>
        <Row>
          <Col>
            <Card.Title style={{ marginBottom: '5px', fontSize: '18px', fontWeight: '600', color: '#1565c0' }}>{props.group[1].groupName}</Card.Title>
            <Card.Text style={{ marginBottom: '0px', fontSize: '14px', fontWeight: '600' }}>
              {props.group[1].groupLeader}
            </Card.Text>
            <p style={{ marginBottom: '0px', fontSize: '14px', color: '#666' }} >{props.group[1].institution}</p>
          </Col>
          <Col lg={3}>
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Subscribe"
                // checked={subscribe}
                checked={subscribe}
                onChange={() => toggleSetSubscribe(subscribe)}
              />
            </Form>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default SubscriptionCheck;