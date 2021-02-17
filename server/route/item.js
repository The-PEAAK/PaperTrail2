const express = require('express');
const router = express.Router();
const itemController = require('../controller/itemController');
const multer = require("multer");
const path = require('path');
const {User} = require('../models/models');
// router.post('/addRec',
//   itemController.addItem,
//   (req, res) => {
//     return res.status(200).status.json({
//       receipt: res.locals.receipt
//     });
//   }
// );
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(null, "ReceiptImage-" + Date.now() + path.extname(file.originalname));
  }
});

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