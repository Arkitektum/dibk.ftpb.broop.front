// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


// DIBK Design
import { CheckBoxListItem } from 'dibk-design';

// Actions
import { validateErklaeringCheckboxes } from 'actions/ValidationActions';

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
                    {
                        this.hasAnsvarsomraadeFunksjon("PRO")
                            ? (
                                <CheckBoxListItem
                                    id="erklaeringAnsvarligProsjekterende"
                                    onChange={event => {
                                        this.handleOnChange(event.target.checked, 'erklaeringAnsvarligProsjekterende');
                                        this.props.validateErklaeringCheckboxes();
                                    }}
                                    checked={formData.erklaeringAnsvarligProsjekterende ? true : false}
                                    hasErrors={this.props.validationMessages?.erklaeringCheckboxes && !formData.erklaeringAnsvarligProsjekterende}
                                    compact>
                                    Ansvarlig prosjekterende erklærer at prosjekteringen skal være planlagt, gjennomført og kvalitetssikret i henhold til plan- og bygningsloven, jf. SAK10 § 12-3.
                                </CheckBoxListItem>
                            )
                            : ''
                    }
                    {
                        this.hasAnsvarsomraadeFunksjon("UTF")
                            ? (
                                <CheckBoxListItem
                                    id="erklaeringAnsvarligUtfoerende"
                                    onChange={event => {
                                        this.handleOnChange(event.target.checked, 'erklaeringAnsvarligUtfoerende');
                                        this.props.validateErklaeringCheckboxes();
                                    }}
                                    checked={formData.erklaeringAnsvarligUtfoerende ? true : false}
                                    hasErrors={this.props.validationMessages?.erklaeringCheckboxes && !formData.erklaeringAnsvarligUtfoerende}
                                    compact>
                                    Ansvarlig utførende erklærer at arbeidet ikke skal starte før det foreligger kvalitetssikret produksjonsunderlag for den respektive del av utførelsen, jf. SAK10, § 12-4.
                                </CheckBoxListItem>
                            )
                            : ''
                    }
                    {
                        this.hasAnsvarsomraadeFunksjon("KONTROLL")
                            ? (
                                <CheckBoxListItem
                                    id="erklaeringAnsvarligKontrollerende"
                                    onChange={event => {
                                        this.handleOnChange(event.target.checked, 'erklaeringAnsvarligKontrollerende');
                                        this.props.validateErklaeringCheckboxes();
                                    }}
                                    checked={formData.erklaeringAnsvarligKontrollerende ? true : false}
                                    hasErrors={this.props.validationMessages?.erklaeringCheckboxes && !formData.erklaeringAnsvarligKontrollerende}
                                    compact>
                                    Ansvarlig kontrollerende erklærer uavhengighet, jf. SAK10 § 14-1, og vil redegjøre for endringer som kan påvirke uavhengigheten, jf. SAK10 § 12-5.
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
    formData: PropTypes.object.isRequired,
    updateHandler: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    validationMessages: state.validationMessages
});

const mapDispatchToProps = {
    validateErklaeringCheckboxes
};


export default connect(mapStateToProps, mapDispatchToProps)(Erklaering);
