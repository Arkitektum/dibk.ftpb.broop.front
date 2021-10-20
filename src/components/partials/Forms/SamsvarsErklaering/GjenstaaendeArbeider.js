// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { Header, Paper, RadioButtonListItem } from 'dibk-design';

// Actions
import { updateSelectedForm, saveSelectedForm } from 'actions/FormActions';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';


class GjenstaaendeArbeider extends Component {

    handleOnAnsvarsrettProsjekterendeSelect(property) {
        const formData = this.props.selectedForm?.formData;
        const accessToken = this.props.oidc?.user?.access_token;
        this.props.updateSelectedForm({
            ...this.props.selectedForm,
            formData: {
                ...formData,
                ansvarsrettProsjekterende: {
                    ...formData.ansvarsrettProsjekterende,
                    okForFerdigattest: property === 'okForFerdigattest',
                    okForRammetillatelse: property === 'okForRammetillatelse',
                    okForIgangsetting: property === 'okForIgangsetting',
                    okForMidlertidigBrukstillatelse: property === 'okForMidlertidigBrukstillatelse'
                }
            }
        }).then(selectedForm => {
            this.props.saveSelectedForm(selectedForm, accessToken);
        });
    }

    render() {
        const formData = this.props.selectedForm?.formData;

        return formData ? (
            <React.Fragment>
                <Paper>
                    <Header content="Gjenstående arbeider" size={2}></Header>
                    <fieldset className={formsStyle.fieldset}>
                        <legend>Det er ikke avdekket gjenstående arbeider innenfor arbeidsområdet som er til hinder for å gi:</legend>
                        <RadioButtonListItem
                            id={`gjenstaaendeArbeiderTilHinder-rammetillatelse`}
                            name="gjenstaaendeArbeiderTilHinder"
                            onChange={() => this.handleOnAnsvarsrettProsjekterendeSelect('okForRammetillatelse')}
                            checked={formData.ansvarsrettProsjekterende?.okForRammetillatelse}
                            inputValue="okForRammetillatelse">
                            Rammetillatelse
                        </RadioButtonListItem>
                        <RadioButtonListItem
                            id={`gjenstaaendeArbeiderTilHinder-igangsettingstillatelseEttTrinnsTillatelse`}
                            name="gjenstaaendeArbeiderTilHinder"
                            onChange={() => this.handleOnAnsvarsrettProsjekterendeSelect('okForIgangsetting')}
                            checked={formData.ansvarsrettProsjekterende?.okForIgangsetting}
                            inputValue="okForIgangsetting">
                            Igangsettingstillatelse/ ett-trinns tillatelse
                        </RadioButtonListItem>
                        <RadioButtonListItem
                            id={`gjenstaaendeArbeiderTilHinder-midlertidigBrukstillatelse`}
                            name="midlertidigBrukstillatelse"
                            onChange={() => this.handleOnAnsvarsrettProsjekterendeSelect('okForMidlertidigBrukstillatelse')}
                            checked={formData.ansvarsrettProsjekterende?.okForMidlertidigBrukstillatelse}
                            inputValue="okForMidlertidigBrukstillatelse">
                            Midlertidig brukstillatelse
                        </RadioButtonListItem>
                        <RadioButtonListItem
                            id={`gjenstaaendeArbeiderTilHinder-ferdigattest`}
                            name="ferdigattest"
                            onChange={() => this.handleOnAnsvarsrettProsjekterendeSelect('okForFerdigattest')}
                            checked={formData.ansvarsrettProsjekterende?.okForFerdigattest}
                            inputValue="okForFerdigattest">
                            Ferdigattest
                        </RadioButtonListItem>
                    </fieldset>
                </Paper>
            </React.Fragment>
        ) : ''
    }
}

const mapStateToProps = state => ({
    selectedForm: state.selectedForm,
    oidc: state.oidc
});

const mapDispatchToProps = {
    updateSelectedForm,
    saveSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(GjenstaaendeArbeider);


