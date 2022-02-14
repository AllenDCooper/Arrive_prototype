import React, { Component } from 'react';
import ContentCard from '../../ContentCard/ContentCard';
import TestTakingUnitActivities from './TestTakingUnitActivities';

class TestTakingUnit extends Component {
  state = {
    activitiesArr: TestTakingUnitActivities[this.props.role],
    numActivitiesToDo: TestTakingUnitActivities[this.props.role].length,
    numActivitiesCompleted: 0,
    allActivitiesComplete: false,
    unitCompleted: false
  }

  closeActivity = () => {
    console.log(`closeActivity run`)
    this.setState({
      allActivitiesComplete: true
    })
  }

  submitActivity = (index) => {

    console.log(this.state.activitiesArr);

    this.setState(state => {
      const activitiesArr = state.activitiesArr;
      activitiesArr[index].completed = true;
      let numActivitiesCompleted = state.numActivitiesCompleted
      numActivitiesCompleted++
      return {
        activitiesArr,
        numActivitiesCompleted
      }
    },
      // callback function used to run closeActivity async (after state is updated)
      () => {
        if (this.state.numActivitiesToDo === this.state.numActivitiesCompleted) {
          this.closeActivity()
        }
      }
    )
  }

  render() {
    console.log(this.props.score)
    return (
      <ContentCard setClickedLink={this.props.setClickedLink} score={this.props.score} index={this.props.index} activitiesArr={this.state.activitiesArr} submitActivity={this.submitActivity} allActivitiesComplete={this.state.allActivitiesComplete} saveCompletedGoal={this.props.saveCompletedGoal} updateScore={this.props.updateScore} submitScore={this.props.submitScore} takenAssessment={this.props.takenAssessment} role={this.props.role} />
    )
  }
}

export default TestTakingUnit;