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

const defaultPost = {
  id: '1234567890',
  title: '请完整的打开该应用',
  author: 'Thomas',
  rendered: '<p>因为偷懒，程序的某些地方没有那么健壮，请在首页打开该程序。<p>',
  category: 'React',
  timestamp: Date.now(),
};
export const getPost = (state, postId) =>
  pathOr(defaultPost, ['postsByCategory', 'all', 'byId', postId], state);
