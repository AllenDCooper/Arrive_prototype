// import React and Router
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

// import components
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'
import Main from './Pages/Main/Main'
import About from './Pages/About/About'
import NavigationBar from './Components/NavigationBar/NavigationBar'

// import firebase auth
import { auth, database, updateUserObjInDB } from './firebase';

// import styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {

  state = {
    user: null,
    displayNameFromForm: null,
  }

  componentDidMount() {
    auth.onAuthStateChanged(userAuth => {
      if (!userAuth) {
        this.setState({
          user: null
        })
      } else {
        console.log(userAuth.uid)
        database.ref('users/' + userAuth.uid).on('value', (snapshot) => {
          const userProfile = snapshot.val()
          if (userProfile) {
            console.log(userProfile);
            userProfile.uid = userAuth.uid;
            this.setState({ user: userProfile })
            //   console.log(this.state))
          } else {
            console.log(userAuth)
            // create profile if signing up for first time
            const newUserObj = {
              displayName: userAuth.displayName,
              email: userAuth.email,
              photoURL: userAuth.photoURL || null,
            }
            updateUserObjInDB(userAuth.uid, newUserObj)
            this.setState({ user: userAuth })
            //   console.log(this.state))
          }
        })
        // .catch(function (error) {
        //   console.log(error)
        // })
      }
    })
  }

  updateDisplayNameFromForm = (displayName) => {
    console.log(displayName)
    this.setState({
      displayNameFromForm: displayName,
    })
  }

  updateUserInState = (user) => {
    console.log(`UpdateUserInState run`)
    this.setState({
      user: user
    })
  }

  updateDisplayNameFromForm = (displayName) => {
    console.log(displayName)
    this.setState({
      displayNameFromForm: displayName,
    })
  }

  render() {
    console.log(process.env.PUBLIC_URL)
    return (
      <div className="Application">

        <BrowserRouter basename={`${process.env.PUBLIC_URL}/`}>

          <Switch>

            <Route exact path="/">
              {this.state.user ? <Redirect to="/main" /> : <SignIn />}
            </Route>

            <Route exact path="/signUp"
              render={props => (
                this.state.user ? <Redirect to="/main" /> : <SignUp updateDisplayNameFromForm={this.updateDisplayNameFromForm} />
              )}
            />

            <Route exact path="/main">
              {/* <NavigationBar user={this.state.user} displayName={this.state.displayNameFromForm} updateUserInState={this.updateUserInState} /> */}

              {!this.state.user
                ?
                <Redirect to="/" />
                :
                <Main user={this.state.user} displayName={this.state.displayNameFromForm} updateUserInState={this.updateUserInState} />}
            </Route>

            <Route exact path="/about">
              <About />
            </Route>

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
