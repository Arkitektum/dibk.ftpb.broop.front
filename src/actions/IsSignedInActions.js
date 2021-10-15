import { UPDATE_IS_SIGNED_IN } from 'constants/types';

export const signIn = () => (dispatch) => {
    dispatch({ type: UPDATE_IS_SIGNED_IN, payload: true });
}

export const signOut = () => (dispatch) => {
    dispatch({ type: UPDATE_IS_SIGNED_IN, payload: false });
}