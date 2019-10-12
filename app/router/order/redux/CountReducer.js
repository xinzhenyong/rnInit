import * as TYPES from '../../../const/ActionType';

export const add = () => {
  return (dispatch) => {
    dispatch({
      type: TYPES.ACTION_COUNT,
    });
  };
};

export default function getCount(state = 0, action) {
  switch (action.type) {
    case TYPES.ACTION_COUNT:
      return state + 1;
    default:
      return state;
  }
}
