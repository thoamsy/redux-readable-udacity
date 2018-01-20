import { assoc, evolve, not, __ } from 'ramda';
import { RECEIVE_POSTS, REQUEST_POSTS  } from '../actions/posts';
const fetchPosts = (state = { }, action) => {
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
  state.allPosts[category] ? state.allPosts[category].isFetching : false;
export const getPostWith = (state, category) =>
  state.allPosts[category] ? state.allPosts[category].posts : [];


export default fetchPosts;
