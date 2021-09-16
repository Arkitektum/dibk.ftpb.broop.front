// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// DIBK Design
import { Label } from 'dibk-design';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class AnsvarligSoeker extends Component {
    render() {
        const ansvarligSoeker = this.props.ansvarligSoeker;
        return ansvarligSoeker && Object.keys(ansvarligSoeker).length
            ? (
                <dl className={formsStyle.fieldList}>
                    <div className={formsStyle.flex50}>
                        <dt><Label>Organisasjonsnummer</Label></dt><dd>{ansvarligSoeker.organisasjonsnummer}</dd>
                    </div>
                    <div className={formsStyle.flex50}>
                        <dt><Label>Navn på foretak</Label></dt><dd>{ansvarligSoeker.navn}</dd>
                    </div>
                    <div className={formsStyle.flex100}>
                        <dt><Label>Kontaktperson</Label></dt><dd>{ansvarligSoeker.kontaktperson?.navn}</dd>
                    </div>
                    <div className={formsStyle.flex50}>
                        <dt><Label>Telefon</Label></dt><dd>{ansvarligSoeker.kontaktperson?.telefonnummer}</dd>
                    </div>
                    <div className={formsStyle.flex50}>
                        <dt><Label>Mobiltelefon</Label></dt><dd>{ansvarligSoeker.kontaktperson?.mobilnummer}</dd>
                    </div>
                    <div className={formsStyle.flex100}>
                        <dt><Label>E-post</Label></dt><dd>{ansvarligSoeker.kontaktperson?.epost}</dd>
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
