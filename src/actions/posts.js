const headers = {
  Authorization: "I don't know why we need this.",
};

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_POSTS = 'REQUEST_POSTS';

export const requestPosts = (category) => ({
  type: REQUEST_POSTS,
  category
});

export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  payload: posts,
});

export const fetchPosts = (category) => (dispatch) => {
  dispatch(requestPosts(category));
  const fetchURL = category ? `${category}/posts` : '/posts';
  return fetch(fetchURL, { headers })
    .then(res => res.json(), err => Promise.reject(err))
    .then(posts => dispatch(receivePosts(posts)));
}
