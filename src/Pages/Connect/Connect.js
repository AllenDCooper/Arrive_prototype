import React, { Component } from 'react';
import { Dropdown, Button, ButtonGroup, Form, Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import NavigationBarInCourse from '../../Components/NavigationBarInCourse/NavigationBarInCourse';
import MessageContainer from '../../Components/MessageContainer/MessageContainer';
import { database, getAllFirebaseUserIDs, pushMessageObjInDB, auth, pushMessageIntoChannel } from '../../firebase';
import { BsFillChatLeftTextFill, BsFillBarChartFill, BsCompassFill, BsJournalArrowUp, BsFillBellFill } from 'react-icons/bs';

class Connect extends Component {
  constructor(props) {
    super(props);
    this.messagesEndRef = React.createRef()
  }

  styles = {
    selectedMessageBtn: {
      // color: 'white',
      fontWeight: 'bold',
      textDecoration: 'none',
      borderBottom: '2px solid white',
      width: '100%',
      color: 'black',
      backgroundColor: 'none',
      textDecoration: 'none',
      border: 'none',
      borderRadius: '0',
      padding: '0px'
    },
    messageBtn: {
      // color: 'black',
      fontWeight: '300',
      width: '100%',
      color: 'black',
      backgroundColor: 'none',
      textDecoration: 'none',
      border: 'none',
      borderRadius: '0',
      padding: '0px'
    }
  }

  state = {
    // messageArr: [],
    messageStr: '',
    messageType: 'message',
    allUsers: [],
    // groupSelect: ['All', { groupName: 'All' }]
  }

  componentDidMount() {
    this.scrollToBottom()
    // setInterval(this.addMessages, 1000)
    // this.setState({
    //   allUsers: getAllFirebaseUserIDs()
    // }, () => {
    //   console.log(this.state.allUsers)
    // })

    // const userMessages = database.ref('users/' + auth.currentUser.uid + '/messages');
    // userMessages.on('value', (snapshot) => {
    //   const data = snapshot.val();
    //   console.log(data)
    //   if (data) {
    //     console.log(data)
    //     this.setState({
    //       messageArr: Object.entries(data)
    //     })
    //   }
    // })

    // const userMessages = database.ref('channel/')
    // userMessages.on('value', (snapshot) => {
    //   const data = snapshot.val();
    //   console.log(data);
    //   const allMessagesArr = Object.entries(data)

    //   if (data) {
    //     console.log(data);
    //     this.setState({
    //       messageArr: Object.entries(data)
    //     })
    //   }
    // })

  }

  componentDidUpdate() {
    this.scrollToBottom()
  }
  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  // addMessages = () => {
  //   this.setState({
  //     messageArr: [...this.state.messageArr, 'new message']
  //   })
  //   console.log(this.state.messageArr)
  // }

  handleChange = (event) => {
    this.setState({
      messageStr: event.target.value
    }, () => {
      console.log(this.state.messageStr)
    })
  }

  handleMessageTypeClick = (messageType) => {
    console.log(messageType);

    // const messageStr = 'A session for ' + this.props.groupSelect[1].groupName + ' is starting. Join now. '

    // const newMessageStr = messageType === 'start-session' ? messageStr + this.state.messageStr : this.state.messageStr

    this.setState({
      messageType: messageType,
      // messageStr: newMessageStr,
    })

  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.props.user);
    // pushMessageObjInDB(this.props.user.uid, this.props.user.displayName, this.state.messageStr)
    const messageStr = this.state.messageType === 'start-session' ? `${this.props.groupSelect[1].groupName}` : this.state.messageStr
    console.log(messageStr)

    pushMessageIntoChannel(this.props.user.uid, this.props.user.displayName, messageStr, this.state.messageType, this.props.groupSelect[0])
    this.setState({
      messageStr: '',
      messageType: 'message'
    })
  }

  // handleGroupSelectChange = (groupObj) => {
  //   console.log(groupObj)
  //   this.setState({
  //     groupSelect: groupObj,
  //   })
  // }

  render() {
    // const { messages } = this.props
    return (
      <div>
        <div>
          <MessageContainer messageArr={this.props.messageArr} user={this.props.user} groupSelect={this.props.groupSelect} handleGroupSelectChange={this.props.handleGroupSelectChange} />
          {/* {messages.map(message => <Message key={message.id} {...message} />)} */}
          <div ref={this.messagesEndRef} />
        </div>
        <div style={{ height: '220px' }}>
          <Form onSubmit={this.handleSubmit} style={{ border: 'solid darkgray 1px', borderRadius: '5px', backgroundColor: 'white', position: 'fixed', bottom: '0px', width: '768px', maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{ marginBottom: '5px' }}>
              {/* <Form.Label>Add message</Form.Label> */}
              {this.state.messageType === 'start-session' ?
                // <Row style={{ margin: '0px', padding: '6px 0px' }}>
                //   <Col>
                //     A session for <span style={{fontWeight: '700'}}>{this.props.groupSelect[1].groupName}</span> is starting soon. <Button variant='link' style={{padding: '2px 3px 6px 3px'}}>Join now.</Button>
                //   </Col>
                // </Row>
                <Form.Control disabled as="textarea" rows={3}
                  value={`A session for ${this.props.groupSelect[1].groupName} is starting soon. Join now!`}
                  onChange={this.handleChange}
                  placeholder="Add your thoughts/feelings here..."
                  style={{ border: 'none', backgroundColor: 'white', opacity: '.75', height: '50px' }}
                />
                :
                <Form.Control as="textarea" rows={3} value={this.state.messageStr} onChange={this.handleChange} placeholder="Add your thoughts/feelings here..." style={{ border: 'none', backgroundColor: 'white', color: 'black', height: '50px' }} />
              }

            </Form.Group>
            <div style={{ textAlign: 'right' }}>
              <Row style={{ margin: '0px' }}>
                <Col style={{ textAlign: 'center' }}>
                  <Button variant='link' name='start-session' style={this.state.messageType === 'start-session' ? this.styles.selectedMessageBtn : this.styles.messageBtn} onClick={() => this.handleMessageTypeClick('start-session')}>
                    <BsFillBellFill />
                    <p style={{ width: '100%', fontSize: '12px', marginBottom: '5px', textAlign: 'center' }}>Start Session</p>
                  </Button>
                </Col>
                <Col style={{ textAlign: 'center' }}>
                  <Button variant='link' name='message' style={this.state.messageType === 'message' ? this.styles.selectedMessageBtn : this.styles.messageBtn} onClick={() => this.handleMessageTypeClick('message')}>
                    <BsFillChatLeftTextFill />
                    <p style={{ width: '100%', fontSize: '12px', marginBottom: '5px', textAlign: 'center' }}>Message</p>
                  </Button>
                </Col>
                <Col style={{ textAlign: 'center' }}>
                  <Button variant='link' name='poll' style={this.state.messageType === 'poll' ? this.styles.selectedMessageBtn : this.styles.messageBtn} onClick={() => this.handleMessageTypeClick('poll')}>
                    <BsFillBarChartFill />
                    <p style={{ width: '100%', fontSize: '12px', marginBottom: '5px', textAlign: 'center' }}>Poll</p>
                  </Button>
                </Col>
                <Col style={{ textAlign: 'center' }}>
                  <Button variant='link' name='goal' style={this.state.messageType === 'goal' ? this.styles.selectedMessageBtn : this.styles.messageBtn} onClick={() => this.handleMessageTypeClick('goal')}>
                    <BsJournalArrowUp />
                    <p style={{ width: '100%', fontSize: '12px', marginBottom: '5px', textAlign: 'center' }}>Goal</p>
                  </Button>
                </Col>
                <Col style={{ margin: 'auto', padding: '0px' }}>
                  <Dropdown as={ButtonGroup} style={{ width: '100%' }}>
                    {this.state.messageStr === '' && this.state.messageType !== 'start-session' ?
                      <>
                        <Button variant="light" type="submit" disabled style={{ paddingLeft: '100px' }}>Share</Button>
                        <Dropdown.Toggle split disabled variant="light" style={{ flex: 'none', width: '100px' }} />
                      </>
                      :
                      <>
                        <Button variant="success" type="submit" style={{ paddingLeft: '100px' }}>Share</Button>
                        <Dropdown.Toggle split variant="success" style={{ flex: 'none', width: '100px' }} />
                      </>
                    }
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => this.props.handleGroupSelectChange(['All', { groupName: 'All' }])}>All</Dropdown.Item>

                      {this.props.groupArr.map(group => (
                        group[1].subscribed ?
                          group[1].subscribed[this.props.user.uid] ?
                            <Dropdown.Item onClick={() => this.props.handleGroupSelectChange(group)}>{group[1].groupName}</Dropdown.Item>
                            :
                            null
                          :
                          null
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </div>
          </Form >
        </div>
      </div >
    )
  }
}

export default Connect;