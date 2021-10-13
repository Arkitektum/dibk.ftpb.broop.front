import { UPDATE_SNACKBAR_MESSAGE } from 'constants/types';

const initialState = '';

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_SNACKBAR_MESSAGE:
			return action.payload;
		default:
			return state;
	}
}

export default reducer;
