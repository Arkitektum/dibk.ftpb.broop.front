import { FETCH_CODELIST_FUNSKJON, FETCH_CODELIST_TILTAKSKLASSE } from 'constants/types';

export const fetchCodelistFunksjon = (guid) => dispatch => {
    const apiUrl = 'https://register.dev.geonorge.no/api/kodelister/byggesoknad/funksjon.json?'
    return fetch(apiUrl).then(res => res.json()).then(codelist => {
        return dispatch({ type: FETCH_CODELIST_FUNSKJON, payload: codelist })
    });
}
