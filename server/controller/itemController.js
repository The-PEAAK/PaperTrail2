const { User, Item } = require('../models/models');

const itemController = {};

itemController.addItem = (req, res, next) => {
  const itemsArr = res.locals.user.categories;
  // console.log('itemsArr', itemsArr)

  const currentUserFilter = {
    email: res.locals.user.email 
  };

  const newItem = {
    // category: req.body.category,
    // total: 0,
    // items: req.body.category.items
  }
  // console.log('newItem', newItem);
  const addedItem = [...res.locals.user.categories.items, newItem];
  // console.log('addedItem', addedItem)
  // User.findOneAndUpdate(currentUserFilter, {})
}

module.exports = itemController;