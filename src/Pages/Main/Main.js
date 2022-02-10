import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import './Main.css'

class Main extends Component {

  render() {
    return (
      <div className="course-page-wrapper">
        <NavigationBar user={this.props.user} displayName={this.props.displayName} updateUserInState={this.props.updateUserInState}/>
        <Container>
          <div className="jumbotron">
            <h1>Main page</h1>
          </div>
        </Container>
      </div>
    )
  }
}

export default Main;