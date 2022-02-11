import React from 'react';
import { Form } from 'react-bootstrap';

// functional component that creates a form of radio buttons for each item in the assessment
// index of pageArr provides the index (0-9) of item on the individual page, while pageNum from props gives the page number: 
// these are combined to provide an actual index of the item in the entire assessment,
// and are passed into updateScore function to update the appropriate item in the rawScoreArr in the state of app.js
function FormCheck(props) {
  console.log(props.pageNum)
  return (
    <div>
      {props.itemsPageArr.map((item, index) => (
        <div key={`item-${(index + 1 + (10 * parseInt(props.pageNum)))}`} style={{ marginBottom: "20px" }}>
          <h6 style={{fontSize: '12px'}}>{`Question #${(index + 1 + (10 * parseInt(props.pageNum)))}`}</h6>
          <h6 style={{fontSize: '12px'}}>{item.itemText}</h6>
          <Form.Check
            style={{ fontSize: '12px', margin: '0px' }}
            custom
            // inline
            label="Strongly Agree"
            type="radio"
            id={`item-1-${(index + 1 + (10 * parseInt(props.pageNum)))}`}
            name={`item${(index + 1 + (10 * parseInt(props.pageNum)))}`}
            value={item.reverseScore ? 1 : 6}
            onChange={(event) => props.updateScore(event, (index + (10 * parseInt(props.pageNum))))}
            required
            feedback="You must select an option."
          />
          <Form.Check
            style={{ fontSize: '12px', margin: '0px' }}
            custom
            // inline
            label="Agree"
            type="radio"
            id={`item-2-${(index + 1 + (10 * parseInt(props.pageNum)))}`}
            name={`item${(index + 1 + (10 * parseInt(props.pageNum)))}`}
            value={item.reverseScore ? 2 : 5}
            onChange={(event) => props.updateScore(event, (index + (10 * parseInt(props.pageNum))))}
            required
            feedback="You must select an option."
          />
          <Form.Check
            style={{ fontSize: '12px', margin: '0px' }}
            custom
            // inline
            label="Somewhat Agree"
            type="radio"
            id={`item-3-${(index + 1 + (10 * parseInt(props.pageNum)))}`}
            name={`item${(index + 1 + (10 * parseInt(props.pageNum)))}`}
            value={item.reverseScore ? 3 : 4}
            onChange={(event) => props.updateScore(event, (index + (10 * parseInt(props.pageNum))))}
            required
            feedback="You must select an option."
          />
          <Form.Check
            style={{ fontSize: '12px', margin: '0px' }}
            custom
            // inline
            label="Somewhat Disagree"
            type="radio"
            id={`item-4-${(index + 1 + (10 * parseInt(props.pageNum)))}`}
            name={`item${(index + 1 + (10 * parseInt(props.pageNum)))}`}
            value={item.reverseScore ? 4 : 3}
            onChange={(event) => props.updateScore(event, (index + (10 * parseInt(props.pageNum))))}
            required
            feedback="You must select an option."
          />
          <Form.Check
            style={{ fontSize: '12px', margin: '0px' }}
            custom
            // inline
            label="Disagree"
            type="radio"
            id={`item-5-${(index + 1 + (10 * parseInt(props.pageNum)))}`}
            name={`item${(index + 1 + (10 * parseInt(props.pageNum)))}`}
            value={item.reverseScore ? 5 : 2}
            onChange={(event) => props.updateScore(event, (index + (10 * parseInt(props.pageNum))))}
            required
            feedback="You must select an option."
          />
          <Form.Check
            style={{ fontSize: '12px', margin: '0px' }}
            custom
            // inline
            label="Strongly Disagree"
            type="radio"
            id={`item-6-${(index + 1 + (10 * parseInt(props.pageNum)))}`}
            name={`item${(index + 1 + (10 * parseInt(props.pageNum)))}`}
            value={item.reverseScore ? 6 : 1}
            onChange={(event) => props.updateScore(event, (index + (10 * parseInt(props.pageNum))))}
            required
            feedback="You must select an option."
          />
          {index === 9 ? null : <hr></hr>}
        </div>
      ))}
    </div>
  )
}

export default FormCheck;