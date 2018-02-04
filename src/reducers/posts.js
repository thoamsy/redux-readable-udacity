import {
  assoc,
  prop,
  evolve,
  T,
  F,
  __,
  reduce,
  assocPath,
  append,
  always,
  dissoc,
  reject,
  equals,
  merge,
  compose,
} from 'ramda';
import {
  RECEIVE_POSTS,
  REQUEST_POSTS,
  RECEIVE_POST_VOTE,
  DELETE_POST,
} from '../actions/posts';
import { FETCH_COMMENTS_SUCCESS } from '../actions/comments';
import { PUBLISH_POST_SUCCESS } from '../actions/editPost';

const postReducer = action => (state = {}) => {
  const { type, postId, update, payload } = action;
  switch (type) {
    case RECEIVE_POST_VOTE:
      return evolve({ [postId]: { voteScore: update } }, state);
    case RECEIVE_POSTS:
      return reduce(
        (posts, post) => assoc(post.id, post, posts),
        state,
        payload
      );
    case FETCH_COMMENTS_SUCCESS:
      return assocPath([postId, 'comments'], payload.map(prop('id')), state);
    case PUBLISH_POST_SUCCESS:
      return assoc(payload.id, payload, state);
    case DELETE_POST:
      return dissoc(postId, state);
    default:
      return state;
  }
};

const posts = (
  state = {
    byId: {},
    ids: [],
    isFetching: false,
  },
  action
) => {
  const updatePosts = compose(
    evolve(__, state),
    merge({ byId: postReducer(action) })
  );
  switch (action.type) {
    case REQUEST_POSTS:
      return evolve({ isFetching: T }, state);
    case RECEIVE_POSTS:
      return updatePosts({
        isFetching: F,
        ids: always(action.payload.map(prop('id'))),
      });
    case RECEIVE_POST_VOTE:
      return updatePosts({});
    case PUBLISH_POST_SUCCESS:
      return updatePosts({
        ids: append(action.payload.id),
      });
    case DELETE_POST:
      return updatePosts({
        ids: reject(equals(action.postId)),
      });
    default:
      return state;
  }
};

// TODO: add error reducer

export default posts;
