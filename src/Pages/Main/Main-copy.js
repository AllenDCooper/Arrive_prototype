import React, { Component } from 'react';
import { Card, Container } from 'react-bootstrap';
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import InstitutionalSpace from '../InstitutionalSpace/InstitutionalSpace'
import './Main.css'

class Main extends Component {

  state = {
    courseArr: [
      {
        name: 'Compass College First Year Experience',
        instructor: 'Dean Young',
        institution: 'Compass College',
        isInstitutional: true,
        isSubscribed: true,
      },
      {
        name: 'General Psychology',
        instructor: 'Eric Garcia',
        institution: 'Compass College',
        isInstitutional: false,
        isSubscribed: true,
      },
      {
        name: 'Composition I',
        instructor: 'Sonia Thomas',
        institution: 'Compass College',
        isInstitutional: false,
        isSubscribed: false,
      },
      {
        name: 'Public Speaking',
        instructor: 'Susan Yoo',
        institution: 'Compass College',
        isInstitutional: false,
        isSubscribed: false
      },
      {
        name: 'Statistics',
        instructor: 'Matthew Horitz',
        institution: 'Compass College',
        isInstitutional: false,
        isSubscribed: false
      }
    ],
    courseClicked: false
  }

  courseClickChange = (event) => {
    this.setState({
      courseClicked: !this.state.courseClicked
    })
  }

  render() {
    return (
      this.state.courseClicked ?
        <InstitutionalSpace courseClickChange={this.courseClickChange} updateUserInState={this.props.updateUserInState} user={this.props.user} />
        :
        <div className="course-page-wrapper">
          <NavigationBar user={this.props.user} displayName={this.props.displayName} updateUserInState={this.props.updateUserInState} />
          <Container style={{ padding: '0px' }}>
            {this.state.courseArr.map(item => (
              // <li style={{ marginBottom: '10px'}}>
              //   <p style={{margin: '0px'}} >{item.name}</p>
              //   <p style={{margin: '0px'}} >{item.instructor}</p>
              //   <p style={{margin: '0px'}} >{item.institution}</p>
              // </li>
              item.isInstitutional ?
                <div onClick={this.courseClickChange} >
                  <Card style={{ borderRadius: '0px', backgroundColor: "#064d9e", color: '#fff' }}>
                    <Card.Body>
                      <Card.Title style={{ marginBottom: '5px', fontSize: '18px', fontWeight: '600', color: '#fff' }}>{item.name}</Card.Title>
                      <Card.Text style={{ marginBottom: '0px', fontSize: '14px', fontWeight: '600', color: '#fff' }}>
                        {item.instructor}
                      </Card.Text>
                      <p style={{ marginBottom: '0px', fontSize: '14px', color: '#fff' }} >{item.institution}</p>
                    </Card.Body>
                  </Card>
                </div>
                :
                item.isSubscribed ?
                  <Card style={{ borderRadius: '0px' }}>
                    <Card.Body>
                      <Card.Title style={{ marginBottom: '5px', fontSize: '18px', fontWeight: '600', color: '#1565c0' }}>{item.name}</Card.Title>
                      <Card.Text style={{ marginBottom: '0px', fontSize: '14px', fontWeight: '600' }}>
                        {item.instructor}
                      </Card.Text>
                      <p style={{ marginBottom: '0px', fontSize: '14px', color: '#666' }} >{item.institution}</p>
                    </Card.Body>
                  </Card>
                  :
                  null
            ))}
          </Container>
        </div>
    )
  }
}

export default Main;