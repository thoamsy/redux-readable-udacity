import v4 from 'uuid/v4';
/* eslint-disable */
const MarkWorker = require('worker-loader!../util/renderMarkdown.js');
/* eslint-enable */
console.log(MarkWorker);

export const INIT_POST = 'INIT_POST';
export const SAVE_POST = 'SAVE_POST';
export const PUBLISH_POST = 'PUBLISH_POST';
export const PUBLISH_POST_SUCCESS = 'PUBLISH_POST_SUCCESS';
export const PUBLISH_POST_FAILURE = 'PUBLISH_POST_FAILURE';

export const localKey = 'editedPost';
function saveToLocal(post) {
  localStorage.setItem(localKey, JSON.stringify(post));
}
function removePost() {
  localStorage.removeItem(localKey);
}

export const savePost = post => dispatch => {
  saveToLocal(post);
  dispatch({
    type: SAVE_POST,
    post
  });
};


const render = MarkWorker();
export const publishPost = ({ author, category, title, body, id }) => dispatch => {
  // 这个操作由 button 触发，只要保证该 button 会有对应的 loading 动画的话，就不用处理多次点击的竞态。
  dispatch({ type: PUBLISH_POST });
  id = id || v4();
  const data = {
    author,
    category,
    title,
    body,
    id,
    timestamp: Date.now()
  };
  return fetch('/posts', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      authorization: 'hello'
    },
    body: JSON.stringify(data)
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw Error(res.statusText);
  }).then(payload => {
    render.postMessage({ useFor: 'render', markdown: payload.body });
    render.onmessage = ({ data }) => {
      payload.body = data;
      dispatch({ type: PUBLISH_POST_SUCCESS, category, payload });
      removePost();
    };
  }).catch(err => {
    dispatch({ type: PUBLISH_POST_FAILURE, category, err });
  });
};
export const fetchSavedPost = () => dispatch => {
  let saved = localStorage.getItem(localKey);
  saved = saved || null;
  dispatch({
    type: INIT_POST,
    saved: JSON.parse(saved)
  });
};
