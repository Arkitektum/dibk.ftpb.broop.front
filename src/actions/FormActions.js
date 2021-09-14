// Types
import { FETCH_SELECTED_FORM, UPDATE_SELECTED_FORM, SAVE_SELECTED_FORM } from 'constants/types';

// Helpers
import { getEnvironmentVariable } from 'helpers/environmentVariableHelpers.js';

const getKommunenavnAsync = form => {
    return new Promise((resolve, reject) => {
        if (form?.formData?.eiendomByggested?.[0]?.kommunenavn) {
            resolve(form.formData.eiendomByggested[0].kommunenavn);
        } else if (form?.formData?.eiendomByggested?.[0]?.eiendomsidentifikasjon?.kommunenummer) {
            const kommunenummer = form.formData.eiendomByggested[0].eiendomsidentifikasjon.kommunenummer
            const apiUrl = `https://test-admbygg.dibk.no/api/municipalities/${kommunenummer}`;
            return fetch(apiUrl).then(res => res.json()).then(municipality => {
                resolve(municipality.Name);
            });
        } else {
            reject('Finner ikke kommunenavn');
        }
    })
}


export const fetchSelectedForm = submission => dispatch => {
    const internalApiUrl = getEnvironmentVariable('internalApiUrl');
    const formType = submission?.innsendingsType?.toLowerCase();
    const formPath = submission._links?.[formType]?.href;
    return fetch(`${internalApiUrl}${formPath}`).then(res => res.json()).then(form => {
        getKommunenavnAsync(form).then(kommunenavn => {
            form.formData.eiendomByggested[0].kommunenavn = kommunenavn;
            return dispatch({ type: FETCH_SELECTED_FORM, payload: form })
        })
        
    });
}

export const updateSelectedForm = form => dispatch => {
    return new Promise(resolve => {
        dispatch({ type: UPDATE_SELECTED_FORM, payload: form });
        resolve(form);
    })

}

export const saveSelectedForm = form => dispatch => {
    const internalApiUrl = getEnvironmentVariable('internalApiUrl');
    const formPath = form._links?.self?.href;
    const fetchOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    };
    return fetch(`${internalApiUrl}${formPath}`, fetchOptions).then(res => res.json()).then(form => {
        return dispatch({ type: SAVE_SELECTED_FORM, payload: form })
    });
}
