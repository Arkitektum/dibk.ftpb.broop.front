import { UPDATE_SNACKBAR_MESSAGE, UPDATE_SNACKBAR_LASTINIT, UPDATE_SNACKBAR_VISIBLE } from 'constants/types';

export const showSnackbarMessage = (message, timeout) => (dispatch, getState) => {
    return new Promise(resolve => {
        dispatch({ type: UPDATE_SNACKBAR_MESSAGE, payload: message });
        dispatch({ type: UPDATE_SNACKBAR_VISIBLE, payload: true });
        const initTime = Date.now();
        dispatch({ type: UPDATE_SNACKBAR_LASTINIT, payload: initTime });
        if (timeout) {
            setTimeout(() => {
                const lastInitTime = getState()?.snackbarLastInit;
                if (lastInitTime === initTime) {
                    dispatch({ type: UPDATE_SNACKBAR_VISIBLE, payload: false });
                }
                resolve(message);
            }, timeout);
        } else {
            resolve(message)
        }
    })
}

export const hideSnackbarMessage = () => (dispatch) => {
    dispatch({ type: UPDATE_SNACKBAR_VISIBLE, payload: false });
}
