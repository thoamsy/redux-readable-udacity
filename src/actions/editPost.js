import { assoc } from 'ramda';
export const CREATE_NEW_POST = 'CREATE_NEW_POST';
export const INIT_POST = 'INIT_POST';
export const PUBLISH_POST = 'PUBLISH_POST';
export const SAVE_POST = 'SAVE_POST';

const makeActionCreator = (type, ...keys) => (...args) =>
  keys.reduce((action, key, i) => assoc(key, args[i], action), { type });

export const createNewPost = makeActionCreator(
  CREATE_NEW_POST,
  'title',
  'category',
  'body',
  'author',
  'id'
);

export const localKey = 'editedPost';
function saveToLocal(post) {
  localStorage.setItem(localKey, JSON.stringify(post));
}

export const savePost = post => dispatch => {
  saveToLocal(post);
  dispatch({
    type: SAVE_POST,
    post
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
