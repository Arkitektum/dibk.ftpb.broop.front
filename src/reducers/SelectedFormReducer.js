import { FETCH_SELECTED_FORM, UPDATE_SELECTED_FORM } from 'constants/types';

const initialState = {};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_SELECTED_FORM:
			return action.payload;
		case UPDATE_SELECTED_FORM:
			return action.payload;
		default:
			return state;
	}
}

export default reducer;
