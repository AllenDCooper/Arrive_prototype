import React from 'react';
import { Card, Accordion, ProgressBar, Row, Col, Button } from 'react-bootstrap';
import resources from '../../ACES_Assessment/resources';

function AccordionScale(props) {

  const resourceObj = resources[props.scale.name][props.level];
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
    // <Accordion>
      <Card style={{ border: 'none' }}>
        {/* <Accordion.Header  variant="link" eventKey={props.index + 20} style={{ width: '100%', boxShadow: 'none', padding: '0', border: 'none' }}> */}
          <Row style={{width: '100%', fontSize: '12px'}}>
            <Col xs={12} md={6} style={window.innerWidth <= 740 ? styles.scaleTitleMobile : styles.scaleTitle}>
              <span style={{ fontWeight: "400" }}>{props.scale.name}</span>
            </Col>
            <Col xs={12} md={6} style={{ margin: 'auto' }}>
              {props.scale.percentileScoreInitial ?
                <ProgressBar style={{ position: 'relative' }}>
                  <span style={{ textAlign: 'center', position: 'absolute',width: `${props.scale.percentileScoreCurrent}%`, left: '0px', color: 'white', lineHeight: '1.25' }}>
                    {`${props.scale.percentileScoreCurrent}%`}
                    </span>
                  <ProgressBar now={props.scale.percentileScoreInitial} />
                  <ProgressBar animated variant='success' now={props.scale.percentileScoreCurrent - props.scale.percentileScoreInitial} />
                </ProgressBar>
                :
                <ProgressBar now={props.scale.percentileScoreCurrent}
                // label={`${props.scale.percentileScoreCurrent}%`}
                />
              }
            </Col>
          </Row>
        {/* </Accordion.Header> */}
        {/* <Accordion.Body eventKey={props.index + 20}>
          <div>
            {props.scale.percentileScoreInitial ?
              <div>
                <Row>
                  <Col xs={12} md={4} style={{ textAlign: 'right' }}>
                    <span style={{ fontWeight: "400" }}>{`Initial`}</span>
                  </Col>
                  <Col xs={12} md={8} style={{ margin: 'auto' }}>
                    <ProgressBar>
                      <ProgressBar style={{ backgroundColor: '#33AEFF' }} now={props.scale.percentileScoreInitial} label={`${props.scale.percentileScoreInitial}%`} />
                    </ProgressBar>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={4} style={{ textAlign: 'right' }}>
                    <span style={{ fontWeight: "400" }}>{`Progress`}</span>
                  </Col>
                  <Col xs={12} md={8} style={{ margin: 'auto' }}>
                    <ProgressBar>
                      <ProgressBar style={{ backgroundColor: '#33AEFF' }} now={props.scale.percentileScoreCurrent} label={`${props.scale.percentileScoreCurrent}%`} />
                    </ProgressBar>
                  </Col>
                </Row>
              </div>
              :
              null
            }
            <Row>
              <Col xs={12} md={4} style={{ textAlign: 'right' }}>
                <span style={{ fontWeight: "400" }}></span>
              </Col>
              <Col xs={12} md={8} style={{ margin: 'auto' }}>
                <h5>{props.scale.name}</h5>
                <p>{resourceObj.description}</p>
                <ul>
                  {resourceObj.resources.map(item =>
                    <li>
                      {`${item.resourceName}: `}<a target='_blank' href={`/${item.resourceURL}`}>{item.resourceURL}</a>
                      <p>{item.resourceText}</p>
                    </li>
                  )}
                </ul>
              </Col>
            </Row>
          </div>
        </Accordion.Body> */}
      </Card>
    /* </Accordion> */
  )
}

export default AccordionScale;