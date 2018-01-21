const headers = {
  Authorization: 'I don\'t know why we need this.',
};

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const POST_VOTE_SCORE_UP = 'POST_VOTE_SCORE_UP';
export const POST_VOTE_SROCE_DOWN = 'POST_VOTE_SROCE_DOWN';

const requestPosts = (category) => ({
  type: REQUEST_POSTS,
  category
});

const receivePosts = (posts, category) => ({
  type: RECEIVE_POSTS,
  payload: posts,
  category
});

export const postVoteScoreUp = (postId) => ({
  type: POST_VOTE_SCORE_UP,
  payload: JSON.stringify({ option: 'upVote' }),
  postId
});

export const postVoteScoreDown = (postId) => ({
  type: POST_VOTE_SROCE_DOWN,
  payload: JSON.stringify({ option: 'downVote' }),
  postId
});

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export const fetchPosts = (category) => (dispatch, getStore) => {
  if (getStore().postsByCategory[category]) return;

  dispatch(requestPosts(category));
  const fetchURL = category !== 'all' ? `${category}/posts` : '/posts';
  return Promise.all([
    fetch(fetchURL, { headers }),
    delay(1000)
  ])
    .then(([res]) => res.json(), err => Promise.reject(err))
    .then(posts => dispatch(receivePosts(posts, category)));
};
