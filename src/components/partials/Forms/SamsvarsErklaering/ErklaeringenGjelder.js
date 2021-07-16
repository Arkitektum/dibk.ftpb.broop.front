// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// DIBK Design
import { Button, Header, Paper, RadioButtonListItem } from 'dibk-design';

// Components
import EiendomByggested from 'components/partials/Forms/FormParts/EiendomByggested';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';


class ErklaeringenGjelder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            harSentralGodkjenning: false
        }
    }

    render() {
        const formData = this.props.selectedForm?.formData;
        const dummyData = {
            ansvarligForetak: {
                organisasjonsnummer: '911455307',
                navn: 'FANA OG HAFSLO REVISJON',
                kontaktperson: {
                    navn: 'Tage Binders'
                }
            },
            ansvarsomraade: {
                erklaertAnsvarsrettDato: '23.06.2016',
                beskrivelse: 'Arkitekturprosjektering'
            }
        }

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
                                <dt>Organisasjonsnummer</dt><dd>{dummyData.ansvarligForetak.organisasjonsnummer}</dd>
                            </div>
                            <div className={formsStyle.flex50}>
                                <dt>Navn på foretak</dt><dd>{dummyData.ansvarligForetak.navn}</dd>
                            </div>
                            <div className={formsStyle.flex100}>
                                <dt>Kontaktperson</dt><dd>{dummyData.ansvarligForetak.kontaktperson.navn}</dd>
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
                                <dt>Dato for erklært ansvarsrett</dt><dd>{dummyData.ansvarsomraade.erklaertAnsvarsrettDato}</dd>
                            </div>
                            <div className={formsStyle.flex100}>
                                <dt>Beskrivelse av ansvarsområdet:</dt><dd>{dummyData.ansvarsomraade.beskrivelse}</dd>
                            </div>
                        </dl>
                        <fieldset className={formsStyle.fieldset}>
                            <legend>Har foretaket sentral godkjenning som dekker ansvarsområdet?</legend>
                            <RadioButtonListItem
                                id={`harSentralGodkjenning-true`}
                                name="harSentralGodkjenning"
                                onChange={(event) => { this.setState({ harSentralGodkjenning: true }) }}
                                inputValue="true"
                                checked={this.state.harSentralGodkjenning ? true : false}>
                                Ja
                            </RadioButtonListItem>
                            <RadioButtonListItem
                                id={`harSentralGodkjenning-false`}
                                name="harSentralGodkjenning"
                                onChange={(event) => { this.setState({ harSentralGodkjenning: false }) }}
                                inputValue="false"
                                checked={!this.state.harSentralGodkjenning ? true : false}>
                                Nei
                            </RadioButtonListItem>
                        </fieldset>
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


export default connect(mapStateToProps, null)(ErklaeringenGjelder);


