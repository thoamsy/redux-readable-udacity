import categories from './category';
import postsByCategory from './postsByCategory';
import { combineReducers } from 'redux';

export default combineReducers({ categories, postsByCategory });

export const isPostsFetching = (state, category) =>
  state.postsByCategory[category] ? state.postsByCategory[category].isFetching : false;
export const getPost = (state, category) => {
  const posts = state.postsByCategory[category];
  return posts ? posts.ids.map(id => posts.byId[id]) : [];
};
