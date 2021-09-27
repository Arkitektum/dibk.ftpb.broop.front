// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// DIBK Design
import { Accordion, Label } from 'dibk-design';

// Helpers
import { formatAddress } from 'helpers/formatHelpers';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class EiendomByggested extends Component {

    getMunicipalityField(eiendomByggested) {
        let municipalityField;
        if (eiendomByggested.kommunenavn) {
            municipalityField = {
                label: 'Kommune',
                value: eiendomByggested.kommunenummer ? `${eiendomByggested.kommunenavn} (${eiendomByggested.kommunenummer})` : `${eiendomByggested.kommunenavn}`
            }
        } else if (eiendomByggested.kommunenummer) {
            municipalityField = {
                label: 'Kommunenummer',
                value: eiendomByggested.kommunenummer
            }
        }
        return municipalityField;
    }

    renderEiendomByggestedItem(eiendomByggested) {
        const isPrint = localStorage.print === "true";
        const municipalityField = this.getMunicipalityField(eiendomByggested);
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
                    {
                        municipalityField
                            ? (
                                <div className="print-flex-10">
                                    <dt><Label>{municipalityField.label}</Label></dt><dd>{municipalityField.value}</dd>
                                </div>
                            )
                            : ''
                    }

                    <div className="print-flex-10">
                        <dt><Label>Gårdsnr.</Label></dt><dd>{eiendomByggested.gaardsnummer}</dd>
                    </div>
                    <div className="print-flex-10">
                        <dt><Label>Bruksnr.</Label></dt><dd>{eiendomByggested.bruksnummer}</dd>
                    </div>
                    {
                        eiendomByggested.festenummer
                            ? (
                                <div className="print-flex-10">
                                    <dt><Label>Festenr.</Label></dt><dd>{eiendomByggested.festenummer}</dd>
                                </div>
                            )
                            : ''
                    }
                    {
                        eiendomByggested.seksjonsnummer
                            ? (
                                <div className="print-flex-10">
                                    <dt><Label>Seksjonsnr.</Label></dt><dd>{eiendomByggested.seksjonsnummer}</dd>
                                </div>
                            )
                            : ''
                    }
                    {
                        eiendomByggested.bygningsnummer
                            ? (
                                <div className="print-flex-10">
                                    <dt><Label>Bygningsnr.</Label></dt><dd>{eiendomByggested.bygningsnummer}</dd>
                                </div>
                            )
                            : ''
                    }
                    {
                        eiendomByggested.bolignummer
                            ? (
                                <div className="print-flex-10">
                                    <dt><Label>Bolignr.</Label></dt><dd>{eiendomByggested.bolignummer}</dd>
                                </div>
                            )
                            : ''
                    }
                </dl>
            </div>
        )
    }

    renderEiendomByggestedListItem(eiendomByggested, index) {
        const adresse = formatAddress(eiendomByggested);
        const gaardsnummer = eiendomByggested?.gaardsnummer;
        const bruksnummer = eiendomByggested?.bruksnummer;
        const title = eiendomByggested.adresselinje1?.length ? `${adresse} (${gaardsnummer}/${bruksnummer})` : adresse;

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
