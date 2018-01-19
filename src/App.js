import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import Root from './view/Root';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import configure from './storeConfigure';
const App = () => (
  <Provider store={configure()}>
    <Router>
      <Route path="/:category?" component={Root} />
    </Router>
  </Provider>
);

export default App;
