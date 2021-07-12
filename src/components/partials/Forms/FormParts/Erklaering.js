// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


// DIBK Design
import { CheckBoxListItem } from 'dibk-design';


class Erklaering extends Component {

    handleOnChange(value, property) {
        this.props.onChange({
            ...this.props.ansvarsrett,
            [property]: value
        });
    }

    hasAnsvarsomraadeFunksjon(funksjonKode) {
        return this.props.ansvarsrett?.ansvarsomraader?.length
            ? this.props.ansvarsrett.ansvarsomraader.some(ansvarsomraade => {
                return ansvarsomraade.funksjon?.kodeverdi === funksjonKode
            })
            : false
    }

    render() {
        const ansvarsrett = this.props.ansvarsrett;
        return ansvarsrett && Object.keys(ansvarsrett).length
            ? (
                <React.Fragment>
                    <p>Vi kjenner reglene om straff og sanksjoner i plan- og bygningsloven kapittel 32, og at uriktige opplysninger kan føre til reaksjoner.</p>
                    <p>Vi forplikter oss å stille med riktig kompetanse i byggeprosjekt, jf. SAK10 kapittel 10 og 11.</p>
                    {
                        this.hasAnsvarsomraadeFunksjon("PRO")
                            ? (
                                <CheckBoxListItem
                                    id="erklaeringAnsvarligProsjekterende"
                                    onChange={(event) => { this.handleOnChange(event.target.checked, 'erklaeringAnsvarligProsjekterende') }}
                                    checked={ansvarsrett.erklaeringAnsvarligProsjekterende ? true : false}>
                                    Ansvarlig prosjekterende erklærer at prosjekteringen skal være planlagt, gjennomført og kvalitetssikret i henhold til pbl jf. SAK10 §12-3
                                </CheckBoxListItem>
                            )
                            : ''
                    }
                    {
                        this.hasAnsvarsomraadeFunksjon("UTF")
                            ? (
                                <CheckBoxListItem
                                    id="erklaeringAnsvarligUtfoerende"
                                    onChange={(event) => { this.handleOnChange(event.target.checked, 'erklaeringAnsvarligUtfoerende') }}
                                    checked={ansvarsrett.erklaeringAnsvarligUtfoerende ? true : false}>
                                    Ansvarlig utførende erklærer at arbeidet ikke skal starte før produksjonsunderlaget er klart, jf. SAK 10, §12-4
                                </CheckBoxListItem>
                            )
                            : ''
                    }
                    {
                        this.hasAnsvarsomraadeFunksjon("KONTROLL")
                            ? (
                                <CheckBoxListItem
                                    id="erklaeringAnsvarligKontrollerende"
                                    onChange={(event) => { this.handleOnChange(event.target.checked, 'erklaeringAnsvarligKontrollerende') }}
                                    checked={ansvarsrett.erklaeringAnsvarligKontrollerende ? true : false}>
                                    Ansvarlig kontollerende erklærer uavhengighet fra foretaket det skal kontrollere §14-1
                                </CheckBoxListItem>
                            )
                            : ''
                    }
                </React.Fragment>
            )
            : (
                <p>Ingen data om ansvarlig søker</p>
            )
    }
}

Erklaering.propTypes = {
    ansvarsrett: PropTypes.object.isRequired,
    onChange: PropTypes.func
};

export default connect(null, null)(Erklaering);
