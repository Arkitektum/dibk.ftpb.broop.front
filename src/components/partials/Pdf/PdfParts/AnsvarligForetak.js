// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

class AnsvarligForetak extends Component {

    render() {
        const form = this.props.selectedForm;
        const ansvarligForetak = form?.formData?.ansvarligForetak;
        const empty = <React.Fragment>&nbsp;</React.Fragment>
        return ansvarligForetak
            ? (
                <React.Fragment>
                    <thead>
                        <tr>
                            <th colSpan="10" className="content border bg-dark-gray">Foretak</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="7" className="border">
                                <dl>
                                    <dt>Foretakets navn</dt>
                                    <dd>{ansvarligForetak.navn || empty}</dd>
                                </dl>
                            </td>
                            <td colSpan="3" className="border">
                                <dl>
                                    <dt>Organisasjonsnr.</dt>
                                    <dd>{ansvarligForetak.organisasjonsnummer || empty}</dd>
                                </dl>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="5" className="border">
                                <dl>
                                    <dt>Adresse</dt>
                                    <dd>{ansvarligForetak.adresselinje1 || empty}</dd>
                                </dl>
                            </td>
                            <td>
                                <dl>
                                    <dt className="border-right">Poststnr.</dt>
                                    <dd>{ansvarligForetak.postnr || empty}</dd>
                                </dl>
                            </td>
                            <td colSpan="4" className="border-right">
                                <dl>
                                    <dt>Poststed</dt>
                                    <dd>{ansvarligForetak.poststed || empty}</dd>
                                </dl>
                            </td>
                        </tr>
                        <tr className="border-top-wide border-right-wide border-left-wide">
                            <td colSpan="5" className="border">
                                <dl>
                                    <dt>Kontaktperson</dt>
                                    <dd>{ansvarligForetak.kontaktpersonNavn || empty}</dd>
                                </dl>
                            </td>
                            <td colSpan="2" className="border">
                                <dl>
                                    <dt>Telefon</dt>
                                    <dd>{ansvarligForetak.kontaktpersonTelefonnummer || empty}</dd>
                                </dl>
                            </td>
                            <td colSpan="3" className="border">
                                <dl>
                                    <dt>Mobiltelefon</dt>
                                    <dd>{ansvarligForetak.kontaktpersonMobilnummer || empty}</dd>
                                </dl>
                            </td>
                        </tr>
                        <tr className="border-bottom-wide border-right-wide border-left-wide">
                            <td colSpan="10" className="border">
                                <dl>
                                    <dt>E-post</dt>
                                    <dd>{ansvarligForetak.kontaktpersonEpost || empty}</dd>
                                </dl>
                            </td>
                        </tr>
                        <tr className="bg-light-gray">
                            <td colSpan="4" className="content border-left border-bottom">
                                Foreligger sentral godkjenning?
                            </td>
                            <td className="content nowrap border-bottom">
                                <span className={`checkbox ${ansvarligForetak.harSentralGodkjenning === true ? 'checked' : ''}`}></span>
                                Ja
                            </td>
                            <td colSpan="5" className="content nowrap border-right border-bottom">
                                <span className={`checkbox ${ansvarligForetak.harSentralGodkjenning === false ? 'checked' : ''}`}></span>
                                Nei
                            </td>
                        </tr>
                    </tbody>
                </React.Fragment>)
            : ''
    }
}

const mapStateToProps = state => ({
    selectedForm: state.selectedForm,
});

export default connect(mapStateToProps, null)(AnsvarligForetak);


