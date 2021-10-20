// Helpers
import { getEnvironmentVariable } from 'helpers/environmentVariableHelpers.js';

export const convertSelectedFormToPDF = (htmlString, submissionId, accessToken) => dispatch => {
    const internalApiUrl = getEnvironmentVariable('internalApiUrl');
    const formPath = `/api/v1/HtmlToPdf/${submissionId}`;
    const bearerToken = `Bearer ${accessToken}`;
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'text/html',
            'Accept': 'application/pdf',
            'Authorization': bearerToken
        },
        body: htmlString
    };
    return fetch(`${internalApiUrl}${formPath}`, fetchOptions);
}