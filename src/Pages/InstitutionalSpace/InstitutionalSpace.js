import React, { Component } from 'react';
import { Button, Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import NavigationBarInCourse from '../../Components/NavigationBarInCourse/NavigationBarInCourse';
import './InstitutionalSpace.css'
// importing components
import ModalAssessment from '../../Components/ModalAssessment/ModalAssessment';

// importing ACES Assessment
import normTable from '../../ACES_Assessment/normTable.js';
import itemsArr from '../../ACES_Assessment/itemsArr';
import scales from '../../ACES_Assessment/scales';

class InstitutionalSpace extends Component {

  state = {
    takenAssessment: false,
    spinnerOn: false,
  }

  // this function will update the answerArr in state each time the user clicks on a radio button to answer an assessment question
  // it will be passed into ModelAssessment (child) and then into FormCheck (grandchild) as props
  updateScore = (event, index) => {
    console.log(event.target.value)
    console.log(index)
    const value = parseInt(event.target.value);
    this.setState(state => {
      const answerArr = state.answerArr;
      answerArr[index] = value;
      return {
        answerArr
      }
    },
      () => { console.log(this.state.answerArr) }
    )
  }

  // this function will fill out the answerArr in state with random answers for each assessment question
  // it will be passed into ModelAssessment (child) as props and be called when Random Score button is clicked
  randomScore = () => {
    this.setState(state => {
      const answerArr = []
      // a for loop ensures one random answer will be generated for each question item
      for (let i = 0; i < itemsArr.length; i++) {
        // randomly generate a score between 1 and 6 for each item
        const randomAnswer = Math.floor(Math.random() * 6) + 1
        answerArr.push(randomAnswer)
        // console.log(answerArr)
      }
      return {
        answerArr,
      }
    },
      // callback function used to submit score async (after state is updated)
      () => {
        this.submitScore()
        console.log(`answerArr: ${this.state.answerArr}`)
      }
    )
  }

  render() {
    console.log(this.props.courseClickChange);
    return (
      <div className='course-page-wrapper'>
        <NavigationBarInCourse courseClickChange={this.props.courseClickChange} />
        <Container style={{ padding: '0px' }}>
        </Container>

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <Card variant="primary" style={{ border: 'none' }} onClick={this.handleOpen}>
                <Row style={{ margin: '0px' }}>
                  <Col xs={2} style={{ position: 'relative', padding: '0px' }}>
                    <img style={{ width: '100%', maxWidth: '100px', margin: '5px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} alt='ACES logo' src='./aces.png' />
                  </Col>
                  <Col xs={8}>
                    <Card.Body>
                      <Card.Title style={{ fontSize: '14px' }}>ACES Strengths Assessment</Card.Title>
                      <Card.Subtitle style={{ fontSize: '12px' }} className="mb-2 text-muted">Discover your strengths and growth areas</Card.Subtitle>
                      <Card.Text style={{ fontSize: '12px' }}>
                        This 20-minute self-assessment has no right answers and no wrong answers. It is designed by experts in counseling psychology to help you identify your inner assets, grow new ones, and overcome your obstacles.
                      </Card.Text>
                    </Card.Body>
                  </Col>
                  <Col xs={1}>

                  </Col>
                </Row>
              </Card>
            </Accordion.Header>
            <Accordion.Body>
              <ModalAssessment updateScore={this.updateScore} submitScore={this.submitScore} randomScore={this.randomScore} />

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div>
          {/* <Scorecard spinnerOn={this.state.spinnerOn} strengthsArr={this.state.strengthsArr} goalsArr={this.state.goalsArr} /> */}
          <section>
            {/* <Accordion as={Card.Header} style={{ marginBottom: "0px" }} eventKey="0">
                <Card style={{ marginBottom: "30px" }}>
                    Self-Assessment (Initial)
                  <Accordion.Collapse eventKey="0">
                    <div>
                      <ModalAssessment updateScore={this.updateScore} submitScore={this.submitScore} randomScore={this.randomScore} />
                      <p>test</p>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion> */}
          </section>
        </div>

      </div>
    )
  }
}

export default InstitutionalSpace;