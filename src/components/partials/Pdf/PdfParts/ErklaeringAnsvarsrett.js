// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ErklaeringAnsvarsrett extends Component {

    hasAnsvarsomraadeFunksjon(funksjonKode) {
        const ansvarsomraader = this.props.selectedForm?.formData?.ansvarsomraader;
        return ansvarsomraader?.length
            ? ansvarsomraader.some(ansvarsomraade => {
                return ansvarsomraade.funksjonKode === funksjonKode
            })
            : false
    }

    render() {
        const formData = this.props.selectedForm?.formData;
        const empty = <React.Fragment>&nbsp;</React.Fragment>
        return formData
            ? (
                <React.Fragment>
                    <thead>
                        <tr>
                            <th colSpan="10" className="content border bg-dark-gray">Foretak</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="10" className="content border-left border-right bg-light-gray">
                                Foretaket er kjent med reglene om straff og sanksjoner i pbl kap 32 og at det kan medføre reaksjoner dersom det gis uriktige opplysninger.<br />
                                Foretaket forplikter seg til å stille med nødvendig kompetanse i tiltaket jf. SAK10 kap. 10 og 11
                            </td>
                        </tr>
                        {
                            this.hasAnsvarsomraadeFunksjon("PRO")
                                ? (
                                    <tr>
                                        <td colSpan="10" className="content border-right border-left bg-light-gray">
                                            <div className="checkbox-container">
                                                <span className={`checkbox ${formData.erklaeringAnsvarligProsjekterende === true ? 'checked' : ''}`}></span>
                                                Ansvarlig prosjekterende erklærer at prosjekteringen skal være planlagt,<br />
                                                gjennomført og kvalitetssikret i henhold til pbl jf. SAK10 §12-3
                                            </div>
                                        </td>
                                    </tr>
                                ) : ''
                        }
                        {
                            this.hasAnsvarsomraadeFunksjon("UTF")
                                ? (
                                    <tr>
                                        <td colSpan="10" className="content border-right border-left bg-light-gray">
                                            <div className="checkbox-container">
                                                <span className={`checkbox ${formData.erklaeringAnsvarligUtfoerende === true ? 'checked' : ''}`}></span>
                                                Ansvarlig utførende erklærer at arbeidet ikke skal starte før det foreligger kvalitetssikret<br />
                                                produksjonsunderlag for respektive del av utførelsen jf SAK10 § 12-4
                                            </div>
                                        </td>
                                    </tr>
                                ) : ''
                        }
                        {
                            this.hasAnsvarsomraadeFunksjon("KONTROLL")
                                ? (
                                    <tr>
                                        <td colSpan="10" className="content border-right border-left bg-light-gray">
                                            <div className="checkbox-container">
                                                <span className={`checkbox ${formData.erklaeringAnsvarligKontrollerende === true ? 'checked' : ''}`}></span>
                                                Ansvarlig kontrollerende erklærer uavhengighet, jf. SAK10 § 14-1,<br />
                                                og vil redegjøre for endringer som kan påvirke uavhengigheten jf. SAK10 §12-5
                                            </div>
                                        </td>
                                    </tr>
                                ) : ''
                        }
                        <tr>
                            <td className="border-left border-top">
                                <dl>
                                    <dt className="border-right">Dato</dt>
                                    <dd>{empty}</dd>
                                </dl>
                            </td>
                            <td colSpan="9" className="border-right border-top">
                                <dl>
                                    <dt>Underskrift</dt>
                                    <dd>{empty}</dd>
                                </dl>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="10" className="border">
                                <dl>
                                    <dt>Gjentas med blokkbokstaver</dt>
                                    <dd>{empty}</dd>
                                </dl>
                            </td>
                        </tr>
                    </tbody>
                </React.Fragment >)
            : ''
    }
}

const mapStateToProps = state => ({
    selectedForm: state.selectedForm,
});

export default connect(mapStateToProps, null)(ErklaeringAnsvarsrett);


