// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ansvarsomraader extends Component {

    renderAnsvarsomraader(ansvarsomraader) {
        return ansvarsomraader?.length ? ansvarsomraader.map((ansvarsomraade, index) => {
            return (
                <tr key={index}>
                    <td className="content border">{ansvarsomraade.funksjonKode}</td>
                    <td colSpan="3" className="content border">{ansvarsomraade.beskrivelseAvAnsvarsomraade}</td>
                    <td className="content border text-center">{ansvarsomraade.tiltaksklasseKode}</td>
                    <td className="content border text-center">
                        <span className={`checkbox ${ansvarsomraade.samsvarKontrollVedRammetillatelse === true ? 'checked' : ''}`}></span>
                    </td>
                    <td className="content border text-center">
                        <span className={`checkbox ${ansvarsomraade.samsvarKontrollVedIgangsettingstillatelse === true ? 'checked' : ''}`}></span>
                    </td>
                    <td className="content border text-center">
                        <span className={`checkbox ${ansvarsomraade.samsvarKontrollVedMidlertidigBrukstillatelse === true ? 'checked' : ''}`}></span>
                    </td>
                    <td className="content border text-center">
                        <span className={`checkbox ${ansvarsomraade.samsvarKontrollVedFerdigattest === true ? 'checked' : ''}`}></span>
                    </td>
                    <td className="content border text-center">
                        <span className={`checkbox ${ansvarsomraade.dekkesOmradetAvSentralGodkjenning === true ? 'checked' : ''}`}></span>
                    </td>
                </tr>
            )
        }) : ''
    }

    render() {
        const form = this.props.selectedForm;
        const ansvarsomraader = form?.formData?.ansvarsomraader;
        return ansvarsomraader ? (
            <React.Fragment>
                <thead>
                    <tr>
                        <th colSpan="10" className="content border bg-dark-gray">Ansvarsområde</th>
                    </tr>
                    <tr>
                        <td rowSpan="2" className="content border nowrap text-center bg-light-gray">Funksjon<br />(SØK, PRO,<br />UTF, kontroll)</td>
                        <td rowSpan="2" colSpan="3" className="content border nowrap text-center bg-light-gray">Beskriv arbeidet<br />foretaket skal ha ansvar for</td>
                        <td rowSpan="2" className="content border text-center bg-light-gray">Tiltaks-<br />klasse</td>
                        <td colSpan="4" className="content border text-center bg-light-gray">Våre samsvarserklæringer/kontrollerklæringer<br />vil foreligge ved: (sett X)</td>
                        <td rowSpan="2" className="content border text-center bg-light-gray">Dekker den sentrale godkjenningen ansvarsområdet?</td>
                    </tr>
                    <tr>
                        <td className="content border text-center bg-light-gray">Søknad om<br />ramme-<br />tillatelse</td>
                        <td className="content border text-center bg-light-gray">Søknad om<br />igangsettings-<br />tillatelse/<br />ett-trinns søknad</td>
                        <td className="content border text-center bg-light-gray">Søknad om<br />midlertidig<br />brukstillatelse</td>
                        <td className="content border text-center bg-light-gray">Søknad om<br />ferdigattest</td>
                    </tr>
                </thead>
                <tbody>
                    {this.renderAnsvarsomraader(ansvarsomraader)}
                </tbody>
            </React.Fragment>
        ) : ''
    }
}

const mapStateToProps = state => ({
    selectedForm: state.selectedForm,
});

export default connect(mapStateToProps, null)(Ansvarsomraader);


