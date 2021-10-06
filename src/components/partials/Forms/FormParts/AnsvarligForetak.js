// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// DIBK Design
import { Header, InputField, Label } from 'dibk-design';

// Helpers
import { formatAddress } from 'helpers/formatHelpers';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class AnsvarligForetak extends Component {

    handleUpdate(value, property) {
        let updatedForetak = this.props.foretak;
        updatedForetak[property] = value;
        return this.props.updateHandler(updatedForetak);
    }

    handleSave() {
        this.props.saveHandler();
    }

    handleUpdateAndSaveIfChanged(newValue, property) {
        const oldValue = this.props.foretak[property];
        this.handleUpdate(newValue, property);
        if (newValue !== oldValue) {
            this.handleSave()
        }
    }



    render() {
        const foretak = this.props.foretak;
        const adresse = formatAddress(this.props.foretak);
        const telefonNummerList = [foretak.telefonnummer, foretak.mobilnummer].filter(nummer => { return nummer?.length });
        return foretak && Object.keys(foretak).length
            ? (
                <React.Fragment>
                    <dl className={formsStyle.fieldList}>
                        <div className={formsStyle.flex66}>
                            <dt><Label>Navn</Label></dt><dd>{foretak.navn}</dd>
                        </div>
                        <div className={formsStyle.flex33}>
                            <dt><Label>Organisasjonsnummer</Label></dt><dd>{foretak.organisasjonsnummer}</dd>
                        </div>
                        {
                            adresse?.length
                                ? (
                                    <div className={formsStyle.flex33}>
                                        <dt><Label>Adresse</Label></dt><dd>{adresse}</dd>
                                    </div>
                                )
                                : ''
                        }
                        {
                            telefonNummerList.length
                                ? (
                                    <div className={formsStyle.flex33}>
                                        <dt><Label>Telefon</Label></dt>
                                        <dd>
                                            <ul className={formsStyle.cleanList}>
                                                {
                                                    telefonNummerList.map((nummer, index) => {
                                                        return <li key={index}>{nummer}</li>
                                                    })
                                                }
                                            </ul>
                                        </dd>
                                    </div>
                                )
                                : ''
                        }
                        {
                            foretak.epost?.length
                                ? (
                                    <div className={formsStyle.flex33}>
                                        <dt><Label>E-post</Label></dt><dd>{foretak.epost}</dd>
                                    </div>
                                )
                                : ''
                        }
                    </dl>
                    <p>
                        Opplysningene er lagt inn av ansvarlig søker. Kontakt dem hvis du oppdager feil.
                    </p>
                    <Label>
                        <b>
                            Har foretaket sentral godkjenning?
                        </b>
                    </Label>
                    {foretak.harSentralGodkjenning ? 'Ja' : 'Nei'}
                    <p>
                        Svaret er hentet fra register for sentral godkjenning eller lagt inn av ansvarlig søker.
                    </p>
                    <Header size={3} content="Kontaktperson" />
                    <div className="print-flex-10">
                        <InputField
                            id='foretak-kontaktperson-navn'
                            onBlur={(event) => { this.handleUpdateAndSaveIfChanged(event.target.value, 'kontaktpersonNavn') }}
                            label="Kontaktperson"
                            defaultValue={foretak.kontaktpersonNavn || ''} />
                    </div>
                    <div className="print-flex-10">
                        <InputField
                            id='foretak-kontaktperson-telefonnummer'
                            onBlur={(event) => { this.handleUpdateAndSaveIfChanged(event.target.value, 'kontaktpersonTelefonnummer') }}
                            label='Telefon'
                            defaultValue={foretak.kontaktpersonTelefonnummer || ''}
                            type='tel' />
                    </div>
                    <div className="print-flex-10">
                        <InputField
                            id='foretak-kontaktperson-mobilnummer'
                            onBlur={(event) => { this.handleUpdateAndSaveIfChanged(event.target.value, 'kontaktpersonMobilnummer') }}
                            label='Mobiltelefon'
                            defaultValue={foretak.kontaktpersonMobilnummer || ''}
                            type='tel' />
                    </div>
                    <div className="print-flex-10">
                        <InputField
                            id='foretak-kontaktperson-epost'
                            onBlur={(event) => { this.handleUpdateAndSaveIfChanged(event.target.value, 'kontaktpersonEpost') }}
                            label="E-post"
                            defaultValue={foretak.kontaktpersonEpost || ''}
                            type='email' />
                    </div>
                    <p>
                        Opplysningene er lagt inn av ansvarlig søker. Du kan endre navn, telefon og e-post til kontaktpersonen.
                    </p>

                </React.Fragment>
            )
            : (
                <p>Ingen data for foretak</p>
            )
    }
}

AnsvarligForetak.propTypes = {
    foretak: PropTypes.object.isRequired,
    updateHandler: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired
};

export default connect(null, null)(AnsvarligForetak);
