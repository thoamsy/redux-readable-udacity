import v4 from 'uuid/v4';
import myFetch from '../util/fetch';
import { renderMarkdown } from './posts';

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
    post,
  });
};

export const publishPost = ({
  author,
  category,
  title,
  body,
  id,
}) => dispatch => {
  // 这个操作由 button 触发，只要保证该 button 会有对应的 loading 动画的话，就不用处理多次点击的竞态。
  dispatch({ type: PUBLISH_POST });
  id = id || v4();
  const data = {
    author,
    category,
    title,
    body,
    id,
    timestamp: Date.now(),
  };
  return myFetch('/posts', {
    method: 'post',
    body: data,
  }).then(
    payload => {
      dispatch(renderMarkdown(payload, category, PUBLISH_POST_SUCCESS));
      removePost();
    },
    err => dispatch({ type: PUBLISH_POST_FAILURE, category, err })
  );
};

export const fetchSavedPost = () => dispatch => {
  let saved = localStorage.getItem(localKey);
  saved = saved || null;
  dispatch({
    type: INIT_POST,
    saved: JSON.parse(saved),
  });
};

export const MODIFY_POST_SUCCESS = 'MODIFY_POST_SUCCESS';
const modifyPostRequest = (postId, payload) => ({
  type: MODIFY_POST_SUCCESS,
  postId,
  payload,
});
export const modifyPost = ({
  body,
  title,
  id: postId,
  category,
}) => dispatch => {
  return myFetch(`/posts/${postId}`, {
    method: 'PUT',
    body: { body, title },
  }).then(
    payload => dispatch(renderMarkdown(payload, category, MODIFY_POST_SUCCESS)),
    console.warn
  );
};
