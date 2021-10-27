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
