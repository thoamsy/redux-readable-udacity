import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { PUBLISH_POST_SUCCESS } from './actions/editPost';
/* eslint-disable */
const MarkWorker = require('worker-loader!./util/renderMarkdown.js');
/* eslint-enable */

const workerMiddleware = ({ dispatch }) => {
  const render = MarkWorker();
  render.onmessage = ({ data }) => {
    dispatch({ type: PUBLISH_POST_SUCCESS, ...data });
  };
  return next => action => {
    if (action.type !== 'POST_WORKER') return next(action);
    render.postMessage({ payload: action.payload, category: action.category });
  };
};

const dev =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
export default () => createStore(reducers,
 compose(applyMiddleware(thunk, workerMiddleware), dev));
