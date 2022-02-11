import React from 'react';
import { Card } from 'react-bootstrap';
import InstructorAccordionScale from '../AccordionScale/InstructorAccordionScale';
import reportsDataArr from '../../Data/classModelSeed';

const InstructorScorecard = props => {

  // sort function that takes an array and will return new array with items in order from largest to smallest
  const sortValuesDescending = (arr) => {
    console.log(arr);
    arr.sort(function (a, b) {
      return b[props.scoreType][props.scoreCohort].highScoreCountPercent - a[props.scoreType][props.scoreCohort].highScoreCountPercent
    })
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
      newArr.push(arr[i])
    }
    console.log(newArr)
    return newArr
  }

  const sortStrengths = (arr) => {
    // sort the percentile array into descending order so that top strengths will appear first
    const descendingArr = sortValuesDescending(arr);
    console.log(`descendingArr: ${descendingArr}`);

    // instantiate an array to hold the 3 tiers of skill
    const strengthsArr = [{ "Strengths": [] }, { "Developing_Strengths": [] }, { "Growth_Areas": [] }]

    // map descending array, sorting out into 3 tiers and pushing into appropriate object in strengthsArr
    descendingArr.forEach((element, index) => {
      if (element[props.scoreType][props.scoreCohort].highScoreCountPercent > 30) {
        const arrCopy1 = strengthsArr[0].Strengths
        let arr1 = []
        arrCopy1 === undefined ? arr1 = [] : arr1 = [...arrCopy1]
        arr1.push(element)
        strengthsArr[0].Strengths = arr1
      } else if (element[props.scoreType][props.scoreCohort].highScoreCountPercent <= 30 && element[props.scoreType][props.scoreCohort].highScoreCountPercent > 20) {
        const arrCopy2 = strengthsArr[1].Developing_Strengths
        let arr2 = []
        arrCopy2 === undefined ? arr2 = [] : arr2 = [...arrCopy2]
        arr2.push(element)
        strengthsArr[1].Developing_Strengths = arr2
      } else {
        const arrCopy3 = strengthsArr[2].Growth_Areas
        let arr3 = []
        arrCopy3 === undefined ? arr3 = [] : arr3 = [...arrCopy3]
        arr3.push(element)
        strengthsArr[2].Growth_Areas = arr3
      }
    })
    console.log(`strengthsArr: ${JSON.stringify(strengthsArr)}`)
    return strengthsArr
  }

  const strengthsArr = sortStrengths([...reportsDataArr])
  console.log(strengthsArr)

  // otherwise will display a strengths report module
  return (
    <div>
      {/* <h4 className='tab-title'>
            Strengths Report
          </h4> */}
      <div style={{ marginBottom: "30px" }} >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
        <Card>
          <Card.Body>
            <h5 className='strengths-header'>{props.cohortName} Strengths</h5>
            <div style={{ margin: '20px 0px' }}>
              {strengthsArr[0].Strengths.length === 0 ? <li>[empty]</li> : (
                strengthsArr[0].Strengths.map((scale, index) => (
                  <InstructorAccordionScale scale={scale} index={index} scoreType={props.scoreType} scoreCohort={props.scoreCohort} level={'high'}/>
                ))
              )}
            </div>
            <h5 className='strengths-header'>{props.cohortName} Developing Strengths</h5>
            <div style={{ margin: '20px 0px' }}>
              {strengthsArr[1].Developing_Strengths.length === 0 ? <li>[empty]</li> : (
                strengthsArr[1].Developing_Strengths.map((scale, index) => (
                  <InstructorAccordionScale scale={scale} index={index} scoreType={props.scoreType} scoreCohort={props.scoreCohort} level={'moderate'} />
                ))
              )}
            </div>
            <h5 className='strengths-header'>{props.cohortName} Growth Areas</h5>
            <div style={{ margin: '20px 0px' }}>
              {strengthsArr[2].Growth_Areas.length === 0 ? <li>[empty]</li> : (
                strengthsArr[2].Growth_Areas.map((scale, index) => (
                  <InstructorAccordionScale scale={scale} index={index} scoreType={props.scoreType} scoreCohort={props.scoreCohort} level={'low'}/>
                ))
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div >
  )
}

export default InstructorScorecard;