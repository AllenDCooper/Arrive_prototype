import React from 'react';
import { Card, Accordion, ProgressBar, Row, Col, Button } from 'react-bootstrap';
import resources from '../../ACES_Assessment/resources';

function InstructorComparisonAccordionScale(props) {

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
          <Row className='comparison-progress-row' >
            <Col xs={12} md={4} style={window.innerWidth <= 740 ? styles.scaleTitleMobile : styles.scaleTitle}>
              <span style={{ fontWeight: "400" }}>{props.scale.scaleName}</span>
            </Col>
            <Col xs={12} md={8} style={{ margin: 'auto' }}>
              <ProgressBar style={{ position: 'relative' }}>
                <ProgressBar now={props.scale.initialScores[props.scoreCohort][0].lowScoreCountPercent} label={`${props.scale.initialScores[props.scoreCohort][0].lowScoreCountPercent}%`} style={{ backgroundColor: '#4da3ff' }} />
                <ProgressBar now={props.scale.initialScores[props.scoreCohort][0].moderateScoreCountPercent} label={`${props.scale.initialScores[props.scoreCohort][0].moderateScoreCountPercent}%`} />
                <ProgressBar now={props.scale.initialScores[props.scoreCohort][0].highScoreCountPercent} label={`${props.scale.initialScores[props.scoreCohort][0].highScoreCountPercent}%`} style={{ backgroundColor: '#0056b3' }} />
              </ProgressBar>
            </Col>
            <Col xs={12} md={4} style={{ textAlign: 'right' }}>
              <span style={{ fontWeight: "400" }}></span>
            </Col>
            <Col xs={12} md={8} style={{ margin: 'auto' }}>
              <ProgressBar style={{ position: 'relative' }}>
                <ProgressBar animated now={props.scale.progressScores[props.scoreCohort][0].lowScoreCountPercent} label={`${props.scale.progressScores[props.scoreCohort][0].lowScoreCountPercent}%`} style={{ backgroundColor: '#4da3ff' }} />
                <ProgressBar animated now={props.scale.progressScores[props.scoreCohort][0].moderateScoreCountPercent} label={`${props.scale.progressScores[props.scoreCohort][0].moderateScoreCountPercent}%`} />
                <ProgressBar animated now={props.scale.progressScores[props.scoreCohort][0].highScoreCountPercent} label={`${props.scale.progressScores[props.scoreCohort][0].highScoreCountPercent}%`} style={{ backgroundColor: '#0056b3' }} />
              </ProgressBar>
            </Col>
          </Row>
        </Accordion.Toggle>

      </Card>
    </Accordion>
  )
}

export default InstructorComparisonAccordionScale;