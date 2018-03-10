import { combineReducers } from 'redux';
import { prop, __, descend, sort, compose, propOr, pathOr } from 'ramda';
import { createSelector } from 'reselect';

import categories from './category';
import postsByCategory from './postsByCategory';
import edited from './editPost';
import comments from './comments';

export default combineReducers({
  categories,
  postsByCategory,
  edited,
  comments,
});

export const isPostsFetching = (state, category) =>
  pathOr(false, ['postsByCategory', category, 'isFetching'], state);

const sortWith = compose(sort, descend, prop);

const postsSelector = (state, category) => state.postsByCategory[category];
export const getPostsByCategory = createSelector(
  postsSelector,
  ({ sortWay, ids, byId }) => sortWith(sortWay)(ids.map(id => byId[id]))
);

export const getComments = (state, postId) => {
  const { comments: { byId } } = state;
  return createSelector(getPost, post => {
    return sortWith(post.sortWay)(
      propOr([], 'comments', post).map(prop(__, byId))
    );
  })(state, postId);
};

export const isCommentsFetching = (state, postId) =>
  pathOr(false, ['comments', 'isFetching', postId], state);

export const getCommentEditStatus = state => commentId =>
  pathOr(false, ['comments', 'byId', commentId, 'isEditing'], state);

export const getCategories = prop('categories');
export const getEdited = prop('edited');

export const getPost = (state, postId) => {
  // 在 fetch 结束后, 再确定该 post 是否存在.
  if (
    !isPostsFetching(state, 'all') &&
    !state.postsByCategory.all.byId[postId]
  ) {
    return { error: `/${postId}/notfound` };
  }
  return pathOr(null, ['postsByCategory', 'all', 'byId', postId], state);
};
