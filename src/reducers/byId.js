import { assoc } from 'ramda';
import { RECEIVE_POSTS, REQUEST_POSTS } from '../actions/posts';
import createReducer from '../util/createReducer';

export default createReducer({}, {
  [RECEIVE_POSTS](state, action) {
    return action.payload.reduce((posts, post) => assoc(post.id, post, posts), state);
  },
});
