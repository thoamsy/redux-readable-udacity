export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';

const fetchCommentsRequest = (parentId) => ({
  type: FETCH_COMMENTS_REQUEST,
  parentId
});
const fetchCommentsSuccess = (comments, parentId) => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: comments,
  parentId
});
const fetchCommentsFailure = err => ({
  type: FETCH_COMMENTS_FAILURE,
  err,
});

/**
 *
 * @param {string} fetchUrl 获取帖子的 URL，因为这个可以通过 location 获得
 * @param {*} id 帖子的 id，用于获取是否处于 fetching 状态
 */
const fetchComments = (fetchUrl, id) => (dispatch, getStore) => {
  if (getStore().comments.isFetching[id]) return false;
  fetchCommentsRequest(id);

  return fetch(fetchUrl, {
    Authorization: 'shit',
  })
    .then(res => {
      if (res.ok || res.status === 304) {
        return res.json();
      } else {
        throw Error(res.statusText);
      }
    })
    .then(comments => dispatch(fetchCommentsSuccess(comments)))
    .catch(err => dispatch(fetchCommentsFailure(err || 'Something Wrong')));
};
export default fetchComments;