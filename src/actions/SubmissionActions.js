import { FETCH_SUBMISSION} from 'constants/types';

export const fetchSubmission = (guid) => dispatch => {
    const apiUrl = `https://dibk-ftpb-broop-api.azurewebsites.net/api/v1/Innsending/${guid}`

    return fetch(apiUrl).then(res => res.json()).then(form => {
        return dispatch({ type: FETCH_SUBMISSION, payload: form })
    });
}
