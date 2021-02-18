// insert the app component into hte html file wghere the div id 'app' is
import React from 'react';
import ReactDOM from 'react-dom';
import App from'./components/App';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
