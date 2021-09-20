// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { Header, Paper } from 'dibk-design';

// Components
import AnsvarIByggeProsjekt from 'components/partials/Forms/FormParts/AnsvarIByggeProsjekt';
import AnsvarligSoeker from 'components/partials/Forms/FormParts/AnsvarligSoeker';
import EiendomByggested from 'components/partials/Forms/FormParts/EiendomByggested';
import SentralGodkjenning from 'components/partials/Forms/FormParts/SentralGodkjenning';
import Erklaering from 'components/partials/Forms/FormParts/Erklaering';
import AnsvarligForetak from 'components/partials/Forms/FormParts/AnsvarligForetak';

// Actions
import { fetchSelectedForm, updateSelectedForm, saveSelectedForm } from 'actions/FormActions';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class Ansvarsrett extends Component {

    componentDidMount() {
        if (this.props.selectedSubmission && Object.keys(this.props.selectedSubmission).length) {
            this.props.fetchSelectedForm(this.props.selectedSubmission);
        }
    }

    componentDidUpdate() {
        const hasSelectedSubmission = this.props.selectedSubmission && Object.keys(this.props.selectedSubmission).length;
        const hasSelectedForm = this.props.selectedForm && Object.keys(this.props.selectedForm).length;
        if (hasSelectedSubmission && !hasSelectedForm) {
            this.props.fetchSelectedForm(this.props.selectedSubmission);
        }
    }

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
        const formData = this.props.selectedForm?.formData;
        return formData
            ? (
                <React.Fragment>
                    <div className={formsStyle.headerSection}>
                        <Header content="Erklæring om ansvarsrett"></Header>
                        <span className={formsStyle.subtitle}>etter plan- og bygningsloven(pbl) § 23-3</span>
                    </div>
                    <dl className={`${formsStyle.fieldList} ${formsStyle.inlineFieldList}`}>
                        <div className={formsStyle.flex50}>
                            <dt>Kommunens saksnummer (år/sekvensnummer):</dt>
                            <dd>{formData.kommunensSaksnummer?.saksaar}/{formData.kommunensSaksnummer?.sakssekvensnummer}</dd>
                        </div>
                    </dl>
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
                        <Header content="Sentral godkjenning" size={2}></Header>
                        <SentralGodkjenning />
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
    fetchSelectedForm,
    updateSelectedForm,
    saveSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Ansvarsrett);


