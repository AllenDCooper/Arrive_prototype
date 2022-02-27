import React, { Component } from 'react';
import { Container, Col, Row, Accordion, Spinner, Card, Form, Button } from 'react-bootstrap';
import AccordionUnit from '../AccordionUnit/AccordionUnit'
import Header from '../Header/Header';
import goals from '../../ACES_Assessment/goals'
import AccordionGoal from '../AccordionGoal/AccordionGoal';


class GoalsContainer extends Component {

  render() {
    console.log('goals container rendered')
    console.log(this.props.user.topGoalAreas)
    return (
      <div>
        {this.props.user.topGoalAreas ?
          <div className='course-page-wrapper' >
            <Container style={{ padding: '0px' }}>
              {this.props.user.topGoalAreas.map(goalArea => (
                <AccordionGoal goalArea={goalArea} goalAreaName={goalArea.name} />
              ))}
            </Container>
          </div >
          :
          <span></span>}
      </div>
    )
  }
}

export default GoalsContainer;