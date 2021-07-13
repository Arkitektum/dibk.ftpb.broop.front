// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { CheckBoxListItem, Header, InputField, Paper } from 'dibk-design';

// Components
import EiendomByggested from 'components/partials/Forms/FormParts/EiendomByggested';

// Actions
import { updateSelectedForm } from 'actions/FormActions';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class KontrollErklaeringer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prosjektnavn: 'Bakkebygrenda',
            avvik: {
                ingen: false,
                observert: false,
                aapne: false
            },
            gjennomfoertKontroll: false
        }
    }

    componentDidMount() {
        if (this.props.selectedSubmission && Object.keys(this.props.selectedSubmission).length) {
            const formApiUrl = this.props.selectedSubmission?._links?.ansvarsrettdistribuert?.href;
            fetch(`https://dibk-ftpb-broop-api.azurewebsites.net${formApiUrl}`).then(res => res.json()).then(form => {
                this.props.updateSelectedForm(form);
            });
        }
    }

    componentDidUpdate() {
        const hasSelectedSubmission = this.props.selectedSubmission && Object.keys(this.props.selectedSubmission).length;
        const hasSelectedForm = this.props.selectedForm && Object.keys(this.props.selectedForm).length;
        if (hasSelectedSubmission && !hasSelectedForm) {
            const formApiUrl = this.props.selectedSubmission?._links?.ansvarsrettdistribuert?.href;
            fetch(`https://dibk-ftpb-broop-api.azurewebsites.net${formApiUrl}`).then(res => res.json()).then(form => {
                this.props.updateSelectedForm(form);
            });
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
                    <div className={formsStyle.headerSection}>
                        <Header content="Kontrollerklæring med sluttrapport"></Header>
                        <span className={formsStyle.subtitle}>etter plan- og bygningsloven(pbl) § 24-2, jf. SAK 10 § 12-5 og § 14-8</span>
                        <p>Etter signering blir erklæringen sendt til søker.</p>
                    </div>
                    <dl className={`${formsStyle.fieldList} ${formsStyle.inlineFieldList}`}>
                        <div className={formsStyle.flex50}>
                            <dt>Kommunens saksnummer (år/sekvensnummer):</dt>
                            <dd>{formData.kommunensSaksnummer?.saksaar}/{formData.kommunensSaksnummer?.sakssekvensnummer}</dd>
                        </div>
                    </dl>
                    <div className={formsStyle.inputGroup}>
                        <div className={formsStyle.flex50}>
                            <InputField
                                id={`prosjektnavn`}
                                onChange={(event) => { this.setState({ prosjektnavn: event.target.value }) }}
                                label="Prosjektnavn"
                                value={this.state.prosjektnavn} />
                        </div>
                    </div>

                    <h2>Erklæringen gjelder</h2>
                    <Paper>
                        <h3>Eiendom/Byggested</h3>
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
                        <h3>Ansvarsområde</h3>
                        <dl className={formsStyle.fieldList}>
                            <div className={formsStyle.flex100}>
                                <dt>Dato for erklært ansvarsrett</dt><dd>{dummyData.ansvarsomraade.erklaertAnsvarsrettDato}</dd>
                            </div>
                            <div className={formsStyle.flex100}>
                                <dt>Beskrivelse av ansvarsområdet:</dt><dd>{dummyData.ansvarsomraade.beskrivelse}</dd>
                            </div>
                        </dl>
                    </Paper>

                    <h2>Sluttrapport for kontroll</h2>
                    <Paper>
                        <p>
                            Kryss av for om det er funnet avvik og om disse er lukket. Plan for uavhengig kontroll kan legges ved dette skjemaet ved å trykke på 'Oversikt - skjema og vedlegg' øverst til venstre.
                        </p>
                        <CheckBoxListItem
                            id={`ansvarsomraade-avvik-ingen`}
                            onChange={(event) => {

                                this.setState(
                                    event.target.checked
                                        ? {
                                            avvik: {
                                                ingen: true,
                                                observert: false,
                                                aapne: false
                                            }
                                        }
                                        : {
                                            avvik: {
                                                ...this.state.avvik,
                                                ingen: false,
                                            }
                                        }
                                )
                            }}
                            checked={this.state.avvik.ingen ? true : false}>
                            Ingen avvik er funnet, se vedlagte plan for uavhengig kontroll
                        </CheckBoxListItem>
                        <CheckBoxListItem
                            id={`ansvarsomraade-avvik-observert`}
                            onChange={(event) => {
                                this.setState(
                                    event.target.checked
                                        ? {
                                            avvik: {
                                                ...this.state.avvik,
                                                ingen: false,
                                                observert: true
                                            }
                                        }
                                        : {
                                            avvik: {
                                                ...this.state.avvik,
                                                observert: false
                                            }
                                        }
                                )
                            }}
                            checked={this.state.avvik.observert ? true : false}>
                            Observerte avvik er lukket, se vedlagte plan for uavhengig kontroll
                        </CheckBoxListItem>
                        <CheckBoxListItem
                            id={`ansvarsomraade-avvik-aapne`}
                            onChange={(event) => {
                                this.setState(
                                    event.target.checked
                                        ? {
                                            avvik: {
                                                ...this.state.avvik,
                                                ingen: false,
                                                aapne: true
                                            }
                                        }
                                        : {
                                            avvik: {
                                                ...this.state.avvik,
                                                aapne: false
                                            }
                                        }
                                )
                            }}
                            checked={this.state.avvik.aapne ? true : false}>
                            Åpne avvik er rapportert til kommunen, se vedlagte plan for uavhengig kontroll
                        </CheckBoxListItem>
                    </Paper>

                    <Paper>
                        <Header content="Erklæring" size={2}></Header>
                        <CheckBoxListItem
                            id={`erklaering-gjennomfoertKontroll`}
                            onChange={(event) => { this.setState({ gjennomfoertKontroll: event.target.checked }) }}
                            checked={this.state.gjennomfoertKontroll ? true : false}>
                            Kontroll er gjennomført på en forskriftsmessig måte. Kontrollforetaket er uavhengig av foretakene som er kontrollert.
                        </CheckBoxListItem>
                        <p>
                            Ansvarlig kontrollerende foretak er kjent med reglene om straff og sanksjoner i plan- og bygningsloven kap.32, og at det kan medføre reaksjoner dersom vi har gitt uriktige opplysninger.
                        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(KontrollErklaeringer);


