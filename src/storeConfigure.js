import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import fetchPosts from './reducers';

export default () => (
  createStore(fetchPosts, applyMiddleware(thunk))
);
