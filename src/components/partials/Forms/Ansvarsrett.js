// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { Header, Paper } from 'dibk-design';

// Components
import AnsvarIByggeProsjektList from 'components/partials/Forms/FormParts/AnsvarIByggeProsjektList';
import EiendomByggestedList from 'components/partials/Forms/FormParts/EiendomByggestedList';
import Erklaering from 'components/partials/Forms/FormParts/Erklaering';
import AnsvarligForetak from 'components/partials/Forms/FormParts/AnsvarligForetak';
import ContactInfo from 'components/partials/ContactInfo';

// Actions
import { updateSelectedForm, saveSelectedForm } from 'actions/FormActions';

// Helpers
import { formatDate, formatProjectNameForForm } from 'helpers/formatHelpers';

// Stylesheets
import commonStyle from 'components/routes/common.module.scss';

class Ansvarsrett extends Component {

    updateFormData(formData) {
        return this.props.updateSelectedForm({
            ...this.props.selectedForm,
            formData
        });
    }

    updateFormDataField(value, property) {
        return this.updateFormData({
            ...this.props.selectedForm.formData,
            [property]: value
        })
    }

    render() {
        const isPrint = localStorage.print === "true";
        const form = this.props.selectedForm;
        const formData = form?.formData;
        const accessToken = this.props.oidc?.user?.access_token;
        return formData
            ? (
                <React.Fragment>
                    {
                        !isPrint
                            ? (
                                <div className={commonStyle.ingress}>
                                    <p>Erklæringen gjelder {formatProjectNameForForm(form)}.</p>
                                    {
                                        form?.signeringsfrist
                                            ? <p>Frist for signering er {formatDate(form.signeringsfrist)}.</p>
                                            : ''
                                    }
                                </div>
                            )
                            : ''
                    }
                    <div className={`${commonStyle.marginTopSmall} ${commonStyle.marginBottomSmall}`}>
                        <ContactInfo />
                    </div>
                    {
                        isPrint
                            ? (
                                <dl>
                                    <dt>Kommunens saksnummer (år/sekvensnummer):</dt>
                                    <dd>{formData.kommunensSaksnummer?.saksaar}/{formData.kommunensSaksnummer?.sakssekvensnummer}</dd>
                                </dl>
                            )
                            : ''
                    }

                    <Paper>
                        <Header content={isPrint ? 'Erklæringen gjelder' : 'Eiendom/Byggested'} size={2}></Header>
                        {
                            !isPrint
                                ? <div className={commonStyle.marginBottomSmall}>Trykk på eiendommen for å se detaljer om byggestedet.</div>
                                : ''
                        }
                        <EiendomByggestedList
                            eiendomByggesteder={formData.eiendomByggesteder}
                        />
                    </Paper>
                    <Paper>
                        <Header content="Ansvarlig foretak" size={2}></Header>
                        <AnsvarligForetak
                            foretak={formData.ansvarligForetak}
                            updateHandler={foretak => this.updateFormDataField(foretak, 'ansvarligForetak')}
                            saveHandler={() => this.props.saveSelectedForm(this.props.selectedForm, accessToken)}
                        />
                    </Paper>
                    <div className="page-break"></div>
                    <Paper>
                        <Header content="Ansvar i byggeprosjektet" size={2}></Header>
                        {
                            !isPrint
                                ? <div className={commonStyle.marginBottomSmall}>Ansvarlig søker har foreslått noen opplysninger, men du kan endre eller oppdatere beskrivelsen og valgene.</div>
                                : ''
                        }
                        <AnsvarIByggeProsjektList
                            ansvarsomraader={formData.ansvarsomraader}
                            updateHandler={ansvarsomraader => this.updateFormDataField(ansvarsomraader, 'ansvarsomraader')}
                            saveHandler={() => this.props.saveSelectedForm(this.props.selectedForm, accessToken)}
                        />
                    </Paper>
                    <div className="page-break"></div>
                    <Paper>
                        <Header content="Erklæring" size={2}></Header>
                        {
                            !isPrint
                                ? <div className={commonStyle.marginBottomSmall}>Vi er kjent med reglene om straff og sanksjoner i plan- og bygningsloven kapittel 32, og at det kan medføre reaksjoner dersom vi oppgir uriktige opplysninger. Vi forplikter oss å stille med riktig kompetanse i byggeprosjekt, jf. SAK10 kapittel 10 og 11.</div>
                                : ''
                        }
                        <div className="gray-container-on-print">
                            <Erklaering
                                formData={formData}
                                updateHandler={formData => this.updateFormData(formData)}
                                saveHandler={() => this.props.saveSelectedForm(this.props.selectedForm, accessToken)}
                            />
                        </div>
                        {
                            !isPrint
                                ? <div className={commonStyle.marginTopSmall}>Jeg bekrefter at jeg har rett til å signere på vegne av foretaket slik at foretaket er fullt ut forpliktet til innholdet i erklæringen.</div>
                                : ''
                        }
                    </Paper>
                </React.Fragment>)
            : (
                <p>Henter skjema</p>
            )
    }
}

const mapStateToProps = state => ({
    selectedSubmission: state.selectedSubmission,
    selectedForm: state.selectedForm,
    oidc: state.oidc
});

const mapDispatchToProps = {
    updateSelectedForm,
    saveSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Ansvarsrett);


