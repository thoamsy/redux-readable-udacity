import * as actions from '../actions/editPost';

export const editPost = (state = {
    author: '',
    body: '',
    titie: '',
    category: ''
}, action) => {
  const { type } = action;
  switch (type) {
    case actions.INIT_POST:
      // TODO: 将 id 放在 state 下生成，并不再使用这么多状态。
      return action.saved ? action.saved : state;
    case actions.SAVE_POST:
      return action.post;
    default:
      return state;
  }
};


export default editPost;
