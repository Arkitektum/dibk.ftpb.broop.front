// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { CheckBoxListItem, Header, InputField, Paper, RadioButtonListItem, Select } from 'dibk-design';

// Components
import AnsvarligSoeker from 'components/partials/Forms/FormParts/AnsvarligSoeker';
import EiendomByggested from 'components/partials/Forms/FormParts/EiendomByggested';
import Erklaering from 'components/partials/Forms/FormParts/Erklaering';
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

    updateFormDataField(value, property) {
        this.props.updateSelectedForm({
            ...this.props.selectedForm,
            formData: {
                ...this.props.selectedForm.formData,
                [property]: value
            }
        });
    }


    render() {
        const formData = this.props.selectedForm?.formData;
        return formData
            ? (
                <React.Fragment>
                    <dl className={`${formsStyle.fieldList} ${formsStyle.inlineFieldList}`}>
                        <div className={formsStyle.flex50}>
                            <dt>Kommunens saksnummer (år/sekvensnummer):</dt>
                            <dd>{formData.kommunensSaksnummer?.saksaar}/{formData.kommunensSaksnummer?.sakssekvensnummer}</dd>
                        </div>
                    </dl>
                    <Paper>
                        <Header content="Eiendom/Byggested" size={2}></Header>
                        <EiendomByggested eiendomByggested={formData.eiendomByggested} />
                    </Paper>
                    <Paper>
                        <Header content="Foretak" size={2}></Header>
                        <Foretak foretak={formData.ansvarsrett?.foretak} />
                    </Paper>
                    <Paper>
                        <Header content="Ansvar i byggeprosjekt" size={2}></Header>
                        {this.renderAnsvarIByggeprosjektList(formData.ansvarsrett?.ansvarsomraader)}
                    </Paper>
                    <Paper>
                        <Header content="Ansvarlig søker" size={2}></Header>
                        <AnsvarligSoeker ansvarligSoeker={formData.ansvarligSoeker} />
                    </Paper>
                    <Paper>
                        <Header content="Erklæring" size={2}></Header>
                        <Erklaering ansvarsrett={formData.ansvarsrett} onChange={ansvarsrett => this.updateFormDataField(ansvarsrett, 'ansvarsrett')} />
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


