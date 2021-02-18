import React, { Component } from 'react';
import { render } from 'react-dom';
// import { useMediaQuery } from 'react-responsive';
import "./styling.scss";
// import logo from './logo.png';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import ImageUploader from "react-images-upload";


class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: []
    }
    this.onChangeFile = this.onChangeFile.bind(this);
    this.addItem = this.addItem.bind(this);
  }


// addCategory(){
// //POST??
// }
addItem(e) {
  e.preventDefault();
  let files = {};
  let dataArr = [];
  const catName = document.getElementById('newCategory').value;
  console.log('catName', catName)
  let looped = this.state.file;
  for(let i = 0; i < looped.length; i++) {
    // console.log('looped Data', looped[i].name)
    files = {
      'lastModified'    : looped[i].lastModified,
      'lastModifiedDate': looped[i].lastModifiedDate,
      'name'       : looped[i].name,
      'size'       : looped[i].size,
      'type'       : "image/png",
    }
    dataArr.push(files)
  }
console.log('dataArr after loop', dataArr)
// console.log(this.props.state.user.categories)
  const receiptRequest = JSON.stringify({email: this.props.state.user.email, password: this.props.state.user.password, category: catName, receiptData: dataArr});  
  fetch('/test', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: receiptRequest
  })
  .then(response => response.json())
  .then(result => {
    console.log('addItem results: ', result);
  })
  .catch(err => console.log('error sending the request:', err))
};
  
onChangeFile(receipt) {
  this.setState({
    file: this.state.image.concat(receipt)
  })
}


render() {
  // console.log('propssss', this.props.state.user.categories)
  let arrOfCategories= [];
  const categories = this.props.state.user.categories;
  for (let i=0; i < categories.length; i++) {
    arrOfCategories.push(
    <button id = "newReceipt"> 
      {categories[i].category}
      <ImageUploader
            key = {`imgUploader${i}`}
            withIcon={false}
            withPreview={true}
            label=''
            buttonText='Upload Receipt'
            onChange={this.onChangeFile}
            imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
            maxFileSize={1000000}
          />
          <button onClick = {this.addItem}>Save</button>
    </button>)
  };
  // console.log('state after onchangeFile', this.state.file)

    return (
      <div id='all'>
        <div id='top'>
          <h1>Welcome {this.props.state.user.userName}!</h1>
        </div>
        <form>
            <input type="text" id="newCategory" className="form-control" aria-describedby="passwordHelpInline" placeholder="Category Name" onSubmit={this.props.addCategory}/>
            <button id="newCat" type="submit" className='btn btn-primary' onClick={this.props.addCategory} >
              <p>Create New Category</p>
            </button>
           
        </form>
        <div id="mid">
        <h1>Your Categories:</h1>
        </div>
           <div>
              {arrOfCategories}
              <button className='btn btn-primary'>
                <Link to = "/totals" style = {styles.container}>Totals</Link>
            </button>
            </div>
            <Link to = "/"> 
              <button className = "btn btn-secondary">
                Logout
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

export default Category;