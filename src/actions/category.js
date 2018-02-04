import { compose } from 'redux';
export const REQUEST_ALL_CATEGORIES = 'REQUEST_ALL_CATEGORIES';
export const REQUEST_ALL_CATEGORIES_FAILURE = 'REQUEST_ALL_CATEGORIES_FAILURE';

const headers = {
  Authorization: 'I don\'t know why we need this.',
};

const requestCategories = (payload) => ({
  type: REQUEST_ALL_CATEGORIES,
  payload,
});

const requestCategoriesFailure = (err) => ({
  type: REQUEST_ALL_CATEGORIES_FAILURE,
  err
});

export const fetchAllCategories = () => (dispatch, getStore) => {
  // 防止多次获取
  if (getStore().categories.length > 1) return Promise.resolve();
  const url = '/categories';
  return fetch(url, { headers }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.statusText);
    }
  }).then(compose(dispatch, requestCategories), compose(dispatch, requestCategoriesFailure));
};
