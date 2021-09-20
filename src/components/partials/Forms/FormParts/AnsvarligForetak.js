// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// DIBK Design
import { InputField, Label } from 'dibk-design';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class AnsvarligForetak extends Component {

    handleSave() {
        this.props.saveHandler();
    }

    handleUpdate(value, property) {
        let updatedForetak = this.props.foretak;
        updatedForetak[property] = value;
        return this.props.updateHandler(updatedForetak);
    }



    render() {
        const foretak = this.props.foretak;
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
                        <div className={formsStyle.flex33}>
                            <dt><Label>Adresse</Label></dt><dd>{foretak.adresselinje1}</dd>
                        </div>
                        <div className={formsStyle.flex33}>
                            <dt><Label>Postnr.</Label></dt><dd>{foretak.postnr}</dd>
                        </div>
                        <div className={formsStyle.flex33}>
                            <dt><Label>Poststed</Label></dt><dd>{foretak.poststed}</dd>
                        </div>
                    </dl>
                    <div className={formsStyle.inputGroup}>
                        <div className={formsStyle.flex33}>
                            <InputField
                                id='foretak-kontaktperson-navn'
                                onChange={(event) => { this.handleUpdate(event.target.value, 'kontaktpersonNavn') }}
                                onBlur={() => { this.handleSave() }}
                                label="Kontaktperson"
                                value={foretak.kontaktpersonNavn || ''} />
                        </div>
                        <div className={formsStyle.flex33}>
                            <InputField
                                id='foretak-kontaktperson-mobilnummer'
                                onChange={(event) => { this.handleUpdate(event.target.value, 'kontaktpersonMobilnummer') }}
                                onBlur={() => { this.handleSave() }}
                                label='Mobiltelefon'
                                value={foretak.kontaktpersonMobilnummer || ''}
                                type='tel' />
                        </div>
                        <div className={formsStyle.flex33}>
                            <InputField
                                id='foretak-kontaktperson-epost'
                                onChange={(event) => { this.handleUpdate(event.target.value, 'kontaktpersonEpost') }}
                                onBlur={() => { this.handleSave() }}
                                label="E-post"
                                value={foretak.kontaktpersonEpost || ''}
                                type='email' />
                        </div>
                    </div>
                    <p>
                        <b>
                            {
                                foretak.harSentralGodkjenning
                                    ? 'Foretaket har sentral godkjenning'
                                    : 'Foretaket har ikke sentral godkjenning'
                            }
                        </b>
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
