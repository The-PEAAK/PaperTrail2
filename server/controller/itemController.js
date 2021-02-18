const { User, Item } = require('../models/models');
const express = require('express');
const multer = require("multer");
const path = require('path');
const { getContentType, createFormData } = require('../controllerHelpers/taggunHelpers'); ///////////TODO
const fetch = require("node-fetch");

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

const itemController = {};

itemController.addItem = (req, res, next) => {
  const currentUserFilter = {
    email: res.locals.user.email 
  };

const newItems = {
  category: req.body.category,
  total: 0,
  items: req.body.receiptData[0]
}

const newReceipts = [...res.locals.user.categories[0].items, newItems];
const newReceipts2 = [...res.locals.user.categories];

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
  User.findOne({fullName: "jake"},   function(err, person) {
    res.locals.dataInfo = person.categories[0].items[0]
    return next();
  })
}

itemController.displayReceipt = (req, res, next) => {
  const internals = {
    url: "https://api.taggun.io/api/receipt/v1/verbose/file",
    filePath: "./public/uploads/ReceiptImage.jpg",
    taggunApiKey: "4629ce0070d211eb89ec8f979872d304",
  };

  const filePath = internals.filePath;
  const postBody = createFormData(filePath);
  let price;

  fetch(internals.url, {
    headers: {
      accept: "application/json",
      apikey: internals.taggunApiKey,
      contentType: getContentType(filePath),
    },
    method: "POST",
    body: postBody,
  })
  .then(response => response.json())
  .then((response) => {
    res.locals.price = response.totalAmount.data;
    return next();
  })
  .catch((err) => {
    console.log(err)
    return next(err)
  });
}

module.exports = itemController;