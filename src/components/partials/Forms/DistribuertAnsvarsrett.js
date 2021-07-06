// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { Header, Paper } from 'dibk-design';

// Actions
import { updateSelectedForm } from 'actions/FormActions';

// Helpers
import { formatAddress } from 'helpers/formatHelpers';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class DistribuertAnsvarsrett extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        if (this.props.selectedSubmission && Object.keys(this.props.selectedSubmission).length) {
            const formApiUrl = this.props.selectedSubmission?._links?.ansvarsrettdistribuert?.href;
            fetch(`https://dibk-ftpb-broop-api.azurewebsites.net${formApiUrl}`).then(res => res.json()).then(form => {
                this.props.updateSelectedForm(form);
            });
        }
    }

    componentDidUpdate(prevProps) {
        const hasSelectedSubmission = this.props.selectedSubmission && Object.keys(this.props.selectedSubmission).length;
        const hasSelectedForm = this.props.selectedForm && Object.keys(this.props.selectedForm).length;
        if (hasSelectedSubmission && !hasSelectedForm) {
            const formApiUrl = this.props.selectedSubmission?._links?.ansvarsrettdistribuert?.href;
            fetch(`https://dibk-ftpb-broop-api.azurewebsites.net${formApiUrl}`).then(res => res.json()).then(form => {
                this.props.updateSelectedForm(form);
            });
        }
    }

    renderEiendomByggestedList(eiendomByggestedList) {
        return eiendomByggestedList.map((eiendomByggestedListItem, index) => {
            return (
                <div key={index}>
                    <dl className={formsStyle.fieldList}>
                        <div>
                            <dt>Gårdsnr.</dt><dd>{eiendomByggestedListItem.eiendomsidentifikasjon?.gaardsnummer}</dd>
                        </div>
                        <div>
                            <dt>Bruksnr.</dt><dd>{eiendomByggestedListItem.eiendomsidentifikasjon?.bruksnummer}</dd>
                        </div>
                        <div>
                            <dt>Festenr.</dt><dd>{eiendomByggestedListItem.eiendomsidentifikasjon?.festenummer}</dd>
                        </div>
                        <div>
                            <dt>Seksjonsnr.</dt><dd>{eiendomByggestedListItem.eiendomsidentifikasjon?.seksjonsnummer}</dd>
                        </div>
                    </dl>
                    <dl className={formsStyle.fieldList}>
                        <div>
                            <dt>Bygningsnr.</dt><dd>{eiendomByggestedListItem.bygningsnummer}</dd>
                        </div>
                        <div>
                            <dt>Bolignr.</dt><dd>{eiendomByggestedListItem.bolignummer}</dd>
                        </div>
                    </dl>
                    <dl className={formsStyle.fieldList}>
                        <div>
                            <dt>Kommunenummer.</dt><dd>{eiendomByggestedListItem.eiendomsidentifikasjon?.kommunenummer}</dd>
                        </div>
                    </dl>
                    <dl className={formsStyle.fieldList}>
                        <div>
                            <dt>Adresse</dt><dd>{formatAddress(eiendomByggestedListItem.adresse)}</dd>
                        </div>
                    </dl>
                </div>
            )
        })
    }


    render() {
        const formData = this.props.selectedForm?.formData;
        return formData
            ? (
                <React.Fragment>
                    <Paper>
                        <Header content="Eiendom/Byggested" size={2}></Header>
                        {this.renderEiendomByggestedList(formData?.eiendomByggested)}
                    </Paper>
                    <Paper>
                        <Header content="Foretak" size={2}></Header>
                        <dl className={formsStyle.fieldList}>
                            <div>
                                <dt>Organisasjonsnummer</dt><dd>{formData?.ansvarsrett?.foretak?.organisasjonsnummer}</dd>
                            </div>
                            <div>
                                <dt>Navn</dt><dd>{formData?.ansvarsrett?.foretak?.navn}</dd>
                            </div>
                        </dl>
                        <dl className={formsStyle.fieldList}>
                            <div>
                                <dt>Adresse</dt><dd>{formData?.ansvarsrett?.foretak?.adresse?.adresselinje1}</dd>
                            </div>
                            <div>
                                <dt>Postnr.</dt><dd>{formData?.ansvarsrett?.foretak?.adresse?.postnr}</dd>
                            </div>
                            <div>
                                <dt>Poststed</dt><dd>{formData?.ansvarsrett?.foretak?.adresse?.poststed}</dd>
                            </div>
                        </dl>
                        <dl className={formsStyle.fieldList}>
                            <div>
                                <dt>Kontaktperson</dt><dd>{formData?.ansvarsrett?.foretak?.kontaktperson?.navn}</dd>
                            </div>
                            <div>
                                <dt>Mobiltelefon</dt><dd>{formData?.ansvarsrett?.foretak?.kontaktperson?.mobilnummer}</dd>
                            </div>
                            <div>
                                <dt>Epost</dt><dd>{formData?.ansvarsrett?.foretak?.kontaktperson?.epost}</dd>
                            </div>
                        </dl>

                        <p>
                            <b>
                                {
                                    formData?.ansvarsrett?.foretak?.harSentralGodkjenning
                                        ? 'Foretaket har sentral godkjenning'
                                        : 'Foretaket har ikke sentral godkjenning'
                                }
                            </b>
                        </p>
                    </Paper>
                </React.Fragment>)
            : (
                <p>Henter skjema</p>
            )
    }
}

const mapStateToProps = state => ({
    selectedSubmission: state.selectedSubmission,
    selectedForm: state.selectedForm
});

const mapDispatchToProps = {
    updateSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(DistribuertAnsvarsrett);


