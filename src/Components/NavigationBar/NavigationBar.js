import React from "react";
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { auth } from '../../firebase';
import EditProfile from '../EditProfile/EditProfile';


function NavigationBar(props) {
  console.log(props)

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
      <Navbar.Brand href={`${process.env.PUBLIC_URL}/`} className="permanent-marker">iClicker Arrive</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to='/about'>About</Nav.Link>
        </Nav>
        <Nav style={{ marginRight: '75px' }}>
          {props.user ?
            <NavDropdown title={props.user.displayName ? props.user.displayName : props.displayName} id="collasible-nav-dropdown">
              <EditProfile user={props.user} updateUserInState={props.updateUserInState} />
              <NavDropdown.Item style={{ marginRight: "20px" }} onClick={() => { auth.signOut() }}>Logout</NavDropdown.Item>
            </NavDropdown>
            : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar