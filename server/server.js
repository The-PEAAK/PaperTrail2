const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;


const userRouter = require('./route/user');
const categoryRouter = require('./route/category');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/',
  (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
  });

app.get('/logo.png',
  (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../client/logo.png'));
  });

// user Router 
app.use('/user', userRouter);

app.use('/category', categoryRouter);


app.get('/build/bundle.js',
  (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../build/bundle.js'));
  });

// handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).send('This is not the page you\'re looking for...');
});


// global error handler
app.use((err, req, res, next) => {

  console.log('Error', err);

  return res.status(500).json(err);
})


app.listen(PORT, () => console.log('Listening on port 3000...'));
