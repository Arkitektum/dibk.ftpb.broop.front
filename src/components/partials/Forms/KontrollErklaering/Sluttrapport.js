// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// DIBK Design
import { Button, CheckBoxListItem, Header, Paper } from 'dibk-design';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class Sluttrapport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avvik: {
                ingen: false,
                observert: false,
                aapne: false
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header content="Sluttrapport for kontroll"></Header>
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
                <div className={formsStyle.buttonRow}>
                    <Link to={{ pathname: 'erklaeringenGjelder', search: window.location.search }}>
                        <Button color="primary" content="Forrige" arrow='left' />
                    </Link>
                    <Link to={{ pathname: 'erklaering', search: window.location.search }}>
                        <Button color="primary" content="Neste" arrow='right' />
                    </Link>
                </div>
            </React.Fragment>
        )

    }
}

export default connect(null, null)(Sluttrapport);
