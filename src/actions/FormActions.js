import { UPDATE_SELECTED_FORM } from 'constants/types';

export const updateSelectedForm = (form) => dispatch => {
    return dispatch({ type: UPDATE_SELECTED_FORM, payload: form })
}
