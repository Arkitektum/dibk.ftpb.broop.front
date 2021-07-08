// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { CheckBoxListItem, Header, InputField, Paper, RadioButtonListItem, Select } from 'dibk-design';

// Components
import EiendomByggested from 'components/partials/Forms/FormParts/EiendomByggested';
import Foretak from 'components/partials/Forms/FormParts/Foretak';

// Actions
import { updateSelectedForm } from 'actions/FormActions';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class DistribuertAnsvarsrett extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        if (this.props.selectedSubmission && Object.keys(this.props.selectedSubmission).length) {
            const formApiUrl = this.props.selectedSubmission?._links?.ansvarsrettdistribuert?.href;
            fetch(`https://dibk-ftpb-broop-api.azurewebsites.net${formApiUrl}`).then(res => res.json()).then(form => {
                this.props.updateSelectedForm(form);
            });
        }
    }

    componentDidUpdate(prevProps) {
        const hasSelectedSubmission = this.props.selectedSubmission && Object.keys(this.props.selectedSubmission).length;
        const hasSelectedForm = this.props.selectedForm && Object.keys(this.props.selectedForm).length;
        if (hasSelectedSubmission && !hasSelectedForm) {
            const formApiUrl = this.props.selectedSubmission?._links?.ansvarsrettdistribuert?.href;
            fetch(`https://dibk-ftpb-broop-api.azurewebsites.net${formApiUrl}`).then(res => res.json()).then(form => {
                this.props.updateSelectedForm(form);
            });
        }
    }

    renderAnsvarIByggeprosjektList(ansvarsomraader) {
        return ansvarsomraader.map((ansvarsomraade, index) => {
            return (<div key={index}>
                <div className={formsStyle.inputGroup}>
                    <div className={formsStyle.flex50}>
                        <Select
                            id={`ansvarsomraade-${index}-funksjon`}
                            onChange={(event) => { console.log('onchange', event.target.value) }}
                            label="Funksjon"
                            value={ansvarsomraade.funksjon?.kodebeskrivelse}
                            options={[{ key: 'Ansvarlig prosjektering', value: 'PRO' }]} />
                    </div>
                    <div className={formsStyle.flex50}>
                        <InputField
                            id={`ansvarsomraade-${index}-beskrivelseAvAnsvarsomraade`}
                            onChange={(event) => { console.log('onchange', event.target.value) }}
                            label="Beskrivelse av ansvarsområdet"
                            value={ansvarsomraade.beskrivelseAvAnsvarsomraade || ''} />
                    </div>
                    <div className={formsStyle.flexAuto}>
                        <Select
                            id={`ansvarsomraade-${index}-tiltaksklasse`}
                            onChange={(event) => { console.log('onchange', event.target.value) }}
                            label="Funksjon"
                            value={ansvarsomraade.funksjon?.kodebeskrivelse}
                            options={[{ key: '1', value: '1' }]} />
                    </div>
                </div>
                <fieldset className={formsStyle.fieldset}>
                    <legend>Våre samsvarserklæringer/kontrollerklæringer vil foreligge ved (gjelder ikke for SØK)</legend>
                    <CheckBoxListItem
                        id={`ansvarsomraade-${index}-samsvarKontrollVedRammetillatelse`}
                        onChange={(event) => { console.log('onchange', event.target.value) }}
                        checked={ansvarsomraade.samsvarKontrollVedRammetillatelse ? true : false}>
                        Rammetillatelse
                    </CheckBoxListItem>
                    <CheckBoxListItem
                        id={`ansvarsomraade-${index}-samsvarKontrollVedIgangsettingstillatelse`}
                        onChange={(event) => { console.log('onchange', event.target.value) }}
                        checked={ansvarsomraade.samsvarKontrollVedIgangsettingstillatelse ? true : false}>
                        Igangsettingstillatelse
                    </CheckBoxListItem>
                    <CheckBoxListItem
                        id={`ansvarsomraade-${index}-samsvarKontrollVedMidlertidigBrukstillatelse`}
                        onChange={(event) => { console.log('onchange', event.target.value) }}
                        checked={ansvarsomraade.samsvarKontrollVedMidlertidigBrukstillatelse ? true : false}>
                        Midlertidig brukstillatelse
                    </CheckBoxListItem>
                    <CheckBoxListItem
                        id={`ansvarsomraade-${index}-samsvarKontrollVedFerdigattest`}
                        onChange={(event) => { console.log('onchange', event.target.value) }}
                        checked={ansvarsomraade.samsvarKontrollVedFerdigattest ? true : false}>
                        Ferdigattest
                    </CheckBoxListItem>
                </fieldset>
                <fieldset className={formsStyle.fieldset}>
                    <legend>Har foretaket sentral godkjenning som dekker ansvarsområdet?</legend>
                    <RadioButtonListItem
                        id={`ansvarsomraade-${index}-dekkesOmraadeAvSentralGodkjenningSpecified-true`}
                        name="dekkesOmraadeAvSentralGodkjenningSpecified"
                        onChange={(event) => { console.log('onchange', event.target.value) }}
                        inputValue="true"
                        checked={ansvarsomraade.dekkesOmraadeAvSentralGodkjenningSpecified ? true : false}>
                        Ja
                    </RadioButtonListItem>
                    <RadioButtonListItem
                        id={`ansvarsomraade-${index}-dekkesOmraadeAvSentralGodkjenningSpecified-false`}
                        name="dekkesOmraadeAvSentralGodkjenningSpecified"
                        onChange={(event) => { console.log('onchange', event.target.value) }}
                        inputValue="false"
                        checked={!ansvarsomraade.dekkesOmraadeAvSentralGodkjenningSpecified ? true : false}>
                        Nei
                    </RadioButtonListItem>
                </fieldset>
            </div>
            )
        })
    }


    render() {
        const formData = this.props.selectedForm?.formData;
        return formData
            ? (
                <React.Fragment>
                    <Paper>
                        <Header content="Eiendom/Byggested" size={2}></Header>
                        <EiendomByggested eiendomByggested={formData?.eiendomByggested} />
                    </Paper>
                    <Paper>
                        <Header content="Foretak" size={2}></Header>
                        <Foretak foretak={formData?.ansvarsrett?.foretak} />
                    </Paper>

                    <Paper>
                        <Header content="Ansvar i byggeprosjekt" size={2}></Header>
                        {this.renderAnsvarIByggeprosjektList(formData?.ansvarsrett?.ansvarsomraader)}
                    </Paper>

                    <Paper>
                        <Header content="Ansvarlig søker" size={2}></Header>
                        <dl className={formsStyle.fieldList}>
                            <div className={formsStyle.flex50}>
                                <dt>Organisasjonsnummer</dt><dd>{formData?.ansvarligSoeker?.organisasjonsnummer}</dd>
                            </div>
                            <div className={formsStyle.flex50}>
                                <dt>Navn på foretak</dt><dd>{formData?.ansvarligSoeker?.navn}</dd>
                            </div>
                            <div className={formsStyle.flex100}>
                                <dt>Kontaktperson</dt><dd>{formData?.ansvarligSoeker?.kontaktperson?.navn}</dd>
                            </div>
                            <div className={formsStyle.flex50}>
                                <dt>Telefon</dt><dd>{formData?.ansvarligSoeker?.kontaktperson?.telefonnummer}</dd>
                            </div>
                            <div className={formsStyle.flex50}>
                                <dt>Mobiltelefon</dt><dd>{formData?.ansvarligSoeker?.kontaktperson?.mobilnummer}</dd>
                            </div>
                            <div className={formsStyle.flex100}>
                                <dt>E-post</dt><dd>{formData?.ansvarligSoeker?.kontaktperson?.epost}</dd>
                            </div>
                        </dl>
                    </Paper>

                    <Paper>
                        <Header content="Erklæring" size={2}></Header>
                        <p>Vi kjenner reglene om straff og sanksjoner i plan- og bygningsloven kapittel 32, og at uriktige opplysninger kan føre til reaksjoner.</p>
                        <p>Vi forplikter oss å stille med riktig kompetanse i byggeprosjekt, jf. SAK10 kapittel 10 og 11.</p>
                        <CheckBoxListItem
                            id="erklaeringAnsvarligProsjekterende"
                            onChange={(event) => { console.log('onchange', event.target.value) }}
                            checked={formData?.ansvarsrett?.erklaeringAnsvarligProsjekterende ? true : false}>
                            Ansvarlig prosjekterende erklærer at prosjekteringen skal være planlagt, gjennomført og kvalitetssikret i henhold til pbl jf. SAK10 §12-3
                        </CheckBoxListItem>
                        <CheckBoxListItem
                            id="erklaeringAnsvarligUtfoerende"
                            onChange={(event) => { console.log('onchange', event.target.value) }}
                            checked={formData?.ansvarsrett?.erklaeringAnsvarligUtfoerende ? true : false}>
                            Ansvarlig utførende erklærer at arbeidet ikke skal starte før produksjonsunderlaget er klart, jf. SAK 10, §12-4
                        </CheckBoxListItem>
                        <CheckBoxListItem
                            id="erklaeringAnsvarligProsjekerklaeringAnsvarligKontrollerendeterende"
                            onChange={(event) => { console.log('onchange', event.target.value) }}
                            checked={formData?.ansvarsrett?.erklaeringAnsvarligKontrollerende ? true : false}>
                            Ansvarlig kontollerende erklærer uavhengighet fra foretaket det skal kontrollere §14-1
                        </CheckBoxListItem>
                    </Paper>

                </React.Fragment>)
            : (
                <p>Henter skjema</p>
            )
    }
}

const mapStateToProps = state => ({
    selectedSubmission: state.selectedSubmission,
    selectedForm: state.selectedForm
});

const mapDispatchToProps = {
    updateSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(DistribuertAnsvarsrett);


