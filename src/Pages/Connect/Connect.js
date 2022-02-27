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

  state = {
    messageArr: [],
    messageStr: '',
    allUsers: [],
    groupSelect: ['All', { groupName: 'All' }]
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

    const userMessages = database.ref('channel/')
    userMessages.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      const allMessagesArr = Object.entries(data)

      if (data) {
        console.log(data);
        this.setState({
          messageArr: Object.entries(data)
        })
      }
    })

  }

  componentDidUpdate() {
    this.scrollToBottom()
  }
  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  addMessages = () => {
    this.setState({
      messageArr: [...this.state.messageArr, 'new message']
    })
    console.log(this.state.messageArr)
  }

  handleChange = (event) => {
    this.setState({
      messageStr: event.target.value
    }, () => {
      console.log(this.state.messageStr)
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.props.user);
    // pushMessageObjInDB(this.props.user.uid, this.props.user.displayName, this.state.messageStr)
    pushMessageIntoChannel(this.props.user.uid, this.props.user.displayName, this.state.messageStr, this.state.groupSelect[0])
    this.setState({
      messageStr: ''
    })
  }

  handleGroupSelectChange = (groupObj) => {
    console.log(groupObj)
    this.setState({
      groupSelect: groupObj,
    })
  }

  render() {
    // const { messages } = this.props
    return (
      <div>
        <div>
          <MessageContainer messageArr={this.state.messageArr} user={this.props.user} groupSelect={this.state.groupSelect} />
          {/* {messages.map(message => <Message key={message.id} {...message} />)} */}
          <div ref={this.messagesEndRef} />
        </div>
        <div style={{ height: '190px' }}></div>
        <Form onSubmit={this.handleSubmit} style={{ border: 'solid darkgray 1px', borderRadius: '5px', backgroundColor: 'white', position: 'fixed', bottom: '0px', width: '768px', maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
          <Row>
            <Col>
              <Dropdown
              // value={this.state.groupSelect}
              // onSelect={this.handleGroupSelectChange}
              >
                <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ width: '100%' }}>
                  {this.state.groupSelect[1].groupName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => this.handleGroupSelectChange(['All', { groupName: 'All' }])}>All</Dropdown.Item>

                  {this.props.groupArr.map(group => (
                    group[1].subscribed ?
                      group[1].subscribed[this.props.user.uid] ?
                        <Dropdown.Item onClick={() => this.handleGroupSelectChange(group)}>{group[1].groupName}</Dropdown.Item>
                        :
                        null
                      :
                      null
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{ marginBottom: '5px' }}>
            {/* <Form.Label>Add message</Form.Label> */}
            <Form.Control as="textarea" rows={3} value={this.state.messageStr} onChange={this.handleChange} placeholder="Add your thoughts/feelings here..." style={{ border: 'none' }} />
          </Form.Group>
          <div style={{ textAlign: 'right' }}>
            <Row style={{margin: '0px'}}>
              <Col style={{textAlign: 'center'}}>
                <BsFillBellFill/>
                <p style={{width: '100%', fontSize: '14px', marginBottom: '5px', textAlign: 'center'}}>Start Session</p>
              </Col>
              <Col style={{textAlign: 'center'}}>
                <BsFillChatLeftTextFill />
                <p style={{width: '100%', fontSize: '14px', marginBottom: '5px', textAlign: 'center'}}>Message</p>
              </Col>
              <Col style={{textAlign: 'center'}}>
                <BsFillBarChartFill />
                <p style={{width: '100%', fontSize: '14px', marginBottom: '5px', textAlign: 'center'}}>Poll</p>
              </Col>
              <Col style={{textAlign: 'center'}}>
                {/* <BsCompassFill /> */}
                <BsJournalArrowUp />
                <p style={{width: '100%', fontSize: '14px', marginBottom: '5px', textAlign: 'center'}}>Goal</p>
              </Col>
              {/* <Col>
                <Dropdown
                // value={this.state.groupSelect}
                // onSelect={this.handleGroupSelectChange}
                >
                  <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ width: '100%' }}>
                    {this.state.groupSelect[1].groupName}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => this.handleGroupSelectChange(['All', {groupName: 'All'}])}>All</Dropdown.Item>

                    {this.props.groupArr.map(group => (
                      group[1].subscribed ?
                        group[1].subscribed[this.props.user.uid] ?
                          <Dropdown.Item onClick={() => this.handleGroupSelectChange(group)}>{group[1].groupName}</Dropdown.Item>
                          :
                          null
                        :
                        null
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col> */}
              <Col style={{margin: 'auto', padding: '0px'}}>
                {/* <Button variant="secondary" type="submit" style={{ marginBottom: '10px', width: '100%' }}>
                  Share
                </Button> */}
                <Dropdown as={ButtonGroup}>
                  {this.state.messageStr === '' ?
                    <>
                      <Button variant="dark" type="submit" disabled>Share</Button>
                      <Dropdown.Toggle split disabled variant="dark" />
                    </>
                    :
                    <>
                      <Button variant="primary" type="submit">Share</Button>
                      <Dropdown.Toggle split variant="primary" />
                    </>
                  }
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => this.handleGroupSelectChange(['All', { groupName: 'All' }])}>All</Dropdown.Item>

                    {this.props.groupArr.map(group => (
                      group[1].subscribed ?
                        group[1].subscribed[this.props.user.uid] ?
                          <Dropdown.Item onClick={() => this.handleGroupSelectChange(group)}>{group[1].groupName}</Dropdown.Item>
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
      </div >
    )
  }
}

export default Connect;