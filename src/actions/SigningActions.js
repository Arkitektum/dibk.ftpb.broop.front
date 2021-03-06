// Helpers
import { getEnvironmentVariable } from 'helpers/environmentVariableHelpers.js';

export const updateSignedStatus = (submissionId, statusQueryToken, stage, accessToken) => () => {
    const internalApiUrl = getEnvironmentVariable('internalApiUrl');
    const formPath = `/api/v1/signering/${submissionId}`;
    const bearerToken = `Bearer ${accessToken}`;
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearerToken
        },
        body: JSON.stringify({
            toStage: stage,
            ...(statusQueryToken?.length && { statusQueryToken }),
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

export const getSignedDocument = (submissionId, accessToken) => dispatch => {
    const internalApiUrl = getEnvironmentVariable('internalApiUrl');
    const formPath = `/api/v1/signering/${submissionId}/signed-document`;
    const bearerToken = `Bearer ${accessToken}`;
    const fetchOptions = {
        headers: {
            'Authorization': bearerToken
        }
    };
    return fetch(`${internalApiUrl}${formPath}`, fetchOptions).then(response => {
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
