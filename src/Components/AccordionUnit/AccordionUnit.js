import React, { Component } from 'react';
import { CriticalThinkingUnit, MotivationUnit, LearningUnit, TimeManagementUnit, ReadingUnit, NoteTakingUnit, MemoryUnit, TestTakingUnit, CommUnit, ConnectingUnit, HealthUnit, PlanningUnit } from '../ContentUnits'


class AccordionUnit extends Component {

  // this function will deliver the appropriate content unit for the particular scale passed in as props
  scoreSwitch = (score) => {
    console.log(score)
    switch (score.name) {
      case "Critical Thinking and Goal Setting":
        return (
          <CriticalThinkingUnit setClickedLink={this.props.setClickedLink} score={score} index={1} saveCompletedGoal={this.props.saveCompletedGoal} updateScore={this.props.updateScore} submitScore={this.props.submitScore} takenAssessment={this.props.takenAssessment} role={this.props.role} />
        )
      case "Motivation and Decision Making":
        return (
          <MotivationUnit setClickedLink={this.props.setClickedLink} score={score} index={2} saveCompletedGoal={this.props.saveCompletedGoal} updateScore={this.props.updateScore} submitScore={this.props.submitScore} takenAssessment={this.props.takenAssessment} role={this.props.role} />
        )
      case "Learning Preferences":
        return (
          <LearningUnit setClickedLink={this.props.setClickedLink} score={score} index={3} saveCompletedGoal={this.props.saveCompletedGoal} updateScore={this.props.updateScore} submitScore={this.props.submitScore} takenAssessment={this.props.takenAssessment} role={this.props.role} />
        )
      case "Organization and Time Management":
        return (
          <TimeManagementUnit setClickedLink={this.props.setClickedLink} score={score} index={4} saveCompletedGoal={this.props.saveCompletedGoal} updateScore={this.props.updateScore} submitScore={this.props.submitScore} takenAssessment={this.props.takenAssessment} role={this.props.role} />
        )
      case "Reading":
        return (
          <ReadingUnit setClickedLink={this.props.setClickedLink} score={score} index={5} saveCompletedGoal={this.props.saveCompletedGoal}  updateScore={this.props.updateScore} submitScore={this.props.submitScore} takenAssessment={this.props.takenAssessment} role={this.props.role} />
        )
      case "Note Taking":
        return (
          <NoteTakingUnit setClickedLink={this.props.setClickedLink} score={score} index={6} saveCompletedGoal={this.props.saveCompletedGoal} updateScore={this.props.updateScore} submitScore={this.props.submitScore} takenAssessment={this.props.takenAssessment} role={this.props.role} />
        )
      case "Memory and Studying":
        return (
          <MemoryUnit setClickedLink={this.props.setClickedLink} score={score} index={7} saveCompletedGoal={this.props.saveCompletedGoal} updateScore={this.props.updateScore} submitScore={this.props.submitScore} takenAssessment={this.props.takenAssessment} role={this.props.role} />
        );
      case "Test Taking":
        return (
          <TestTakingUnit setClickedLink={this.props.setClickedLink} score={score} index={8} saveCompletedGoal={this.props.saveCompletedGoal} updateScore={this.props.updateScore} submitScore={this.props.submitScore} takenAssessment={this.props.takenAssessment} role={this.props.role} />
        );
      case "Information Literacy and Communication":
        return (
          <CommUnit setClickedLink={this.props.setClickedLink} score={score} index={9} saveCompletedGoal={this.props.saveCompletedGoal} updateScore={this.props.updateScore} submitScore={this.props.submitScore} takenAssessment={this.props.takenAssessment} role={this.props.role} />
        )
      case "Connecting with Others":
        return (
          <ConnectingUnit setClickedLink={this.props.setClickedLink} score={score} index={10} saveCompletedGoal={this.props.saveCompletedGoal} updateScore={this.props.updateScore} submitScore={this.props.submitScore} takenAssessment={this.props.takenAssessment} role={this.props.role} />
        )
      case "Personal and Financial Health":
        return (
          <HealthUnit setClickedLink={this.props.setClickedLink} score={score} index={11} saveCompletedGoal={this.props.saveCompletedGoal} updateScore={this.props.updateScore} submitScore={this.props.submitScore} takenAssessment={this.props.takenAssessment} role={this.props.role} />
        )
      case "Academic and Career Planning":
        return (
          <PlanningUnit setClickedLink={this.props.setClickedLink} score={score} index={12} saveCompletedGoal={this.props.saveCompletedGoal} updateScore={this.props.updateScore} submitScore={this.props.submitScore} takenAssessment={this.props.takenAssessment} role={this.props.role} />
        )
      default:
        return (null);
    }
  }

  render() {
    // console.log(this.props.score)
    // console.log(this.props)
    return (this.scoreSwitch(this.props.score))
  }
};

export default AccordionUnit