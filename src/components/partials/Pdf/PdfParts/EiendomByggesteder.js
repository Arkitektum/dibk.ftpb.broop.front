// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

class EiendomByggesteder extends Component {

    getMunicipalityField(eiendomByggested) {
        if (eiendomByggested.kommunenavn) {
            return {
                label: 'Kommune',
                value: eiendomByggested.kommunenummer ? `${eiendomByggested.kommunenavn} (${eiendomByggested.kommunenummer})` : `${eiendomByggested.kommunenavn}`
            }
        } else if (eiendomByggested.kommunenummer) {
            return {
                label: 'Kommunenr.',
                value: eiendomByggested.kommunenummer
            }
        } else {
            return {
                label: 'Kommune',
                value: ''
            }
        }
    }

    renderEiendomByggesteder(eiendomByggesteder) {
        return eiendomByggesteder?.length ? eiendomByggesteder.map((eiendomByggested, index) => {
            const municipalityField = this.getMunicipalityField(eiendomByggested);
            return (
                <React.Fragment>
                    <tr className={index > 0 ? 'border-top-wide' : null}>
                        <th rowSpan="2" className="content border bg-light-gray">
                            Eiendom/<br />Byggested
                        </th>
                        <td>
                            <dl>
                                <dt className="border-right">Gnr.</dt>
                                <dd>{eiendomByggested.gaardsnummer}</dd>
                            </dl>
                        </td>
                        <td>
                            <dl>
                                <dt className="border-right">Bnr.</dt>
                                <dd>{eiendomByggested.bruksnummer}</dd>
                            </dl>
                        </td>
                        <td>
                            <dl>
                                <dt className="border-right">Festenr.</dt>
                                <dd>{eiendomByggested.festenummer}</dd>
                            </dl>
                        </td>
                        <td className="border-right">
                            <dl>
                                <dt>Seksjonsnr.</dt>
                                <dd>{eiendomByggested.seksjonsnummer}</dd>
                            </dl>
                        </td>
                        <td>
                            <dl>
                                <dt className="border-right">Bygningsnr.</dt>
                                <dd>{eiendomByggested.bygningsnummer}</dd>
                            </dl>
                        </td>
                        <td>
                            <dl>
                                <dt className="border-right">Bolignr.</dt>
                                <dd>{eiendomByggested.bolignummer}</dd>
                            </dl>
                        </td>
                        <td colSpan="3" className="border-right">
                            <dl>
                                <dt>{municipalityField?.label || ''}</dt>
                                <dd>{municipalityField?.value || ''}</dd>
                            </dl>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="4" className="border">
                            <dl>
                                <dt>Adresse</dt>
                                <dd>{eiendomByggested.adresselinje1}</dd>
                            </dl>
                        </td>
                        <td className="border">
                            <dl>
                                <dt>Poststnr.</dt>
                                <dd>{eiendomByggested.postnr}</dd>
                            </dl>
                        </td>
                        <td colSpan="4" className="border">
                            <dl>
                                <dt>Poststed</dt>
                                <dd>{eiendomByggested.poststed}</dd>
                            </dl>
                        </td>
                    </tr>
                </React.Fragment>
            )
        }) : ''
    }

    render() {
        const form = this.props.selectedForm;
        const eiendomByggesteder = form?.formData?.eiendomByggesteder;
        return (
            <React.Fragment>
                <thead>
                    <tr>
                        <th colSpan="10" className="content border bg-dark-gray">Erklæringen gjelder</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderEiendomByggesteder(eiendomByggesteder)}
                </tbody>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    selectedForm: state.selectedForm,
});

export default connect(mapStateToProps, null)(EiendomByggesteder);


