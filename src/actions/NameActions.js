import {UPDATE_NAME} from 'constants/types';

export const updateName = name => (dispatch, getState) => {
  dispatch({type: UPDATE_NAME, payload: name})
}
