import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class Header extends Component {

  render() {
    console.log(this.props.numUnits)
    return (
      <div>
        <Form >
          <Form.Group className='adaptive-learning-control' controlId="adaptiveLearning">
            <div>
              <span style={{ fontWeight: "500" }}>Adaptive learning?</span>
              <Form.Check
                style={{ display: "inline", marginLeft: "15px" }}
                type="switch"
                id="adaptiveLearningSwitch"
                label={this.props.adaptiveLearningOn ? "On" : "Off"}
                onChange={this.props.handleAdaptiveLearningChange}
              />
              <p style={{ fontSize: '12px', color: 'darkgray' }}>Deliver personalized content units based on the strengths report.</p>
            </div>
            {this.props.adaptiveLearningOn ?
              <div>
                <Form.Label style={{ fontWeight: "500" }}>Number of Goals to Assign at a Time</Form.Label>
                <Form.Control as="select" defaultValue="3" value={this.props.numGoalsToDisplay} style={{width: 'auto', display: 'inline-block', marginLeft: '15px'}} onChange={(event) => this.props.handleChange(event)}>
                  {this.props.numUnits.map((item, index) => (
                    <option>{index + 1}</option>
                  ))}
                </Form.Control>
              </div>
              :
              null
            }
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default Header;

