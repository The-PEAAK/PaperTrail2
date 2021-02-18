const { User, Item } = require('../models/models');

const categoryController = {};


categoryController.validateCategory = (req, res, next) => {
  if (!req.body.email || !req.body.password || typeof req.body.email !== 'string' || typeof req.body.password !== 'string') {
    return next({
      err: 'Invalid request: invalid email and password'
    });
  }

  if(!req.body.category || typeof req.body.category !==  'string') {
    return next({
      err: 'Invalid request: invalid category or missing category?'
    })
  }
  return next();
}



// Step 1 : Find the user
// Step 2: Add a category obj to the array categories
// Request body should have a way to find an existing user
// {
//   email: 'test123'
//   category: 'shoes',
//   total: 0,
//   items: []
// }

// create a new category object based on the req.body
// User.findOneAndUpdate({email: 'test123}, update)

// Use userController.getUser to find a specific user
// Use createCategory to create a new catefgory to this user
// middleware function to create new User category

categoryController.createCategory = (req, res, next) => {

  // use userController.getUser to grab the user's existing categories first, then add a new category to that array
  // now we weill add 1 more category to this user's document
  const currentUserFilter = {
    email: res.locals.user.email 
  };

  // console.log('Adding new category to user >>> ', res.locals.user.fullName);
  let userCategories = res.locals.user.categories;
  // console.log('Existing categories ===> ',userCategories);
  const newCategory = {
    category: req.body.category,
    total: 0,
    items: []
  }; 

  const newCategories = [...res.locals.user.categories, newCategory];
  // console.log('Updated categories array ===> ',userCategories)
  User.findOneAndUpdate(currentUserFilter, {categories: newCategories}, {new: true}).exec()
    .then(updatedUserDocument => {
      // console.log('Create new category => ', updatedUserDocument);
      res.locals.user = updatedUserDocument;
      // console.log('res.locals.user in categoryController', res.locals.user.categories)
      return next();
    })
    .catch(err => next({
      err: `Err creating new category in db: ${err}` 
    }));
}

categoryController.deleteCategory = (req, res, next) => {

  const user = res.locals.user;

  const updatedCategories = []

  user.categories.forEach(ele => {
    if( ele.category !== req.body.category) updatedCategories.push(ele);
  })
  console.log('UpdatedCategories >>> ', updatedCategories);

  const currentUserFilter = {
    email: res.locals.user.email 
  };

  User.findOneAndUpdate(currentUserFilter, {categories: updatedCategories }, {new: true}).exec()
  .then(updatedUserDoc => {
    console.log('Deleted requested category => ', updatedUserDoc);
    res.locals.user = updatedUserDoc;
    return next();
  })
  .catch(err => next({
    err: `Err deleting requested category in db: ${err}` 
  }));
}



module.exports = categoryController;