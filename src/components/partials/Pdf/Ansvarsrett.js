// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import AnsvarligForetak from '../Pdf/PdfParts/AnsvarligForetak';
import Ansvarsomraader from '../Pdf/PdfParts/Ansvarsomraader';
import EiendomByggesteder from '../Pdf/PdfParts/EiendomByggesteder';
import ErklaeringAnsvarsrett from '../Pdf/PdfParts/ErklaeringAnsvarsrett';

class Ansvarsrett extends Component {
    render() {
        const form = this.props.selectedForm;
        const formData = form?.formData;
        return formData
            ? (
                <React.Fragment>
                    <p className="counter-page"></p>
                    <p className="counter-pages"></p>
                    <div className="headerbox">
                        <dl>
                            <dt>Kommunens saksnr.</dt>
                            <dd>{formData.kommunensSaksnummer?.saksaar}/{formData.kommunensSaksnummer?.sakssekvensnummer}</dd>
                        </dl>
                    </div>
                    <div className="headerbox">
                        <dl>
                            <dt>Vedlegg nr.</dt>
                            <dd>G-</dd>
                        </dl>
                    </div>
                    <h1>
                        Erklæring om ansvarsrett
                        <small>etter plan- og bygningsloven (pbl) § 23-3</small>
                    </h1>
                    <p>
                        Erklæringen skal sendes til ansvarlig søker.<br />
                        Alternativt kan erklæringen sendes direkte til kommunen, men da må ansvarlig søker få tilsendt en kopi.
                    </p>
                    <table>
                        <EiendomByggesteder />
                        <tr className="space"></tr>
                        <AnsvarligForetak />
                        <tr className="space"></tr>
                        <Ansvarsomraader />
                        <tr className="space"></tr>
                        <ErklaeringAnsvarsrett />
                    </table>
                    <div className="page-break"></div>
                    <div className="page-break"></div>
                </React.Fragment>)
            : (
                <p>Henter skjema</p>
            )
    }
}

const mapStateToProps = state => ({
    selectedForm: state.selectedForm
});

export default connect(mapStateToProps, null)(Ansvarsrett);
