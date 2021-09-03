// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// DIBK Design
import { InputField } from 'dibk-design';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class Foretak extends Component {

    handleUpdate(value, property, index) {
        let updatedAnsvarsomraader = this.props.ansvarsomraader;
        updatedAnsvarsomraader[index][property] = value;
        return this.props.updateHandler(updatedAnsvarsomraader);
    }

    handleSave() {
        this.props.saveHandler();
    }

    handleKontaktpersonUpdate(value, property) {
        let updatedForetak = this.props.foretak;
        updatedForetak.kontaktperson[property] = value;
        return this.props.updateHandler(updatedForetak);
    }



    render() {
        const foretak = this.props.foretak;
        return foretak && Object.keys(foretak).length
            ? (
                <React.Fragment>
                    <dl className={formsStyle.fieldList}>
                        <div className={formsStyle.flex66}>
                            <dt>Navn</dt><dd>{foretak.navn}</dd>
                        </div>
                        <div className={formsStyle.flex33}>
                            <dt>Organisasjonsnummer</dt><dd>{foretak.organisasjonsnummer}</dd>
                        </div>
                        <div className={formsStyle.flex33}>
                            <dt>Adresse</dt><dd>{foretak.adresse?.adresselinje1}</dd>
                        </div>
                        <div className={formsStyle.flex33}>
                            <dt>Postnr.</dt><dd>{foretak.adresse?.postnr}</dd>
                        </div>
                        <div className={formsStyle.flex33}>
                            <dt>Poststed</dt><dd>{foretak.adresse?.poststed}</dd>
                        </div>
                    </dl>
                    <div className={formsStyle.inputGroup}>
                        <div className={formsStyle.flex33}>
                            <InputField
                                id='foretak-kontaktperson-navn'
                                onChange={(event) => { this.handleKontaktpersonUpdate(event.target.value, 'navn') }}
                                onBlur={() => { this.handleSave() }}
                                label="Kontaktperson"
                                value={foretak.kontaktperson?.navn || ''} />
                        </div>
                        <div className={formsStyle.flex33}>
                            <InputField
                                id='foretak-kontaktperson-mobilnummer'
                                onChange={(event) => { this.handleKontaktpersonUpdate(event.target.value, 'mobilnummer') }}
                                onBlur={() => { this.handleSave() }}
                                label='Mobiltelefon'
                                value={foretak.kontaktperson?.mobilnummer || ''}
                                type='tel' />
                        </div>
                        <div className={formsStyle.flex33}>
                            <InputField
                                id='foretak-kontaktperson-epost'
                                onChange={(event) => { this.handleKontaktpersonUpdate(event.target.value, 'epost') }}
                                onBlur={() => { this.handleSave() }}
                                label="E-post"
                                value={foretak.kontaktperson?.epost || ''}
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

Foretak.propTypes = {
    foretak: PropTypes.object.isRequired,
    updateHandler: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired
};

export default connect(null, null)(Foretak);
