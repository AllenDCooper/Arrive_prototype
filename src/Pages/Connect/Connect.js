import React, { Component } from 'react';
import { Button, Form, Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import NavigationBarInCourse from '../../Components/NavigationBarInCourse/NavigationBarInCourse';

class Connect extends Component {


  render() {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default Connect;