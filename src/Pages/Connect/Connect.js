import React, { Component } from 'react';
import { Button, Form, Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import NavigationBarInCourse from '../../Components/NavigationBarInCourse/NavigationBarInCourse';

class Connect extends Component {
  constructor(props) {
    super(props);
    this.messagesEndRef = React.createRef()
  }

  state = {
    messageArr: ['new message']
  }

  componentDidMount() {
    this.scrollToBottom()
    setInterval(this.addMessages, 1000)
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

  render() {
    // const { messages } = this.props
    return (
      <div>
        <div>
          {this.state.messageArr.map(message => (
            <div>message</div>
          ))}
          {/* {messages.map(message => <Message key={message.id} {...message} />)} */}
          <div ref={this.messagesEndRef} />
        </div>
        <div style={{height: '150px'}}></div>
        <Form style={{backgroundColor: 'white', position: 'fixed', bottom: '0px', width: '768px', maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto'}}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{marginBottom: '5px'}}>
            {/* <Form.Label>Add message</Form.Label> */}
            <Form.Control as="textarea" rows={3} placeholder="Add your thoughts/feelings here..." />
          </Form.Group>
          <div style={{textAlign: 'right'}}>
          <Button variant="primary" type="submit" style={{marginBottom: '10px'}}>
            Share
          </Button>
          </div>
        </Form>
      </div >
    )
  }
}

export default Connect;