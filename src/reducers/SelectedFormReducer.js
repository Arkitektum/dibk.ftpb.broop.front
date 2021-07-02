import { UPDATE_SELECTED_FORM } from 'constants/types';

const initialState = {};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_SELECTED_FORM:
			return action.payload;
		default:
			return state;
	}
}

export default reducer;
