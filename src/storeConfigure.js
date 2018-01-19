import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import fetchPosts from './reducers';

const dev =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
export default () => createStore(fetchPosts,
 compose(applyMiddleware(thunk), dev));
