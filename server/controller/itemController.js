const { User, Item } = require('../models/models');
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path');

const itemController = {};

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, './public');
//   },
//   filename: (req, file, cb) => {
//       const fileName = file.originalname.toLowerCase().split(' ').join('-');
//       cb(null, uuidv4() + '-' + fileName)
//   }
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//       if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//           cb(null, true);
//       } else {
//           cb(null, false);
//           return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//       }
//   }
// });
itemController.addItem = (req, res, next) => {
  const currentUserFilter = {
    email: res.locals.user.email 
  };


// console.log('req.body from categoryController', req.body)
const newItems = {
  category: req.body.category,
  total: 0,
  items: req.body.receiptData[0]
}
  
const newReceipts = [...res.locals.user.categories[0].items, newItems];
const newReceipts2 = [...res.locals.user.categories];
newReceipts2.map(el => {
  console.log('el', el)
})
  console.log('newReceipts2', newReceipts2)

  User.findOneAndUpdate(currentUserFilter, {categories: newReceipts}, {new: true}).exec()
    .then(newReceiptAdded => {
      res.locals.receipt = newReceiptAdded;
      return next();
    })
    .catch(err => next({
      err: `Error creating new receipt in db: ${err}`
    }));
}

itemController.getItem = (req, res, next) => {
  User.findOne({fullName: "john"},   function(err, person) {
    // console.log(person.categories[0].items[0])
    res.locals.dataInfo = person.categories[0].items[0]
    return next();
  })
    

    
}


module.exports = itemController;