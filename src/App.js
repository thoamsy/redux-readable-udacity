import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import Root from './components/Root';
import EditPost from './components/EditPost';
import PostDetail from './components/PostDetail';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getPost } from './reducers/';
import configure from './storeConfigure';

const store = configure();
const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/:category?" exact component={Root} />
        <Route path="/:id/edit" component={EditPost} />
        <Route
          path="/posts/:id"
          render={props => (
            <PostDetail
              post={getPost(store.getState(), props.match.params.id)}
              {...props}
            />
          )}
        />
      </Switch>
    </Router>
  </Provider>
);

export default App;
