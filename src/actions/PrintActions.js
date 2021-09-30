// import { saveAs } from 'file-saver';

// Helpers
import { getEnvironmentVariable } from 'helpers/environmentVariableHelpers.js';

// const saveFileContent = (blob) => {
//     const filename = "AnSaKo.pdf";
//     saveAs(blob, filename);
// }

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