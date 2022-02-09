import React, { Component } from 'react';
import {Container, Row, Col, Image } from 'react-bootstrap';
import './About.css'

class About extends Component {

  render() {
    return (
      <div>
        <Container>
          <div className="jumbotron" style={{ backgroundColor: 'white', marginBottom: '0px', textAlign: "center" }}>
            <h1 className="main-title">About!</h1>
          </div>
          <Row>
            <Col>
              <p className='about-description montserrat'>Lorem Ipsum
              </p>
            </Col>
          </Row>
          <div className='about-us'>
            <Row>
              <Col>
                <h3 className='permanent-marker team-header'>Our Team!</h3>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    )
  }
}

export default About;