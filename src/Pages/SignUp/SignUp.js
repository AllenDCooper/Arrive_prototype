import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button, Form, FloatingLabel } from 'react-bootstrap';
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
    <div style={{ backgroundImage: 'url(https://institutional-web-assets-share.s3.amazonaws.com/iClicker/student/images/WebBackground.png', position: 'absolute', minHeight: '100%', width: '100%', backgroundSize: 'cover' }}>

      <Container>

        <div className="jumbotron" style={{ marginBottom: '0px', textAlign: "center" }}>
          <img alt="iClicker Student Logo" src="https://institutional-web-assets-share.s3.amazonaws.com/iClicker/student/images/white-iclicker-student-logo.png" style={{ height: 'auto', width: '100%', color: 'red', maxWidth: '450px', minWidth: '197px', marginTop: '80px' }} />
          {/* <h6 className="montserrat">
            {typed}
            <span className="cursor">
              <span style={{ fontWeight: "normal" }}>|</span>
            </span>
          </h6> */}
        </div>

        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          {userInput.error && <p style={{ color: 'red' }}>{userInput.error}</p>}
          <Form onSubmit={handleSubmit}>

            <Form.Group controlId="userName">
              {/* <Form.Label>Display name</Form.Label> */}
              <FloatingLabel controlId="floatingInput" style={{ color: '#fff' }} label="Name" className="mb-3" >
                <Form.Control type="name" placeholder="Name" name="displayName" value={userInput.displayName} onChange={handleChange} style={{ color: '#fff', borderRadius: '0px', borderTop: 'none', borderRight: 'none', borderLeft: 'none', borderBottom: '1px', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(255, 255, 255, 0.5)', background: 'none' }} />
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="userEmail">
              {/* <Form.Label>Email address</Form.Label> */}
              <FloatingLabel controlId="floatingInput" style={{ color: '#fff' }} label="Email" className="mb-3" >
                <Form.Control type="email" placeholder="Email" name="userEmail" value={userInput.email} onChange={handleChange} style={{ color: '#fff', borderRadius: '0px', borderTop: 'none', borderRight: 'none', borderLeft: 'none', borderBottom: '1px', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(255, 255, 255, 0.5)', background: 'none' }} />
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              {/* <Form.Label>Password</Form.Label> */}
              <FloatingLabel controlId="floatingInput" style={{ color: '#fff' }} label="Password" className="mb-3" >
                <Form.Control type="password" placeholder="Password" name="userPassword" value={userInput.password} onChange={handleChange} style={{ color: '#fff', borderRadius: '0px', borderTop: 'none', borderRight: 'none', borderLeft: 'none', borderBottom: '1px', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgba(255, 255, 255, 0.5)', background: 'none' }} />
              </FloatingLabel>
            </Form.Group>
            <div style={{ textAlign: 'center' }}>
              <Button
                variant="light"
                size="md"
                type="submit"
                block
                style={{ width: '100%', minWidth: '150px', maxWidth: '300px', height: '45px', borderRadius: '40px', color: '#1565c0' }} S
              >
                Sign Up
              </Button>
            </div>

            <div style={{ margin: '60px 0px', background: 'none', textAlign: 'center' }}>
              <Container>
                <Row style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  <Col xs={4} className="ride-line"></Col>
                  <Col xs={4} >
                    <span style={{ position: 'relative', top: '-0.75rem' }}>
                      Or sign up with
                    </span>
                  </Col>
                  <Col xs={4} className="ride-line"></Col>
                </Row>
              </Container>
              <Button
                onClick={signInWithGoogle}
                variant="light"
                block
                style={{ height: '45px', color: '#1565c0', backgroundColor: 'rgba(255,255,255,0.75)', border: 'none' }}
              >
                <img alt='Google Logo' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAABNVBMVEUAAAD/PgBJsUT/OwANdNRHsEtHsEpHsEoNddT/PABKsEp1tSr/YwD/OwD/wwD/OwD/wgD/PAD/OwBPsUj/wQAMdNX/PAD/PQBWskNIr0r/wgD/PABKsEj/OgBIr0j/PwD/OgAPddb/QQD/wwD/QABHr0tJr0r/wgAMdNX/wgAMdNb/OwALddU5oW9Hr0z/PAD/OwBnsz9HsEr/OwAOdNP/PABIsUv/iAALdNX/OwD/PQBMsEhIsEoMddVIsEr/OwD/PQD/OgDRuxL/vQAMdNVJr0n/QAALddT/wwD/vwAWd89Nskj/PwBMrEX/vwBAr0j/xQD/RwAQcM//TAAMdNX/OwBHsEv/wgBAqFwSecgTfMMagbYljJ1PsUdnsz6StyyvuiDdvw7/sQD/kQD/dwD/WAD/RgBL4Ss6AAAAVHRSTlMAEBLf+e/ix8W2gggH+PfvyMSal5eNfWNhYF9fRkY+OiMZFQgE+vbv7Obl49/Y2NbLv769uLe0tLKsqKebl5WThYOAgG5paEhIRDo1NSUkIB8ZEAp/9d8/AAABMklEQVQ4y8XQ13LCMBBA0cWEDkmAhBI6pPfee+8VrUjv+f9PiNkRjCzZfuU8WTt3ZmVBB0ULidkYY7H4TsEp8aR6WNtEymPXpM1E5k3rTYJp9tRmnenWBq3Nrk2zpDTHTFjIlR+i5VzI/AwpN696GZkpgVDyqg0c/FATl+Z3agNj/PvP/OcquDjjnH/9sktw08ebVsBVL0UDINRlXUEx7aboWo+oElNOonpELFHNKZLX3bqu0y8uC8pP8DkHikWKtsTp1Gw+XrFobc7r5EQcayP8HRGnDbmpTFIzCi37b9gUkKr7YJ30Q4vhQ+K/AKE49UjNeAXaMigsZ68ikZvsPGLjqRkdgiSJmsYzLZNtoO5lFRRhPUqC5shvTXwZsGGE/VISNsBBfjswhDgc2MxHoHP+AVnAlPxGJFfYAAAAAElFTkSuQmCC' />
              </Button>
              <p style={{ marginTop: '15px', color: 'rgba(255,255,255,0.75)' }}>Google</p>
            </div>

          </Form>
          <p style={{ paddingBottom: '100px', color: '#fff', textAlign: 'center'}}>
            Already have an account? <Link style={{textDecoration: 'none', color:'#fff', fontWeight: '600'}} to="/">Sign in!</Link>
          </p>
        </div>
      </Container>
    </div>
  )
}



export default SignUp;