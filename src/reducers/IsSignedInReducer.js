import { UPDATE_IS_SIGNED_IN } from 'constants/types';

const initialState = false;

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_IS_SIGNED_IN:
			return action.payload;
		default:
			return state;
	}
}

export default reducer;
