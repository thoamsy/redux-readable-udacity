import { REQUEST_ALL_CATEGORIES, REQUEST_ALL_CATEGORIES_FAILURE  } from '../actions/category';

const categories = (state = [{
  name: 'all',
  path: ''
}], action) => {
  const { err, type, payload } = action;
  switch (type) {
    case REQUEST_ALL_CATEGORIES:
      return [...state, ...payload.categories];
    case REQUEST_ALL_CATEGORIES_FAILURE:
      return err;
    default:
      return state;
  }
};
export const getCategories = (state) => state.categories;

export default categories;
