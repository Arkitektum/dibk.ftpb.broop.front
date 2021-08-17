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
import Foretak from 'components/partials/Forms/FormParts/Foretak';

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

    updateAnsvarsomraader(ansvarsomraader) {
        return this.updateFormDataField({
            ...this.props.selectedForm.formData.ansvarsrett,
            ansvarsomraader
        }, 'ansvarsrett')
    }

    updateFormDataField(value, property) {
        return this.props.updateSelectedForm({
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
                            eiendomByggested={formData.eiendomByggested}
                        />
                    </Paper>
                    <Paper>
                        <Header content="Foretak" size={2}></Header>
                        <Foretak
                            foretak={formData.ansvarsrett?.foretak}
                            updateHandler={foretak => this.updateFormDataField(foretak, 'foretak')}
                            saveHandler={() => this.props.saveSelectedForm(this.props.selectedForm)}
                        />
                    </Paper>
                    <Paper>
                        <Header content="Ansvar i byggeprosjekt" size={2}></Header>
                        <AnsvarIByggeProsjekt
                            ansvarsomraader={formData.ansvarsrett.ansvarsomraader}
                            updateHandler={ansvarsomraader => this.updateAnsvarsomraader(ansvarsomraader)}
                            saveHandler={() => this.props.saveSelectedForm(this.props.selectedForm)}
                        />
                    </Paper>
                    <Paper>
                        <Header content="Ansvarlig søker" size={2}></Header>
                        <AnsvarligSoeker
                            ansvarligSoeker={formData.ansvarligSoeker}
                        />
                    </Paper>
                    <Paper>
                        <Header content="Erklæring" size={2}></Header>
                        <Erklaering
                            ansvarsrett={formData.ansvarsrett}
                            updateHandler={ansvarsrett => this.updateFormDataField(ansvarsrett, 'ansvarsrett')}
                            saveHandler={() => this.props.saveSelectedForm(this.props.selectedForm)}
                        />
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


