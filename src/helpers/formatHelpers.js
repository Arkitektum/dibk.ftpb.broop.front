export const formatAddress = (address) => {
    let formattedAddress = '';
    if (address.adresselinje1) {
        formattedAddress += address.adresselinje1;
        if (address.postnr || address.poststed) {
            formattedAddress += ', ';
        }
    }
    if (address.postnr) {
        formattedAddress += address.postnr;
        if (address.poststed) {
            formattedAddress += ' '
        }
    }
    if (address.poststed) {
        formattedAddress += address.poststed
    }

    return formattedAddress;
}
