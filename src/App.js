import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import 'bulma-tooltip/dist/bulma-tooltip.min.css';

import { getPost } from './reducers/';
import configure from './storeConfigure';
import generateAsyncComponent from './components/AsyncComponent';
import { fetchAllCategories } from './actions/category';
import { fetchPosts } from './actions/posts';
import NotFound from './components/NotFound';
import './styles/post.css';

const AsyncPostDetail = generateAsyncComponent(() =>
  import('./components/PostDetail')
);
const AsyncEditPost = generateAsyncComponent(() =>
  import('./components/EditPost')
);
const AsyncRoot = generateAsyncComponent(() => import('./components/Root'));

const store = configure();
class App extends Component {
  // fetch 的操作改为一打开应用就开始
  componentDidMount = () => {
    let pos = 0;
    const { dispatch, getState } = store;
    dispatch(fetchAllCategories())
      .then(() => getState().categories)
      .then(function preload(categories) {
        if (!categories.length) return;
        // 这里的目的是在如果分类很多的情况下, 一次只 fetch 3 类的 Posts.
        categories.slice(0, 3).map(({ name }) => dispatch(fetchPosts(name)));
        pos += 3;
        return preload(categories.slice(pos));
      });
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/:id/notfound" component={NotFound} />
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
  }
}

export default App;
