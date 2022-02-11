import React from "react";
import { Link } from 'react-router-dom';
import { Card, Row, Col, Offcanvas, Form, FormControl, Button, Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { auth } from '../../firebase';
import EditProfile from '../EditProfile/EditProfile';
import "./NavigationBarInCourse.css"


function NavigationBarInCourse(props) {
  console.log(props)

  return (
    // <Navbar collapseOnSelect expand="lg"
    // // bg="dark" variant="dark"
    // style={{backgroundColor: '#1565c0'}}
    // >
    //   <Navbar.Brand href={`${process.env.PUBLIC_URL}/`} className="permanent-marker">iClicker Arrive</Navbar.Brand>
    //   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //   <Navbar.Collapse id="responsive-navbar-nav">
    //     <Nav style={{ marginRight: '75px' }}>
    //       {props.user ?
    //         <NavDropdown title={props.user.displayName ? props.user.displayName : props.displayName} id="collasible-nav-dropdown">
    //           <EditProfile user={props.user} updateUserInState={props.updateUserInState} />
    //           <NavDropdown.Item style={{ marginRight: "20px" }} onClick={() => { auth.signOut() }}>Logout</NavDropdown.Item>
    //         </NavDropdown>
    //         : null}
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>
    <div>
      <Navbar expand={false} style={{ backgroundColor: '#1565c0', color: "#fff" }}>
        <Container fluid style={{ color: "#fff" }}>
          <Row style={{ width: '100%', paddingTop: '10px', paddingBottom: '10px', fontWeight: '600', margin: '0px' }}>
            <Col xs={2}>
              <span onClick={props.courseClickChange}><img alt='add course icon' src='https://institutional-web-assets-share.s3.amazonaws.com/iClicker/student/images/arrow_carrot-left.svg' style={{ height: '21px', width: '13px' }} /></span>
            </Col>
            <Col xs={8} style={{ textAlign: 'center', fontSize: '20px' }}>
              <Navbar.Brand style={{ color: "#fff", marginRight: '0px' }}>Compass College FYE</Navbar.Brand>
            </Col>
            <Col xs={2} style={{ textAlign: 'center', fontSize: '20px' }}>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <Navbar style={{ position: 'relative', borderRadius: '0px', backgroundColor: "#064d9e", color: '#fff', height: '60px'}} className="justify-content-center" >
        <Nav style={{ position: 'absolute', bottom: '3px', minWidth: '300px' }} className="justify-content-center" activeKey="">
          <Nav.Item style={{width: '25%'}}>
            <Nav.Link className='course-tabs' style={{ color: '#fff' }} eventKey="link-1">
            <img alt='activities' src='https://institutional-web-assets-share.s3.amazonaws.com/iClicker/student/images/course-history.svg' className='course-tab-img'/>
              <p style={{marginBottom: '0px'}}>Activities</p>
              </Nav.Link>
          </Nav.Item>
          <Nav.Item style={{width: '25%'}}>
            <Nav.Link className='course-tabs' style={{ color: '#fff' }} eventKey="link-2">
              <img alt='resources' src='https://institutional-web-assets-share.s3.amazonaws.com/iClicker/student/images/assignments.svg' className='course-tab-img' />
              <p style={{marginBottom: '0px'}}>Resources</p>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item style={{width: '25%'}}>
            <Nav.Link className='course-tabs' style={{ color: '#fff' }} eventKey="link-2">
              <img alt='goals' src='https://institutional-web-assets-share.s3.amazonaws.com/iClicker/student/images/study-tools.svg' className='course-tab-img' />
              <p style={{marginBottom: '0px'}}>Goals</p>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item style={{width: '25%'}}>
            <Nav.Link className='course-tabs' style={{ color: '#fff' }} eventKey="link-2">
              <img alt='share' src='https://institutional-web-assets-share.s3.amazonaws.com/iClicker/student/images/statistics.svg' className='course-tab-img' />
              <p style={{marginBottom: '0px'}}>Share</p>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </div>
  )
}

export default NavigationBarInCourse