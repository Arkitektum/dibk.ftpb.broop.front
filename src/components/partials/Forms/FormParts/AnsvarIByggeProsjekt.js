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

    handleOnChange(value, property, index) {
        let updatedAnsvarsomraader = this.props.ansvarsomraader;
        updatedAnsvarsomraader[index][property] = value;
        this.props.onChange(updatedAnsvarsomraader);
    }

    handleFunksjonOnChange(selectedOptionValue, property, index) {
        const selectedCodelistItem = this.props.codelistFunksjon?.containeditems.find(item => {
            return item.codevalue === selectedOptionValue;
        });
        if (selectedCodelistItem) {
            const value = {
                kodeverdi: selectedCodelistItem.codevalue,
                kodebeskrivelse: selectedCodelistItem.label
            }
            this.handleOnChange(value, property, index);
        }
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
            this.handleOnChange(value, property, index);
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
                                        onChange={(event) => { this.handleFunksjonOnChange(event.target.value, 'funksjon', index) }}
                                        label="Funksjon"
                                        value={ansvarsomraade.funksjon?.kodeverdi}
                                        contentOnly
                                        keyAsContent
                                        options={this.convertCodelistFunksjonToOptionValues(this.props.codelistFunksjon)} />
                                </div>
                                <div className={formsStyle.flex50}>
                                    <InputField
                                        id={`ansvarsomraade-${index}-beskrivelseAvAnsvarsomraade`}
                                        onChange={(event) => { this.handleOnChange(event.target.value, 'beskrivelseAvAnsvarsomraade', index) }}
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
                                                onChange={(event) => { this.handleOnChange(event.target.checked, 'samsvarKontrollVedRammetillatelse', index) }}
                                                checked={ansvarsomraade.samsvarKontrollVedRammetillatelse ? true : false}
                                                contentOnly>
                                                Rammetillatelse
                                            </CheckBoxListItem>
                                            <CheckBoxListItem
                                                id={`ansvarsomraade-${index}-samsvarKontrollVedIgangsettingstillatelse`}
                                                onChange={(event) => { this.handleOnChange(event.target.checked, 'samsvarKontrollVedIgangsettingstillatelse', index) }}
                                                checked={ansvarsomraade.samsvarKontrollVedIgangsettingstillatelse ? true : false}
                                                contentOnly>
                                                Igangsettingstillatelse
                                            </CheckBoxListItem>
                                            <CheckBoxListItem
                                                id={`ansvarsomraade-${index}-samsvarKontrollVedMidlertidigBrukstillatelse`}
                                                onChange={(event) => { this.handleOnChange(event.target.checked, 'samsvarKontrollVedMidlertidigBrukstillatelse', index) }}
                                                checked={ansvarsomraade.samsvarKontrollVedMidlertidigBrukstillatelse ? true : false}
                                                contentOnly>
                                                Midlertidig brukstillatelse
                                            </CheckBoxListItem>
                                            <CheckBoxListItem
                                                id={`ansvarsomraade-${index}-samsvarKontrollVedFerdigattest`}
                                                onChange={(event) => { this.handleOnChange(event.target.checked, 'samsvarKontrollVedFerdigattest', index) }}
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
    onChange: PropTypes.func.isRequired
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
