import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { CloseButton, Row, Col, Offcanvas, Form, FormControl, Button, Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { auth } from '../../firebase';
import EditProfile from '../EditProfile/EditProfile';
import "./NavigationBar.css"
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom/cjs/react-dom.development";


function NavigationBar(props) {
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

    <Navbar expand={false} style={{ backgroundColor: '#1565c0', color: "#fff" }}>
      <Container fluid style={{ color: "#fff" }}>
        <Row style={{ width: '100%', paddingTop: '10px', fontWeight: '600' }}>
          <Col xs={4}>
            <Navbar.Toggle
              // aria-controls="offcanvasNavbar"
              bsPrefix="navbar-toggler-white-icon"
            // style={{ color: "#fff" }}
            />
          </Col>
          <Col xs={4} style={{ textAlign: 'center', fontSize: '20px' }}>
            <Navbar.Brand style={{ color: "#fff" }}>Groups</Navbar.Brand>
          </Col>
          <Col xs={3} style={{ textAlign: 'right', fontSize: '20px', position: 'relative' }}>
            {/* {props.showGroupSelect ? 
            <Button style={{ bottom: '0px' }}>Save</Button>
            : null
            } */}
          </Col>
          <Col xs={1} style={{ textAlign: 'right', fontSize: '20px', position: 'relative' }} onClick={() => props.toggleShowGroupSelect()}>
            {props.showGroupSelect ?
              // <CloseButton variant="white" style={{ bottom: '0px' }} />
              <Button variant='link' style={{color: 'white', paddingTop: '0px', paddingBottom: '0px', textDecoration: 'none', outline: 'none', border: 'none', transition: 'none', transform: 'none', fontSize: '30px' }}>&#10003;</Button>
              :
              <Button variant='link' style={{color: 'white', paddingTop: '0px', paddingBottom: '0px', textDecoration: 'none', outline: 'none', border: 'none', transition: 'none', transform: 'none', fontSize: '30px' }}>&#8942;</Button>
              // <img alt='add course icon' src='https://institutional-web-assets-share.s3.amazonaws.com/iClicker/student/images/plus.svg' style={{ height: '19px', width: '19px' }} />
            }
          </Col>
        </Row>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          closeVariant="white"
          placement="top"
          style={{ backgroundImage: 'url(https://institutional-web-assets-share.s3.amazonaws.com/iClicker/student/images/WebBackground.png', position: 'absolute', minHeight: '100%', width: '100%', backgroundSize: 'cover' }}
        >
          <div className="course-page-wrapper" style={{ color: 'white' }}>
            <Offcanvas.Header closeButton closeVariant='white'>
              {/* <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title> */}
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-12">
                <Nav.Link
                  style={{ marginRight: "20px", fontSize: '25px', marginTop: '175px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', textDecoration: 'none', color: '#fff', fontWeight: '100' }}

                >
                  <EditProfile user={props.user} updateUserInState={props.updateUserInState} />
                </Nav.Link>

                <Nav.Link
                  style={{ marginRight: "20px", fontSize: '25px', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', textDecoration: 'none', color: '#fff', fontWeight: '100' }}
                  onClick={() => { auth.signOut() }}
                >
                  <img
                    alt='sign out icon'
                    src='https://institutional-web-assets-share.s3.amazonaws.com/iClicker/student/images/Icons_Sign-Out.svg'
                    style={{ height: '50px', width: '50px' }}
                  />
                  <p style={{ marginTop: '15px' }} >Sign Out</p>
                </Nav.Link>
                {/* <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
              {/* <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-12"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form> */}
            </Offcanvas.Body>
          </div>
        </Navbar.Offcanvas>
      </Container>
    </Navbar >
  )
}

export default NavigationBar