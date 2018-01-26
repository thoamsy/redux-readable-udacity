import categories from './category';
import postsByCategory from './postsByCategory';
import edited from './editPost';
import comments from './comments';
import { combineReducers } from 'redux';

export default combineReducers({ categories, postsByCategory, edited, comments });

export const isPostsFetching = (state, category) =>
  state.postsByCategory[category] ? state.postsByCategory[category].isFetching : false;
export const getPost = (state, category) => {
  const posts = state.postsByCategory[category];
  return posts ? posts.ids.map(id => posts.byId[id]) : [];
};
export const getComments = (state, postId) => state.postsByCategory.all[postId].comments;
export const getCategories = (state) => state.categories;
export const getEdited = state => state.edited;
