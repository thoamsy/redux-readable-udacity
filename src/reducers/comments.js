import {
  FETCH_COMMENTS_FAILURE,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT,
  REQUEST_UPDATE_COMMENT_VOTE,
} from '../actions/comments';

import {
  assoc,
  prop,
  __,
  evolve,
  append,
  compose,
  merge,
  dissoc,
  reject,
  equals,
} from 'ramda';

const byId = action => (state = {}) => {
  const { type, payload, commentId, err, voteScore } = action;
  const updateComment = assoc(commentId, __, state);
  switch (type) {
    case FETCH_COMMENTS_SUCCESS:
      return payload.reduce(
        (comments, comment) => assoc(comment.id, comment, comments),
        state
      );
    case ADD_COMMENT_REQUEST:
      return updateComment({ isCommenting: true });
    case ADD_COMMENT_SUCCESS:
      return updateComment({ ...payload, isCommenting: false });
    case ADD_COMMENT_FAILURE:
      return updateComment({ err });
    case DELETE_COMMENT:
      return dissoc(commentId, state);
    case REQUEST_UPDATE_COMMENT_VOTE:
      return evolve(
        {
          [commentId]: {
            voteScore: () => voteScore,
          },
        },
        state
      );
    case FETCH_COMMENTS_FAILURE:
    case FETCH_COMMENTS_REQUEST:
    default:
      return state;
  }
};
const isFetching = action => (state = {}) => {
  switch (action.type) {
    case FETCH_COMMENTS_REQUEST:
      return assoc(action.postId, true, state);
    case FETCH_COMMENTS_SUCCESS:
    case FETCH_COMMENTS_FAILURE:
      return assoc(action.postId, false, state);
    default:
      return state;
  }
};

const comments = (
  state = {
    isFetching: {},
    ids: [],
    byId: {},
  },
  action
) => {
  const { type, payload, commentId } = action;
  const updateComment = compose(
    evolve(__, state),
    merge({ byId: byId(action) })
  );

  switch (type) {
    case FETCH_COMMENTS_REQUEST:
    case FETCH_COMMENTS_FAILURE:
      return updateComment({ isFetching: isFetching(action) });
    case FETCH_COMMENTS_SUCCESS:
      return updateComment({
        ids: append(payload.map(prop('id'))),
        isFetching: isFetching(action),
      });
    case ADD_COMMENT_SUCCESS:
      return updateComment({
        ids: append(commentId),
      });
    case DELETE_COMMENT:
      return updateComment({
        ids: reject(equals(commentId)),
      });
    case ADD_COMMENT_REQUEST:
    case REQUEST_UPDATE_COMMENT_VOTE:
      return updateComment({});
    default:
      return state;
  }
};

export default comments;
