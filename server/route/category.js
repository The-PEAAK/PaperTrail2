const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const userController = require('../controller/userController');

// POST
router.post('/create',
  categoryController.validateCategory,
  userController.getUser,
  categoryController.createCategory,
  (req, res) => {
    return res.status(200).json({
      user: res.locals.user
    });
  }
);


// DELETE
router.delete('/',
  categoryController.validateCategory,
  userController.getUser,
  categoryController.deleteCategory,
  (req, res) => {
    return res.status(200).json({
      user: res.locals.user
    })
  }
)

module.exports = router;