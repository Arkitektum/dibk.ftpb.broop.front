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
