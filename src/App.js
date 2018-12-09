import React, { Component, lazy, Suspense } from 'react';
import { Router, Redirect } from '@reach/router';
import { Provider } from 'react-redux';

import configure from './storeConfigure';
import { fetchAllCategories } from './actions/category';
import { fetchPosts } from './actions/posts';
import NotFound from './components/NotFound';
import './styles/post.css';

const PageLoader = () => (
  <div className="pageloader is-active">
    <span className="title">加载中♪(´ε｀ )</span>
  </div>
);

const PostDetail = lazy(() => import('./components/PostDetail'));
const EditPost = lazy(() => import('./components/EditPost'));
const Root = lazy(() => import('./components/Root'));
const Nav = lazy(() => import('./components/Navbar'));

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
        <Suspense fallback={<PageLoader />}>
          <Router>
            <EditPost path="create/:id" />
            <EditPost path="edit/:id" />

            <Nav path=":category">
              <Root path="/" />
              <PostDetail path=":id" />
            </Nav>

            <Redirect from="/" to="/all" />
            <NotFound path=":id/notfound" default />
          </Router>
        </Suspense>
      </Provider>
    );
  }
}

export default App;
