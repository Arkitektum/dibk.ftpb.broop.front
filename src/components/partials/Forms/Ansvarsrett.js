// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { Header, Paper } from 'dibk-design';

// Components
import AnsvarIByggeProsjekt from 'components/partials/Forms/FormParts/AnsvarIByggeProsjekt';
import AnsvarligSoeker from 'components/partials/Forms/FormParts/AnsvarligSoeker';
import EiendomByggested from 'components/partials/Forms/FormParts/EiendomByggested';
import Erklaering from 'components/partials/Forms/FormParts/Erklaering';
import AnsvarligForetak from 'components/partials/Forms/FormParts/AnsvarligForetak';

// Actions
import { updateSelectedForm, saveSelectedForm } from 'actions/FormActions';

// Helpers
import { formatProjectNameForForm } from 'helpers/formatHelpers';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';
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
                    <Paper>
                        <div className={commonStyle.paragraphGroup}>
                            <p>Dette er en erklæring om ansvarsrett{formatProjectNameForForm(form)}.</p>
                        </div>
                        <div className={commonStyle.paragraphGroup}>
                            {
                                form?.formData?.frist // Add frist to APPI
                                    ? <p>Frist for signering er ${form.formData.frist}. Etter fristen er det ikke lenger mulig å signere erklæringen.</p>
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
                    </Paper>

                    <Paper>
                        <Header content="Eiendom/Byggested" size={2}></Header>
                        <EiendomByggested
                            eiendomByggesteder={formData.eiendomByggesteder}
                        />
                    </Paper>
                    <Paper>
                        <Header content="Foretak" size={2}></Header>
                        <AnsvarligForetak
                            foretak={formData.ansvarligForetak}
                            updateHandler={foretak => this.updateFormDataField(foretak, 'ansvarligForetak')}
                            saveHandler={() => this.props.saveSelectedForm(this.props.selectedForm)}
                        />
                    </Paper>
                    <div className="page-break"></div>
                    <Paper>
                        <Header content="Ansvar i byggeprosjekt" size={2}></Header>
                        <AnsvarIByggeProsjekt
                            ansvarsomraader={formData.ansvarsomraader}
                            updateHandler={ansvarsomraader => this.updateFormDataField(ansvarsomraader, 'ansvarsomraader')}
                            saveHandler={() => this.props.saveSelectedForm(this.props.selectedForm)}
                        />
                    </Paper>
                    <div className="page-break"></div>
                    <Paper>
                        <Header content="Ansvarlig søker" size={2}></Header>
                        <AnsvarligSoeker
                            ansvarligSoeker={formData.ansvarligSoeker}
                        />
                    </Paper>
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


