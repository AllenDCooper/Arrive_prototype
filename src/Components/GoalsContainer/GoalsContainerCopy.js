import React from 'react';
import { Container, Col, Row, Accordion, Spinner } from 'react-bootstrap';
import AccordionUnit from '../AccordionUnit/AccordionUnit'
import Header from '../Header/Header';


const GoalsContainer = (props) => {

  console.log(props)

  // helper function that will conditionally return components, and will be called in the render
  const renderAssignedGoals = (adaptiveLearningOn, takenAssessment) => {
    // displays three goal content units after assessment is taken
    if (adaptiveLearningOn && takenAssessment) {
      return (
        <div>
          <section>
            <Accordion>
              {!props.spinnerOn ?
                props.goalsToDisplayArr.map(item => (
                  <AccordionUnit setClickedLink={props.setClickedLink} takenAssessment={props.takenAssessment} score={item} saveCompletedGoal={props.saveCompletedGoal} updateScore={props.updateScore} submitScore={props.submitScore} role={props.roleSelected} />
                ))
                :
                <div>
                  <Spinner animation="grow" role="status" variant="primary" style={{ marginLeft: "20px" }}>
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                  <span style={{ marginLeft: "10px" }}>Generating your goals...</span>
                </div>
              }
            </Accordion>
          </section>
        </div>
      )
    }
    else if (takenAssessment) {
      return (
        <div>
          <section>
            <Accordion>
              <>
                {props.spinnerOn
                  ?
                  <div>
                    <Spinner animation="grow" role="status" variant="primary" style={{ marginLeft: "20px" }}>
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                    <span style={{ marginLeft: "10px" }}>Updating your goals...</span>
                  </div>
                  :
                  props.goalsToCompleteArr.map(item => (
                    <AccordionUnit setClickedLink={props.setClickedLink} takenAssessment={props.takenAssessment} score={item} saveCompletedGoal={props.saveCompletedGoal} updateScore={props.updateScore} submitScore={props.submitScore} role={props.roleSelected} />
                  ))}
              </>
            </Accordion>
          </section>
        </div>
      )
    } else {
      return (
        <div>
          <section>
            You have no current goals.
      </section>
        </div>
      )
    }
  }

  return (
    <Container>
      <Row className='tab-title-container'>
        <Col>
          <h4 className='tab-title'>
            My Goals
      </h4>
        </Col>
        {props.takenAssessment ?
          <Col>
            {/* <Header handleChange={props.handleChange} numUnits={props.numUnits} numGoalsToDisplay={props.numGoalsToDisplay} handleAdaptiveLearningChange={props.handleAdaptiveLearningChange} adaptiveLearningOn={props.adaptiveLearningOn} /> */}
          </Col>
          :
          null
        }
      </Row>

      {renderAssignedGoals(props.adaptiveLearningOn, props.takenAssessment)}
      
    </Container>
  )
}

export default GoalsContainer;