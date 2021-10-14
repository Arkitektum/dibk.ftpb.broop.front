// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { Header, Paper } from 'dibk-design';

// Components
import EiendomByggestedList from 'components/partials/Forms/FormParts/EiendomByggestedList';

// Actions
import { updateSelectedForm } from 'actions/FormActions';

// Helpers
import { formatDate } from 'helpers/formatHelpers';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class ErklaeringenGjelder extends Component {

    updateAnsvarsomraader(ansvarsomraader) {
        this.updateFormDataField({
            ...this.props.selectedForm.formData.ansvarsrett,
            ansvarsomraader
        }, 'ansvarsrett')
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

                    <Paper>
                        <div className="step-heading-on-print">
                            <Header content="Erklæringen gjelder" size={2}></Header>
                        </div>
                        <Header content="Eiendom/Byggested" size={3}></Header>
                        <EiendomByggestedList eiendomByggesteder={formData.eiendomByggesteder} />
                    </Paper>
                    <Paper>
                        <Header content="Ansvarlig kontrollerende" size={2}></Header>
                        <dl className={formsStyle.fieldList}>
                            <div className={formsStyle.flex50}>
                                <dt>Organisasjonsnummer</dt><dd>{formData.ansvarligForetak?.organisasjonsnummer}</dd>
                            </div>
                            <div className={formsStyle.flex50}>
                                <dt>Navn på foretak</dt><dd>{formData.ansvarligForetak?.navn}</dd>
                            </div>
                            <div className={formsStyle.flex100}>
                                <dt>Kontaktperson</dt><dd>{formData.ansvarligForetak?.kontaktpersonNavn}</dd>
                            </div>
                        </dl>
                    </Paper>
                    <Paper>
                        <Header content="Ansvarsområde" size={2}></Header>
                        <dl className={formsStyle.fieldList}>
                            <div className={formsStyle.flex100}>
                                <dt>Dato for erklært ansvarsrett</dt>
                                <dd>
                                    {
                                        formData.ansvarsrettErklaertDato
                                            ? formatDate(formData.ansvarsrettErklaertDato)
                                            : 'Dato er ikke angitt'
                                    }
                                </dd>
                            </div>
                            <div className={formsStyle.flex100}>
                                <dt>Beskrivelse av ansvarsområdet:</dt><dd>{formData.beskrivelseAvAnsvarsomraadet}</dd>
                            </div>
                        </dl>
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

export default connect(mapStateToProps, mapDispatchToProps)(ErklaeringenGjelder);


