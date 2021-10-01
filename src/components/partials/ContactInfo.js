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
        return ansvarligSoeker?.epost || ansvarligSoeker?.kontaktperson?.epost;
    }

    render() {
        const form = this.props.selectedForm

        if (!form) {
            return
        }

        const name = form?.formData?.ansvarligSoeker?.navn;
        const phoneNumber = this.getPhoneNumber(form);
        const emailAddress = this.getEmailAddress(form);
        const emailAddressLinkElement = emailAddress ? <a href={`mailto:${emailAddress}`}>{emailAddress}</a> : '';

        let phoneOrEmailString;

        if (phoneNumber && emailAddress) {
            phoneOrEmailString = <React.Fragment> på telefon {phoneNumber} eller e-post {emailAddressLinkElement}</React.Fragment>;
        } else if (phoneNumber) {
            phoneOrEmailString = <React.Fragment> på telefon {phoneNumber}</React.Fragment>;
        } else if (emailAddress) {
            phoneOrEmailString = <React.Fragment> på e-post ${emailAddress}</React.Fragment>;
        }

        if (this.props.type === 'utgaatt') {
            return (<p>Ta kontakt med {name}{phoneOrEmailString} for å få erklæringen tilsendt på nytt.</p>);
        } else if (this.props.type === 'rediger') {
            return (<p>Hvis du oppdager feil eller har spørsmål til erklæringen, kan du ta kontakt med {name}{phoneOrEmailString}.</p>);
        } else {
            return (<p>Hvis du har spørsmål til erklæringen, kan du ta kontakt med {name}{phoneOrEmailString}.</p>);
        }
    }
}

const mapStateToProps = state => ({
    selectedForm: state.selectedForm
});

export default connect(mapStateToProps, null)(ContactInfo);
