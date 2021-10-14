export const getStageFromStatus = status => {
    switch (status) {
        case 'signert':
            return 'signed';
        case 'avvist':
            return 'rejected';
        case 'error':
            return 'failed';
        default:
            return '';
    }
}

export const signingButtonShouldBeDisabled = form => {
    if (form?.innsendingstype === "ansvarsrett"){
        const isSignable = form?.formData?.erklaeringAnsvarligProsjekterende && form?.formData?.erklaeringAnsvarligUtfoerende && form?.formData?.erklaeringAnsvarligKontrollerende;
        return !isSignable
    }
}