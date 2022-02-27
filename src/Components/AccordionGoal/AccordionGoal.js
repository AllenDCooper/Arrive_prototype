import React, { Component } from 'react';
import { Container, Col, Row, Accordion, Spinner, Card, Form, Button } from 'react-bootstrap';
import AccordionUnit from '../AccordionUnit/AccordionUnit'
import Header from '../Header/Header';
import goals from '../../ACES_Assessment/goals'
import { render } from '@testing-library/react';

class AccordionGoal extends Component {

  state = {
    goalStr: '',
    goalIsDone: false,
    skillArea: this.props.skillArea
  }

  handleChange = (event) => {
    this.setState({
      goalStr: event.target.value
    }, () => {
      console.log(this.state.goalStr)
    })
  }

  handleComplete = () => {
    this.setState({
      goalIsDone: !this.state.goalIsDone
    })
  }

  render() {
    console.log(this.state)
    return (

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <Card variant="primary" style={{ border: 'none', width: '100%' }}>
              <Row style={{ margin: '0px' }}>
                {/* <Col xs={2} style={{ position: 'relative', padding: '0px' }}>
                    Goal!
                    <img style={{ width: '100%', maxWidth: '100px', margin: '5px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} alt='ACES logo' src='./aces.png' />
                  </Col> */}
                <Col xs={8}>
                  <Card.Body>
                    <Card.Title style={{ fontSize: '14px' }}>{goals[this.props.goalAreaName].low}</Card.Title>
                    {/* <Card.Subtitle style={{ fontSize: '12px' }} className="mb-2 text-muted">Discover your strengths and growth areas</Card.Subtitle> */}
                    <Card.Text style={{ fontSize: '12px' }}>
                      {this.props.goalArea.name}
                    </Card.Text>
                  </Card.Body>
                </Col>
                <Col xs={1}>

                </Col>
              </Row>
            </Card>
          </Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Text className="text-muted">
                  This is my personalized and SMART version of this goal:
                </Form.Text>
                <Form.Control value={this.state.messageStr} onChange={this.handleChange} type="text" />
              </Form.Group>
              {/* <Button variant="primary" type="submit">
                Share
              </Button> */}
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check onClick={this.handleComplete} type="checkbox" label="This goal is done!" />
              </Form.Group>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion >
    )
  }
}

export default AccordionGoal;