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
        return formData
            ? (
                <React.Fragment>
                    <div className={commonStyle.paragraphGroup}>
                        <p>Dette er en erklæring om ansvarsrett{formatProjectNameForForm(form)}.</p>
                        {
                            form?.signeringsfrist
                                ? <p>Frist for signering er {formatDate(form.signeringsfrist)}. Etter fristen er det ikke lenger mulig å signere erklæringen.</p>
                                : ''
                        }
                        {
                            form?.formData?.ansvarligSoeker?.navn
                                ? (<p>Etter signering blir erklæringen sendt til {form.formData.ansvarligSoeker.navn}, som er ansvarlig søker.</p>)
                                : ''
                        }
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
                        <Header content="Eiendom/Byggested" size={2}></Header>
                        <EiendomByggestedList
                            eiendomByggesteder={formData.eiendomByggesteder}
                        />
                        <p>Trykk på eiendommen for å se detaljer om byggestedet</p>
                    </Paper>
                    <Paper>
                        <Header content="Ansvarlig foretak" size={2}></Header>
                        <AnsvarligForetak
                            foretak={formData.ansvarligForetak}
                            updateHandler={foretak => this.updateFormDataField(foretak, 'ansvarligForetak')}
                            saveHandler={() => this.props.saveSelectedForm(this.props.selectedForm)}
                        />
                    </Paper>
                    <div className="page-break"></div>
                    <Paper>
                        <Header content="Ansvar i byggeprosjektet" size={2}></Header>
                        <AnsvarIByggeProsjektList
                            ansvarsomraader={formData.ansvarsomraader}
                            updateHandler={ansvarsomraader => this.updateFormDataField(ansvarsomraader, 'ansvarsomraader')}
                            saveHandler={() => this.props.saveSelectedForm(this.props.selectedForm)}
                        />
                    </Paper>
                    <div className="page-break"></div>
                    <Paper>
                        <Header content="Erklæring" size={2}></Header>
                        <div className="gray-container-on-print">
                            <Erklaering
                                formData={formData}
                                updateHandler={formData => this.updateFormData(formData)}
                                saveHandler={() => this.props.saveSelectedForm(this.props.selectedForm)}
                            />
                        </div>
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
    updateSelectedForm,
    saveSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Ansvarsrett);


