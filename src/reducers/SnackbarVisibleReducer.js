import { UPDATE_SNACKBAR_VISIBLE } from 'constants/types';

const initialState = false;

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_SNACKBAR_VISIBLE:
			return action.payload;
		default:
			return state;
	}
}

export default reducer;
