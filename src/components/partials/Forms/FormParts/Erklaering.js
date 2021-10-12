// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


// DIBK Design
import { CheckBoxListItem } from 'dibk-design';


class Erklaering extends Component {

    handleOnChange(value, property) {
        this.props.updateHandler({
            ...this.props.formData,
            [property]: value
        }).then(() => {
            this.props.saveHandler();
        });
    }

    hasAnsvarsomraadeFunksjon(funksjonKode) {
        return this.props.formData?.ansvarsomraader?.length
            ? this.props.formData?.ansvarsomraader.some(ansvarsomraade => {
                return ansvarsomraade.funksjonKode === funksjonKode
            })
            : false
    }

    render() {
        const formData = this.props.formData;
        return formData
            ? (
                <React.Fragment>
                    <p>Vi er kjent med reglene om straff og sanksjoner i plan- og bygningsloven kapittel 32, og at det kan føre til reaksjoner dersom vi oppgir uriktige opplysninger. Vi forplikter oss å stille med riktig kompetanse i byggeprosjekt, jf. SAK10 kapittel 10 og 11.</p>
                    {
                        this.hasAnsvarsomraadeFunksjon("PRO")
                            ? (
                                <CheckBoxListItem
                                    id="erklaeringAnsvarligProsjekterende"
                                    onChange={(event) => { this.handleOnChange(event.target.checked, 'erklaeringAnsvarligProsjekterende') }}
                                    checked={formData.erklaeringAnsvarligProsjekterende ? true : false}
                                    compact>
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
                                    checked={formData.erklaeringAnsvarligUtfoerende ? true : false}
                                    compact>
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
                                    checked={formData.erklaeringAnsvarligKontrollerende ? true : false}
                                    compact>
                                    Ansvarlig kontollerende erklærer uavhengighet fra foretaket det skal kontrollere §14-1
                                </CheckBoxListItem>
                            )
                            : ''
                    }
                    <p>
                        Ved å signere, bekrefter du samtidig at du er legitimert til å binde foretaket ansvarlig til arbeidene som er beskrevet i erklæringen.
                    </p>
                </React.Fragment>
            )
            : (
                <p>Ingen data om ansvarlig søker</p>
            )
    }
}

Erklaering.propTypes = {
    formData: PropTypes.object.isRequired,
    updateHandler: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired
};

export default connect(null, null)(Erklaering);
