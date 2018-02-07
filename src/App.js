import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import Root from './components/Root';
import EditPost from './components/EditPost';
import PostDetail from './components/PostDetail';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import configure from './storeConfigure';
const App = () => (
  <Provider store={configure()}>
    <Router>
      <Switch>
        <Route path="/:category?" exact component={Root} />
        <Route path="/:id/edit" component={EditPost} />
        <Route path="/posts/:id" component={PostDetail}/>
      </Switch>
    </Router>
  </Provider>
);

export default App;
