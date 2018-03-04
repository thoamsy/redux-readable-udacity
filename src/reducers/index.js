import categories from './category';
import postsByCategory from './postsByCategory';
import edited from './editPost';
import comments from './comments';
import { combineReducers } from 'redux';
import { prop, pathOr, __, propOr, descend, sort, compose } from 'ramda';

export default combineReducers({
  categories,
  postsByCategory,
  edited,
  comments,
});

export const isPostsFetching = (state, category) =>
  pathOr(false, ['postsByCategory', category, 'isFetching'], state);

const sortWith = type => {
  const sortDescendWith = compose(sort, descend, prop);
  return sortDescendWith(type);
};

export const getPostSortWay = (state, category) => {
  return pathOr('timestamp', ['postsByCategory', category, 'sortWay'], state);
};

export const getPostsByCategory = (state, category) => {
  const posts = state.postsByCategory[category];
  const result = posts
    ? sortWith(posts.sortWay)(posts.ids.map(id => posts.byId[id]))
    : [];
  return result;
};

export const getComments = (state, postId) => {
  const { comments: { byId } } = state;
  const post = getPost(state, postId);
  return sortWith(post.sortWay)(
    propOr([], 'comments', post).map(prop(__, byId))
  );
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
