// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// DIBK Design
import { Accordion, CheckBoxListItem, InputField, RadioButtonListItem, Select } from 'dibk-design';

// Actions
import { fetchCodelistFunksjon, fetchCodelistTiltaksklasse } from 'actions/CodelistActions';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class AnsvarIByggeProsjekt extends Component {

    componentDidMount() {
        const hasCodelistFunksjon = this.props.codelistFunksjon && Object.keys(this.props.codelistFunksjon).length;
        const hasCodelistTiltaksklasse = this.props.codelistTiltaksklasse && Object.keys(this.props.codelistTiltaksklasse).length;
        if (!hasCodelistFunksjon) {
            this.props.fetchCodelistFunksjon();
        }
        if (!hasCodelistTiltaksklasse) {
            this.props.fetchCodelistTiltaksklasse();
        }
    }

    handleUpdate(value, property, index) {
        let updatedAnsvarsomraader = this.props.ansvarsomraader;
        updatedAnsvarsomraader[index][property] = value;
        return this.props.updateHandler(updatedAnsvarsomraader);
    }

    handleSave(){
        this.props.saveHandler();
    }

    handleTiltaksklasseOnChange(selectedOptionValue, property, index) {
        const selectedCodelistItem = this.props.codelistTiltaksklasse?.containeditems.find(item => {
            return item.codevalue === selectedOptionValue;
        });
        if (selectedCodelistItem) {
            const value = {
                kodeverdi: selectedCodelistItem.codevalue,
                kodebeskrivelse: selectedCodelistItem.label
            }
            this.handleUpdate(value, property, index).then(() => {
                this.handleSave()
            });
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

    convertCodelistTiltaksklasseToOptionValues(codelistTiltaksklasse) {
        return codelistTiltaksklasse?.containeditems?.length
            ? codelistTiltaksklasse?.containeditems.map(item => {
                return {
                    key: item.label,
                    value: item.codevalue
                }
            }) : []
    }

    render() {
        const ansvarsomraader = this.props.ansvarsomraader;
        return ansvarsomraader?.length
            ? ansvarsomraader.map((ansvarsomraade, index) => {
                const hasSamsvarKontroll = [
                    ansvarsomraade.samsvarKontrollVedRammetillatelse,
                    ansvarsomraade.samsvarKontrollVedIgangsettingstillatelse,
                    ansvarsomraade.samsvarKontrollVedMidlertidigBrukstillatelse,
                    ansvarsomraade.samsvarKontrollVedFerdigattest
                ].some(samsvarKontroll => { return samsvarKontroll });
                return (
                    <div key={index} className={formsStyle.accordionItem}>
                        <Accordion title={ansvarsomraade.beskrivelseAvAnsvarsomraade || ''} >
                            <div className={formsStyle.inputGroup}>
                                <div className={formsStyle.flex50}>
                                    {/* TODO: Check if select field and API-request for code list is necessary */}
                                    <Select
                                        id={`ansvarsomraade-${index}-funksjon`}
                                        onChange={() => {return false}}
                                        label="Funksjon"
                                        value={ansvarsomraade.funksjon?.kodeverdi}
                                        contentOnly
                                        keyAsContent
                                        options={this.convertCodelistFunksjonToOptionValues(this.props.codelistFunksjon)} />
                                </div>
                                <div className={formsStyle.flex50}>
                                    <InputField
                                        id={`ansvarsomraade-${index}-beskrivelseAvAnsvarsomraade`}
                                        onChange={(event) => { this.handleUpdate(event.target.value, 'beskrivelseAvAnsvarsomraade', index) }}
                                        onBlur={() => this.handleSave()}
                                        label="Beskrivelse av ansvarsområdet"
                                        value={ansvarsomraade.beskrivelseAvAnsvarsomraade || ''} />
                                </div>
                                <div className={formsStyle.flexAuto}>
                                    <Select
                                        id={`ansvarsomraade-${index}-tiltaksklasse`}
                                        onChange={(event) => { this.handleTiltaksklasseOnChange(event.target.value, 'tiltaksklasse', index) }}
                                        label="Tiltaksklasse"
                                        value={ansvarsomraade.tiltaksklasse?.kodeverdi}
                                        options={this.convertCodelistTiltaksklasseToOptionValues(this.props.codelistTiltaksklasse)} />
                                </div>
                            </div>
                            {
                                hasSamsvarKontroll
                                    ? (
                                        <fieldset className={formsStyle.fieldset}>
                                            <legend>Våre samsvarserklæringer/kontrollerklæringer vil foreligge ved (gjelder ikke for SØK)</legend>
                                            <CheckBoxListItem
                                                id={`ansvarsomraade-${index}-samsvarKontrollVedRammetillatelse`}
                                                onChange={() => { return null }}
                                                checked={ansvarsomraade.samsvarKontrollVedRammetillatelse ? true : false}
                                                contentOnly>
                                                Rammetillatelse
                                            </CheckBoxListItem>
                                            <CheckBoxListItem
                                                id={`ansvarsomraade-${index}-samsvarKontrollVedIgangsettingstillatelse`}
                                                onChange={() => { return null }}
                                                checked={ansvarsomraade.samsvarKontrollVedIgangsettingstillatelse ? true : false}
                                                contentOnly>
                                                Igangsettingstillatelse
                                            </CheckBoxListItem>
                                            <CheckBoxListItem
                                                id={`ansvarsomraade-${index}-samsvarKontrollVedMidlertidigBrukstillatelse`}
                                                onChange={() => { return null }}
                                                checked={ansvarsomraade.samsvarKontrollVedMidlertidigBrukstillatelse ? true : false}
                                                contentOnly>
                                                Midlertidig brukstillatelse
                                            </CheckBoxListItem>
                                            <CheckBoxListItem
                                                id={`ansvarsomraade-${index}-samsvarKontrollVedFerdigattest`}
                                                onChange={() => { return null }}
                                                checked={ansvarsomraade.samsvarKontrollVedFerdigattest ? true : false}
                                                contentOnly>
                                                Ferdigattest
                                            </CheckBoxListItem>
                                        </fieldset>
                                    )
                                    : ''
                            }

                            <fieldset className={formsStyle.fieldset}>
                                <legend>Har foretaket sentral godkjenning som dekker ansvarsområdet?</legend>
                                <RadioButtonListItem
                                    id={`ansvarsomraade-${index}-dekkesOmraadeAvSentralGodkjenningSpecified-true`}
                                    name="dekkesOmraadeAvSentralGodkjenningSpecified"
                                    onChange={(event) => { this.handleOnChange(true, 'dekkesOmraadeAvSentralGodkjenningSpecified', index) }}
                                    inputValue="true"
                                    checked={ansvarsomraade.dekkesOmraadeAvSentralGodkjenningSpecified ? true : false}>
                                    Ja
                                </RadioButtonListItem>
                                <RadioButtonListItem
                                    id={`ansvarsomraade-${index}-dekkesOmraadeAvSentralGodkjenningSpecified-false`}
                                    name="dekkesOmraadeAvSentralGodkjenningSpecified"
                                    onChange={(event) => { this.handleOnChange(false, 'dekkesOmraadeAvSentralGodkjenningSpecified', index) }}
                                    inputValue="false"
                                    checked={!ansvarsomraade.dekkesOmraadeAvSentralGodkjenningSpecified ? true : false}>
                                    Nei
                                </RadioButtonListItem>
                            </fieldset>
                        </Accordion>
                    </div>
                )
            })
            : (
                <p>Ingen data for Eiendom/Byggested</p>
            )
    }
}

AnsvarIByggeProsjekt.propTypes = {
    ansvarsomraader: PropTypes.array.isRequired,
    updateHandler: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    codelistFunksjon: state.codelistFunksjon,
    codelistTiltaksklasse: state.codelistTiltaksklasse
});

const mapDispatchToProps = {
    fetchCodelistFunksjon,
    fetchCodelistTiltaksklasse
};

export default connect(mapStateToProps, mapDispatchToProps)(AnsvarIByggeProsjekt);
