// const { models } = require('mongoose');
const { User, Category, Item } = require('../models/models');
// const models = require('../models/models');
const bcrypt = require('bcryptjs');
const userController = {};

// middleware function to verify username and password
userController.validateUser = (req, res, next) => {
  if (!req.body.email || !req.body.password  || typeof req.body.email !== 'string' || typeof req.body.password !== 'string') {
    return next({
      err: 'Invalid request'
    });
  }
  return next();
}

// middleware function that creates new user
userController.createUser = (req, res, next) => {

const {fullName, password, userName, email, budget, categories} = req.body;
  //TODO: For login, if we authenticate we will send back the existing user object.
  
  User.create({fullName, password, userName, email, budget, categories}, (err, user) => {
    if(err) {
      // return next(err);
      console.log(err)
    } else {
      res.locals.newUser = user;
      return next();
    }
  });
}


  // //TODO: For login, if we authenticate we will send back the existing user object.
    /// ORIGINAL getUser MIDDLEWARE
  userController.getUser = (req, res, next) => {
    const queryObj = {
      email: req.body.email,
      password: req.body.password
    };
    // console.log('query obj >>> ', queryObj);
    User.findOne(queryObj).exec()
      .then(result => {
        // console.log('Looking for user result => ', result);
        res.locals.user = result;
        return next();
      })
      .catch(error => next({
        err: `Error looking for user in db: ${err}`
      }));
  }

//TODO: What to send back if user doesnt exist to authenticate
// middelware function that looks for existing user and returns object with user information or null if not found.
userController.userCategory = (req, res, next) => {
  const { email, password } = req.body
  console.log(email, password)
  User.findOne({email}, (err, user) => {
    if(err) {
      return next(err);
    } else {
      bcrypt.compare(password, user.password)
        .then(result => {
          console.log('result', result)
          if(!result) {
            return next(err)
          } else {
            console.log('user', user.password)
            res.locals.user = user;
            return next();
          }
        })
        .catch(err => {
          return next(err)
        })
      }
    })
}

module.exports = userController;