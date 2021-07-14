// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// DIBK Design
import { Button, CheckBoxListItem, Header, Paper } from 'dibk-design';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';


class Erklaeringer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gjennomfoertKontroll: false
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header content="Erklæring"></Header>
                <Paper>
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
                <div className={formsStyle.buttonRow}>
                    <Link to={{ pathname: 'sluttrapport', search: window.location.search }}>
                        <Button color="primary" content="Forrige" arrow='left' />
                    </Link>
                </div>
            </React.Fragment>
        )
    }
}

export default connect(null, null)(Erklaeringer);


