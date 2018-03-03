import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import 'bulma-tooltip/dist/bulma-tooltip.min.css';
import { getPost } from './reducers/';
import configure from './storeConfigure';
import generageAsyncComment from './components/AsyncComponent';
import './styles/post.css';

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
          path="/:verb(create|edit)/:id"
          render={props => (
            <AsyncEditPost
              edited={getPost(store.getState(), props.match.params.id)}
              {...props}
            />
          )}
        />
        <Route path="/:category/:id" component={AsyncPostDetail} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
