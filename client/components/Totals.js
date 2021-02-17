import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
// import { useMediaQuery } from 'react-responsive';
import "./styling.scss";
// import logo from './logo.png';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
//import nickname from models.js => userName;


class Totals extends Component {
  constructor(props){
    super(props);

    this.state= {

    };

    // this.addCategory = this.addCategory.bind(this);
    // this.personalCategory = this.personalCategory.bind(this);
    // this.businessCategory = this.businessCategory.bind(this);
  }


addReceipt(){
//POST??
//how to make pic wait to connect with the amount from input field and then store in db upon pressing the confirm button?
}

confirm(){

  const inputPic = document.getElementById('addPic').value; //new receipt pic
  const inputPassword = document.getElementById('newItem').value; //new amount
  const userRequest = JSON.stringify({picture: addPic, amount: newItem}); // Khoung and Anthony need to structure the Schema in our DB {picture: images, ampount: Number}

  fetch('personalCategoryExpenses', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: userRequest
  })
  .then(response => response.json())
  .then(data => console.log(data));
}

renderAllExpenses(){
  let expenses = [];//connect to get adata from our expenses DB

  for(let i = 0; i < expenses.length; i++){
    expenses.push(<div>{expenses[i]}</div>);
  }
}


render() {

    return (
      <div id='all'>
        <div id='top'>
        {/* category toals */}
        </div>
        <form>
            <button id="addPic" type="button" className='btn btn-primary' onClick={this.addReceipt}>
              <imag src="https://previews.123rf.com/images/fokaspokas/fokaspokas1805/fokaspokas180500111/101171521-photo-camera-simple-icon-on-transparent-background-.jpg"  alt="receipt picture"></imag>
            </button>

            <input type="number" className="newItem" id="newAmount" aria-describedby="emailHelp" placeholder="$"/>

            <button id="confirmNewAmount" type="button" className='btn btn-primary' onClick={this.confirm}>
              <p>Create New Category</p>
            </button>
        </form>

        <div id="pastExpenses">
          <form id="pastExpenses" >
          {/* here console.log renderAllExpenses()) */}
          </form>
        </div>
      </div>
    );
  }
}