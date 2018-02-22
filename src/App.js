import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import 'bulma-tooltip/dist/bulma-tooltip.min.css';
import './styles/post.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getPost } from './reducers/';
import configure from './storeConfigure';

import generageAsyncComment from './components/AsyncComponent';
const AsyncPostDetail = generageAsyncComment(() =>
  import('./components/PostDetail')
);
const AsyncEditPost = generageAsyncComment(() =>
  import('./components/EditPost')
);
const AsyncRoot = generageAsyncComment(() => import('./components/Root'));

const store = configure();
const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/:category?" exact component={AsyncRoot} />
        <Route
          path="/:id/:verb(create|edit)"
          render={props => (
            <AsyncEditPost
              edited={getPost(store.getState(), props.match.params.id)}
              {...props}
            />
          )}
        />
        <Route path="/posts/:id" component={AsyncPostDetail} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
