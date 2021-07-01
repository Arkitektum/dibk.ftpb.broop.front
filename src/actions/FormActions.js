import { FETCH_FORM } from 'constants/types';

export const fetchForm = (formType, formId) => dispatch => {
    const apiUrl = `https://dibk-ftpb-broop-api.azurewebsites.net/api/${formType}?formId=${formId}`
    return fetch(apiUrl).then(res => res.json()).then(form => {
        return dispatch({ type: FETCH_FORM, payload: form })
    });
}
