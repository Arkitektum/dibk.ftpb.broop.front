import { FETCH_FORM } from 'constants/types';

const initialState = {};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_FORM:
			return action.payload;
		default:
			return state;
	}
}

export default reducer;
