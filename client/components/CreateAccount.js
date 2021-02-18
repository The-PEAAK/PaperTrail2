import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import Category from './Category'
// import { useMediaQuery } from 'react-responsive';
import "./styling.scss";
// import logo from './logo.png';
import {
  Redirect,
  Route,
  Link,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";

class CreateAccount extends Component {
  render() {
    if (this.props.state.user !== null) {
      return <Redirect to = '/Category'/>;
    }

    return (
        <div id='all'>
          <div id='top'>
            <h1>Create Account</h1>
            {/* <img id='logo' src="logo.png"></img> */}
            </div>

          <form onSubmit={this.props.handleCreation}> 
              <input type="text" className="form-control" id="inputFullName" aria-describedby="fullNameHelp" placeholder="Full Name"/>
              <input type="text" className="form-control" id="inputUserName" aria-describedby="userNameHelp" placeholder="Username"/>
              <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Email Address"/>
              <input type="password" id="inputPassword" className="form-control" aria-describedby="passwordHelpInline" placeholder="Password"/>
              <div>
              <button id="createacc" type="Submit" className='btn btn-secondary'  onClick={this.props.handleCreation}>Create Account</button>
              </div>
          </form>
            <Link to = "/" style = {styles.container}>
              <button className='btn btn-secondary' style = {styles.container}>
                Back to Home
              </button>
            </Link>
        </div>
    );
  }
}

const styles = {
  container: {
    color: "white",
    textDecoration: "none",
  }
}

export default CreateAccount; 