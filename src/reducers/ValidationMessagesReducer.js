import { UPDATE_VALIDATION_MESSAGES, REMOVE_VALIDATION_MESSAGE } from 'constants/types';

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_VALIDATION_MESSAGES:
            return action.payload;
        case REMOVE_VALIDATION_MESSAGE:
            return action.payload;
        default:
            return state;
    }
}

export default reducer;
