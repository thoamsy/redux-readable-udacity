import { assoc, prop, evolve, not, __, reduce, always } from 'ramda';
import { RECEIVE_POSTS, REQUEST_POSTS } from '../actions/posts';
import createReducer from './createReducer';

const posts = createReducer(
  {
    byId: {},
    ids: [],
    isFetching: false,
  },
  {
    [REQUEST_POSTS]: evolve({ isFetching: not }),
    [RECEIVE_POSTS]: (state, action) =>
      evolve({
        byId: reduce(
          (posts, post) => assoc(post.id, post, posts),
          __,
          action.payload
        ),
        isFetching: not,
        ids: always(action.payload.map(prop('id')))
      }, state),
  }
);

// TODO: add error reducer

export default posts;
