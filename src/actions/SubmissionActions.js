// Types
import { FETCH_SUBMISSION } from 'constants/types';

// Helpers
import { getEnvironmentVariable } from 'helpers/environmentVariableHelpers.js';

export const fetchSubmission = (guid) => dispatch => {
    const internalApiUrl = getEnvironmentVariable('internalApiUrl');
    const apiUrl = `${internalApiUrl}/api/v1/Innsending/${guid}`
    return fetch(apiUrl).then(res => res.json()).then(form => {
        return dispatch({ type: FETCH_SUBMISSION, payload: form })
    }).catch(error => {
        console.log("fetchSubmission action:", error)
    });
}
