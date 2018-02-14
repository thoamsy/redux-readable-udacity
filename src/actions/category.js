import { compose } from 'redux';
import myFetch from '../util/fetch';
export const REQUEST_ALL_CATEGORIES = 'REQUEST_ALL_CATEGORIES';
export const REQUEST_ALL_CATEGORIES_FAILURE = 'REQUEST_ALL_CATEGORIES_FAILURE';

const requestCategories = payload => ({
  type: REQUEST_ALL_CATEGORIES,
  payload,
});

const requestCategoriesFailure = err => ({
  type: REQUEST_ALL_CATEGORIES_FAILURE,
  err,
});

export const fetchAllCategories = () => (dispatch, getStore) => {
  // 防止多次获取
  if (getStore().categories.length > 1) return Promise.resolve();
  const url = '/categories';
  return myFetch(url).then(
    compose(dispatch, requestCategories),
    compose(dispatch, requestCategoriesFailure)
  );
};
