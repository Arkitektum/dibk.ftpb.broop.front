import { FETCH_CODELIST_TILTAKSKLASSE } from 'constants/types';

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CODELIST_TILTAKSKLASSE:
            return action.payload;
        default:
            return state;
    }
}

export default reducer;
