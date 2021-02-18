const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Login using POST request 
router.post('/login',
  userController.validateUser,
  userController.userCategory,
  (req, res) => {
    return res.status(200).json({
      user: res.locals.user
    });
  }
);


// POST 
router.post('/create',
  userController.validateUser,
  userController.createUser,
  (req, res) => {
    return res.status(200).json({
      newUser: res.locals.newUser
    });
  }
);


module.exports = router;