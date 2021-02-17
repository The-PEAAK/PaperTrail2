import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
// import { useMediaQuery } from 'react-responsive';
import "./styling.scss";
// import logo from './logo.png';
import { Link, Redirect } from "react-router-dom";

class Dashboard extends Component {
  constructor(props){
    super(props);
    
    this.state={
   
    };

  }


  render() {

    return (
      <div id='all'>
        <div id='top'>
          <h1>Dashboard</h1>
        </div>
      </div>
    );
  }
}



export default Dashboard;