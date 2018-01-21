import { assoc, prop, evolve, not, __, reduce } from 'ramda';
import {
  RECEIVE_POSTS,
  REQUEST_POSTS,
} from '../actions/posts';
import createReducer from './createReducer';

const posts = (state = {
  byId: {},
  ids: [],
  isFetching: false
}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return evolve({ isFetching: not }, state);
    case RECEIVE_POSTS:
      return evolve({
        byId: reduce((posts, post) => assoc(post.id, post, posts), __, action.payload),
        isFetching: not,
        ids: () => action.payload.map(prop('id'))
      }, state);
    default:
      return state;
  }
};
// const byId = createReducer({}, {
//   [RECEIVE_POSTS](state, action) {
//     return action.payload.reduce((posts, post) => assoc(post.id, post, posts), state);
//   },
// });

// const ids = (state = [], action) => {
//   switch (action.type) {
//     case RECEIVE_POSTS:
//       return action.payload.map(prop('id'));
//     default:
//       return state;
//   }
// };

// const isFetching = (state = false, action) => {
//   switch (action.type) {
//     case REQUEST_POSTS:
//       return true;
//     case RECEIVE_POSTS:
//       return false;
//     default:
//       return state;
//   }
// };
// TODO: add error reducer

export default posts;
