const headers = {
  Authorization: "I don't know why we need this.",
};

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_POSTS = 'REQUEST_POSTS';

export const requestPosts = (category) => ({
  type: REQUEST_POSTS,
  category
});

export const receivePosts = (posts, category) => ({
  type: RECEIVE_POSTS,
  payload: posts,
  category
});

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export const fetchPosts = (category) => (dispatch, getStore) => {
  if (getStore().allPosts[category]) return;

  dispatch(requestPosts(category));
  const fetchURL = category !== 'all' ? `${category}/posts` : '/posts';
  return Promise.all([
    fetch(fetchURL, { headers }),
    delay(20000)
  ])
    .then(([res]) => res.json(), err => Promise.reject(err))
    .then(posts => dispatch(receivePosts(posts, category)));
}
