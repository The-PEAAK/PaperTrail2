const express = require('express');
const router = express.Router();
const itemController = require('../controller/itemController');
const multer = require("multer");
const path = require('path');
const categoryController = require('../controller/categoryController')
const userController = require('../controller/userController');

//maybe should be another piece of middleware? 12 - 37

//SAVES TO PUBLIC/UPLOADS
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(null, "ReceiptImage" + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  },
}).single("receiptImage");


router.post('/test',
  userController.getUser,
  categoryController.createCategory,
  itemController.addItem,
  (req, res) => {
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

router.post("/upload",
  (req, res, next) => {
    upload(req, res, (err) => {
      if(err) {
        console.log(err)
        return next(err)
      }
      return next();
    })
  }, 
  itemController.displayReceipt,
  (req, res, next) => {
    return res.status(200).json(res.locals.price)
  });

module.exports = router;

//   router.post("/upload",
//   (req, res) => {
//     upload(req, res, (err) => {
//       return res.sendStatus(200).end()
//   })
// });