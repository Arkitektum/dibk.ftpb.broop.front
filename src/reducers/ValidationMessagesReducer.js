import { ADD_VALIDATION_MESSAGE, REMOVE_VALIDATION_MESSAGE } from 'constants/types';

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_VALIDATION_MESSAGE:
            return action.payload;
        case REMOVE_VALIDATION_MESSAGE:
            return action.payload;
        default:
            return state;
    }
}

export default reducer;
