import * as actions from '../actions/editPost';
import v4 from 'uuid/v4';

export const editPost = (state = {
  saved: {
    author: '',
    body: '',
    titie: '',
    category: '',
    voteScore: 1,
    id: v4()
}, navState: 'Write something' }, action) => {
  const { type } = action;
  switch (type) {
    case actions.SAVING_POST:
      return { ...state,  navState: 'Saving…'  };
    case actions.SAVED_POST:
      return { ...state,  navState: 'Saved Success!'  };
    case actions.SAVE_POST:
      return { ...state,  navState: 'Write something'  };
    case actions.INIT_POST:
      let data = localStorage.getItem(actions.localKey);
      return data ? { ...state, saved: JSON.parse(data) } : state;
    default:
      return state;
  }
};


export default editPost;
