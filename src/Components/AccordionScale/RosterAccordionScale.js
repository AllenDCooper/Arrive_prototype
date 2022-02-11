import React from 'react';
import { Card, Accordion, ProgressBar, Row, Col, Button } from 'react-bootstrap';

const RosterAccordionScale = (props) => {

  return (
    <Accordion>
      <Card style={{ border: 'none' }}>
        <Accordion.Toggle as={Button} variant="link" eventKey={props.index} style={{ width: '100%', boxShadow: 'none', padding: '0' }}>
          <Row className={props.scoreTypeAlt ? 'comparison-progress-row' : null}>
            <Col xs={12} md={4} style={window.innerWidth <= 740 ? props.styles.scaleTitleMobile : props.styles.scaleTitle}>
              <span style={{ fontWeight: "400" }}>{props.userScore.userName}</span>
            </Col>
            <Col xs={12} md={8} style={{ margin: 'auto' }}>
              <ProgressBar style={{ position: 'relative' }}>
                <ProgressBar now={Math.abs(props.userScore.scores[props.index][props.scoreType])} label={`${props.userScore.scores[props.index][props.scoreType]}%`} style={props.userScore.scores[props.index][props.scoreType] < 0 ? { backgroundColor: 'red' } : {}} />
              </ProgressBar>
            </Col>
            {props.scoreTypeAlt ?
              <>
                <Col xs={12} md={4} style={window.innerWidth <= 740 ? props.styles.scaleTitleMobile : props.styles.scaleTitle}>
                </Col>
                <Col xs={12} md={8} style={{ margin: 'auto' }}>
                  <ProgressBar style={{ position: 'relative' }}>
                    <ProgressBar animated now={Math.abs(props.userScore.scores[props.index][props.scoreTypeAlt])} label={`${props.userScore.scores[props.index][props.scoreTypeAlt]}%`} />
                  </ProgressBar>
                </Col>
              </>
              :
              null
            }
          </Row>
        </Accordion.Toggle>
      </Card>
    </Accordion>
  )
}

export default RosterAccordionScale;