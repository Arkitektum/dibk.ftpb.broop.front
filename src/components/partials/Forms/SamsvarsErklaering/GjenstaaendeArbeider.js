// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// DIBK Design
import { Button, Header, Paper, RadioButtonListItem } from 'dibk-design';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';


class GjenstaaendeArbeider extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header content="Gjenstående arbeider"></Header>
                <Paper>
                    <fieldset className={formsStyle.fieldset}>
                        <legend>Det er ikke avdekket gjenstående arbeider innenfor arbeidsområdet som er til hinder for å gi:</legend>
                        <RadioButtonListItem
                            id={`gjenstaaendeArbeiderTilHinder-rammetillatelse`}
                            name="gjenstaaendeArbeiderTilHinder"
                            onChange={() => { this.setState({ gjenstaaendeArbeiderTilHinder: 'rammetillatelse' }) }}
                            inputValue="rammetillatelse"
                            checked={this.state.gjenstaaendeArbeiderTilHinder === 'rammetillatelse' ? true : false}>
                            Rammetillatelse
                        </RadioButtonListItem>
                        <RadioButtonListItem
                            id={`gjenstaaendeArbeiderTilHinder-igangsettingstillatelseEttTrinnsTillatelse`}
                            name="gjenstaaendeArbeiderTilHinder"
                            onChange={() => { this.setState({ gjenstaaendeArbeiderTilHinder: 'igangsettingstillatelseEttTrinnsTillatelse' }) }}
                            inputValue="igangsettingstillatelseEttTrinnsTillatelse"
                            checked={this.state.gjenstaaendeArbeiderTilHinder === 'igangsettingstillatelseEttTrinnsTillatelse' ? true : false}>
                            Igangsettingstillatelse/ ett-trinns tillatelse
                        </RadioButtonListItem>
                        <RadioButtonListItem
                            id={`gjenstaaendeArbeiderTilHinder-midlertidigBrukstillatelse`}
                            name="midlertidigBrukstillatelse"
                            onChange={() => { this.setState({ gjenstaaendeArbeiderTilHinder: 'midlertidigBrukstillatelse' }) }}
                            inputValue="midlertidigBrukstillatelse"
                            checked={this.state.gjenstaaendeArbeiderTilHinder === 'midlertidigBrukstillatelse' ? true : false}>
                            Midlertidig brukstillatelse
                        </RadioButtonListItem>
                        <RadioButtonListItem
                            id={`gjenstaaendeArbeiderTilHinder-ferdigattest`}
                            name="ferdigattest"
                            onChange={() => { this.setState({ gjenstaaendeArbeiderTilHinder: 'ferdigattest' }) }}
                            inputValue="ferdigattest"
                            checked={this.state.gjenstaaendeArbeiderTilHinder === 'ferdigattest' ? true : false}>
                            Ferdigattest
                        </RadioButtonListItem>
                    </fieldset>
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


export default connect(null, null)(GjenstaaendeArbeider);


