// Constants
import { ADD_VALIDATION_MESSAGE, REMOVE_VALIDATION_MESSAGE, UPDATE_IS_VALIDATED } from 'constants/types';

// Helpers
import { isEmptyObject } from 'helpers/dataHelpers';

export const updateIsValidated = (isValidated) => (dispatch) => {
    dispatch({ type: UPDATE_IS_VALIDATED, payload: isValidated });
}


const addValidationMessage = (key, message) => (dispatch, getState) => {
    const validationMessages = getState()?.validationMessages;
    const payload = {
        ...validationMessages,
        [key]: message
    };
    return dispatch({ type: ADD_VALIDATION_MESSAGE, payload });
}

const removeValidationMessage = key => (dispatch, getState) => {
    let validationMessages = getState()?.validationMessages;
    delete validationMessages[key];
    dispatch({ type: REMOVE_VALIDATION_MESSAGE, payload: validationMessages });
}



const populateValidationSummaryList = (validationMessageVariable, validationMessageList) => {
    
    if (validationMessageVariable && typeof validationMessageVariable === 'object' && Object.keys(validationMessageVariable).length) {
        Object.keys(validationMessageVariable).forEach(validationMessageKey => {
            populateValidationSummaryList(validationMessageVariable[validationMessageKey], validationMessageList);
        });
    } else if (validationMessageVariable && typeof validationMessageVariable === 'string') {
        validationMessageList.push(validationMessageVariable);
    }
    return validationMessageList;
}

export const getValidationMessageSummary = () => (dispatch, getState) => {
    const validationMessages = getState()?.validationMessages;
    let validationMessageList = [];
    return [...new Set(populateValidationSummaryList(validationMessages, validationMessageList))];
}


export const validateErklaeringCheckboxes = () => (dispatch, getState) => {
    const formData = getState()?.selectedForm?.formData;
    const funksjonskoder = [
        ...new Set(formData?.ansvarsomraader.map(
            ansvarsomraade => {
                return ansvarsomraade.funksjonKode;
            }
        ))
    ];

    const isValid = [
        (funksjonskoder.includes("PRO") && formData?.erklaeringAnsvarligProsjekterende) || !funksjonskoder.includes("PRO"),
        (funksjonskoder.includes("UTF") && formData?.erklaeringAnsvarligUtfoerende) || !funksjonskoder.includes("UTF"),
        (funksjonskoder.includes("KONTROLL") && formData?.erklaeringAnsvarligKontrollerende) || !funksjonskoder.includes("KONTROLL")
    ].every(validation => validation)

    dispatch(updateIsValidated(true));

    if (!isValid) {
        dispatch(addValidationMessage('erklaeringCheckboxes', 'Du må krysse av for at foretaket erklærer ansvar i henhold til plan- og bygningsloven.'));
    } else {
        dispatch(removeValidationMessage('erklaeringCheckboxes'));
    }
}

export const validateAnsvarsomraadeTiltaksklasse = () => (dispatch, getState) => {
    const formData = getState()?.selectedForm?.formData;
    const hasMissingTiltakskode = formData?.ansvarsomraader.some(ansvarsomraade => {
        return !ansvarsomraade.tiltaksklasseKode;
    });

    const isValid = !hasMissingTiltakskode;

    dispatch(updateIsValidated(true));

    if (!isValid) {
        dispatch(addValidationMessage('ansvarsomraadeTiltaksklasse', 'Du må velge tiltaksklasse for ansvarsområdet.'));
    } else {
        dispatch(removeValidationMessage('ansvarsomraadeTiltaksklasse'));
    }
}

export const validateDekkesOmradetAvSentralGodkjenning = () => (dispatch, getState) => {
    const formData = getState()?.selectedForm?.formData;
    const hasMissingDekkesOmradetAvSentralGodkjenning = formData?.ansvarsomraader.some(ansvarsomraade => {
        return ansvarsomraade.dekkesOmradetAvSentralGodkjenning === undefined && ansvarsomraade.funksjonKode !== "SØK";
    });

    dispatch(updateIsValidated(true));

    if (hasMissingDekkesOmradetAvSentralGodkjenning && formData?.ansvarligForetak?.harSentralGodkjenning) {
        dispatch(addValidationMessage('dekkesOmradetAvSentralGodkjenning', 'Du må svare på om foretaket har sentral godkjenning for ansvarsområdet.'));
    } else {
        dispatch(removeValidationMessage('dekkesOmradetAvSentralGodkjenning'));
    }
}

const getValidationMessagesForSamsvarKontrollCheckboxes = (ansvarsomraade, index, validationMessages) => {
    if (ansvarsomraade.funksjonKode === 'PRO' || ansvarsomraade.funksjonKode === 'UTF') { // Validering for Prosjekterende og Utørende
        const isChecked = [
            ansvarsomraade.samsvarKontrollVedRammetillatelse && ansvarsomraade.funksjonKode !== "UTF",
            ansvarsomraade.samsvarKontrollVedIgangsettingstillatelse && ansvarsomraade.funksjonKode !== "UTF",
            ansvarsomraade.samsvarKontrollVedMidlertidigBrukstillatelse,
            ansvarsomraade.samsvarKontrollVedFerdigattest
        ].some(condition => condition);
        if (!isChecked) {
            if (!validationMessages?.ansvarsomraader) { validationMessages.ansvarsomraader = {} }
            if (!validationMessages.ansvarsomraader[index]) { validationMessages.ansvarsomraader[index] = {} }
            validationMessages.ansvarsomraader[index].samsvarCheckboxes = {
                message: 'Du må krysse av for når samsvarserklæringen vil foreligge.'
            };
        } else {
            if (validationMessages?.ansvarsomraader?.[index]?.samsvarCheckboxes) { delete validationMessages.ansvarsomraader[index].samsvarCheckboxes } // Remove validation property
            if (isEmptyObject(validationMessages?.ansvarsomraader?.[index])) { delete validationMessages.ansvarsomraader[index]; } // Remove object if last validation property
        }
    } else if (ansvarsomraade.funksjonKode === 'KONTROLL') { // Validering for Kotrollerende
        const isChecked = [
            ansvarsomraade.samsvarKontrollVedRammetillatelse,
            ansvarsomraade.samsvarKontrollVedIgangsettingstillatelse,
            ansvarsomraade.samsvarKontrollVedMidlertidigBrukstillatelse,
            ansvarsomraade.samsvarKontrollVedFerdigattest
        ].some(condition => condition);
        if (!isChecked) {
            if (!validationMessages?.ansvarsomraader) { validationMessages.ansvarsomraader = {} }
            if (!validationMessages.ansvarsomraader[index]) { validationMessages.ansvarsomraader[index] = {} }
            validationMessages.ansvarsomraader[index].kontrollCheckboxes = {
                message: 'Du må krysse av for når kontrollerklæringen vil foreligge.'
            };
        } else {
            if (validationMessages?.ansvarsomraader?.[index]?.kontrollCheckboxes) { delete validationMessages.ansvarsomraader[index].kontrollCheckboxes } // Remove validation property
            if (isEmptyObject(validationMessages?.ansvarsomraader?.[index])) { delete validationMessages.ansvarsomraader[index]; } // Remove object if last validation property
        }
    }
    return validationMessages;
}

export const validateSamsvarKontrollCheckboxesForSingleAnsvarsomraade = index => (dispatch, getState) => {
    const formData = getState()?.selectedForm?.formData;
    let validationMessages = { ...getState()?.validationMessages };
    const ansvarsomraade = formData?.ansvarsomraader?.[index];
    validationMessages = getValidationMessagesForSamsvarKontrollCheckboxes(ansvarsomraade, index, validationMessages);
    const hasAnsvarsomraaderErrors = validationMessages.ansvarsomraader && Object.keys(validationMessages.ansvarsomraader).length;
    if (hasAnsvarsomraaderErrors) {
        dispatch(addValidationMessage('ansvarsomraader', validationMessages.ansvarsomraader));
    } else {
        dispatch(removeValidationMessage('ansvarsomraader'));
    }
}

export const validateSamsvarKontrollCheckboxesForAllAnsvarsomraader = () => (dispatch, getState) => {
    const formData = getState()?.selectedForm?.formData;
    let validationMessages = { ...getState()?.validationMessages };
    formData?.ansvarsomraader.forEach((ansvarsomraade, index) => {
        validationMessages = getValidationMessagesForSamsvarKontrollCheckboxes(ansvarsomraade, index, validationMessages);
    });
    const hasAnsvarsomraaderErrors = validationMessages.ansvarsomraader && Object.keys(validationMessages.ansvarsomraader).length;
    if (hasAnsvarsomraaderErrors) {
        dispatch(addValidationMessage('ansvarsomraader', validationMessages.ansvarsomraader));
    } else {
        dispatch(removeValidationMessage('ansvarsomraader'));
    }
}


export const validateAnsvarligForetakKontaktpersonNavn = () => (dispatch, getState) => {
    const kontaktpersonNavn = getState()?.selectedForm?.formData?.ansvarligForetak?.kontaktpersonNavn;

    const hasKontaktpersonNavn = kontaktpersonNavn?.length > 0;
    const kontaktpersonNavnIsTooLong = kontaktpersonNavn?.length > 100;

    if (!hasKontaktpersonNavn) {
        dispatch(addValidationMessage('ansvarligForetakKontaktpersonNavn', {
            message: 'Du må fylle ut navnet til kontaktpersonen.'
        }));
    } else if (kontaktpersonNavnIsTooLong) {
        dispatch(addValidationMessage('ansvarligForetakKontaktpersonNavn', {
            message: 'Navnet kan ikke være lenger enn 100 tegn.'
        }));
    }
    else {
        dispatch(removeValidationMessage('ansvarligForetakKontaktpersonNavn'));
    }
}

export const validateAnsvarligForetakKontaktpersonEpost = () => (dispatch, getState) => {
    const kontaktpersonEpost = getState()?.selectedForm?.formData?.ansvarligForetak?.kontaktpersonEpost;

    const hasKontaktpersonEpost = kontaktpersonEpost?.length > 0;
    const kontaktpersonEpostIsTooLong = kontaktpersonEpost?.length > 150;
    const emailAddresFormatRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const kontaktpersonEpostIsCorrectlyFormatted = kontaktpersonEpost?.length && emailAddresFormatRegex.test(String(kontaktpersonEpost).toLowerCase());

    if (!hasKontaktpersonEpost) {
        dispatch(addValidationMessage('ansvarligForetakKontaktpersonEpost', {
            message: 'Du må fylle ut e-postadressen til kontaktpersonen.'
        }));
    } else if (kontaktpersonEpostIsTooLong) {
        dispatch(addValidationMessage('ansvarligForetakKontaktpersonEpost', {
            message: 'E-postadressen kan ikke være lenger enn 150 tegn.'
        }));
    } else if (!kontaktpersonEpostIsCorrectlyFormatted) {
        dispatch(addValidationMessage('ansvarligForetakKontaktpersonEpost', {
            message: 'Har du skrevet riktig e-postadresse? Gyldig e-post skrives som navn@domene.no'
        }));
    }
    else {
        dispatch(removeValidationMessage('ansvarligForetakKontaktpersonEpost'));
    }
}

export const validateAnsvarligForetakKontaktpersonTelefonnummer = () => (dispatch, getState) => {
    const kontaktpersonTelefonnummer = getState()?.selectedForm?.formData?.ansvarligForetak?.kontaktpersonTelefonnummer;
    const kontaktpersonMobilnummer = getState()?.selectedForm?.formData?.ansvarligForetak?.kontaktpersonMobilnummer;

    const hasKontaktpersonTelefonnummer = kontaktpersonTelefonnummer?.length > 0;
    const hasKontaktpersonMobilnummer = kontaktpersonMobilnummer?.length > 0;

    const kontaktpersonTelefonnummerIsTooLong = kontaktpersonTelefonnummer?.replace(/\s+/g, '').length > 20;
    const kontaktpersonMobilnummerIsTooLong = kontaktpersonMobilnummer?.replace(/\s+/g, '').length > 20;

    const numberFormatRegex = /^(?=.*[0-9])[- +()0-9]+$/;
    const kontaktpersonTelefonnummerIsCorrectlyFormatted = numberFormatRegex.test(String(kontaktpersonTelefonnummer).toLowerCase()) || !kontaktpersonTelefonnummer;
    const kontaktpersonMobilnummerIsCorrectlyFormatted = numberFormatRegex.test(String(kontaktpersonMobilnummer).toLowerCase()) || !kontaktpersonMobilnummer;

    const kontaktpersonTelefonnummerIsValid = (hasKontaktpersonMobilnummer || hasKontaktpersonTelefonnummer) && !kontaktpersonTelefonnummerIsTooLong && kontaktpersonTelefonnummerIsCorrectlyFormatted;
    const kontaktpersonMobilnummerIsValid = (hasKontaktpersonMobilnummer || hasKontaktpersonTelefonnummer) && !kontaktpersonMobilnummerIsTooLong && kontaktpersonMobilnummerIsCorrectlyFormatted;

    if (!hasKontaktpersonTelefonnummer && !hasKontaktpersonMobilnummer) {
        dispatch(addValidationMessage('ansvarligForetakKontaktpersonTelefonnummer', {
            message: 'Du må fylle ut telefonnummeret eller mobilnummeret til kontaktpersonen.'
        }));
        dispatch(addValidationMessage('ansvarligForetakKontaktpersonMobilnummer', {
            message: 'Du må fylle ut telefonnummeret eller mobilnummeret til kontaktpersonen.'
        }));
    }

    if (kontaktpersonTelefonnummerIsTooLong) {
        dispatch(addValidationMessage('ansvarligForetakKontaktpersonTelefonnummer', {
            message: 'Telefonnummeret kan ikke være lenger enn 20 tegn.'
        }));
    }
    if (kontaktpersonMobilnummerIsTooLong) {
        dispatch(addValidationMessage('ansvarligForetakKontaktpersonMobilnummer', {
            message: 'Telefonnummeret kan ikke være lenger enn 20 tegn.'
        }));
    }

    if (!kontaktpersonTelefonnummerIsCorrectlyFormatted) {
        dispatch(addValidationMessage('ansvarligForetakKontaktpersonTelefonnummer', {
            message: 'Har du skrevet riktig telefonnummer? Gyldig telefonnummer består av tall og +.'
        }));
    }
    if (!kontaktpersonMobilnummerIsCorrectlyFormatted) {
        dispatch(addValidationMessage('ansvarligForetakKontaktpersonMobilnummer', {
            message: 'Har du skrevet riktig telefonnummer? Gyldig telefonnummer består av tall og +.'
        }));
    }

    if (kontaktpersonTelefonnummerIsValid) {
        dispatch(removeValidationMessage('ansvarligForetakKontaktpersonTelefonnummer'));
    }
    if (kontaktpersonMobilnummerIsValid) {
        dispatch(removeValidationMessage('ansvarligForetakKontaktpersonMobilnummer'));
    }
}


