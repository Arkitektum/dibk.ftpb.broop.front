// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// DIBK Design
import { Header, InputField, Label } from 'dibk-design';

// Actions
import { validateAnsvarligForetakKontaktpersonEpost, validateAnsvarligForetakKontaktpersonNavn, validateAnsvarligForetakKontaktpersonTelefonnummer } from 'actions/ValidationActions';

// Helpers
import { formatAddress } from 'helpers/formatHelpers';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';
import commonStyle from 'components/routes/common.module.scss';

class AnsvarligForetak extends Component {

    componentDidMount() {
        this.props.validateAnsvarligForetakKontaktpersonEpost();
        this.props.validateAnsvarligForetakKontaktpersonNavn();
        this.props.validateAnsvarligForetakKontaktpersonTelefonnummer();
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
                    {!isPrint ? <Header content={`${foretak.navn} (org.nr. ${foretak.organisasjonsnummer})`} size={3}></Header> : ''}

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
                    {
                        !isPrint
                            ? <div className={commonStyle.infoBox}>
                                <p>Opplysningene er lagt inn av ansvarlig søker eller hentet fra register for sentral godkjenning.</p>
                                <Link to="avvis" title='Avvis erklæring'>
                                    Meld fra til ansvarlig søker hvis du oppdager noe feil
                                </Link>
                            </div>
                            : ''
                    }
                    <Header size={3} content="Kontaktperson" />
                    <div className={formsStyle.fieldList}>
                        <div className="print-flex-10">
                            <InputField
                                id='foretak-kontaktperson-navn'
                                onBlur={(event) => { this.handleUpdateAndSaveIfChanged(event.target.value, 'kontaktpersonNavn'); this.props.validateAnsvarligForetakKontaktpersonNavn(); }}
                                label="Navn"
                                width="400px"
                                defaultValue={foretak.kontaktpersonNavn || ''}
                                hasErrors={this.props.validationMessages?.ansvarligForetakKontaktpersonNavn?.length ? true : false}
                                errorMessage={this.props.validationMessages?.ansvarligForetakKontaktpersonNavn} />
                        </div>
                        <div className="print-flex-10">
                            <InputField
                                id='foretak-kontaktperson-telefonnummer'
                                onBlur={(event) => { this.handleUpdateAndSaveIfChanged(event.target.value, 'kontaktpersonTelefonnummer'); this.props.validateAnsvarligForetakKontaktpersonTelefonnummer(); }}
                                label='Telefon'
                                defaultValue={foretak.kontaktpersonTelefonnummer || ''}
                                width="200px"
                                type='tel'
                                hasErrors={this.props.validationMessages?.ansvarligForetakKontaktpersonTelefonnummer?.length ? true : false}
                                errorMessage={this.props.validationMessages?.ansvarligForetakKontaktpersonTelefonnummer} />
                        </div>
                        <div className="print-flex-10">
                            <InputField
                                id='foretak-kontaktperson-mobilnummer'
                                onBlur={(event) => { this.handleUpdateAndSaveIfChanged(event.target.value, 'kontaktpersonMobilnummer'); this.props.validateAnsvarligForetakKontaktpersonTelefonnummer(); }}
                                label='Mobil'
                                defaultValue={foretak.kontaktpersonMobilnummer || ''}
                                width="200px"
                                type='tel'
                                hasErrors={this.props.validationMessages?.ansvarligForetakKontaktpersonMobilnummer?.length ? true : false}
                                errorMessage={this.props.validationMessages?.ansvarligForetakKontaktpersonMobilnummer} />
                        </div>
                        <div className="print-flex-10">
                            <InputField
                                id='foretak-kontaktperson-epost'
                                onBlur={(event) => { this.handleUpdateAndSaveIfChanged(event.target.value, 'kontaktpersonEpost'); this.props.validateAnsvarligForetakKontaktpersonEpost(); }}
                                label="E-post"
                                defaultValue={foretak.kontaktpersonEpost || ''}
                                width="400px"
                                type='email'
                                hasErrors={this.props.validationMessages?.ansvarligForetakKontaktpersonEpost?.length ? true : false}
                                errorMessage={this.props.validationMessages?.ansvarligForetakKontaktpersonEpost} />
                        </div>
                    </div>
                    {
                        !isPrint
                            ? <div className={commonStyle.infoBox}>Opplysningene er lagt inn av ansvarlig søker. Du kan endre navn, telefon og e-post til kontaktpersonen.</div>
                            : ''
                    }
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
