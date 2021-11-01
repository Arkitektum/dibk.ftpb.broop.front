import { ADD_VALIDATION_MESSAGE, REMOVE_VALIDATION_MESSAGE, UPDATE_IS_VALIDATED } from 'constants/types';

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

    const isValid = !hasMissingDekkesOmradetAvSentralGodkjenning;

    dispatch(updateIsValidated(true));

    if (!isValid) {
        dispatch(addValidationMessage('dekkesOmradetAvSentralGodkjenning', 'Du må svare på om foretaket har sentral godkjenning for ansvarsområdet.'));
    } else {
        dispatch(removeValidationMessage('dekkesOmradetAvSentralGodkjenning'));
    }
}

export const validateSamsvarKontrollCheckboxes = () => (dispatch, getState) => {
    const formData = getState()?.selectedForm?.formData;

    const hasMissingvalidateSamsvarCheckboxes = formData?.ansvarsomraader.some(ansvarsomraade => {
        const isChecked = [
            ansvarsomraade.samsvarKontrollVedRammetillatelse && ansvarsomraade.funksjonKode !== "UTF",
            ansvarsomraade.samsvarKontrollVedIgangsettingstillatelse && ansvarsomraade.funksjonKode !== "UTF",
            ansvarsomraade.samsvarKontrollVedMidlertidigBrukstillatelse,
            ansvarsomraade.samsvarKontrollVedFerdigattest
        ].some(condition => condition);
        return !isChecked && (ansvarsomraade.funksjonKode === 'PRO' || ansvarsomraade.funksjonKode === 'UTF');
    });

    const hasMissingvalidateKontrollCheckboxes = formData?.ansvarsomraader.some(ansvarsomraade => {
        const isChecked = [
            ansvarsomraade.samsvarKontrollVedRammetillatelse,
            ansvarsomraade.samsvarKontrollVedIgangsettingstillatelse,
            ansvarsomraade.samsvarKontrollVedMidlertidigBrukstillatelse,
            ansvarsomraade.samsvarKontrollVedFerdigattest
        ].some(condition => condition);
        return !isChecked && ansvarsomraade.funksjonKode === 'KONTROLL';
    });

    dispatch(updateIsValidated(true));

    if (hasMissingvalidateSamsvarCheckboxes) {
        dispatch(addValidationMessage('samsvarCheckboxes', 'Du må krysse av for når samsvarserklæringen vil foreligge.'));
    } else {
        dispatch(removeValidationMessage('samsvarCheckboxes'));
    }

    if (hasMissingvalidateKontrollCheckboxes) {
        dispatch(addValidationMessage('kontrollCheckboxes', 'Du må krysse av for når kontrollerklæringen vil foreligge.'));
    } else {
        dispatch(removeValidationMessage('kontrollCheckboxes'));
    }
}


export const validateAnsvarligForetakKontaktpersonNavn = () => (dispatch, getState) => {
    const kontaktpersonNavn = getState()?.selectedForm?.formData?.ansvarligForetak?.kontaktpersonNavn;

    const hasKontaktpersonNavn = kontaktpersonNavn?.length > 0;
    const kontaktpersonNavnIsTooLong = kontaktpersonNavn?.length > 100;

    if (!hasKontaktpersonNavn) {
        dispatch(addValidationMessage('ansvarligForetakKontaktpersonNavn', 'Du må fylle ut navnet til kontaktpersonen.'));
    } else if (kontaktpersonNavnIsTooLong) {
        dispatch(addValidationMessage('ansvarligForetakKontaktpersonNavn', 'Navnet kan ikke være lenger enn 100 tegn.'));
    }
    else {
        dispatch(removeValidationMessage('ansvarligForetakKontaktpersonNavn'));
    }
}

export const validateAnsvarligForetakKontaktpersonEpost = () => (dispatch, getState) => {
    const kontaktpersonEpost = getState()?.selectedForm?.formData?.ansvarligForetak?.kontaktpersonEpost;

    const hasKontaktpersonEpost = kontaktpersonEpost?.length > 0;
    const kontaktpersonEpostIsTooLong = kontaktpersonEpost?.length > 150;
    const validEmailAddresRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const kontaktpersonEpostIsValid = kontaktpersonEpost?.length && validEmailAddresRegex.test(String(kontaktpersonEpost).toLowerCase());

    if (!hasKontaktpersonEpost) {
        dispatch(addValidationMessage('ansvarligForetakKontaktpersonEpost', 'Du må fylle ut e-postadressen til kontaktpersonen.'));
    } else if (kontaktpersonEpostIsTooLong) {
        dispatch(addValidationMessage('ansvarligForetakKontaktpersonEpost', 'E-postadressen kan ikke være lenger enn 150 tegn.'));
    } else if (!kontaktpersonEpostIsValid) {
        dispatch(addValidationMessage('ansvarligForetakKontaktpersonEpost', 'Har du skrevet riktig e-postadresse? Gyldig e-post skrives som navn@domene.no'));
    }
    else {
        dispatch(removeValidationMessage('ansvarligForetakKontaktpersonEpost'));
    }
}

