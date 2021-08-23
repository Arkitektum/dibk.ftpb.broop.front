// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// DIBK Design
import { Button, Header, Paper } from 'dibk-design';

// Components
import EiendomByggested from 'components/partials/Forms/FormParts/EiendomByggested';

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
                    <Header content="Erklæringen gjelder"></Header>
                    <Paper>
                        <Header content="Eiendom/Byggested" size={2}></Header>
                        <EiendomByggested eiendomByggested={formData.eiendomByggested} />
                    </Paper>
                    <Paper>
                        <Header content="Ansvarlig foretak" size={2}></Header>
                        <dl className={formsStyle.fieldList}>
                            <div className={formsStyle.flex50}>
                                <dt>Organisasjonsnummer</dt><dd>{formData.foretak?.organisasjonsnummer}</dd>
                            </div>
                            <div className={formsStyle.flex50}>
                                <dt>Navn på foretak</dt><dd>{formData.foretak?.navn}</dd>
                            </div>
                            <div className={formsStyle.flex100}>
                                <dt>Kontaktperson</dt><dd>{formData.foretak?.kontaktperson?.navn}</dd>
                            </div>
                        </dl>
                    </Paper>
                    <Paper>
                        <Header content="Ansvarsområde" size={2}></Header>
                        <dl className={formsStyle.fieldList}>
                            <div className={formsStyle.flex100}>
                                <dt>Funksjon</dt><dd>Ansvarlig prosjektering</dd>
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
                                <dt>Beskrivelse av ansvarsområdet:</dt><dd>{formData.ansvarsrett?.beskrivelseAvAnsvarsomraadet}</dd>
                            </div>
                        </dl>
                    </Paper>
                    <div className={formsStyle.buttonRow}>
                        <Link to={{ pathname: 'start', search: window.location.search }}>
                            <Button color="primary" content="Forrige" arrow='left' />
                        </Link>
                        <Link to={{ pathname: 'gjenstaaendeArbeider', search: window.location.search }}>
                            <Button color="primary" content="Neste" arrow='right' />
                        </Link>
                    </div>
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


