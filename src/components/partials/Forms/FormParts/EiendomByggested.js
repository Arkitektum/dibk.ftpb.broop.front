// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Helpers
import { formatAddress } from 'helpers/formatHelpers';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class EiendomByggested extends Component {
    renderEiendomByggestedList(eiendomByggestedList) {
        return eiendomByggestedList.map((eiendomByggestedListItem, index) => {
            return (
                <div key={index}>
                    <dl className={formsStyle.fieldList}>
                        <div className={formsStyle.flex25}>
                            <dt>Gårdsnr.</dt><dd>{eiendomByggestedListItem.eiendomsidentifikasjon?.gaardsnummer}</dd>
                        </div>
                        <div className={formsStyle.flex25}>
                            <dt>Bruksnr.</dt><dd>{eiendomByggestedListItem.eiendomsidentifikasjon?.bruksnummer}</dd>
                        </div>
                        <div className={formsStyle.flex25}>
                            <dt>Festenr.</dt><dd>{eiendomByggestedListItem.eiendomsidentifikasjon?.festenummer}</dd>
                        </div>
                        <div className={formsStyle.flex25}>
                            <dt>Seksjonsnr.</dt><dd>{eiendomByggestedListItem.eiendomsidentifikasjon?.seksjonsnummer}</dd>
                        </div>

                        <div className={formsStyle.flex50}>
                            <dt>Bygningsnr.</dt><dd>{eiendomByggestedListItem.bygningsnummer}</dd>
                        </div>
                        <div className={formsStyle.flex50}>
                            <dt>Bolignr.</dt><dd>{eiendomByggestedListItem.bolignummer}</dd>
                        </div>

                        <div className={formsStyle.flex100}>
                            <dt>Kommunenummer.</dt><dd>{eiendomByggestedListItem.eiendomsidentifikasjon?.kommunenummer}</dd>
                        </div>
                        <div className={formsStyle.flex100}>
                            <dt>Adresse</dt><dd>{formatAddress(eiendomByggestedListItem.adresse)}</dd>
                        </div>
                    </dl>
                </div>
            )
        })
    }

    render() {
        return this.props.eiendomByggested?.length
            ? this.props.eiendomByggested.map((eiendomByggestedListItem, index) => {
                return (
                    <div key={index}>
                        <dl className={formsStyle.fieldList}>
                            <div className={formsStyle.flex25}>
                                <dt>Gårdsnr.</dt><dd>{eiendomByggestedListItem.eiendomsidentifikasjon?.gaardsnummer}</dd>
                            </div>
                            <div className={formsStyle.flex25}>
                                <dt>Bruksnr.</dt><dd>{eiendomByggestedListItem.eiendomsidentifikasjon?.bruksnummer}</dd>
                            </div>
                            <div className={formsStyle.flex25}>
                                <dt>Festenr.</dt><dd>{eiendomByggestedListItem.eiendomsidentifikasjon?.festenummer}</dd>
                            </div>
                            <div className={formsStyle.flex25}>
                                <dt>Seksjonsnr.</dt><dd>{eiendomByggestedListItem.eiendomsidentifikasjon?.seksjonsnummer}</dd>
                            </div>

                            <div className={formsStyle.flex50}>
                                <dt>Bygningsnr.</dt><dd>{eiendomByggestedListItem.bygningsnummer}</dd>
                            </div>
                            <div className={formsStyle.flex50}>
                                <dt>Bolignr.</dt><dd>{eiendomByggestedListItem.bolignummer}</dd>
                            </div>

                            <div className={formsStyle.flex100}>
                                <dt>Kommunenummer.</dt><dd>{eiendomByggestedListItem.eiendomsidentifikasjon?.kommunenummer}</dd>
                            </div>
                            <div className={formsStyle.flex100}>
                                <dt>Adresse</dt><dd>{formatAddress(eiendomByggestedListItem.adresse)}</dd>
                            </div>
                        </dl>
                    </div>
                )
            })
            : (
                <p>Ingen data for Eiendom/Byggested</p>
            )
    }
}

EiendomByggested.propTypes = {
    eiendomByggested: PropTypes.array.isRequired
};

export default connect(null, null)(EiendomByggested);
