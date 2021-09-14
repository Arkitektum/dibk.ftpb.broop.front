// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';


class ContactInfo extends Component {

    getPhoneNumber(form) {
        const ansvarligSoeker = form?.formData?.ansvarligSoeker;
        if (ansvarligSoeker?.kontaktperson?.mobilnummer) {
            return ansvarligSoeker?.kontaktperson?.mobilnummer
        } else if (ansvarligSoeker?.kontaktperson?.telefonnummer) {
            return ansvarligSoeker?.kontaktperson?.telefonnummer;
        } else if (ansvarligSoeker?.mobilnummer) {
            return ansvarligSoeker?.mobilnummer;
        } else if (ansvarligSoeker?.telefonnummer) {
            return ansvarligSoeker?.telefonnummer;
        } else {
            return null;
        }
    }

    getEmailAddress(form) {
        const ansvarligSoeker = form?.formData?.ansvarligSoeker;
        return ansvarligSoeker.epost || ansvarligSoeker.kontaktperson.epost;
    }

    render() {
        const form = this.props.selectedForm
        const name = form?.formData?.ansvarligSoeker?.navn;
        const phoneNumber = this.getPhoneNumber(form);
        const emailAddress = this.getEmailAddress(form);

        let contactString = `Hvis du har spørsmål til erklæringen, kan du ta kontakt med ${name}`;

        if (phoneNumber && emailAddress) {
            contactString += ` på telefon ${phoneNumber} eller e-post ${emailAddress}`;
        } else if (phoneNumber) {
            contactString += ` på telefon ${phoneNumber}`;
        } else if (emailAddress) {
            contactString += ` på e-post ${emailAddress}`;
        }

        contactString += '.';

        return form ? <p>{contactString}</p> : '';
    }
}

const mapStateToProps = state => ({
    selectedForm: state.selectedForm
});

export default connect(mapStateToProps, null)(ContactInfo);
