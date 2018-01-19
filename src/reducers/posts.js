import { assoc, evolve, not, __ } from 'ramda';
import { RECEIVE_POSTS, REQUEST_POSTS  } from '../actions/posts';
const fetchPosts = (state = {
  all: { isFetching: false, posts: [] }
}, action) => {
  const { category, type } = action;
  switch (type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        [category]: {
          isFetching: false,
          posts: action.payload
        }
      }
    case REQUEST_POSTS:
      return assoc(category, { isFetching: true }, state);
    default:
      return state;
  }
}


export const isPostsFetching = (state, category) =>
  state.posts[category].isFetching;
export const getPostWith = (state, category) =>
  state.posts[category].posts;


export default fetchPosts;
