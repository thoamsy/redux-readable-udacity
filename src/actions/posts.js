import { prop, inc, dec } from 'ramda';
const headers = {
  Authorization: 'I don\'t know why we need this.',
};

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const REQUEST_POST_VOTE = 'REQUEST_POST_VOTE';
export const RECEIVE_POST_VOTE = 'RECEIVE_POST_VOTE';

const requestPosts = (category) => ({
  type: REQUEST_POSTS,
  category
});

const receivePosts = (posts, category) => ({
  type: RECEIVE_POSTS,
  payload: posts,
  category
});

// 每次触发，就加一
const requestPostVote = (postId, category, up) => ({
  type: REQUEST_POST_VOTE,
  postId,
  update: up ? inc : dec,
  category
});
const receivePostVote =  (postId, category, voteScore) => ({
  type: RECEIVE_POST_VOTE,
  voteScore,
  postId,
  category
});

export const postVoteScore = (postId, category, up) => (dispatch) => {
  dispatch(requestPostVote(postId, category, up));
  const body = JSON.stringify({ option: up ? 'upVote' : 'downVote' });
  const voteURL = `/posts/${postId}`;
  return fetch(voteURL, { headers: {'content-type': 'application/json', 'Authorization': 'hh'}, body, method: 'POST' })
    .then(res => res.json(), Promise.reject)
    .then(prop('voteScore'))
    .then(voteScore => dispatch(receivePostVote(postId, category, voteScore)));
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export const fetchPosts = (category) => (dispatch, getStore) => {
  if (getStore().postsByCategory[category]) return;

  dispatch(requestPosts(category));
  const fetchURL = category !== 'all' ? `${category}/posts` : '/posts';
  return Promise.all([
    fetch(fetchURL, { headers }),
    delay(1000)
  ])
    .then(([res]) => res.json(), Promise.reject)
    .then(posts => dispatch(receivePosts(posts, category)));
};
