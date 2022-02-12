import React, { Component } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import AccordionScale from '../AccordionScale/AccordionScale';
import './Scorecard.css';

class Scorecard extends Component {

  render() {
    console.log(this.props.strengthsArr)
    console.log(this.props.spinnerOn)

    return (
      <div style={{fontSize: '12px'}}>
        {/* <h4 className='tab-title'>
          My Strengths Report
        </h4>
        <div style={{ marginBottom: "30px" }} >
          <p>The following report shows your unique set of strengths.
            <ul>
              <li>Strengths are inner assets that you can leverage to overcome obstacles and achieve goals.</li>
              <li>Developing strengths are skill areas you should continue developing.</li>
              <li>Growth areas are key opportunities to develop new Strengths.</li>
            </ul>
          </p> */}
          <Card style={{border: 'none'}}>
            <Card.Body style={{paddingTop: '0px'}}>
              <h5 className='strengths-header'>My Strengths</h5>
              <div style={{ margin: '20px 0px' }}>
                {!this.props.strengthsArr[0] ? <div style={{textAlign: 'center'}}><span>Work on your developing strengths and growth areas!</span></div> : (
                  this.props.strengthsArr[0].Strengths.map((scale, index) => (
                    // <p>{scale.name}</p>
                    <AccordionScale scale={scale} index={index} level={'high'} />
                  ))
                )}
              </div>
              <h5 className='strengths-header'>My Developing Strengths</h5>
              <div style={{ margin: '20px 0px' }}>
                {this.props.strengthsArr[1].Developing_Strengths.length === 0 ? <li>[empty]</li> : (
                  this.props.strengthsArr[1].Developing_Strengths.map((scale, index) => (
                    // <p>{scale.name}</p>
                    <AccordionScale scale={scale} index={index} level={'moderate'} />
                  ))
                )}
              </div>
              <h5 className='strengths-header'>My Growth Areas</h5>
              <div style={{ margin: '20px 0px' }}>
                {this.props.strengthsArr[2].Growth_Areas.length === 0 ? <li>[empty]</li> : (
                  this.props.strengthsArr[2].Growth_Areas.map((scale, index) => (
                    // <p>{scale.name}</p>
                    <AccordionScale scale={scale} index={index} level={'low'} />
                  ))
                )}
              </div>
            </Card.Body>
          </Card>
      </div >
    )
  }
}

export default Scorecard;