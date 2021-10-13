import { UPDATE_SNACKBAR_LASTINIT } from 'constants/types';

const initialState = 0;

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_SNACKBAR_LASTINIT:
			return action.payload;
		default:
			return state;
	}
}

export default reducer;
