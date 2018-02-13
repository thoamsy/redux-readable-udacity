import { prop, compose } from 'ramda';
const headers = {
  Authorization: 'shit',
};

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const REQUEST_POST_VOTE = 'REQUEST_POST_VOTE';
export const RECEIVE_POST_VOTE = 'RECEIVE_POST_VOTE';
export const DELETE_POST = 'DELETE_POST';
export const CHANGE_SORT_WAY = 'CHANGE_SORT_WAY';

const requestPosts = category => ({
  type: REQUEST_POSTS,
  category,
});

const receivePosts = (posts, category) => ({
  type: RECEIVE_POSTS,
  payload: posts,
  category,
});

const receivePostVote = (postId, category) => (voteScore) => ({
  type: RECEIVE_POST_VOTE,
  voteScore,
  postId,
  category,
});

export const postVoteScore = (up) => (postId, category) => dispatch => {
  const body = JSON.stringify({ option: up ? 'upVote' : 'downVote' });
  const voteURL = `/posts/${postId}`;

  const dispatchVoteScore = compose(dispatch, receivePostVote(postId, category));

  return fetch(voteURL, {
    headers: { 'content-type': 'application/json', Authorization: 'hh' },
    body,
    method: 'POST',
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw Error(res.statusText);
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
  return Promise.all([fetch(fetchURL, { headers }), delay(randomDelay)])
    .then(([res]) => res.json(), Promise.reject)
    .then(posts => dispatch(receivePosts(posts, category)));
};

export const deletePost = (postId, category) => ({
  type: DELETE_POST,
  postId,
  category,
});

export const changeSortWay = (category) => ({
  type: CHANGE_SORT_WAY,
  category,
});
