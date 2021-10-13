export const formatAddress = (address) => {
    let formattedAddress = '';
    if (address.adresselinje1) {
        formattedAddress += address.adresselinje1;
        if (address.postnr || address.poststed) {
            formattedAddress += ', ';
        }
    } else if (address.gaardsnummer || address.bruksnummer) {
        if (address.gaardsnummer) {
            formattedAddress += `Gårdsnr. ${address.gaardsnummer}, `
        }
        if (address.bruksnummer) {
            formattedAddress += `Bruksnr. ${address.bruksnummer}, `
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

export const formatProjectNameForForm = form => {
    let projectName = '';
    if (form?.formData?.prosjektnavn) {
      projectName += ` for ${form.formData.prosjektnavn}`;
    } else if (form?.formData?.eiendomByggesteder?.[0]?.adresselinje1) {
      projectName += ` for ${form.formData.eiendomByggesteder[0].adresselinje1}`;
    }
    if (form?.formData?.eiendomByggesteder?.[0]?.kommunenavn) {
      projectName += ` i ${form.formData.eiendomByggesteder[0].kommunenavn}`;
    }
    return projectName;
  }