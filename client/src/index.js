import React from 'react';
import ReactDOM from 'react-dom';

// import the App child component for rendering
import App from './App';

// Provider connects our global state store to our entire app
import {Provider} from 'react-redux';

import store from './store';

//dispatch an action that is a function that returns an object with a type of increment and then our reducer looks at which action is dispatched and based on the name it returns a piece of state

// render the app component and all of its children to the browser
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

