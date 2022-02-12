import React, { Component } from 'react';
import { Button, Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import NavigationBarInCourse from '../../Components/NavigationBarInCourse/NavigationBarInCourse';
import './InstitutionalSpace.css'
// importing components
import ModalAssessment from '../../Components/ModalAssessment/ModalAssessment';
import Scorecard from '../../Components/Scorecard/Scorecard';
// import CompletedGoalsContainer from '../../Components/CompletedGoals/CompletedGoalsContainer';
// import GoalsContainer from '../../Components/Goals/GoalsContainer';

// importing ACES Assessment
import normTable from '../../ACES_Assessment/normTable.js';
import itemsArr from '../../ACES_Assessment/itemsArr';
import scales from '../../ACES_Assessment/scales';

// import firebase function
import { updateUserObjInDB } from '../../firebase';
import { database, auth } from "../../firebase";

class InstitutionalSpace extends Component {

  state = {
    takenAssessment: false,
    spinnerOn: false,
    // scoreArr stores percentile scores for each scale
    scoreArr: [],

    // goalsArr stores all user data for each scale, including raw score and percentile score
    goalsArr: [],

    // answerArr stores raw scores for each item in the self-assessment
    answerArr: [],

    // strengthsArr stores percentile scores sorted by strengths, developing strengths, and growth areas
    strengthsArr: [],

    // goalsToCompleteArr stores percentile scores for each scale for which user has NOT yet completed a content unit
    // arranged in descending order, i.e. with lowest scores at the end
    goalsToCompleteArr: [],

    // completedGoalsArr stores percentile scores for each scale for which user has ALREADY completed a content unit for
    completedGoalsArr: [],

    // goalsToDisplayArr stores a certain number of items (determined by goalsToDisplay) from goalsToCompleteArr 
    goalsToDisplayArr: [],

    // goalsToDisplay determines numbers of goals to display at a time
    numGoalsToDisplay: 3
  }

  componentDidMount() {
    const userStrengths = database.ref('users/' + auth.currentUser.uid + '/strengthsArr');
    userStrengths.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      if (data) {
        console.log(data)
        this.setState({
          strengthsArr: data
        })
      }
    })
  }

  // this function will update the answerArr in state each time the user clicks on a radio button to answer an assessment question
  // it will be passed into ModelAssessment (child) and then into FormCheck (grandchild) as props
  updateScore = (event, index) => {
    console.log(event.target.value)
    console.log(index)
    const value = parseInt(event.target.value);
    this.setState(state => {
      const answerArr = state.answerArr;
      answerArr[index] = value;
      return {
        answerArr
      }
    },
      () => { console.log(this.state.answerArr) }
    )
  }

  // this function will fill out the answerArr in state with random answers for each assessment question
  // it will be passed into ModelAssessment (child) as props and be called when Random Score button is clicked
  randomScore = () => {
    this.setState(state => {
      const answerArr = []
      // a for loop ensures one random answer will be generated for each question item
      for (let i = 0; i < itemsArr.length; i++) {
        // randomly generate a score between 1 and 6 for each item
        const randomAnswer = Math.floor(Math.random() * 6) + 1
        answerArr.push(randomAnswer)
        // console.log(answerArr)
      }
      return {
        answerArr,
      }
    },
      // callback function used to submit score async (after state is updated)
      () => {
        this.submitScore()
        console.log(`answerArr: ${this.state.answerArr}`)
      }
    )
  }

  // function runs raw score through norm table and returns corresponding percentile rank
  convertToPercentile = (value, scaleIndex) => {
    // scaleIndex determines which of the scales in the norm table should be used
    // loops through each score for that particular scale in the norm table
    for (var i = 0; i < normTable[scaleIndex].length; i++) {
      const normScore = normTable[scaleIndex][i]
      // finds normScore that is equal to passed in value, and returns it
      if (value === parseInt(Object.keys(normScore))) {
        console.log(Object.values(normScore))
        return Object.values(normScore)
      }
    }
  }

  getGoalsArrOnSubmit = () => {
    let goalsArr = []
    // loop through scales array to retrieve array of index locations in the rawScoreArr for the items of that particular scale 
    scales.forEach((scale, scaleIndex) => {
      const scaleName = scale.name
      // instantiate scaleSum variable which will increase as item scores are added up for that scale
      let scaleSum = 0
      // loop through itemIndexes array stored in each scale object 
      scale.itemIndexes.forEach(index => {
        // create score variable to get the particular score for the given index
        const score = this.state.answerArr[index]
        // add that score to the scaleSum
        scaleSum += score
        console.log(scaleSum)
      })
      // convert scale sum to percentile score
      const percentileScore = parseInt(this.convertToPercentile(scaleSum, scaleIndex))

      // create score object that holds scale name and scale sum
      const scoreObj = { name: scaleName, rawScoreInitial: scaleSum, percentileScoreCurrent: percentileScore, isComplete: false }
      // push it into the rawScoreArr
      goalsArr.push(scoreObj)
      console.log(goalsArr)
    })
    return goalsArr
  }

  // sort function that takes an array and will return new array with items in order from largest to smallest
  sortValuesDescending = (arr) => {
    arr.sort(function (a, b) {
      return b.percentileScoreCurrent - a.percentileScoreCurrent
    })
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
      newArr.push(arr[i])
    }
    return newArr
  }

  // function that sorts percentile array into 3 tiers: strengths, developing strengths, and growth areas.
  sortStrengths = (arr) => {
    // sort the percentile array into descending order so that top strengths will appear first
    const descendingArr = this.sortValuesDescending(arr);

    // instantiate an array to hold the 3 tiers of skill
    const strengthsArr = [{ "Strengths": [] }, { "Developing_Strengths": [] }, { "Growth_Areas": [] }]

    // map descending array, sorting out into 3 tiers and pushing into appropriate object in strengthsArr
    descendingArr.forEach((element, index) => {
      console.log(`element.percentileScoreCurrent: ${element.percentileScoreCurrent}`);
      if (element.percentileScoreCurrent > 75) {
        const arrCopy1 = strengthsArr[0].Strengths
        let arr1 = []
        arrCopy1 === undefined ? arr1 = [] : arr1 = [...arrCopy1]
        arr1.push(element)
        strengthsArr[0].Strengths = arr1
      } else if (element.percentileScoreCurrent <= 75 && element.percentileScoreCurrent > 25) {
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
    return strengthsArr
  }

  update

  // function aggregates individual answers stored in answerArr into scales
  // passed as props into ModalAssessment component where it is called when assessment is submitted
  submitScore = (goal) => {

    let goalsArr = []

    if (goal) {
      goalsArr = this.getGoalsArrOnResubmit(goal)
    } else {
      goalsArr = this.getGoalsArrOnSubmit();
    }

    // sort percentile array into 3 arrays: strengths, developing strengths, and growth areas
    const strengthsArr = this.sortStrengths([...goalsArr])

    // const updatedUserObj ={
    //   strengthsArr: strengthsArr
    // }

    const user = auth.currentUser;

    // save into state
    this.setState(state => {
      const goalsToCompleteArr = goalsArr.filter(goal => goal.isComplete === false)

      const completedGoalsArr = goalsArr.filter(goal => goal.isComplete === true)

      let numGoalsToDisplay = state.numGoalsToDisplay
      // if user has selected maximum number of goals to display, reduce by 1
      if (parseInt(state.numGoalsToDisplay) === state.goalsToCompleteArr.length) {
        numGoalsToDisplay--
      }
      return {
        numGoalsToDisplay,
        takenAssessment: true,
        goalsArr,
        strengthsArr: strengthsArr,
        goalsToCompleteArr,
        completedGoalsArr,
      }
    }
      ,
      () => {
        console.log(`submitScore function successfully run`)
        updateUserObjInDB(user.uid, {
          strengthsArr: strengthsArr
        })
        this.saveCompletedGoal(scales)
      }
    );
  }

  saveCompletedGoal = (score) => {
    console.log(`saveCompletedGoal run`)
    this.setState({ spinnerOn: true })
    setTimeout(
      () => {
        this.setState(state => {

          let goalsToDisplayArr = this.getGoalDisplayArr(this.sortValuesDescending([...state.goalsToCompleteArr]), state.numGoalsToDisplay)

          return {
            goalsToDisplayArr,
            spinnerOn: false
          }
        }
        )
      }, 3000)
  }

  getGoalDisplayArr = (goalArr, numGoalsToDisplay) => {
    const arrCopy = [...goalArr];
    let limit = (arrCopy.length - numGoalsToDisplay) - 1
    let newArr = [];
    for (let i = (arrCopy.length - 1); i > limit; i--) {
      console.log(arrCopy[i]);
      // check to ensure value is not null before pushing into array
      if (arrCopy[i]) {
        newArr.push(arrCopy[i])
      }
    }
    return newArr
  }


  render() {
    console.log(this.props.courseClickChange);
    return (
      <div className='course-page-wrapper'>
        <NavigationBarInCourse courseClickChange={this.props.courseClickChange} />
        <Container style={{ padding: '0px' }}>
        </Container>

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <Card variant="primary" style={{ border: 'none' }} onClick={this.handleOpen}>
                <Row style={{ margin: '0px' }}>
                  <Col xs={2} style={{ position: 'relative', padding: '0px' }}>
                    <img style={{ width: '100%', maxWidth: '100px', margin: '5px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} alt='ACES logo' src='./aces.png' />
                  </Col>
                  <Col xs={8}>
                    <Card.Body>
                      <Card.Title style={{ fontSize: '14px' }}>ACES Strengths Assessment</Card.Title>
                      <Card.Subtitle style={{ fontSize: '12px' }} className="mb-2 text-muted">Discover your strengths and growth areas</Card.Subtitle>
                      <Card.Text style={{ fontSize: '12px' }}>
                        This 20-minute self-assessment has no right answers and no wrong answers. It is designed by experts in counseling psychology to help you identify your inner assets, grow new ones, and overcome your obstacles.
                      </Card.Text>
                    </Card.Body>
                  </Col>
                  <Col xs={1}>

                  </Col>
                </Row>
              </Card>
            </Accordion.Header>
            <Accordion.Body>
              {this.props.user.strengthsArr ?
                <Scorecard spinnerOn={this.state.spinnerOn} strengthsArr={this.props.user.strengthsArr} goalsArr={this.state.goalsArr} />
                :
                <ModalAssessment updateScore={this.updateScore} submitScore={this.submitScore} randomScore={this.randomScore} />
              }
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div>
          {/* <Scorecard spinnerOn={this.state.spinnerOn} strengthsArr={this.state.strengthsArr} goalsArr={this.state.goalsArr} /> */}
          <section>
            {/* <Accordion as={Card.Header} style={{ marginBottom: "0px" }} eventKey="0">
                <Card style={{ marginBottom: "30px" }}>
                    Self-Assessment (Initial)
                  <Accordion.Collapse eventKey="0">
                    <div>
                      <ModalAssessment updateScore={this.updateScore} submitScore={this.submitScore} randomScore={this.randomScore} />
                      <p>test</p>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </Accordion> */}
          </section>
        </div>

      </div>
    )
  }
}

export default InstitutionalSpace;