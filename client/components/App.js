import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import Login from './Login';
import CreateAccount from './CreateAccount';
import Dashboard from './Dashboard';
import Category from './Category'
import Totals from './Totals';
class App extends Component {
  constructor(props){
    super(props);
    
    this.state={
       user: null //{
      //     categories: [
      //       {_id: "602b3a2b25b5b85fa2c88cda", category: "food", total: 420, items: []},
      //       {_id: "602b3a3d25b5b85fa2c88cdc", category: "clothes", total: 400, items: []},
      //       {_id: "602b3a4325b5b85fa2c88cdf", category: "Tech", total: 4000, items: []}
      //     ],
      //     length: 3,
      //     email: "jasons@jason.com",
      //     fullName: "Jason",
      //     password: "pass",
      //     userName: "jasons",
      //     __v: 0,
      //     _id: "602b38ae0cb52313ffd03117"},
        }
    this.funcLogin = this.funcLogin.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
    this.addCategory = this.addCategory.bind(this);
  };

  addCategory(event){
    event.preventDefault();
    const categoryName = document.getElementById('newCategory').value;
    const categoryRequest = JSON.stringify({email: this.state.user.email , password: this.state.user.password ,category : categoryName });  

    fetch('/category/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: categoryRequest
    })
    .then(response => response.json())
    .then(result => {
      console.log('this is', result);
      if (result.user){
        this.setState({...this.state, user: result.user});
      } 
    })
    .catch(err => console.log('error sending the request:', err) )


  }

  funcLogin(event){
    event.preventDefault();
    const inputEmail = document.getElementById('inputEmail').value;
    const inputPassword = document.getElementById('inputPassword').value;
    // ask if this user can go to next
    const userRequest = JSON.stringify({email: inputEmail, password: inputPassword});
    // console.log(userRequest);
    // do something with response that allows/denies user to move on
    fetch('/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: userRequest
    })
      .then(response => response.json())
      .then(result => {
        console.log('this is', result);
        if (result.user){
          this.setState({...this.state, user: result.user});
        } 
      })
      .catch(err => console.log('error sending the request:', err) )
  }




  
  createNewUser(event){
    event.preventDefault();
    const inputFullName = document.getElementById('inputFullName').value;
    const inputUserName = document.getElementById('inputUserName').value;
    const inputEmail = document.getElementById('inputEmail').value;
    const inputPassword = document.getElementById('inputPassword').value;
    const userRequest = JSON.stringify({
      fullName: inputFullName,
      password: inputPassword,
      userName: inputUserName,
      email: inputEmail})
    fetch('/user/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: userRequest
    })
    .then(response => response.json())
    .then(result => {
      console.log('this is', result);
      if (result.newUser){
        this.setState({...this.state, user: result.newUser});
      } 
    })
    .catch(err => console.log('error sending the request:', err) )
   }
  
  render() {
    // console.log('props', this.props)
    return (
      <Router>
        <div>        
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route 
              exact path="/" 
              render= {props => 
                <Login {...props} handleLogin={this.funcLogin} state={this.state}/>
              }
            />
            <Route 
              exact path="/Users/createAccount"  
              render = {props => 
                <CreateAccount {...props} handleCreation={this.createNewUser} state={this.state}/>
            } 
            />
            <Route 
              exact path= "/Category"
              render = { props => 
                <Category {...props} addCategory={this.addCategory} state={this.state}/>
              }
            />
            <Route path = "/totals" component = {Totals} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
