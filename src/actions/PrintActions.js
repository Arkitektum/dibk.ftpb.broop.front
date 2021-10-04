// Helpers
import { getEnvironmentVariable } from 'helpers/environmentVariableHelpers.js';

export const convertSelectedFormToPDF = (htmlString, submissionId) => dispatch => {
    const internalApiUrl = getEnvironmentVariable('internalApiUrl');
    const formPath = `/api/v1/HtmlToPdf/${submissionId}`;
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'text/html',
            'Accept': 'application/pdf'
        },
        body: htmlString
    };
    return fetch(`${internalApiUrl}${formPath}`, fetchOptions);
}