import { assoc } from 'ramda';
export const CREATE_NEW_POST = 'CREATE_NEW_POST';
export const EDIT_POST = 'EDIT_POST';

const makeActionCreator = (type, ...keys) =>
  (...args) =>
    keys.reduce((action, key, i) =>
      assoc(key, args[i], action), { type }
    );


export const createNewPost = makeActionCreator(
  CREATE_NEW_POST, 'title', 'category', 'body', 'author', 'id'
);
