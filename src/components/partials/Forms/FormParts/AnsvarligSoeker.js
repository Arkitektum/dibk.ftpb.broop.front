// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class AnsvarligSoeker extends Component {
    render() {
        const ansvarligSoeker = this.props.ansvarligSoeker;
        return ansvarligSoeker && Object.keys(ansvarligSoeker).length
            ? (
                <dl className={formsStyle.fieldList}>
                    <div className={formsStyle.flex50}>
                        <dt>Organisasjonsnummer</dt><dd>{ansvarligSoeker.organisasjonsnummer}</dd>
                    </div>
                    <div className={formsStyle.flex50}>
                        <dt>Navn på foretak</dt><dd>{ansvarligSoeker.navn}</dd>
                    </div>
                    <div className={formsStyle.flex100}>
                        <dt>Kontaktperson</dt><dd>{ansvarligSoeker.kontaktperson?.navn}</dd>
                    </div>
                    <div className={formsStyle.flex50}>
                        <dt>Telefon</dt><dd>{ansvarligSoeker.kontaktperson?.telefonnummer}</dd>
                    </div>
                    <div className={formsStyle.flex50}>
                        <dt>Mobiltelefon</dt><dd>{ansvarligSoeker.kontaktperson?.mobilnummer}</dd>
                    </div>
                    <div className={formsStyle.flex100}>
                        <dt>E-post</dt><dd>{ansvarligSoeker.kontaktperson?.epost}</dd>
                    </div>
                </dl>
            )
            : (
                <p>Ingen data om ansvarlig søker</p>
            )
    }
}

AnsvarligSoeker.propTypes = {
    ansvarligSoeker: PropTypes.object.isRequired
};

export default connect(null, null)(AnsvarligSoeker);
