import { assoc, prop, evolve, T, F, __, reduce, assocPath, append, concat } from 'ramda';
import {
  RECEIVE_POSTS,
  REQUEST_POSTS,
  RECEIVE_POST_VOTE,
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

  const updatePosts = evolve(__, state);
  switch (action.type) {
    case REQUEST_POSTS:
      return updatePosts({ isFetching: T });
    case RECEIVE_POSTS:
      return updatePosts({
        byId: postReducer(action),
        isFetching: F,
        ids: concat(action.payload.map(prop('id'))),
      });
    case RECEIVE_POST_VOTE:
      return updatePosts({
        byId: postReducer(action),
      });
    case PUBLISH_POST_SUCCESS:
      return updatePosts({
        byId: postReducer(action),
        ids: append(action.payload.id)
      });
    default:
      return state;
  }
};

// TODO: add error reducer

export default posts;
