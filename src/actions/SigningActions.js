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


const getFilenameFromContentDisposition = contentDisposition => {
    const regex = new RegExp(`filename=(.*?);`, 'gm')
    return regex.exec(contentDisposition)?.[1] || null;
}

export const getSignedDocument = (submissionId) => dispatch => {
    const internalApiUrl = getEnvironmentVariable('internalApiUrl');
    const formPath = `/api/v1/signering/${submissionId}/signed-document`;

    return fetch(`${internalApiUrl}${formPath}`).then(response => {
        const contentDisposition = response.headers.get('Content-Disposition');
        const filename = getFilenameFromContentDisposition(contentDisposition) || 'skjema.pdf';
        return response.blob().then(blob => {
            return {
                filename,
                blob
            }
        });
    });
}
