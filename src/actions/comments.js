import delay from '../util/delay';
import v4 from 'uuid/v4';
import { getPost } from '../reducers/';
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

  return Promise.all([
    fetch(fetchUrl, {
      headers: {
        Authorization: 'shit',
      },
    }),
    delay(ms),
  ])
    .then(([res]) => {
      if (res.ok || res.status === 304) {
        return res.json();
      } else {
        throw Error(res.statusText);
      }
    })
    .then(comments => dispatch(fetchCommentsSuccess(comments, postId)))
    .catch(err => dispatch(fetchCommentsFailure(err || 'Something Wrong')));
};

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

const addCommentRequest = commentId => ({
  type: ADD_COMMENT_REQUEST,
  commentId,
});
const addCommentSuccess = (postId, commentId, payload) => ({
  type: ADD_COMMENT_SUCCESS,
  commentId,
  payload,
  postId,
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

export const addComment = (parentId, content) => dispatch => {
  const commentId = v4();
  dispatch(addCommentRequest(commentId));
  const fetchUrl = '/comments';
  const author = fakeNames[~~(Math.random() * 10)];
  const body = JSON.stringify({
    id: commentId,
    timestamp: Date.now(),
    body: content,
    parentId,
    author,
  });

  return fetch(fetchUrl, {
    method: 'POST',
    headers: {
      Authorization: 'whatever',
      'Content-Type': 'application/json',
    },
    body,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw Error(res.statusText);
    })
    .then(
      comment => dispatch(addCommentSuccess(parentId, commentId, comment)),
      err => dispatch(addCommentFailure(commentId, err))
    );
};
