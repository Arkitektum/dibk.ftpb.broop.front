import { FETCH_CODELIST_FUNSKJON } from 'constants/types';

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CODELIST_FUNSKJON:
            return action.payload;
        default:
            return state;
    }
}

export default reducer;
