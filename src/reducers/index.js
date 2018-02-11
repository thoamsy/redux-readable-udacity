import categories from './category';
import postsByCategory from './postsByCategory';
import edited from './editPost';
import comments from './comments';
import { combineReducers } from 'redux';
import { prop, pathOr, __, propOr } from 'ramda';

export default combineReducers({
  categories,
  postsByCategory,
  edited,
  comments,
});

export const isPostsFetching = (state, category) =>
  pathOr(false, ['postsByCategory', category, 'isFetching'], state);

export const getPostsByCategory = (state, category) => {
  const posts = state.postsByCategory[category];
  return posts ? posts.ids.map(id => posts.byId[id]) : [];
};

export const getComments = (state, postId) => {
  const { comments: { byId } } = state;
  return propOr([], 'comments', getPost(state, postId)).map(prop(__, byId));
};
export const isCommentsFetching = (state, postId) =>
  pathOr(false, ['comments', 'isFetching', postId], state);

export const getCategories = prop('categories');
export const getEdited = prop('edited');
export const getPost = (state, postId) =>
  state.postsByCategory.all.byId[postId];
