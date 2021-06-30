import { FETCH_COMMITS } from 'constants/types';

const initialState = {};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_COMMITS:
			return action.payload;
		default:
			return state;
	}
}

export default reducer;
