import React, { Component } from 'react';
import { Card, Container } from 'react-bootstrap';
import NavigationBarInCourse from '../../Components/NavigationBarInCourse/NavigationBarInCourse';
import './InstitutionalSpace.css'

class InstitutionalSpace extends Component {

  render() {
    console.log(this.props.courseClickChange);
    return (
      <div className="course-page-wrapper">
        <NavigationBarInCourse courseClickChange={this.props.courseClickChange}/>
        <Container style={{padding: '0px'}}>
        </Container>
      </div>
    )
  }
}

export default InstitutionalSpace;