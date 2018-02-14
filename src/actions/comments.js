import delay from '../util/delay';
import v4 from 'uuid/v4';
import { getPost } from '../reducers/';
import { prop, compose } from 'ramda';
import myFetch from '../util/fetch';

export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';

const fetchCommentsRequest = postId => ({
  type: FETCH_COMMENTS_REQUEST,
  postId,
});
const fetchCommentsSuccess = (comments, postId) => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: comments,
  postId,
});

const fetchCommentsFailure = err => ({
  type: FETCH_COMMENTS_FAILURE,
  err,
});

/**
 *
 * @param {string} fetchUrl 获取帖子的 URL，因为这个可以通过 location 获得
 * @param {string} postId 帖子的 id
 */
export const fetchComments = (fetchUrl, postId) => (dispatch, getStore) => {
  const store = getStore();
  // 如果正在获取，就直接退出
  if (store.comments.isFetching[postId]) return Promise.resolve();
  // 如果已经存在 comments 了，也直接退出。
  if (getPost(store, postId).comments) return Promise.resolve();

  const ms = Math.random() * 1000;
  dispatch(fetchCommentsRequest(postId));

  return Promise.all([myFetch(fetchUrl), delay(ms)]).then(
    ([comments]) => dispatch(fetchCommentsSuccess(comments, postId)),
    ([err]) => dispatch(fetchCommentsFailure(err || 'Something Wrong'))
  );
};

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

const addCommentRequest = commentId => ({
  type: ADD_COMMENT_REQUEST,
  commentId,
});
const addCommentSuccess = (postId, commentId, payload, category) => ({
  type: ADD_COMMENT_SUCCESS,
  commentId,
  payload,
  postId,
  category,
});

const addCommentFailure = (commentId, err) => ({
  type: ADD_COMMENT_FAILURE,
  err,
});

const fakeNames = [
  'Laurianne',
  'Pauline',
  'Christ',
  'Nedra',
  'Alf',
  'Kristofer',
  'Marietta',
  'Jon',
  'Fabian',
  'Abdul',
];

/**
 *
 * @param {string} parentId 评论关联的 post 的 id
 * @param {string} 评论内容
 */
export const addComment = (parentId, content, category) => dispatch => {
  const commentId = v4();
  dispatch(addCommentRequest(commentId));
  const fetchUrl = '/comments';
  const author = fakeNames[~~(Math.random() * 10)];
  const body = {
    id: commentId,
    timestamp: Date.now(),
    body: content,
    parentId,
    author,
  };

  return myFetch(fetchUrl, {
    method: 'POST',
    body,
  }).then(
    comment =>
      dispatch(addCommentSuccess(parentId, commentId, comment, category)),
    err => dispatch(addCommentFailure(commentId, err))
  );
};

export const DELETE_COMMENT = 'DELETE_COMMENT';
const deleteCommentAction = (commentId, postId, category) => ({
  type: DELETE_COMMENT,
  commentId,
  postId,
  category,
});

export const deleteComment = (commentId, postId, category) => dispatch => {
  const url = `/comments/${commentId}`;
  return myFetch(url, {
    method: 'DELETE',
  }).then(
    () => dispatch(deleteCommentAction(commentId, postId, category)),
    console.warn
  );
};

export const REQUEST_UPDATE_COMMENT_VOTE = 'REQUEST_UPDATE_COMMENT_VOTE';
const requestUpdateCommentVote = commentId => voteScore => ({
  type: REQUEST_UPDATE_COMMENT_VOTE,
  commentId,
  voteScore,
});

// 和给 post 投票的方法很像
export const updateCommentVote = up => commentId => dispatch => {
  const url = `/comments/${commentId}`;
  const body = { option: up ? 'upVote' : 'downVote' };

  const dispatchVoteScore = compose(
    dispatch,
    requestUpdateCommentVote(commentId)
  );
  return myFetch(url, {
    body,
    method: 'POST',
  })
    .then(prop('voteScore'))
    .then(dispatchVoteScore, console.warn);
};

export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
const editCommentRequest = commentId => ({
  type: EDIT_COMMENT_REQUEST,
  commentId,
});
const editCommentSuccess = (commentId, content) => ({
  type: EDIT_COMMENT_SUCCESS,
  payload: content,
  commentId,
});

export const editComment = (commentId, content) => (dispatch, getStore) => {
  if (getStore().comments.byId[commentId].isEditing) return;
  dispatch(editCommentRequest(commentId));
  const url = `/comments/${commentId}`;

  const body = {
    body: content,
    timestamp: Date.now(),
  };
  return myFetch(url, {
    method: 'PUT',
    body,
  })
    .then(() => delay(Math.random() * 1000))
    .then(() => dispatch(editCommentSuccess(commentId, content)), console.warn);
};
