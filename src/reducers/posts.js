import { assoc, prop, evolve, not, __, reduce, always } from 'ramda';
import { RECEIVE_POSTS, REQUEST_POSTS, RECEIVE_POST_VOTE, REQUEST_POST_VOTE, postVoteScore } from '../actions/posts';
import createReducer from './createReducer';

// TODO: add a post reducer;
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
    [REQUEST_POST_VOTE]: (state, action) =>
      evolve({
        byId: {
          [action.postId]: {
            voteScore: action.update
          }
        }
      }, state),
    [RECEIVE_POST_VOTE]: (state, action) =>
      evolve({
        byId: {
          [action.postId]: {
            voteScore: always(action.voteScore)
          }
        }
      }, state),
  }
);

// TODO: add error reducer

export default posts;
