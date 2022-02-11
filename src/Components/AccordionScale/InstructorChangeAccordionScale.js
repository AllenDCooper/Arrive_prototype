import React from 'react';
import { Card, Accordion, ProgressBar, Row, Col, Button } from 'react-bootstrap';
import resources from '../../ACES_Assessment/resources';

function InstructorChangeAccordionScale(props) {

  const resourceObj = resources[props.scale.scaleName][props.level];
  console.log(resourceObj);

  const styles = {
    scaleTitle: {
      textAlign: 'right'
    },
    scaleTitleMobile: {
      textAlign: 'left'
    }
  }

  return (
    <Accordion>
      <Card style={{ border: 'none' }}>
        <Accordion.Toggle as={Button} variant="link" eventKey={props.index + 20} style={{ width: '100%', boxShadow: 'none', padding: '0' }}>
          <Row>
            <Col xs={12} md={4} style={window.innerWidth <= 740 ? styles.scaleTitleMobile : styles.scaleTitle}>
              <span style={{ fontWeight: "400" }}>{props.scale.scaleName}</span>
            </Col>
            <Col xs={12} md={8} style={{ margin: 'auto' }}>
              <ProgressBar style={{ position: 'relative' }}>
                <ProgressBar now={props.scale.changeScores[props.scoreCohort].rawScoreAvgChangePercent} label={`${props.scale.changeScores[props.scoreCohort].rawScoreAvgChangePercent}%`} style={props.scale.changeScores[props.scoreCohort].rawScoreAvgChangePercent < 0 ? { backgroundColor: 'red' } : {}} />
              </ProgressBar>
            </Col>
          </Row>
        </Accordion.Toggle>
      </Card>
    </Accordion>
  )
}

export default InstructorChangeAccordionScale;