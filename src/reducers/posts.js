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
  inc,
  dec,
} from 'ramda';

import {
  RECEIVE_POSTS,
  REQUEST_POSTS,
  RECEIVE_POST_VOTE,
  DELETE_POST,
  SWITCH_POST_SORT_WAY,
  SWITCH_COMMENT_SORT_WAY,
} from '../actions/posts';
import {
  FETCH_COMMENTS_SUCCESS,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT,
} from '../actions/comments';
import { PUBLISH_POST_SUCCESS } from '../actions/editPost';

export const sortWays = ['voteScore', 'timestamp'];
const switchSortWay = way => sortWays[+!sortWays.indexOf(way)];

const postReducer = action => (state = {}) => {
  const { type, postId, voteScore, payload, commentId } = action;

  const sortWay = sortWays[0];
  switch (type) {
    case RECEIVE_POST_VOTE:
      return evolve({ [postId]: { voteScore: always(voteScore) } }, state);
    case RECEIVE_POSTS:
      return reduce(
        (posts, post) => assoc(post.id, { ...post, sortWay }, posts),
        state,
        payload
      );
    case FETCH_COMMENTS_SUCCESS:
      return assocPath([postId, 'comments'], payload.map(prop('id')), state);
    case ADD_COMMENT_SUCCESS:
      return evolve(__, state)({
        [postId]: {
          comments: append(commentId),
          commentCount: inc,
        },
      });
    case PUBLISH_POST_SUCCESS:
      return assoc(postId, payload, state);
    case DELETE_POST:
      return dissoc(postId, state);
    case DELETE_COMMENT:
      return evolve(__, state)({
        [postId]: {
          comments: reject(equals(commentId)),
          commentCount: dec,
        },
      });
    case SWITCH_COMMENT_SORT_WAY:
      return evolve(__, state)({
        [postId]: {
          sortWay: switchSortWay,
        },
      });
    default:
      return state;
  }
};

const posts = (
  state = {
    byId: {},
    ids: [],
    isFetching: false,
    sortWay: sortWays[0],
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
    case PUBLISH_POST_SUCCESS:
      return updatePosts({
        ids: append(action.payload.id),
      });
    case DELETE_POST:
      return updatePosts({
        ids: reject(equals(action.postId)),
      });
    case RECEIVE_POST_VOTE:
    case FETCH_COMMENTS_SUCCESS:
    case ADD_COMMENT_SUCCESS:
    case DELETE_COMMENT:
    case SWITCH_COMMENT_SORT_WAY:
      return updatePosts({});
    case SWITCH_POST_SORT_WAY:
      // 针对整个分类的排序，所以作为该 state 下的属性即可。
      return evolve(__, state)({
        sortWay: switchSortWay,
      });
    default:
      return state;
  }
};

export default posts;
