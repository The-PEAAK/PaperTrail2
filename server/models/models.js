const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const MONGO_URI = 'mongodb+srv://junebug:skate213@iteration.2rdbp.mongodb.net/Iteration?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));


const userSchema = new Schema ({
  fullName: {type: String, required: true},
  userName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  categories:  [{
    category: String, 
    total: Number,
    items: [], 

  }]
})

// userSchema.pre('save', function(next) {
//   bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
//     if(err) return next(err);
//     this.password = hash;
//     return next();
//   });
// });
// Example add category request 

// {
//   type: 'shoes',
//   total: 0,
//   items: []
// }

// // example add item for user
// {
//   category: 'an existing category for the current user'
//   user: 'John Do'
//   cost: 10,
//   description: 'nike shoes',
//   imageImage: 'image in string format'
// }



const User = mongoose.model('user', userSchema);

// const categorySchema = new Schema ({
//   total: Number,
//   type: String,
//   items: [{
//     description: String, 
//     id: {
//       type: Schema.Types.ObjectId,
//       ref: 'item'
//     }
//   }]
// })

// const Category = mongoose.model('category', categorySchema);

const itemSchema = new Schema ({
  cost: Number,
  description: String,
  receiptImage: {
    data: Buffer,
    contentType: String,
  } 
});

const Item = mongoose.model('item', itemSchema);

module.exports = {
  User,
  // Category,
  Item
}