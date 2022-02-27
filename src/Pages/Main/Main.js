import React, { Component } from 'react';
import { FloatingLabel, Dropdown, Button, Form, Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import NavigationBarInCourse from '../../Components/NavigationBarInCourse/NavigationBarInCourse';
import MessageContainer from '../../Components/MessageContainer/MessageContainer';
import { database, getAllFirebaseUserIDs, pushMessageObjInDB, auth, pushMessageIntoChannel, pushGroupIntoDb } from '../../firebase';
import SubscriptionCheck from '../../Components/SubscriptionCheck/SubscriptionCheck';
import InstitutionalSpace from '../InstitutionalSpace/InstitutionalSpace'


class Connect extends Component {
  constructor(props) {
    super(props);
    this.messagesEndRef = React.createRef()
  }

  state = {
    showGroupSelect: false,
    groupName: '',
    groupLeader: '',
    institution: 'Compass College',
    groupArr: [],
    courseClicked: false
  }

  componentDidMount() {
    // this.scrollToBottom()

    this.getGroupsFromDb()
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

  courseClickChange = (event) => {
    this.setState({
      courseClicked: !this.state.courseClicked
    })
  }

  toggleShowGroupSelect = () => {
    this.setState({
      showGroupSelect: !this.state.showGroupSelect
    })
  }

  getGroupsFromDb = () => {
    database.ref('groups/').on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      if (data) {
        console.log(Object.entries(data))
        this.setState({
          groupArr: Object.entries(data)
        }, () => {
          console.log(this.state.groupArr);
        })
      }
    })
  }

  componentDidUpdate() {
    // this.scrollToBottom()
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

  handleInputChange = (event) => {
    event.preventDefault()
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(typeof event.target.name)
    console.log(event.target.value)

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.props.user);
    const groupObj = {
      groupName: this.state.groupName,
      groupLeader: this.state.groupLeader,
      institution: this.state.institution,
      // subscribed: { user: 'admin' }
      subscribed: { [this.props.user.uid]: this.props.user }
    }
    pushGroupIntoDb(groupObj);

    this.setState({
      groupName: '',
      groupLeader: '',
      institution: 'Compass College'
    })
  }

  handleSubscriptionChange = (groupID) => {

  }

  render() {

    console.log(this.props)

    return (
      this.state.courseClicked ?
        <InstitutionalSpace courseClickChange={this.courseClickChange} updateUserInState={this.props.updateUserInState} user={this.props.user} groupArr={this.state.groupArr} />
        :
        <div className="course-page-wrapper">
          <NavigationBar user={this.props.user} displayName={this.props.displayName} updateUserInState={this.props.updateUserInState} toggleShowGroupSelect={this.toggleShowGroupSelect} showGroupSelect={this.state.showGroupSelect} />

          <Container style={{ padding: '0px' }}>

            {!this.state.showGroupSelect
              ?
              <div>
                <div
                  onClick={this.courseClickChange}
                >
                  <Card style={{ borderRadius: '0px', backgroundColor: "#064d9e", color: '#fff' }}>
                    <Card.Body>
                      <Card.Title style={{ marginBottom: '5px', fontSize: '18px', fontWeight: '600', color: '#fff' }}>{"Compass College"}</Card.Title>
                      <Card.Text style={{ marginBottom: '0px', fontSize: '14px', fontWeight: '600', color: '#fff' }}>
                        {"Dean Young"}
                      </Card.Text>
                      <p style={{ marginBottom: '0px', fontSize: '14px', color: '#fff' }} >{"Compass College"}</p>
                    </Card.Body>
                  </Card>
                </div>

                {this.state.groupArr.map(group => (
                  group[1].subscribed ?
                  group[1].subscribed[this.props.user.uid] ?
                      <Card style={{ borderRadius: '0px' }}>
                        <Card.Body>
                          <Card.Title style={{ marginBottom: '5px', fontSize: '18px', fontWeight: '600', color: '#1565c0' }}>{group[1].groupName}</Card.Title>
                          <Card.Text style={{ marginBottom: '0px', fontSize: '14px', fontWeight: '600' }}>
                            {group[1].groupLeader}
                          </Card.Text>
                          <p style={{ marginBottom: '0px', fontSize: '14px', color: '#666' }} >{group[1].institution}</p>
                        </Card.Body>
                      </Card>
                      :
                      null
                    :
                    null
                ))}
              </div>

              :
              <div>
                {this.state.groupArr.map((group) => (
                  <SubscriptionCheck group={group} uid={this.props.user.uid} user={this.props.user} />
                ))}
                <div>
                  <div ref={this.messagesEndRef} />
                </div>
                <div style={{ height: '255px' }}></div>
                <Form onSubmit={this.handleSubmit} style={{ backgroundColor: 'white', position: 'fixed', bottom: '0px', width: '768px', maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto', boxShadow: '0 0 3px grey' }}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{ marginBottom: '0px' }}>
                    {/* <Form.Label>Add message</Form.Label> */}
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Name"
                    >
                      <Form.Control size="text" type="text" placeholder="Large text" name='groupName' value={this.state.groupName} onChange={this.handleInputChange} />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Leader"
                    >
                      <Form.Control size="text" type="text" placeholder="Large text" name='groupLeader' value={this.state.groupLeader} onChange={this.handleInputChange} />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Institution"
                      placeholder="Compass College"
                    >
                      <Form.Control size="text" type="text" placeholder="Compass College"
                        aria-label="Disabled input example"
                        readOnly name='institution' value={this.state.institution} onChange={this.handleInputChange} />
                    </FloatingLabel>

                  </Form.Group>
                  <div style={{ textAlign: 'right' }}>
                    <Button variant="primary" type="submit" style={{ marginBottom: '10px' }}>
                      Create
                    </Button>
                  </div>
                </Form>
              </div >
            }
          </Container>
        </div >
    )
  }
}

export default Connect;