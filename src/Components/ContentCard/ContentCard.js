import React, { Component } from 'react';
import { Accordion, Card, Form } from 'react-bootstrap';
import goals from '../../ACES_Assessment/goals';
import './styles.css';
// import ModalReassessment from '../ModalReassessment/ModalReassessment';
import Activity from '../../Components/Activity/Activity';

class ContentCard extends Component {

  state = {
    show: false,
    typed: "",
    switchChecked: false,
    viewed: false,
    goalString: null,
  }

  componentDidMount() {
    const goalString = goals[this.props.score.name][this.findValueTier(this.props.score.percentileScoreInitial)]
    this.setState({
      goalString: goalString
    })
  }

  toggleShow = () => {
    console.log(`this.state.show: ${this.state.show}`)
    this.setState(prevState => {
      return {
        show: !prevState.show
      }
    },
      () => {
        if (this.state.show && !this.state.viewed) {
          setTimeout(() => { this.typeWriter(this.state.goalString) }, 1000)
          this.setState({ viewed: true })
        } else {
          this.setState({ typed: goals[this.props.score.name][this.findValueTier(this.props.score.percentileScoreInitial)] })
        }
      }
    )
  };

  resetTypeWriter() {
    this.setState({
      typed: ""
    })
  }

  typeWriter(slicedStr) {
    if (slicedStr.length !== 0 && this.state.show) {
      this.setState((state) => ({
        typed: state.typed.concat(slicedStr[0])
      }));

      setTimeout(() => this.typeWriter(slicedStr.slice(1)), 50);
      // console.log(`this.state.typed: ${this.state.typed}`)
    }
  }

  findValueTier = (value) => {
    console.log(value)
    console.log(value > 75 ? "high"
      : value > 25 ? "moderate"
        : "low")
    return value > 75 ? "high"
      : value > 25 ? "moderate"
        : "low";
  }

  submitGoal = () => {
    this.setState(prevState => {
      return {
        switchChecked: !prevState.switchChecked
      }
    })
    // () => {
    //   this.props.saveCompletedGoal(this.props.score)
    // })
  }

  render() {

    console.log(this.props);

    return (
      <Card className='hover-pointer'>
        <Accordion.Toggle as={Card.Body} eventKey={this.props.index} onClick={this.toggleShow} >
          <span className='goal-scale'>{this.props.score.name}</span>
          <br></br>
          <span className='permanent-marker-goal'>{this.state.goalString}</span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={this.props.index} >
          <div>
            {this.props.activitiesArr.map((item, index) => (
              <Card.Body style={{ borderBottom: "1px solid #ededed", paddingLeft: "2rem" }}>
                <Form.Group controlId={`formBasicCheckbox-${index}`}>
                  {item.completed ? (
                    <Activity activity={item} completed={true} />
                  ) : (
                      <Activity activity={item} completed={false} onChangeFunction={() => this.props.submitActivity(index)} />
                    )}
                </Form.Group>
              </Card.Body>
            ))}
            {this.props.allActivitiesComplete ? (
              this.state.switchChecked ?
                <Card.Body style={{ paddingLeft: "2rem" }}>
                  Goal completed?
                  <Form.Check
                    type="switch"
                    id={`switch-${this.props.index}`}
                    onClick={this.submitGoal}
                    label={(this.state.switchChecked ? `Yes!` : `No`)}
                  />
                </Card.Body>
                :
                <Card.Body style={{ paddingLeft: "2rem", backgroundColor: "#fff6e5" }}>
                  Goal completed?
                  <Form.Check
                    type="switch"
                    id={`switch-${this.props.index}`}
                    onClick={this.submitGoal}
                    label={(this.state.switchChecked ? `Yes!` : `No`)}
                  />
                </Card.Body>
            )
              : null}
            {/* {this.state.switchChecked ?
              this.props.role === 'Student' ?
                (
                  <ModalReassessment setClickedLink={this.props.setClickedLink} updateScore={this.props.updateScore} scaleName={this.props.score.name} submitScore={this.props.submitScore} saveCompletedGoal={this.props.saveCompletedGoal} score={this.props.score} />)
                :
                null
              : null} */}
          </div>
        </Accordion.Collapse>
      </Card >
    )
  }
}

export default ContentCard;