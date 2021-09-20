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
                <dl className={formsStyle.fieldList}>
                    <div className="print-flex-10">
                        <dt>Gårdsnr.</dt><dd>{eiendomByggestedItem.gaardsnummer}</dd>
                    </div>
                    <div className="print-flex-10">
                        <dt>Bruksnr.</dt><dd>{eiendomByggestedItem.bruksnummer}</dd>
                    </div>
                    <div className="print-flex-10">
                        <dt>Festenr.</dt><dd>{eiendomByggestedItem.festenummer}</dd>
                    </div>
                    <div className="print-flex-10">
                        <dt>Seksjonsnr.</dt><dd>{eiendomByggestedItem.seksjonsnummer}</dd>
                    </div>
                    <div className="print-flex-10">
                        <dt>Bygningsnr.</dt><dd>{eiendomByggestedItem.bygningsnummer}</dd>
                    </div>
                    <div className="print-flex-10">
                        <dt>Bolignr.</dt><dd>{eiendomByggestedItem.bolignummer}</dd>
                    </div>
                    <div className="print-flex-10">
                        <dt>Kommunenr.</dt><dd>{eiendomByggestedItem.kommunenummer}</dd>
                    </div>
                    <div className="print-flex-100">
                        <dt>Adresse</dt><dd>{formatAddress(eiendomByggestedItem)}</dd>
                    </div>
                </dl>
            </div>
        )
    }

    renderEiendomByggestedListItem(eiendomByggested, index) {
        const adresse = formatAddress(eiendomByggested);
        const gaardsnummer = eiendomByggested?.gaardsnummer;
        const bruksnummer = eiendomByggested?.bruksnummer;
        const title = `${adresse} - ${gaardsnummer}/${bruksnummer}`;
        return (
            <div key={index} className={formsStyle.accordionItem}>
                <Accordion title={title}>
                    {this.renderEiendomByggestedItem(eiendomByggested)}
                </Accordion>
            </div>
        )
    }

    renderEiendomByggested() { }

    render() {
        return this.props.eiendomByggesteder?.length
            ? this.props.eiendomByggesteder.map((eiendomByggested, index) => {
                return this.renderEiendomByggestedListItem(eiendomByggested, index);
            })
            : (
                <p>Ingen data for Eiendom/Byggested</p>
            )
    }
}

EiendomByggested.propTypes = {
    eiendomByggesteder: PropTypes.array.isRequired
};

export default connect(null, null)(EiendomByggested);
