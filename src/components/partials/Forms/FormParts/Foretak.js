// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class Foretak extends Component {
    render() {
        const foretak = this.props.foretak;
        return foretak && Object.keys(foretak).length
            ? (
                <React.Fragment>
                    <dl className={formsStyle.fieldList}>
                        <div className={formsStyle.flex33}>
                            <dt>Organisasjonsnummer</dt><dd>{foretak.organisasjonsnummer}</dd>
                        </div>
                        <div className={formsStyle.flex66}>
                            <dt>Navn</dt><dd>{foretak.navn}</dd>
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
                        <div className={formsStyle.flex33}>
                            <dt>Kontaktperson</dt><dd>{foretak.kontaktperson?.navn}</dd>
                        </div>
                        <div className={formsStyle.flex33}>
                            <dt>Mobiltelefon</dt><dd>{foretak.kontaktperson?.mobilnummer}</dd>
                        </div>
                        <div className={formsStyle.flex33}>
                            <dt>Epost</dt><dd>{foretak.kontaktperson?.epost}</dd>
                        </div>
                    </dl>
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
    foretak: PropTypes.object.isRequired
};

export default connect(null, null)(Foretak);
