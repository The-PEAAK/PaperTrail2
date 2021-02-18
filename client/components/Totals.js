import React, { Component, Fragment } from "react";
import { render } from "react-dom";
// import { useMediaQuery } from 'react-responsive';
import "./styling.scss";
// import logo from './logo.png';
import { Switch, Route, Link } from "react-router-dom";
const axios = require("axios");
import ImageUploader from "react-images-upload";
//import nickname from models.js => userName;

class Totals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: "initial state",
    };

    // this.addCategory = this.addCategory.bind(this);
    // this.personalCategory = this.personalCategory.bind(this);
    // this.businessCategory = this.businessCategory.bind(this);
    this.receiptSubmit = this.receiptSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  addReceipt() {
    //POST??
    //how to make pic wait to connect with the amount from input field and then store in db upon pressing the confirm button?
  }
  /** NEED TO CHANGE AXIOS URL TO SOMEHOW RETRIEVE THE IMAGE */
  receiptSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    const file = this.state.file;
    formData.append("receiptImage", file);

    console.log("formData", formData);
    const config = {
      headers: {
        // "Accept": "multipart/form-data",
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("/upload", formData, config)
      .then((response) => {
        console.log("response object", response);
        console.log("added receipt successfully");
      })
      .catch((err) => {
        console.log("error in POST request to send image to backend");
      });
  }

  onChange(e) {
    this.setState({
      ...this.state,
      file: e.target.files[0],
    });
  }

  // confirm(){

  //   const inputPic = document.getElementById('addPic').value; //new receipt pic
  //   console.log(inputPic)
  //   const inputPassword = document.getElementById('newItem').value; //new amount
  //   const userRequest = JSON.stringify({picture: inputPic /*amount: newItem*/}); // Khoung and Anthony need to structure the Schema in our DB {picture: images, ampount: Number}
  //   console.log('userRequest', userRequest)

  //   fetch('/totals/addRec', {
  //     method: 'POST',
  //     headers: {'Content-Type': 'multipart/form-data'},
  //     body: userRequest
  //   })
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(err => console.log('error in fetch request to POST receipt', err))
  // }

  ////// IMAGE UPLOADER ONCHANGE
  // onChangeFile(receipt) {
  //   this.setState({
  //     file: this.state.file.concat(receipt)
  //   })
  // }

  renderAllExpenses() {
    let expenses = []; //connect to get adata from our expenses DB
    for (let i = 0; i < expenses.length; i++) {
      expenses.push(<div>{expenses[i]}</div>);
    }
  }

  render() {
    return (
      <div id='all'>
        <div id='top'></div>
        <form onSubmit={this.receiptSubmit}>
          <button
            type='button'
            className='btn btn-primary'
            onClick={this.addReceipt}
          >
            <input
              id='addPic'
              name='receiptImage'
              type='file'
              onChange={this.onChange}
            ></input>
            <img
              src='https://previews.123rf.com/images/fokaspokas/fokaspokas1805/fokaspokas180500111/101171521-photo-camera-simple-icon-on-transparent-background-.jpg'
              alt='receipt picture'
            />
          </button>

          {/* <input type="number" className="newItem" id="newAmount" aria-describedby="emailHelp" placeholder="$"/> */}

          <button
            id='confirmNewAmount'
            type='submit'
            className='btn btn-primary' /*onClick={this.confirm}*/
          >
            <p>Create New Category</p>
          </button>
        </form>
        <div>
          <ImageUploader
            withIcon={false}
            withPreview={true}
            label=''
            buttonText='Upload Receipt'
            onChange={this.onChangeFile}
            imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
            maxFileSize={1000000}
          />
        </div>
        <div id='pastExpenses'>
          <form id='pastExpenses'>
            {/* here console.log renderAllExpenses()) */}
          </form>
        </div>
      </div>
    );
  }
}

export default Totals;
