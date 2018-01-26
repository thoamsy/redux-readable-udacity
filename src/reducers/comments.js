import { FETCH_COMMENTS_FAILURE, FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS } from '../actions/comments';
import { assoc, prop, dissoc } from 'ramda';
const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCESS:
      return action.payload.reduce((comments, comment) =>
        assoc(comment.id, comment, comments), state
      );
    case FETCH_COMMENTS_FAILURE:
    case FETCH_COMMENTS_REQUEST:
    default:
      return state;
  }
};
const isFetching = (state = {}, action) => {
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

const comments = (state = {
  isFetching: {},
  ids: [],
  byId: {}
}, action) => {
  const { type, err, payload } = action;
  switch (type) {
    case FETCH_COMMENTS_REQUEST:
      return { ...state, isFetching: isFetching(state.isFetching, action) };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        byId: byId(state.byId, action),
        ids: payload.map(prop('id')),
        isFetching: isFetching(state.isFetching, action)
      };
    case FETCH_COMMENTS_FAILURE:
      return { ...state, err, isFetching: isFetching(state.isFetching, action) };
    default:
      return state;
  }
};

export default comments;
