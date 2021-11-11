// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// DIBK Design
import { Accordion, InputField, Label } from 'dibk-design';

// Actions
import { validateAnsvarligForetakKontaktpersonEpost, validateAnsvarligForetakKontaktpersonNavn, validateAnsvarligForetakKontaktpersonTelefonnummer } from 'actions/ValidationActions';

// Helpers
import { formatAddress } from 'helpers/formatHelpers';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';
import commonStyle from 'components/routes/common.module.scss';

class AnsvarligForetak extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editableKontaktpersonFields: false
        }
    }

    componentDidMount() {
        const foretak = this.props.foretak;
        const allForetakKontaktpersonFieldsHasValue = [
            foretak?.kontaktpersonNavn?.length,
            foretak?.kontaktpersonMobilnummer?.length || foretak?.kontaktpersonTelefonnummer?.length,
            foretak?.kontaktpersonEpost?.length
        ].every(condition => condition);
        if (!allForetakKontaktpersonFieldsHasValue) {
            this.setState({
                editableKontaktpersonFields: true
            });
        }
    }

    componentDidUpdate() {
        if (this.hasForetakKontaktpersonErrors() && !this.state.editableKontaktpersonFields) {
            this.setState({
                editableKontaktpersonFields: true
            });
        }
    }

    hasForetakKontaktpersonErrors() {
        return [
            this.props.validationMessages?.ansvarligForetakKontaktpersonNavn?.length,
            this.props.validationMessages?.ansvarligForetakKontaktpersonMobilnummer?.length,
            this.props.validationMessages?.ansvarligForetakKontaktpersonTelefonnummer?.length,
            this.props.validationMessages?.ansvarligForetakKontaktpersonEpost?.length
        ].some(condition => condition);
    }

    handleUpdate(value, property) {
        let updatedForetak = this.props.foretak;
        updatedForetak[property] = value;
        return this.props.updateHandler(updatedForetak);
    }

    handleSave() {
        this.props.saveHandler();
    }

    handleUpdateAndSaveIfChanged(newValue, property) {
        const oldValue = this.props.foretak[property];
        this.handleUpdate(newValue, property);
        if (newValue !== oldValue) {
            this.handleSave()
        }
    }


    render() {
        const isPrint = localStorage.print === "true";
        const foretak = this.props.foretak;
        const adresse = formatAddress(this.props.foretak);
        const telefonNummerList = [foretak.telefonnummer, foretak.mobilnummer].filter(nummer => { return nummer?.length });
        return foretak && Object.keys(foretak).length
            ? (
                <React.Fragment>
                    {
                        !isPrint
                            ? <div className={commonStyle.marginBottomSmall}>Hvis du oppdager feil om foretaket, kan du melde inn dette nederst i skjemaet. Trykk på blyanten for å endre opplysningene om kontaktperson.</div>
                            : ''
                    }
                    <div className={commonStyle.marginBottomSmall}>
                        <Accordion title={`${foretak.navn} (org.nr. ${foretak.organisasjonsnummer})`} expanded color="lightLime">
                            <dl className={formsStyle.fieldList}>
                                {
                                    isPrint
                                        ? (
                                            <React.Fragment>
                                                <div className="print-flex-66">
                                                    <dt><Label normalCursor>Navn</Label></dt>
                                                    <dd>{foretak.navn}</dd>
                                                </div>
                                                <div className="print-flex-33">
                                                    <dt><Label normalCursor>Organisasjonsnummer</Label>
                                                    </dt><dd>{foretak.organisasjonsnummer}</dd>
                                                </div>
                                            </React.Fragment>
                                        )
                                        : ''
                                }
                                {
                                    adresse?.length && !isPrint
                                        ? (
                                            <div className="print-flex-33">
                                                {adresse}
                                            </div>
                                        )
                                        : ''
                                }
                                {
                                    isPrint
                                        ? (
                                            <div className="print-flex-33">
                                                <dt><Label normalCursor>Adresse</Label>
                                                </dt><dd>{adresse}</dd>
                                            </div>
                                        )
                                        : ''
                                }
                                {
                                    telefonNummerList.length
                                        ? (
                                            <div className="print-flex-33">
                                                <dt><Label normalCursor>Telefon</Label></dt>
                                                <dd>
                                                    <ul className={formsStyle.cleanList}>
                                                        {
                                                            telefonNummerList.map((nummer, index) => {
                                                                return <li key={index}>{nummer}</li>
                                                            })
                                                        }
                                                    </ul>
                                                </dd>
                                            </div>
                                        )
                                        : ''
                                }
                                {
                                    foretak.epost?.length
                                        ? (
                                            <div className="print-flex-33">
                                                <dt><Label normalCursor>E-post</Label></dt>
                                                <dd>{foretak.epost}</dd>
                                            </div>
                                        )
                                        : ''
                                }
                            </dl>

                            <Label normalCursor>
                                <b>
                                    Har foretaket sentral godkjenning?
                                </b>
                            </Label>
                            {foretak.harSentralGodkjenning ? 'Ja' : 'Nei'}
                        </Accordion>
                    </div>
                    <div className={commonStyle.marginBottomSmall}>
                        <Accordion title="Kontaktperson" expanded color="lightLime">
                            <div className={`${formsStyle.fieldList} ${formsStyle.showEditableOnHover} ${this.state.editableKontaktpersonFields ? formsStyle.active : ''}`} onClick={() => { if (!this.state.editableKontaktpersonFields) { this.setState({ editableKontaktpersonFields: true }) } }}>
                                {
                                    this.state.editableKontaktpersonFields
                                        ? !this.hasForetakKontaktpersonErrors()
                                            ? (
                                                <span className={`${formsStyle.showEditableIcon} ${this.hasForetakKontaktpersonErrors() ? formsStyle.disabled : ''}`}>
                                                    <FontAwesomeIcon icon='times' onClick={() => { this.setState({ editableKontaktpersonFields: false }) }} />
                                                </span>
                                            )
                                            : ''
                                        : <span className={formsStyle.showEditableIcon}><FontAwesomeIcon icon='edit' /></span>
                                }
                                <div className="print-flex-10">
                                    <InputField
                                        id='foretak-kontaktperson-navn'
                                        onBlur={(event) => { this.handleUpdateAndSaveIfChanged(event.target.value, 'kontaktpersonNavn'); this.props.validateAnsvarligForetakKontaktpersonNavn(); }}
                                        label={this.state.editableKontaktpersonFields ? 'Navn' : ''}
                                        width="400px"
                                        defaultValue={foretak.kontaktpersonNavn || ''}
                                        defaultContent="Ikke angitt"
                                        hasErrors={this.props.validationMessages?.ansvarligForetakKontaktpersonNavn?.message?.length ? true : false}
                                        errorMessage={this.props.validationMessages?.ansvarligForetakKontaktpersonNavn?.message}
                                        contentOnly={!this.state.editableKontaktpersonFields} />
                                </div>
                                <div className="print-flex-10">
                                    <InputField
                                        id='foretak-kontaktperson-mobilnummer'
                                        onBlur={(event) => { this.handleUpdateAndSaveIfChanged(event.target.value, 'kontaktpersonMobilnummer'); this.props.validateAnsvarligForetakKontaktpersonTelefonnummer(); }}
                                        label='Mobil'
                                        defaultValue={foretak.kontaktpersonMobilnummer || ''}
                                        defaultContent="Ikke angitt"
                                        width="200px"
                                        type='tel'
                                        hasErrors={this.props.validationMessages?.ansvarligForetakKontaktpersonMobilnummer?.message?.length ? true : false}
                                        errorMessage={this.props.validationMessages?.ansvarligForetakKontaktpersonMobilnummer?.message}
                                        contentOnly={!this.state.editableKontaktpersonFields} />
                                </div>
                                <div className="print-flex-10">
                                    <InputField
                                        id='foretak-kontaktperson-telefonnummer'
                                        onBlur={(event) => { this.handleUpdateAndSaveIfChanged(event.target.value, 'kontaktpersonTelefonnummer'); this.props.validateAnsvarligForetakKontaktpersonTelefonnummer(); }}
                                        label='Telefon'
                                        defaultValue={foretak.kontaktpersonTelefonnummer || ''}
                                        defaultContent="Ikke angitt"
                                        width="200px"
                                        type='tel'
                                        hasErrors={this.props.validationMessages?.ansvarligForetakKontaktpersonTelefonnummer?.message?.length ? true : false}
                                        errorMessage={this.props.validationMessages?.ansvarligForetakKontaktpersonTelefonnummer?.message}
                                        contentOnly={!this.state.editableKontaktpersonFields} />
                                </div>
                                <div className="print-flex-10">
                                    <InputField
                                        id='foretak-kontaktperson-epost'
                                        onBlur={(event) => { this.handleUpdateAndSaveIfChanged(event.target.value, 'kontaktpersonEpost'); this.props.validateAnsvarligForetakKontaktpersonEpost(); }}
                                        label="E-post"
                                        defaultValue={foretak.kontaktpersonEpost || ''}
                                        defaultContent="Ikke angitt"
                                        width="400px"
                                        type='email'
                                        hasErrors={this.props.validationMessages?.ansvarligForetakKontaktpersonEpost?.message?.length ? true : false}
                                        errorMessage={this.props.validationMessages?.ansvarligForetakKontaktpersonEpost?.message}
                                        contentOnly={!this.state.editableKontaktpersonFields} />
                                </div>
                            </div>
                        </Accordion>
                    </div>
                </React.Fragment>
            )
            : (
                <p>Ingen data for foretak</p>
            )
    }
}

AnsvarligForetak.propTypes = {
    foretak: PropTypes.object.isRequired,
    updateHandler: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    validationMessages: state.validationMessages
});

const mapDispatchToProps = {
    validateAnsvarligForetakKontaktpersonEpost,
    validateAnsvarligForetakKontaktpersonNavn,
    validateAnsvarligForetakKontaktpersonTelefonnummer
};

export default connect(mapStateToProps, mapDispatchToProps)(AnsvarligForetak);
