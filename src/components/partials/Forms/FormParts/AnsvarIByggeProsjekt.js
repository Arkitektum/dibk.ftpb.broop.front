// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// DIBK Design
import { Accordion, Button, CheckBoxListItem, Label, Textarea } from 'dibk-design';

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

    handleSave() {
        this.props.saveHandler();
    }

    handleTiltaksklasseOnChange(selectedValue, property, index) {
        const value = {
            kodeverdi: selectedValue,
            kodebeskrivelse: selectedValue
        }
        this.handleUpdate(value, property, index).then(() => {
            this.handleSave()
        });
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
        const colors = {
            SØK: 'default',
            PRO: 'lightCyan',
            UTF: 'lightOrange',
            KONTROLL: 'lightLime'
        }
        const ansvarsomraader = this.props.ansvarsomraader;
        return ansvarsomraader?.length
            ? ansvarsomraader.map((ansvarsomraade, index) => {
                const hasSamsvarKontroll = [
                    ansvarsomraade.samsvarKontrollVedRammetillatelse,
                    ansvarsomraade.samsvarKontrollVedIgangsettingstillatelse,
                    ansvarsomraade.samsvarKontrollVedMidlertidigBrukstillatelse,
                    ansvarsomraade.samsvarKontrollVedFerdigattest
                ].some(samsvarKontroll => { return samsvarKontroll });
                const funksjonOptionValues = this.convertCodelistFunksjonToOptionValues(this.props.codelistFunksjon);
                const selectedFunksjonKey = this.getOptionKeyFromOptionValueInList(funksjonOptionValues, ansvarsomraade.funksjon?.kodeverdi);
                const accordionTitle = `${selectedFunksjonKey} (tiltaksklasse ${ansvarsomraade.tiltaksklasse?.kodeverdi})`;
                return (
                    <div key={index} className={formsStyle.accordionItem}>
                        <Accordion title={accordionTitle} expanded color={ansvarsomraade.funksjon?.kodeverdi ? colors[ansvarsomraade.funksjon?.kodeverdi] : 'default'}>
                            {/* TODO: Check if select field and API-request for code list is necessary */}
                            <div className={`${formsStyle.inputGroup} hide-on-print`}>
                                <div className={formsStyle.flex100}>
                                    <Textarea
                                        id={`ansvarsomraade-${index}-beskrivelseAvAnsvarsomraade`}
                                        onChange={(event) => { this.handleUpdate(event.target.value, 'beskrivelseAvAnsvarsomraade', index) }}
                                        onBlur={() => this.handleSave()}
                                        label="Beskrivelse av ansvarsområdet"
                                        value={ansvarsomraade.beskrivelseAvAnsvarsomraade || ''} />
                                </div>
                            </div>
                            <Label>Tiltaksklasse</Label>
                            Beskrivelse under er skrevet av ansvarlig søker, men du kan oppdatere den.
                            <div className={formsStyle.inputGroup}>
                                <div className={formsStyle.flexAuto}>
                                    <Button content="1" size="small" onClick={() => this.handleTiltaksklasseOnChange('1', 'tiltaksklasse', index)} noHover color={ansvarsomraade.tiltaksklasse?.kodeverdi === '1' ? 'primary' : 'default'} />
                                </div>
                                <div className={formsStyle.flexAuto}>
                                    <Button content="2" size="small" onClick={() => this.handleTiltaksklasseOnChange('2', 'tiltaksklasse', index)} noHover color={ansvarsomraade.tiltaksklasse?.kodeverdi === '2' ? 'primary' : 'default'} />
                                </div>
                                <div className={formsStyle.flexAuto}>
                                    <Button content="3" size="small" onClick={() => this.handleTiltaksklasseOnChange('3', 'tiltaksklasse', index)} noHover color={ansvarsomraade.tiltaksklasse?.kodeverdi === '3' ? 'primary' : 'default'} />
                                </div>
                            </div>
                            {
                                hasSamsvarKontroll
                                    ? (
                                        <React.Fragment>
                                            <label>Kontrollerklæringer vil foreligge ved</label>
                                            {
                                                ansvarsomraade.samsvarKontrollVedRammetillatelse
                                                    ? (
                                                        <CheckBoxListItem
                                                            id={`ansvarsomraade-${index}-samsvarKontrollVedRammetillatelse`}
                                                            onChange={() => { return null }}
                                                            checked
                                                            contentOnly>
                                                            Rammetillatelse
                                                        </CheckBoxListItem>
                                                    )
                                                    : ''
                                            }
                                            {
                                                ansvarsomraade.samsvarKontrollVedIgangsettingstillatelse
                                                    ? (
                                                        <CheckBoxListItem
                                                            id={`ansvarsomraade-${index}-samsvarKontrollVedIgangsettingstillatelse`}
                                                            onChange={() => { return null }}
                                                            checked
                                                            contentOnly>
                                                            Igangsettingstillatelse
                                                        </CheckBoxListItem>
                                                    )
                                                    : ''
                                            }
                                            {
                                                ansvarsomraade.samsvarKontrollVedMidlertidigBrukstillatelse
                                                    ? (
                                                        <CheckBoxListItem
                                                            id={`ansvarsomraade-${index}-samsvarKontrollVedMidlertidigBrukstillatelse`}
                                                            onChange={() => { return null }}
                                                            checked
                                                            contentOnly>
                                                            Midlertidig brukstillatelse
                                                        </CheckBoxListItem>
                                                    )
                                                    : ''
                                            }
                                            {
                                                ansvarsomraade.samsvarKontrollVedFerdigattest
                                                    ? (
                                                        <CheckBoxListItem
                                                            id={`ansvarsomraade-${index}-samsvarKontrollVedFerdigattest`}
                                                            onChange={() => { return null }}
                                                            checked
                                                            contentOnly>
                                                            Ferdigattest
                                                        </CheckBoxListItem>
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
