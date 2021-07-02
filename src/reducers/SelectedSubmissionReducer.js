import { FETCH_SUBMISSION } from 'constants/types';

const initialState = {};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_SUBMISSION:
			return action.payload;
		default:
			return state;
	}
}

export default reducer;
