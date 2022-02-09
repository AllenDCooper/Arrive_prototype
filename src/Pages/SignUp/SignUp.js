import React, { useState, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { signInWithGoogle, updateUserProfile } from '../../firebase';
import firebase from "firebase/app";

const SignUp = props => {
  const [{ typed, i }, setTyped] = useState({ typed: '', i: 0 })
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    displayName: "",
    error: null,
  })
  const subtitleStr = 'Lorem ipsum'

  useEffect(() => {
    if (typed.length === subtitleStr.length) return
    setTimeout(() => {
      setTyped({ typed: typed + subtitleStr[i], i: i + 1 })
    }, Math.random() * 200 + 50)
  }, [typed])

  const createUserWithEmailAndPasswordHandler = () => {
    // adds displayName immediately to state on Application.js to display on navigation bar
    props.updateDisplayNameFromForm(userInput.displayName)

    firebase.auth()
      .createUserWithEmailAndPassword(userInput.email, userInput.password)
      .then(function () {
        console.log('Successfully created new user');
        const user = firebase.auth().currentUser;
        console.log(user);
        console.log(userInput)
        updateUserProfile(user, userInput)
        // .catch(function (error) {
        //   setUserInput({ ...userInput, error: error.message })
        //   console.log(`Error updating user with displayName:`, error)
        // });
      })
      .catch(function (error) {
        setUserInput({ ...userInput, error: error.message })
        console.log('Error creating new user:', error)
      });
  };

  //function to handle form change
  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    if (name === 'userEmail') {
      setUserInput({ ...userInput, email: value })
    } else if (name === 'userPassword') {
      setUserInput({ ...userInput, password: value })
    } else if (name === 'displayName') {
      setUserInput({ ...userInput, displayName: value })
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    createUserWithEmailAndPasswordHandler()
  }
  return (
    <div>
      <Container style={{ backgroundColor: 'white' }}>

        <div className="jumbotron" style={{ backgroundColor: 'white', marginBottom: '0px', textAlign: "center" }}>
          <h1 className="main-title">iClicker Arrive</h1>
          <h6 className="montserrat">
            {typed}
            <span className="cursor">
              <span style={{ fontWeight: "normal" }}>|</span>
            </span>
          </h6>
        </div>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          {userInput.error && <p style={{ color: 'red' }}>{userInput.error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="userName">
              <Form.Label>Display name</Form.Label>
              <Form.Control type="name" placeholder="Enter name" name="displayName" value={userInput.displayName} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="userEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="userEmail" value={userInput.email} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="userPassword" value={userInput.password} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit" block>Sign Up</Button>
            <div style={{ margin: '40px 0px' }}>
              <p className="ride-line"><span className="ride-line-span">or</span></p>
              <Button onClick={signInWithGoogle} variant="outline-primary" block >
                Sign up with Google
          </Button>
            </div>
          </Form>
          <p style={{ paddingBottom: '100px' }}>
            Already have an account? Sign in <Link to="/">here</Link>
          </p>
        </div>
      </Container>
    </div>
  )
}



export default SignUp;