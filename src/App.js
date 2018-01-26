import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import 'bulma-tooltip/bulma-tooltip.min.css';
import Root from './components/Root';
import EditPost from './components/EditPost';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import configure from './storeConfigure';
const App = () => (
  <Provider store={configure()}>
    <Router>
      <Switch>
        <Route path="/:category?" exact component={Root} />
        <Route path="/:id/edit" component={EditPost} />
        <Route path="/posts/:id" />
      </Switch>
    </Router>
  </Provider>
);

export default App;
