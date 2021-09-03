// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// DIBK Design
import { Accordion } from 'dibk-design';

// Helpers
import { formatAddress } from 'helpers/formatHelpers';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class EiendomByggested extends Component {

    renderEiendomByggestedItem(eiendomByggestedItem) {
        const isPrint = localStorage.print === "true";
        return (
            <div key={0} className="flex">
                {
                    isPrint
                        ? (
                            <div className="aside-on-print-header">
                                Eiendom/Byggested
                            </div>
                        )
                        : ''
                }
                    <dt>Gårdsnr.</dt><dd>{eiendomByggestedItem.eiendomsidentifikasjon?.gaardsnummer}</dd>
                </div>
                <div className={formsStyle.flex25}>
                    <dt>Bruksnr.</dt><dd>{eiendomByggestedItem.eiendomsidentifikasjon?.bruksnummer}</dd>
                </div>
                <div className={formsStyle.flex25}>
                    <dt>Festenr.</dt><dd>{eiendomByggestedItem.eiendomsidentifikasjon?.festenummer}</dd>
                </div>
                <div className={formsStyle.flex25}>
                    <dt>Seksjonsnr.</dt><dd>{eiendomByggestedItem.eiendomsidentifikasjon?.seksjonsnummer}</dd>
                </div>

                <div className={formsStyle.flex50}>
                    <dt>Bygningsnr.</dt><dd>{eiendomByggestedItem.bygningsnummer}</dd>
                </div>
                <div className={formsStyle.flex50}>
                    <dt>Bolignr.</dt><dd>{eiendomByggestedItem.bolignummer}</dd>
                </div>

                <div className={formsStyle.flex100}>
                    <dt>Kommunenummer.</dt><dd>{eiendomByggestedItem.eiendomsidentifikasjon?.kommunenummer}</dd>
                </div>
                <div className={formsStyle.flex100}>
                    <dt>Adresse</dt><dd>{formatAddress(eiendomByggestedItem.adresse)}</dd>
                </div>
            </dl>
        )
    }

    renderEiendomByggestedListItem(eiendomByggestedItem, index) {
        const adresse = formatAddress(eiendomByggestedItem.adresse);
        const gaardsnummer = eiendomByggestedItem.eiendomsidentifikasjon?.gaardsnummer;
        const bruksnummer = eiendomByggestedItem.eiendomsidentifikasjon?.bruksnummer;
        const title = `${adresse} - ${gaardsnummer}/${bruksnummer}`;
        return (
            <div key={index} className={formsStyle.accordionItem}>
                <Accordion title={title}>
                    {this.renderEiendomByggestedItem(eiendomByggestedItem)}
                </Accordion>
            </div>
        )
    }

    renderEiendomByggested() { }

    render() {
        return this.props.eiendomByggested?.length
            ? this.props.eiendomByggested.map((eiendomByggestedItem, index) => {
                return this.props.eiendomByggested.length === 1
                    ? this.renderEiendomByggestedItem(eiendomByggestedItem)
                    : this.renderEiendomByggestedListItem(eiendomByggestedItem, index);
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
