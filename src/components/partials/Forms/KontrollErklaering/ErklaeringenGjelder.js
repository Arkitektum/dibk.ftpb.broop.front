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

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class ErklaeringenGjelder extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

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
        const dummyData = {
            ansvarligKontrollerende: {
                organisasjonsnummer: '911455307',
                navn: 'SÆBØVÅGEN OG LONGYEARBYEN',
                kontaktperson: {
                    navn: 'Bjarne Røros'
                }
            },
            ansvarsomraade: {
                erklaertAnsvarsrettDato: '23.06.2016',
                beskrivelse: 'Kontrollering av vann og avløp, samt sanitære installasjoner'
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
                        <Header content="Ansvarlig kontrollerende" size={2}></Header>
                        <dl className={formsStyle.fieldList}>
                            <div className={formsStyle.flex50}>
                                <dt>Organisasjonsnummer</dt><dd>{dummyData.ansvarligKontrollerende.organisasjonsnummer}</dd>
                            </div>
                            <div className={formsStyle.flex50}>
                                <dt>Navn på foretak</dt><dd>{dummyData.ansvarligKontrollerende.navn}</dd>
                            </div>
                            <div className={formsStyle.flex100}>
                                <dt>Kontaktperson</dt><dd>{dummyData.ansvarligKontrollerende.kontaktperson?.navn}</dd>
                            </div>
                        </dl>
                    </Paper>
                    <Paper>
                        <Header content="Ansvarsområde" size={2}></Header>
                        <dl className={formsStyle.fieldList}>
                            <div className={formsStyle.flex100}>
                                <dt>Dato for erklært ansvarsrett</dt><dd>{dummyData.ansvarsomraade.erklaertAnsvarsrettDato}</dd>
                            </div>
                            <div className={formsStyle.flex100}>
                                <dt>Beskrivelse av ansvarsområdet:</dt><dd>{dummyData.ansvarsomraade.beskrivelse}</dd>
                            </div>
                        </dl>
                    </Paper>
                    <div className={formsStyle.buttonRow}>
                        <Link to={{ pathname: 'start', search: window.location.search }}>
                            <Button color="primary" content="Forrige" arrow='left' />
                        </Link>
                        <Link to={{ pathname: 'sluttrapport', search: window.location.search }}>
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
    selectedSubmission: state.selectedSubmission,
    selectedForm: state.selectedForm
});

const mapDispatchToProps = {
    updateSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(ErklaeringenGjelder);


