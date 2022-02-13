import React, { Component } from 'react';
import { Button, Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import NavigationBarInCourse from '../../Components/NavigationBarInCourse/NavigationBarInCourse';
import './InstitutionalSpace.css'

import Activities from '../../Components/Activities/Activities'
import Connect from '../../Pages/Connect/Connect';

// import firebase function
import { updateUserObjInDB } from '../../firebase';
import { database, auth } from "../../firebase";

class InstitutionalSpace extends Component {

  state = {
    tabSelected: 'connect',
    spinnerOn: false,
  }

  changeTab = (clickedTab) => {
    console.log(clickedTab)
    this.setState({
      tabSelected: clickedTab
    }, () =>{
      console.log(this.state.tabSelected)
    })
  }

  render() {
    console.log(this.props.courseClickChange);
    return (
      <div className='course-page-wrapper'>
        <NavigationBarInCourse tabSelected={this.state.tabSelected} changeTab={this.changeTab} courseClickChange={this.props.courseClickChange} />
        <Container style={{ padding: '0px' }}>
        </Container>

        <div 
        style={this.state.tabSelected === "activities" ?
        { display: 'initial'} : { display: 'none'}}>
          <Activities courseClickChange={this.props.courseClickChange} updateUserInState={this.props.updateUserInState} user={this.props.user}/>
        </div>

        <div 
        style={this.state.tabSelected === "connect" ?
        { display: 'initial'} : { display: 'none'}}>
          <Connect user={this.props.user}/>
        </div>

      </div>
    )
  }
}

export default InstitutionalSpace;