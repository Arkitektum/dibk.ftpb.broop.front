// Helpers
import { getEnvironmentVariable } from 'helpers/environmentVariableHelpers.js';

export const initiateSigning = (submissionId, statusQueryToken) => dispatch => {
    const internalApiUrl = getEnvironmentVariable('internalApiUrl');
    const formPath = `/api/v1/signering/${submissionId}`;
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            stage: "InitiateSigning",
            statusQueryToken
        })
    };
    return fetch(`${internalApiUrl}${formPath}`, fetchOptions).then(res => res.json()).then(response => {
        return response;
    });
}

export const updateSignedStatus = (submissionId, statusQueryToken, stage) => dispatch => {
    const internalApiUrl = getEnvironmentVariable('internalApiUrl');
    const formPath = `/api/v1/signering/${submissionId}`;
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            toStage: stage,
            statusQueryToken
        })
    };
    return fetch(`${internalApiUrl}${formPath}`, fetchOptions).then(res => res.json()).then(response => {
        return response;
    });
}
