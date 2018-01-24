import { assoc } from 'ramda';
import delay from '../util/delay';
export const CREATE_NEW_POST = 'CREATE_NEW_POST';
export const INIT_POST = 'INIT_POST';
export const SAVE_POST = 'SAVE_POST';
export const SAVING_POST = 'SAVING_POST';
export const SAVED_POST = 'SAVED_POST';
export const PUBLISH_POST = 'PUBLISH_POST';

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
  console.log(post);
  localStorage.setItem(localKey, JSON.stringify(post));
}

export const savePost = post => async dispatch => {
  dispatch({
    type: SAVING_POST,
  });
  saveToLocal(post);
  dispatch({
    type: SAVED_POST,
  });
  await delay(1000);
  dispatch({
    type: SAVE_POST,
  });
};

export const fetchSavedPost = () => dispatch => {
  dispatch({
    type: INIT_POST
  });
};
