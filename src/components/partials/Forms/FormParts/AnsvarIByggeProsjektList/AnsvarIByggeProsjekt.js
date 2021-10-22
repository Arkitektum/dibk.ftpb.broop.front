// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// DIBK Design
import { Accordion, Button, CheckBoxListItem, Label, Textarea } from 'dibk-design';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';


class AnsvarIByggeProsjekt extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {
                beskrivelseAvAnsvarsomraade: {
                    hasErrors: false,
                    message: null
                }
            }
        }
    }

    handleUpdate(value, property, index) {
        return this.props.updateHandler(value, property, index);
    }

    handleSave() {
        this.props.saveHandler();
    }

    validateBeskrivelseAvAnsvarsomraade(beskrivelseAvAnsvarsomraade) {
        let message;
        if (beskrivelseAvAnsvarsomraade?.length >= 2000) {
            message = 'Beskrivelsen kan ikke være lenger enn 2000 tegn.';
        } else if (beskrivelseAvAnsvarsomraade?.trim()?.length === 0) {
            message = 'Du må fylle ut en beskrivelse av ansvarsområdet.'
        }

        if (this.state.errors.beskrivelseAvAnsvarsomraade.message !== message) {
            this.setState({
                errors: {
                    ...this.state.errors,
                    beskrivelseAvAnsvarsomraade: {
                        hasErrors: message?.length > 0,
                        message
                    }
                }
            })
        }
    }

    handleUpdateAndSaveIfChanged(newValue, property, index) {
        const oldValue = this.props.ansvarsomraade[property];
        this.handleUpdate(newValue, property, index);
        if (newValue !== oldValue) {
            this.handleSave()
        }
    }


    render() {
        const ansvarsomraade = this.props.ansvarsomraade;
        const index = this.props.index;
        let accordionTitle = `${ansvarsomraade.funksjonBeskrivelse}`;
        if (ansvarsomraade?.funksjonKode !== 'SØK' && ansvarsomraade?.tiltaksklasseKode?.length) {
            accordionTitle += ` (tiltaksklasse ${ansvarsomraade.tiltaksklasseKode})`;
        }
        return (
            <div key={index} className={formsStyle.accordionItem}>
                <Accordion title={accordionTitle} expanded color="lightLime">
                    <div className={formsStyle.fieldSection}>
                        {
                            ansvarsomraade.funksjonKode === "SØK"
                                ? "Erklæringen brukes ved endring av ansvarlig søker."
                                : (
                                    <div className="hide-on-print">
                                        <Label>Beskrivelse av ansvarsområde</Label>
                                        <Textarea
                                            id={`ansvarsomraade-${index}-beskrivelseAvAnsvarsomraade`}
                                            onChange={event => this.validateBeskrivelseAvAnsvarsomraade(event.target.value)}
                                            onBlur={(event) => this.handleUpdateAndSaveIfChanged(event.target.value, 'beskrivelseAvAnsvarsomraade', index)}
                                            resize="vertical"
                                            hasErrors={this.state.errors.beskrivelseAvAnsvarsomraade.hasErrors}
                                            errorMessage={this.state.errors.beskrivelseAvAnsvarsomraade.message}
                                            defaultValue={ansvarsomraade.beskrivelseAvAnsvarsomraade || ''}
                                        />
                                    </div>
                                )
                        }
                    </div>
                    <div className={formsStyle.fieldSection}>
                        <Label>Tiltaksklasse</Label>
                        <div className={formsStyle.buttonRow}>
                            <Button
                                content="1"
                                size="small"
                                rounded
                                onClick={() => this.handleUpdateAndSaveIfChanged('1', 'tiltaksklasseKode', index)}
                                noHover
                                color={ansvarsomraade.tiltaksklasseKode === '1' ? 'primary' : 'default'}
                            />
                            <Button
                                content="2"
                                size="small"
                                rounded
                                onClick={() => this.handleUpdateAndSaveIfChanged('2', 'tiltaksklasseKode', index)}
                                noHover
                                color={ansvarsomraade.tiltaksklasseKode === '2' ? 'primary' : 'default'}
                            />
                            <Button
                                content="3"
                                size="small"
                                rounded
                                onClick={() => this.handleUpdateAndSaveIfChanged('3', 'tiltaksklasseKode', index)}
                                noHover
                                color={ansvarsomraade.tiltaksklasseKode === '3' ? 'primary' : 'default'}
                            />
                        </div>
                    </div>
                    {
                        ansvarsomraade?.funksjonKode !== 'SØK'
                            ? (
                                <React.Fragment>
                                    <div className={formsStyle.fieldSection}>
                                        <Label>{ansvarsomraade?.funksjonKode === 'KONTROLL' ? 'Kontrollerklæringer vil foreligge ved' : 'Samsvarserklæringer vil foreligge ved'}</Label>

                                        {
                                            ansvarsomraade?.funksjonKode !== 'UTF'
                                                ? (
                                                    <React.Fragment>
                                                        <CheckBoxListItem
                                                            id={`ansvarsomraade-${index}-samsvarKontrollVedRammetillatelse`}
                                                            onChange={(event) => this.handleUpdateAndSaveIfChanged(event.target.checked, 'samsvarKontrollVedRammetillatelse', index)}
                                                            checked={ansvarsomraade.samsvarKontrollVedRammetillatelse}
                                                            compact
                                                        >
                                                            Rammetillatelse
                                                        </CheckBoxListItem>
                                                        <CheckBoxListItem
                                                            id={`ansvarsomraade-${index}-samsvarKontrollVedIgangsettingstillatelse`}
                                                            onChange={(event) => this.handleUpdateAndSaveIfChanged(event.target.checked, 'samsvarKontrollVedIgangsettingstillatelse', index)}
                                                            checked={ansvarsomraade.samsvarKontrollVedIgangsettingstillatelse}
                                                            compact
                                                        >

                                                            Igangsettingstillatelse
                                                        </CheckBoxListItem>
                                                    </React.Fragment>
                                                )
                                                : ''
                                        }

                                        <CheckBoxListItem
                                            id={`ansvarsomraade-${index}-samsvarKontrollVedMidlertidigBrukstillatelse`}
                                            onChange={(event) => this.handleUpdateAndSaveIfChanged(event.target.checked, 'samsvarKontrollVedMidlertidigBrukstillatelse', index)}
                                            checked={ansvarsomraade.samsvarKontrollVedMidlertidigBrukstillatelse}
                                            compact
                                        >
                                            Midlertidig brukstillatelse
                                        </CheckBoxListItem>
                                        <CheckBoxListItem
                                            id={`ansvarsomraade-${index}-samsvarKontrollVedFerdigattest`}
                                            onChange={(event) => this.handleUpdateAndSaveIfChanged(event.target.checked, 'samsvarKontrollVedFerdigattest', index)}
                                            checked={ansvarsomraade.samsvarKontrollVedFerdigattest}
                                            compact
                                        >
                                            Ferdigattest
                                        </CheckBoxListItem>
                                    </div>
                                    {
                                        this.props.selectedForm?.formData?.ansvarligForetak?.harSentralGodkjenning
                                            ? (
                                                <div className={formsStyle.fieldSection}>
                                                    <Label>Dekker den sentrale godkjenningen ansvarsområdet?</Label>
                                                    <div className={formsStyle.buttonRow}>
                                                        <div>
                                                            <Button content="Ja" size="small" rounded onClick={() => this.handleUpdateAndSaveIfChanged(true, 'dekkesOmradetAvSentralGodkjenning', index)} noHover color={ansvarsomraade.dekkesOmradetAvSentralGodkjenning === true ? 'primary' : 'default'} />
                                                        </div>
                                                        <div>
                                                            <Button content="Nei" size="small" rounded onClick={() => this.handleUpdateAndSaveIfChanged(false, 'dekkesOmradetAvSentralGodkjenning', index)} noHover color={ansvarsomraade.dekkesOmradetAvSentralGodkjenning === false ? 'primary' : 'default'} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            : ''
                                    }
                                    <p>Ansvarlig søker har foreslått noen opplysninger, men du kan endre eller oppdatere beskrivelsen og valgene.</p>
                                </React.Fragment>
                            )
                            : ''
                    }
                </Accordion>
            </div>
        )
    }
}

AnsvarIByggeProsjekt.propTypes = {
    ansvarsomraade: PropTypes.object.isRequired,
    index: PropTypes.number,
    updateHandler: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    selectedForm: state.selectedForm
});


export default connect(mapStateToProps, null)(AnsvarIByggeProsjekt);
