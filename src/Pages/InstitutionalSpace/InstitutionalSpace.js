import React, { Component } from 'react';
import { Dropdown, Button, Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import NavigationBarInCourse from '../../Components/NavigationBarInCourse/NavigationBarInCourse';
import './InstitutionalSpace.css'

import Activities from '../../Components/Activities/Activities'
import Connect from '../../Pages/Connect/Connect';
import GoalsContainer from '../../Components/GoalsContainer/GoalsContainer';

// import firebase function
import { updateUserObjInDB } from '../../firebase';
import { database, auth } from "../../firebase";

class InstitutionalSpace extends Component {

  state = {
    tabSelected: 'connect',
    spinnerOn: false,
    messageArr: [],
    groupSelect: ['All', { groupName: 'All' }]
  }

  componentDidMount() {
    this.getGoalListFromDB
    this.getMessagesFromDB()
  }

  getGoalListFromDB = (uid) => {
    database.ref('users/' + userID).on('value', (snapshot) => {
      console.log(data);

      if (data) {
        console.log(data);
        this.setState({
          strengthsToCompleteArr: data
        })
      }
    })
  }

  getMessagesFromDB = () => {
    console.log('getMessagesFromDB run')
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

  changeTab = (clickedTab) => {
    console.log(clickedTab)
    this.setState({
      tabSelected: clickedTab
    }, () => {
      console.log(this.state.tabSelected)
    })
  }

  handleGroupSelectChange = (groupObj) => {
    console.log(groupObj)
    this.setState({
      groupSelect: groupObj,
    })
  }

  render() {
    console.log(this.props.courseClickChange);
    return (
      <div className='course-page-wrapper'>
        <NavigationBarInCourse tabSelected={this.state.tabSelected} changeTab={this.changeTab} courseClickChange={this.props.courseClickChange} groupSelect={this.state.groupSelect} handleGroupSelectChange={this.handleGroupSelectChange} groupArr={this.props.groupArr} user={this.props.user} />
        <Container style={{ padding: '0px' }}>
        </Container>

        <div
          style={this.state.tabSelected === "activities" ?
            { display: 'initial' } : { display: 'none' }}>
          <Activities courseClickChange={this.props.courseClickChange} updateUserInState={this.props.updateUserInState} user={this.props.user} />
        </div>

        <div
          style={this.state.tabSelected === "connect" ?
            { display: 'initial' } : { display: 'none' }}>
          <Connect user={this.props.user} groupArr={this.props.groupArr} messageArr={this.state.messageArr} groupSelect={this.state.groupSelect} handleGroupSelectChange={this.handleGroupSelectChange} />
        </div>

        <div
          style={this.state.tabSelected === "goals" ?
            { display: 'initial' } : { display: 'none' }}>
          <GoalsContainer user={this.props.user} strengthsToCompleteArr={this.state.strengthsToCompleteArr} />
        </div>

      </div>
    )
  }
}

export default InstitutionalSpace;