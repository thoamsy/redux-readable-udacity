import { prop, compose } from 'ramda';
import myFetch from '../util/fetch';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const REQUEST_POST_VOTE = 'REQUEST_POST_VOTE';
export const RECEIVE_POST_VOTE = 'RECEIVE_POST_VOTE';
export const DELETE_POST = 'DELETE_POST';
export const SWITCH_POST_SORT_WAY = 'SWITCH_POST_SORT_WAY';
export const SWITCH_COMMENT_SORT_WAY = 'SWITCH_COMMENT_SORT_WAY';

const requestPosts = category => ({
  type: REQUEST_POSTS,
  category,
});

const receivePosts = (posts, category) => ({
  type: RECEIVE_POSTS,
  payload: posts,
  category,
});

const receivePostVote = (postId, category) => voteScore => ({
  type: RECEIVE_POST_VOTE,
  voteScore,
  postId,
  category,
});

export const postVoteScore = up => (postId, category) => dispatch => {
  const body = { option: up ? 'upVote' : 'downVote' };
  const voteURL = `/posts/${postId}`;

  const dispatchVoteScore = compose(
    dispatch,
    receivePostVote(postId, category)
  );

  return myFetch(voteURL, {
    body,
    method: 'POST',
  })
    .then(prop('voteScore'))
    .then(dispatchVoteScore, console.warn);
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export const fetchPosts = category => (dispatch, getStore) => {
  const posts = getStore().postsByCategory[category];
  if (posts && posts.ids) return posts;

  const randomDelay = Math.random() * 1000;

  dispatch(requestPosts(category));
  const fetchURL = category !== 'all' ? `${category}/posts` : '/posts';
  return Promise.all([myFetch(fetchURL), delay(randomDelay)]).then(
    ([posts]) => dispatch(receivePosts(posts, category)),
    console.warn
  );
};

const deletePostAction = (postId, category) => ({
  type: DELETE_POST,
  postId,
  category,
});
export const deletePost = (postId, category) => dispatch => {
  const url = `/posts/${postId}`;
  return myFetch(url, { method: 'delete' }).then(
    () => dispatch(deletePostAction(postId, category)),
    console.warn
  );
};

export const switchPostSortWay = category => ({
  type: SWITCH_POST_SORT_WAY,
  category,
});

export const switchCommentSortWay = postId => ({
  type: SWITCH_COMMENT_SORT_WAY,
  postId,
});
