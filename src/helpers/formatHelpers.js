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

const monthNames = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];

export const formatDate = timestamp => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    return `${day}. ${month} ${year}`;
}