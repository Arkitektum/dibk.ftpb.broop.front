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

class EiendomByggestedList extends Component {

    getMunicipalityField(eiendomByggested) {
        const isPrint = localStorage.print === "true";
        let municipalityField;
        if (eiendomByggested.kommunenavn) {
            municipalityField = {
                label: 'Kommune',
                value: eiendomByggested.kommunenummer ? `${eiendomByggested.kommunenavn} (${eiendomByggested.kommunenummer})` : `${eiendomByggested.kommunenavn}`
            }
        } else if (eiendomByggested.kommunenummer || isPrint) {
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
                                    <dt><Label>{municipalityField.label}</Label>
                                    </dt><dd>{municipalityField.value}</dd>
                                </div>
                            )
                            : ''
                    }

                    <div className="print-flex-10">
                        <dt><Label>Gårdsnummer</Label></dt>
                        <dd>{eiendomByggested.gaardsnummer}</dd>
                    </div>
                    <div className="print-flex-10">
                        <dt><Label>Bruksnummer</Label></dt>
                        <dd>{eiendomByggested.bruksnummer}</dd>
                    </div>
                    {
                        eiendomByggested.festenummer || isPrint
                            ? (
                                <div className="print-flex-10">
                                    <dt><Label>Festenummer</Label></dt>
                                    <dd>{eiendomByggested.festenummer}</dd>
                                </div>
                            )
                            : ''
                    }
                    {
                        eiendomByggested.seksjonsnummer || isPrint
                            ? (
                                <div className="print-flex-10">
                                    <dt><Label>Seksjonsnummer</Label>
                                    </dt><dd>{eiendomByggested.seksjonsnummer}</dd>
                                </div>
                            )
                            : ''
                    }
                    {
                        eiendomByggested.bygningsnummer || isPrint
                            ? (
                                <div className="print-flex-10">
                                    <dt><Label>Bygningsnummer</Label></dt>
                                    <dd>{eiendomByggested.bygningsnummer}</dd>
                                </div>
                            )
                            : ''
                    }
                    {
                        eiendomByggested.bolignummer || isPrint
                            ? (
                                <div className="print-flex-10">
                                    <dt><Label>Bolignummer</Label></dt>
                                    <dd>{eiendomByggested.bolignummer}</dd>
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
                <Accordion title={title} color="lightLime">
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

EiendomByggestedList.propTypes = {
    eiendomByggesteder: PropTypes.array.isRequired
};

export default connect(null, null)(EiendomByggestedList);
