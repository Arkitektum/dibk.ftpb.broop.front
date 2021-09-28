// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// DIBK Design
import { Accordion, Button, CheckBoxInput, Label, Textarea } from 'dibk-design';

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
                const selectedFunksjonKey = this.getOptionKeyFromOptionValueInList(funksjonOptionValues, ansvarsomraade.funksjonKode);
                const accordionTitle = `${selectedFunksjonKey} (tiltaksklasse ${ansvarsomraade.tiltaksklasseKode})`;
                return (
                    <div key={index} className={formsStyle.accordionItem}>
                        <Accordion title={accordionTitle} expanded color={ansvarsomraade.funksjonKode ? colors[ansvarsomraade.funksjonKode] : 'default'}>
                            {/* TODO: Check if select field and API-request for code list is necessary */}

                            <div className={formsStyle.fieldSection}>
                                {
                                    ansvarsomraade.funksjonKode === "SØK"
                                        ? "Erklæringen brukes ved endring av ansvarlig søker"
                                        : (
                                            <div className={`${formsStyle.inputGroup} hide-on-print`}>
                                                <div className={formsStyle.flex100}>
                                                    <Label><b>Beskrivelse av ansvarsområde</b></Label>
                                                    Beskrivelsen under er skrevet av ansvarlig søker, men du kan oppdatere den.
                                                    <Textarea
                                                        id={`ansvarsomraade-${index}-beskrivelseAvAnsvarsomraade`}
                                                        onChange={() => { return false }}
                                                        onBlur={(event) => this.handleUpdateAndSaveIfChanged(event.target.value, 'beskrivelseAvAnsvarsomraade', index)}
                                                        defaultValue={ansvarsomraade.beskrivelseAvAnsvarsomraade || ''}
                                                    />
                                                </div>
                                            </div>
                                        )
                                }
                            </div>
                            <div className={formsStyle.fieldSection}>
                                <Label><b>Tiltaksklasse</b></Label>
                                Dersom ansvarlig søker har registrert feil tiltaksklasse for ansvarsområdet, må du oppdatere denne.
                                <div className={formsStyle.inputGroup}>
                                    <div className={formsStyle.flexAuto}>
                                        <Button
                                            content="1"
                                            size="small"
                                            onClick={() => this.handleUpdateAndSaveIfChanged('1', 'tiltaksklasseKode', index)}
                                            noHover
                                            color={ansvarsomraade.tiltaksklasseKode === '1' ? 'primary' : 'default'}
                                        />
                                    </div>
                                    <div className={formsStyle.flexAuto}>
                                        <Button
                                            content="2"
                                            size="small"
                                            onClick={() => this.handleUpdateAndSaveIfChanged('2', 'tiltaksklasseKode', index)}
                                            noHover
                                            color={ansvarsomraade.tiltaksklasseKode === '2' ? 'primary' : 'default'}
                                        />
                                    </div>
                                    <div className={formsStyle.flexAuto}>
                                        <Button
                                            content="3"
                                            size="small"
                                            onClick={() => this.handleUpdateAndSaveIfChanged('3', 'tiltaksklasseKode', index)}
                                            noHover
                                            color={ansvarsomraade.tiltaksklasseKode === '3' ? 'primary' : 'default'}
                                        />
                                    </div>
                                </div>
                            </div>
                            {
                                hasSamsvarKontroll
                                    ? (
                                        <React.Fragment>
                                            <Label><b>{ansvarsomraade?.funksjon?.kodeverdi === 'KONTROLL' ? 'Kontrollerklæringer vil foreligge ved' : 'Samsvarserklæringer vil foreligge ved'}</b></Label>
                                            Dersom ansvarlig søker har registrert feil planlagt milepæl, må du oppdatere denne.
                                            <CheckBoxInput
                                                id={`ansvarsomraade-${index}-samsvarKontrollVedRammetillatelse`}
                                                onChange={(event) => this.handleUpdateAndSaveIfChanged(event.target.checked, 'samsvarKontrollVedRammetillatelse', index)}
                                                checked={ansvarsomraade.samsvarKontrollVedRammetillatelse}
                                            >
                                                Rammetillatelse
                                            </CheckBoxInput>
                                            <CheckBoxInput
                                                id={`ansvarsomraade-${index}-samsvarKontrollVedIgangsettingstillatelse`}
                                                onChange={(event) => this.handleUpdateAndSaveIfChanged(event.target.checked, 'samsvarKontrollVedIgangsettingstillatelse', index)}
                                                checked={ansvarsomraade.samsvarKontrollVedIgangsettingstillatelse}
                                            >
                                                Igangsettingstillatelse
                                            </CheckBoxInput>
                                            <CheckBoxInput
                                                id={`ansvarsomraade-${index}-samsvarKontrollVedMidlertidigBrukstillatelse`}
                                                onChange={(event) => this.handleUpdateAndSaveIfChanged(event.target.checked, 'samsvarKontrollVedMidlertidigBrukstillatelse', index)}
                                                checked={ansvarsomraade.samsvarKontrollVedMidlertidigBrukstillatelse}
                                            >
                                                Midlertidig brukstillatelse
                                            </CheckBoxInput>
                                            <CheckBoxInput
                                                id={`ansvarsomraade-${index}-samsvarKontrollVedFerdigattest`}
                                                onChange={(event) => this.handleUpdateAndSaveIfChanged(event.target.checked, 'samsvarKontrollVedFerdigattest', index)}
                                                checked={ansvarsomraade.samsvarKontrollVedFerdigattest}
                                            >
                                                Ferdigattest
                                            </CheckBoxInput>
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
