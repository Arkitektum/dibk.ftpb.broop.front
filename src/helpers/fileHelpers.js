import { saveAs } from 'file-saver';

export const saveFileContentFromBlob = (blob, filename) => {
    saveAs(blob, filename);
};
