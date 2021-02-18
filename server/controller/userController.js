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
  // const { email, password } = req.body;
  // User.findOne({ email, password }, (err, user) => {
  //   if (err) {
  //     return next('Error in userController.verifyUser: ' + JSON.stringify(err))
  //   } else {
  //     bcrypt.compare(password, newUser.password)
  //       .then(result => {
  //         if(!result) {
  //           return next({err: 'Invalid request'})
  //         } else {
  //           res.locals.user = user;
  //           return next();
  //         }
  //       })
  //       .catch(err => {
  //         return next('Error in userController.verifyUser: ' + JSON.stringify(err));
  //       })
  //     }
  //   })



  



// middleware function that creates new user
userController.createUser = (req, res, next) => {
  const queryObj = {
    fullName: req.body.fullName,
    password: req.body.password,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    categories: []
  };
  //TODO: For login, if we authenticate we will send back the existing user object.
  
  User.create(queryObj)
  .then(result => {
    // console.log('Creating new user => ', result);
    res.locals.newUser = result;
    return next();
  })
  .catch(err => next({
    err: `Error creating new user in db: ${err}`
  }));}



//TODO: What to send back if user doesnt exist to authenticate
// middelware function that looks for existing user and returns object with user information or null if not found.
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


module.exports = userController;