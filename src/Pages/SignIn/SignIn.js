import React, {useState,useEffect} from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './SignIn.css';
import { Link } from 'react-router-dom';
import { signInWithGoogle } from '../../firebase';
import firebase from "firebase/app";


const SignIn = (props)=>{
  const [{typed,i},setTyped] = useState({typed:'',i:0})
  const [userInput,setUserInput] = useState(
    {
    email: "",
    password: "",
    error: null,
  })
  const subtitleStr = 'Lorem ipsum'

  useEffect(()=>{
    if(typed.length === subtitleStr.length) return
    setTimeout(()=>{
      setTyped({typed:typed+subtitleStr[i],i:i+1})
    },Math.random()*200+50)
  },[typed])

  const handleSubmit = (event) => {
    event.preventDefault()
    firebase.auth()
      .signInWithEmailAndPassword(userInput.email, userInput.password)
      .catch(function (error) {
        setUserInput({...userInput,error:'Incorrect username or password. Please try again.'})
      });
  }

    //function to handle form change
    const handleChange = (event) => {
      const { name, value } = event.currentTarget;
  
      if (name === 'userEmail') {
        setUserInput({...userInput,
          email: value
        })
      } else if (name === 'userPassword') {
        setUserInput({...userInput,
          password: value
        })
      }
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
          {userInput.error&&<p style={{color:'red'}}>{userInput.error}</p>}
          <Form onSubmit={handleSubmit}>

            <Form.Group controlId="userEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="userEmail" value={userInput.email} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="userPassword" value={userInput.password} onChange={handleChange} />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              block
            >
              Sign In
            </Button>

            <div style={{ margin: '40px 0px' }}>
              <p className="ride-line"><span className="ride-line-span">or</span></p>
              <Button variant="outline-primary" block onClick={signInWithGoogle}>
                Sign in with Google
              </Button>
            </div>

          </Form>

          <p style={{ paddingBottom: '100px' }}>
            Don't have an account? Sign up <Link to="/signUp">here</Link>
          </p>

        </div>

      </Container>

    </div>
  )
}

export default SignIn;