const express = require('express');
const router = express.Router();
const itemController = require('../controller/itemController');
const multer = require("multer");
const path = require('path');
const {User} = require('../models/models');
const categoryController = require('../controller/categoryController')
const userController = require('../controller/userController');


//SAVES TO PUBLIC/UPLOADS
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(null, "ReceiptImage-" + Date.now() + path.extname(file.originalname));
  }
});

router.post('/test',
  userController.getUser,
  categoryController.createCategory,
  itemController.addItem,
  (req, res) => {
    // console.log('test results', req.body)
    return res.status(200).json({
      newReceiptAdded: res.locals.receipt
    })
  }
)

router.get('/retrieve',
  itemController.getItem,
  (req, res) => {
    return res.status(200).json({
      dataInfo: res.locals.dataInfo
    })
  }
)


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  },
}).single("receiptImage");

router.post("/upload",
  itemController.addItem,
  (req, res) => {
    upload(req, res, (err) => {
      console.log("request body >>>" , req.body);
      console.log('request file >>>', req.file)
      // console.log('err', err)
      const fileData = req.file.originalname;
      console.log('fileData', fileData)
      // User.findOneAndUpdate
      return res.sendStatus(200).end()
    //   if(!err) {
    //   } else {
    //     console.log('error when uploading image', err)
    // }
  })
});


module.exports = router;