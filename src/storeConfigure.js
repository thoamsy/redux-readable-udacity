import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { POST_WORKER } from './actions/posts';
/* eslint-disable */
const MarkWorker = require('worker-loader!./util/renderMarkdown.js');
/* eslint-enable */

const workerMiddleware = ({ dispatch }) => {
  const render = MarkWorker();
  return next => action => {
    if (action.type !== POST_WORKER) return next(action);
    render.onmessage = ({ data }) => {
      dispatch({ type: action.descType, ...data });
    };
    render.postMessage({ ...action });
  };
};

const dev =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const middlewares = dev
  ? compose(applyMiddleware(thunk, workerMiddleware), dev)
  : applyMiddleware(thunk, workerMiddleware);

export default () => createStore(reducers, middlewares);
