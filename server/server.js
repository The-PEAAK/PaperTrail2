const express = require('express');
const path = require('path');

const fetch = require("node-fetch");
const FormData = require("form-data");

const app = express();
const PORT = 3000;


const userRouter = require('./route/user');
const categoryRouter = require('./route/category');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const internals = {
  url: "https://api.taggun.io/api/receipt/v1/simple/file",
  filePath: "./sample.jpeg",
  taggunApiKey: "4629ce0070d211eb89ec8f979872d304",
};

(async () => {
  const filePath = internals.filePath;

  try {
    const postBody = createFormData(filePath);

    const response = await fetch(internals.url, {
      headers: {
        accept: "application/json",
        apikey: internals.taggunApiKey,
        contentType: getContentType(filePath),
      },
      method: "POST",
      body: postBody,
    });

    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
})();

function createFormData(filePath) {
  const filename = path.basename(filePath);
  const fileStream = fs.createReadStream(filePath, { autoClose: true });
  const formData = new FormData();

  // Add any other POST properties that you require
  // Go to https://api.taggun.io to see what other POST properties you require.
  formData.append("file", fileStream, {
    filename,
    contentType: getContentType(filePath),
  });

  formData.append("refresh", "false");

  return formData;
}

function getContentType(filePath) {
  const fileExt = path.extname(filePath);
  switch (fileExt.toLocaleLowerCase()) {
    case ".png":
      return "image/png";
    case ".pdf":
      return "application/pdf";
    default:
      return "image/jpg";
  }
}







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
