import { UPDATE_IS_VALIDATED } from 'constants/types';

const initialState = false;

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_IS_VALIDATED:
			return action.payload;
		default:
			return state;
	}
}

export default reducer;
