import React from 'react';
import { Form } from 'react-bootstrap';

function Activity(props) {
  switch (props.activity.activityType) {
    case 'video':
      return (
        <span>
          <Form.Check style={{ display: 'inline-block', marginLeft: '20px' }} type="checkbox" checked={props.completed} onChange={props.onChangeFunction}/>
          <a className='activity-link' href='https://players.brightcove.net/1500315202001/B1AhVYg4l_default/index.html?videoId=2649402451001' target='_blank'>
            {`${props.activity.activityName} ${(props.activity.completed ? "Completed" : "")}`}
          </a>
        </span>
      );
    case 'ebook':
      return (
        <span>
          <Form.Check style={{ display: 'inline-block', marginLeft: '20px' }} type="checkbox" checked={props.completed} onChange={props.onChangeFunction}/>
          <a className='activity-link' href={`${process.env.PUBLIC_URL}/images/ebook.PNG`} target='_blank'>
            {`${props.activity.activityName} ${(props.activity.completed ? "Completed" : "")}`}
          </a>
        </span>
      );
    case 'learningcurve':
      return (
        <span>
          <Form.Check style={{ display: 'inline-block', marginLeft: '20px' }} type="checkbox" checked={props.completed} onChange={props.onChangeFunction}/>
          <a className='activity-link' href='https://www.macmillanhighered.com/externalcontent/learningcurve.bfwpub.com/?file=comm/connections2e/chapter_02_0A8267' target='_blank'>
            {`${props.activity.activityName} ${(props.activity.completed ? "Completed" : "")}`}
          </a>
        </span>
      );
    case 'quiz':
      return (
        <span>
          <Form.Check style={{ display: 'inline-block', marginLeft: '20px' }} type="checkbox" checked={props.completed} onChange={props.onChangeFunction}/>
          <a className='activity-link' href={`${process.env.PUBLIC_URL}/images/quiz.PNG`} target='_blank'>
            {`${props.activity.activityName} ${(props.activity.completed ? "Completed" : "")}`}
          </a>
        </span>
      );
      default: 
      return (
        <span>
        <Form.Check style={{ display: 'inline-block', marginLeft: '20px' }} type="checkbox" checked={props.completed} onChange={props.onChangeFunction}/>
        <a className='activity-link' href={`${process.env.PUBLIC_URL}/#`} target='_blank'>
          {`${props.activity.activityName} ${(props.activity.completed ? "Completed" : "")}`}
        </a>
      </span>
      );
  }
}

export default Activity;