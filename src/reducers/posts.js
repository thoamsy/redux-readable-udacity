import { assoc, prop, evolve, not, __, reduce, always, assocPath } from 'ramda';
import {
  RECEIVE_POSTS,
  REQUEST_POSTS,
  RECEIVE_POST_VOTE,
  REQUEST_POST_VOTE,
} from '../actions/posts';
import { FETCH_COMMENTS_SUCCESS } from '../actions/comments';

const postReducer = action => (state = {}) => {
  const { type, postId, update, payload } = action;
  switch (type) {
    case RECEIVE_POST_VOTE:
    case REQUEST_POST_VOTE:
      return evolve({ [postId]: { voteScore: update } }, state);
    case RECEIVE_POSTS:
      return reduce(
        (posts, post) => assoc(post.id, post, posts),
        state,
        payload
      );
    case FETCH_COMMENTS_SUCCESS:
      return assocPath([postId, 'comments'], payload.map(prop('id')), state);
    case REQUEST_POSTS:
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
      return updatePosts({ isFetching: not });
    case RECEIVE_POSTS:
      return updatePosts({
        byId: postReducer(action),
        isFetching: not,
        ids: always(action.payload.map(prop('id'))),
      });
    case REQUEST_POST_VOTE:
    case RECEIVE_POST_VOTE:
    case FETCH_COMMENTS_SUCCESS:
      console.log(state);
      return updatePosts({
        byId: postReducer(action),
      });
    default:
      return state;
  }
};

// TODO: add error reducer

export default posts;
