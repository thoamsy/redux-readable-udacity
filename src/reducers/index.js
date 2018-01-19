import { append } from 'ramda';
import { RECEIVE_POSTS, REQUEST_POSTS  } from '../actions/posts';
const fetchPosts = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return append({ isFetching: false, posts: action.payload }, state);
    case REQUEST_POSTS:
      return append({ isFetching: true }, state);
    default:
      return state;
  }
}

export default fetchPosts;
