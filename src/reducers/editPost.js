import * as actions from '../actions/editPost';
import { evolve, not } from 'ramda';

const initState = {
  author: '',
  body: '',
  title: '',
  category: '',
  isSaving: false,
};
export const editPost = (state = initState, action) => {
  const { type } = action;
  switch (type) {
    case actions.INIT_POST:
      // TODO: 将 id 放在 state 下生成，并不再使用这么多状态。
      return action.saved ? action.saved : state;
    case actions.SAVE_POST:
      return action.post;
    case actions.PUBLISH_POST:
    case actions.PUBLISH_POST_FAILURE:
      return evolve({ isSaving: not }, state);
    case actions.PUBLISH_POST_SUCCESS:
      return initState;
    default:
      return state;
  }
};

export default editPost;
