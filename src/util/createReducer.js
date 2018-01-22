import { propOr, identity } from 'ramda';

export default function(initialState, handlers) {
  return (state = initialState, action) =>
    propOr(identity, action.type, handlers)(state, action);
}
