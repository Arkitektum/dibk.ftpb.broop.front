// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// DIBK Design
import { Accordion, Button, CheckBoxListItem, Label, Textarea } from 'dibk-design';

// Actions
import {
    validateBeskrivelseForSingleAnsvarsomraade,
    validateSamsvarKontrollCheckboxesForSingleAnsvarsomraade,
    validateDekkesOmradetAvSentralGodkjenningForSingleAnsvarsomraade,
    validateTiltaksklasseForSingleAnsvarsomraade
} from 'actions/ValidationActions';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';
import commonStyle from 'components/routes/common.module.scss'

class AnsvarIByggeProsjekt extends Component {

    handleUpdate(value, property, index) {
        return this.props.updateHandler(value, property, index);
    }

    handleSave() {
        this.props.saveHandler();
    }

    handleUpdateAndSaveIfChanged(newValue, property, index) {
        const oldValue = this.props.ansvarsomraade[property];
        this.handleUpdate(newValue, property, index);
        if (newValue !== oldValue) {
            this.handleSave();
        }
    }

    samsvarKontrollHasErrors(ansvarsomraade, index) {
        if (ansvarsomraade.funksjonKode === "UTF" || ansvarsomraade.funksjonKode === "PRO") {
            return this.props.validationMessages?.ansvarsomraader?.[index]?.samsvarCheckboxes?.message?.length > 0 ? true : false;
        } else if (ansvarsomraade.funksjonKode === "KONTROLL") {
            return this.props.validationMessages?.ansvarsomraader?.[index]?.kontrollCheckboxes?.message?.length > 0 ? true : false;
        } else {
            return false
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
            <div key={index} className={commonStyle.marginBottomSmall}>
                <Accordion title={accordionTitle} expanded color="lightLime">
                    <div className={formsStyle.fieldSection}>
                        {
                            ansvarsomraade.funksjonKode === "SØK"
                                ? "Erklæringen brukes ved endring av ansvarlig søker."
                                : (
                                    <Textarea
                                        id={`ansvarsomraade-${index}-beskrivelseAvAnsvarsomraade`}
                                        label="Beskrivelse av ansvarsområde"
                                        onBlur={event => {
                                            this.handleUpdateAndSaveIfChanged(event.target.value, 'beskrivelseAvAnsvarsomraade', index);
                                            this.props.validateBeskrivelseForSingleAnsvarsomraade(index);
                                        }}
                                        resize="vertical"
                                        hasErrors={this.props.validationMessages?.ansvarsomraader?.[index]?.beskrivelseAvAnsvarsomraade?.message?.length > 0}
                                        errorMessage={this.props.validationMessages?.ansvarsomraader?.[index]?.beskrivelseAvAnsvarsomraade?.message}
                                        defaultValue={ansvarsomraade.beskrivelseAvAnsvarsomraade || ''}
                                    />
                                )
                        }
                    </div>
                    <div className={formsStyle.fieldSection}>
                        <Label normalCursor>Tiltaksklasse</Label>
                        <div className={`${formsStyle.buttonRow} ${this.props.validationMessages?.ansvarsomraader?.[index]?.tiltaksklasse?.message?.length ? formsStyle.hasErrors : ''}`}>
                            <Button
                                content="1"
                                size="small"
                                rounded
                                onClick={() => {
                                    this.handleUpdateAndSaveIfChanged('1', 'tiltaksklasseKode', index);
                                    this.props.validateTiltaksklasseForSingleAnsvarsomraade(index);
                                }}
                                noHover
                                color={ansvarsomraade.tiltaksklasseKode === '1' ? 'primary' : 'default'}
                            />
                            <Button
                                content="2"
                                size="small"
                                rounded
                                onClick={() => {
                                    this.handleUpdateAndSaveIfChanged('2', 'tiltaksklasseKode', index);
                                    this.props.validateTiltaksklasseForSingleAnsvarsomraade(index);
                                }}
                                noHover
                                color={ansvarsomraade.tiltaksklasseKode === '2' ? 'primary' : 'default'}
                            />
                            <Button
                                content="3"
                                size="small"
                                rounded
                                onClick={() => {
                                    this.handleUpdateAndSaveIfChanged('3', 'tiltaksklasseKode', index);
                                    this.props.validateTiltaksklasseForSingleAnsvarsomraade(index);
                                }}
                                noHover
                                color={ansvarsomraade.tiltaksklasseKode === '3' ? 'primary' : 'default'}
                            />
                        </div>
                        {
                            this.props.validationMessages?.ansvarsomraader?.[index]?.tiltaksklasse?.message?.length
                                ? <span className={formsStyle.warningMessage}>{this.props.validationMessages.ansvarsomraader[index].tiltaksklasse.message}</span>
                                : ''
                        }
                    </div>
                    {
                        ansvarsomraade?.funksjonKode !== 'SØK'
                            ? (
                                <React.Fragment>
                                    <div className={formsStyle.fieldSection}>
                                        <Label normalCursor>
                                            {ansvarsomraade?.funksjonKode === 'KONTROLL' ? 'Kontrollerklæringer vil foreligge ved' : 'Samsvarserklæringer vil foreligge ved'}
                                        </Label>
                                        {
                                            ansvarsomraade?.funksjonKode !== 'UTF'
                                                ? (
                                                    <React.Fragment>
                                                        <CheckBoxListItem
                                                            id={`ansvarsomraade-${index}-samsvarKontrollVedRammetillatelse`}
                                                            onChange={event => {
                                                                this.handleUpdateAndSaveIfChanged(event.target.checked, 'samsvarKontrollVedRammetillatelse', index);
                                                                this.props.validateSamsvarKontrollCheckboxesForSingleAnsvarsomraade(this.props.index);
                                                            }}
                                                            checked={ansvarsomraade.samsvarKontrollVedRammetillatelse}
                                                            hasErrors={this.samsvarKontrollHasErrors(ansvarsomraade, index)}
                                                            compact
                                                        >
                                                            Rammetillatelse
                                                        </CheckBoxListItem>
                                                        <CheckBoxListItem
                                                            id={`ansvarsomraade-${index}-samsvarKontrollVedIgangsettingstillatelse`}
                                                            onChange={event => {
                                                                this.handleUpdateAndSaveIfChanged(event.target.checked, 'samsvarKontrollVedIgangsettingstillatelse', index);
                                                                this.props.validateSamsvarKontrollCheckboxesForSingleAnsvarsomraade(this.props.index);
                                                            }}
                                                            checked={ansvarsomraade.samsvarKontrollVedIgangsettingstillatelse}
                                                            hasErrors={this.samsvarKontrollHasErrors(ansvarsomraade, index)}
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
                                            onChange={event => {
                                                this.handleUpdateAndSaveIfChanged(event.target.checked, 'samsvarKontrollVedMidlertidigBrukstillatelse', index);
                                                this.props.validateSamsvarKontrollCheckboxesForSingleAnsvarsomraade(this.props.index);
                                            }}
                                            checked={ansvarsomraade.samsvarKontrollVedMidlertidigBrukstillatelse}
                                            hasErrors={this.samsvarKontrollHasErrors(ansvarsomraade, index)}
                                            compact
                                        >
                                            Midlertidig brukstillatelse
                                        </CheckBoxListItem>
                                        <CheckBoxListItem
                                            id={`ansvarsomraade-${index}-samsvarKontrollVedFerdigattest`}
                                            onChange={event => {
                                                this.handleUpdateAndSaveIfChanged(event.target.checked, 'samsvarKontrollVedFerdigattest', index);
                                                this.props.validateSamsvarKontrollCheckboxesForSingleAnsvarsomraade(this.props.index);
                                            }}
                                            checked={ansvarsomraade.samsvarKontrollVedFerdigattest}
                                            hasErrors={this.samsvarKontrollHasErrors(ansvarsomraade, index)}
                                            compact
                                        >
                                            Ferdigattest
                                        </CheckBoxListItem>
                                        {
                                            this.samsvarKontrollHasErrors(ansvarsomraade, index) && ansvarsomraade?.funksjonKode === 'KONTROLL'
                                                ? <span className={formsStyle.warningMessage}>{this.props.validationMessages?.ansvarsomraader?.[index]?.kontrollCheckboxes?.message}</span>
                                                : ''
                                        }
                                        {
                                            this.samsvarKontrollHasErrors(ansvarsomraade, index) && (ansvarsomraade?.funksjonKode === 'UTF' || ansvarsomraade?.funksjonKode === 'PRO')
                                                ? <span className={formsStyle.warningMessage}>{this.props.validationMessages?.ansvarsomraader?.[index]?.samsvarCheckboxes?.message}</span>
                                                : ''
                                        }
                                    </div>
                                    {
                                        this.props.selectedForm?.formData?.ansvarligForetak?.harSentralGodkjenning
                                            ? (
                                                <div className={formsStyle.fieldSection}>
                                                    <Label>Dekker den sentrale godkjenningen ansvarsområdet?</Label>
                                                    <div className={`${formsStyle.buttonRow} ${this.props.validationMessages?.ansvarsomraader?.[index]?.dekkesOmradetAvSentralGodkjenning?.message?.length ? formsStyle.hasErrors : ''}`}>
                                                        <div>
                                                            <Button content="Ja" size="small" rounded onClick={() => {
                                                                this.handleUpdateAndSaveIfChanged(true, 'dekkesOmradetAvSentralGodkjenning', index);
                                                                this.props.validateDekkesOmradetAvSentralGodkjenningForSingleAnsvarsomraade(index);
                                                            }} noHover color={ansvarsomraade.dekkesOmradetAvSentralGodkjenning === true ? 'primary' : 'default'} />
                                                        </div>
                                                        <div>
                                                            <Button content="Nei" size="small" rounded onClick={() => {
                                                                this.handleUpdateAndSaveIfChanged(false, 'dekkesOmradetAvSentralGodkjenning', index);
                                                                this.props.validateDekkesOmradetAvSentralGodkjenningForSingleAnsvarsomraade(index);
                                                            }} noHover color={ansvarsomraade.dekkesOmradetAvSentralGodkjenning === false ? 'primary' : 'default'} />
                                                        </div>
                                                    </div>
                                                    {
                                                        this.props.validationMessages?.ansvarsomraader?.[index]?.dekkesOmradetAvSentralGodkjenning?.message?.length
                                                            ? <span className={formsStyle.warningMessage}>{this.props.validationMessages.ansvarsomraader[index].dekkesOmradetAvSentralGodkjenning.message}</span>
                                                            : ''
                                                    }
                                                </div>
                                            )
                                            : ''
                                    }
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
    selectedForm: state.selectedForm,
    validationMessages: state.validationMessages
});

const mapDispatchToProps = {
    validateBeskrivelseForSingleAnsvarsomraade,
    validateSamsvarKontrollCheckboxesForSingleAnsvarsomraade,
    validateDekkesOmradetAvSentralGodkjenningForSingleAnsvarsomraade,
    validateTiltaksklasseForSingleAnsvarsomraade
};


export default connect(mapStateToProps, mapDispatchToProps)(AnsvarIByggeProsjekt);
