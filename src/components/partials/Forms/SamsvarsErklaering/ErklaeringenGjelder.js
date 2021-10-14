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

    render() {
        const formData = this.props.selectedForm?.formData;

        return formData
            ? (
                <React.Fragment>
                    <Paper>
                        <Header content="Erklæringen gjelder" size={2}></Header>
                        <Header content="Eiendom/Byggested" size={3}></Header>
                        <EiendomByggestedList eiendomByggesteder={formData.eiendomByggesteder} />
                        <p>Trykk på eiendommen for å se detaljer om byggestedet</p>
                    </Paper>
                    <Paper>
                        <Header content="Ansvarlig foretak" size={2}></Header>
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
                                <dt>Funksjon</dt><dd>{formData.funksjonBeskrivelse}</dd>
                            </div>
                            <div className={formsStyle.flex100}>
                                <dt>Dato for erklært ansvarsrett</dt>
                                <dd>
                                    {
                                        formData.ansvarsrett?.ansvarsrettErklaert
                                            ? formatDate(formData.ansvarsrett?.ansvarsrettErklaert)
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
    selectedForm: state.selectedForm
});

const mapDispatchToProps = {
    updateSelectedForm
};


export default connect(mapStateToProps, mapDispatchToProps)(ErklaeringenGjelder);


