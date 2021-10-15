// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// DIBK Design
import { Accordion, Button, CheckBoxListItem, Label, Textarea } from 'dibk-design';

// Actions
import { fetchCodelistFunksjon } from 'actions/CodelistActions';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';


class AnsvarIByggeProsjektList extends Component {

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

    componentDidMount() {
        const hasCodelistFunksjon = this.props.codelistFunksjon && Object.keys(this.props.codelistFunksjon).length;
        if (!hasCodelistFunksjon) {
            this.props.fetchCodelistFunksjon();
        }
    }

    handleUpdate(value, property, index) {
        let updatedAnsvarsomraader = this.props.ansvarsomraader;
        updatedAnsvarsomraader[index][property] = value;
        return this.props.updateHandler(updatedAnsvarsomraader);
    }

    handleSave() {
        this.props.saveHandler();
    }

    validateBeskrivelseAvAnsvarsomraade(beskrivelseAvAnsvarsomraade) {
        let message;
        if (beskrivelseAvAnsvarsomraade?.length >= 2000) {
            message = 'Beskrivelsen kan ikke være lenger enn 2000 tegn.';
        } else if (beskrivelseAvAnsvarsomraade?.length === 0) {
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
        const oldValue = this.props.ansvarsomraader[index][property];
        this.handleUpdate(newValue, property, index);
        if (newValue !== oldValue) {
            this.handleSave()
        }
    }

    convertCodelistFunksjonToOptionValues(codelistFunksjon) {
        return codelistFunksjon?.containeditems?.length
            ? codelistFunksjon?.containeditems.map(item => {
                return {
                    key: item.label,
                    value: item.codevalue
                }
            }) : []
    }

    getOptionKeyFromOptionValueInList(codelist, value) {
        return codelist.find(codelistItem => {
            return codelistItem.value === value;
        })?.key;
    }

    render() {
        const ansvarsomraader = this.props.ansvarsomraader;
        return ansvarsomraader?.length
            ? ansvarsomraader.map((ansvarsomraade, index) => {
                const funksjonOptionValues = this.convertCodelistFunksjonToOptionValues(this.props.codelistFunksjon);
                const selectedFunksjonKey = this.getOptionKeyFromOptionValueInList(funksjonOptionValues, ansvarsomraade.funksjonKode);
                const accordionTitle = `${selectedFunksjonKey}${ansvarsomraade?.funksjonKode !== 'SØK' ? ' (tiltaksklasse' + ansvarsomraade.tiltaksklasseKode + ')' : ''}`;
                return (
                    <div key={index} className={formsStyle.accordionItem}>
                        <Accordion title={accordionTitle} expanded color="lightLime">
                            {/* TODO: Check if select field and API-request for code list is necessary */}

                            <div className={formsStyle.fieldSection}>
                                {
                                    ansvarsomraade.funksjonKode === "SØK"
                                        ? "Erklæringen brukes ved endring av ansvarlig søker."
                                        : (
                                            <div className={`${formsStyle.inputGroup} hide-on-print`}>
                                                <div className={formsStyle.flex100}>
                                                    <Label><b>Beskrivelse av ansvarsområde</b></Label>
                                                    Beskrivelsen under er skrevet av ansvarlig søker, men du kan oppdatere den.
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
                                            </div>
                                        )
                                }
                            </div>
                            <div className={formsStyle.fieldSection}>
                                <Label><b>Tiltaksklasse</b></Label>
                                <div className={`${formsStyle.inputGroup} ${formsStyle.buttonRow}`}>
                                    <div className={formsStyle.flexAuto}>
                                        <Button
                                            content="1"
                                            size="small"
                                            rounded
                                            onClick={() => this.handleUpdateAndSaveIfChanged('1', 'tiltaksklasseKode', index)}
                                            noHover
                                            color={ansvarsomraade.tiltaksklasseKode === '1' ? 'primary' : 'default'}
                                        />
                                    </div>
                                    <div className={formsStyle.flexAuto}>
                                        <Button
                                            content="2"
                                            size="small"
                                            rounded
                                            onClick={() => this.handleUpdateAndSaveIfChanged('2', 'tiltaksklasseKode', index)}
                                            noHover
                                            color={ansvarsomraade.tiltaksklasseKode === '2' ? 'primary' : 'default'}
                                        />
                                    </div>
                                    <div className={formsStyle.flexAuto}>
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
                            </div>
                            {
                                ansvarsomraade?.funksjonKode !== 'SØK'
                                    ? (
                                        <React.Fragment>
                                            <div className={formsStyle.fieldSection}>
                                                <Label><b>{ansvarsomraade?.funksjonKode === 'KONTROLL' ? 'Kontrollerklæringer vil foreligge ved' : 'Samsvarserklæringer vil foreligge ved'}</b></Label>
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
                                            <div className={formsStyle.fieldSection}>
                                                <Label>
                                                    <b>Dekker den sentrale godkjenningen ansvarsområdene over?</b>
                                                </Label>
                                                <div className={`${formsStyle.inputGroup} ${formsStyle.buttonRow}`}>
                                                    <div>
                                                        <Button content="Ja" size="small" rounded onClick={() => this.handleUpdateAndSaveIfChanged(true, 'dekkesOmradetAvSentralGodkjenning', index)} noHover color={ansvarsomraade.dekkesOmradetAvSentralGodkjenning === true ? 'primary' : 'default'} />
                                                    </div>
                                                    <div>
                                                        <Button content="Nei" size="small" rounded onClick={() => this.handleUpdateAndSaveIfChanged(false, 'dekkesOmradetAvSentralGodkjenning', index)} noHover color={ansvarsomraade.dekkesOmradetAvSentralGodkjenning === false ? 'primary' : 'default'} />
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                                    : ''
                            }
                        </Accordion>
                    </div>
                )
            })
            : (
                <p>Ingen data for Eiendom/Byggested</p>
            )
    }
}

AnsvarIByggeProsjektList.propTypes = {
    ansvarsomraader: PropTypes.array.isRequired,
    updateHandler: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    codelistFunksjon: state.codelistFunksjon
});

const mapDispatchToProps = {
    fetchCodelistFunksjon
};

export default connect(mapStateToProps, mapDispatchToProps)(AnsvarIByggeProsjektList);
