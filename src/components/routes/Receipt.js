// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { Button, Header, InputField, LoadingAnimation } from 'dibk-design';

// Template
import Container from 'components/template/Container';

// Partials
import ContactInfo from 'components/partials/ContactInfo';

// Actions
import { fetchSubmission } from 'actions/SubmissionActions';
import { fetchSelectedForm, updateSelectedForm, saveSelectedForm } from 'actions/FormActions';
import { updateSignedStatus, getSignedDocument } from 'actions/SigningActions';

// Helpers
import { formatProjectNameForForm } from 'helpers/formatHelpers';
import { getStageFromStatus } from 'helpers/signingHelpers';
import { saveFileContentFromBlob } from 'helpers/fileHelpers';

// Stylesheets
import commonStyle from 'components/routes/common.module.scss';

class Receipt extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null,
            loadingMessage: null
        };
        this.handleDownloadButtonClick = this.handleDownloadButtonClick.bind(this);
    }

    componentDidMount() {
        const submissionId = this.props.match.params.submissionId;
        const accessToken = this.props.oidc?.user?.access_token;
        const urlParams = new URLSearchParams(window.location.search);
        const statusQueryToken = urlParams.get('status_query_token');
        if (submissionId) {
            this.fecthFormData(submissionId).then(() => {
                const isRejectedFromSigningSolution = this.props.status === 'avvist' && statusQueryToken?.length > 0;
                if (isRejectedFromSigningSolution) {
                    this.props.updateSelectedForm({
                        ...this.props.selectedForm,
                        status: 'avvist',
                        statusReason: 'Erklæringen har blitt avvist fra signeringsløsningen'
                    }).then((updatedForm) => {
                        this.props.saveSelectedForm(updatedForm, accessToken);
                    });
                }
                const stage = getStageFromStatus(this.props.status);
                this.setState({
                    loadingMessage: 'Oppdaterer signeringsstatus'
                });
                this.props.updateSignedStatus(submissionId, statusQueryToken, stage, accessToken).then(() => {
                    this.setState({
                        loadingMessage: null
                    });
                }).catch(error => {
                    console.log("updateSignedStatus", error)
                    this.setState({
                        errorMessage: 'Kunne ikke oppdatere signeringsstatus',
                        loadingMessage: null
                    });
                });
            });
        }

    }

    fecthFormData(submissionId) {
        this.setState({
            loadingMessage: 'Henter innsending'
        });
        return this.props.fetchSubmission(submissionId).then(() => {
            if (this.props.selectedSubmission && Object.keys(this.props.selectedSubmission).length) {
                this.setState({
                    loadingMessage: 'Henter skjema'
                });
                return this.props.fetchSelectedForm(this.props.selectedSubmission).then((response) => {
                    const selectedForm = response.payload;
                    if (selectedForm) {
                        this.setState({
                            selectedFormOptionId: selectedForm.referanseId,
                            status: selectedForm.status,
                            errorMessage: null,
                            loadingMessage: null
                        });
                    } else {
                        this.setState({
                            errorMessage: `Kunne ikke hente skjema med referanse: ${submissionId}`,
                            loadingMessage: null
                        });
                    }
                    return selectedForm;
                }).catch(error => {
                    console.log("fetchSelectedForm", error)
                    this.setState({
                        loadingMessage: null
                    });
                });
            }
        }).catch(error => {
            console.log("fetchSubmission", error)
            this.setState({
                loadingMessage: null
            });
        });
    }



    handleDownloadButtonClick() {
        const submissionId = this.props.match.params.submissionId;
        const accessToken = this.props.oidc?.user?.access_token;
        this.setState({
            loadingMessage: 'Henter signert dokument'
        });
        this.props.getSignedDocument(submissionId, accessToken).then(signedDocument => {
            saveFileContentFromBlob(signedDocument.blob, signedDocument.filename);
            this.setState({
                loadingMessage: null
            });
        }).catch(error => {
            this.setState({
                loadingMessage: null
            });
        });

    }


    renderContent(status, form) {
        switch (status) {
            case "signert":
                let epostAdresse = form?.formData?.ansvarligForetak?.kontaktpersonEpost?.length
                    ? form?.formData?.ansvarligForetak?.kontaktpersonEpost
                    : form?.formData?.ansvarligForetak?.epost?.length
                        ? form?.formData?.ansvarligForetak?.epost
                        : null;
                return (
                    <React.Fragment>
                        <div className={commonStyle.introText}>
                            <p><b>Erklæringen er signert</b></p>
                            <div className={commonStyle.paragraphGroup}>
                                <p>Erklæringen om ansvarsrett{formatProjectNameForForm(form)?.length ? ` ${formatProjectNameForForm(form)}` : ''} er signert og sendt til ansvarlig søker.</p>
                            </div>
                            <div className={commonStyle.paragraphGroup}>
                                {
                                    epostAdresse
                                        ? <p>En kopi av den signerte erklæringen er sendt til <a href={`mailto:${epostAdresse}`}>{epostAdresse}</a>. Du kan også laste ned en kopi ved å trykke på knappen under.</p>
                                        : <p>Du kan laste ned en kopi ved å trykke på knappen under.</p>
                                }
                            </div>
                            <div className={commonStyle.paragraphGroup}>
                                <p><b>NB!</b> Direktoratet for byggkvalitet tar ikke ansvaret for å lagre erklæringen, og den blir slettet fra vårt system innen 12 måneder. Pass derfor på at du selv holder arkiv og oversikt over signerte erklæringer.</p>
                            </div>
                            <Button onClick={this.handleDownloadButtonClick} content="Last ned en kopi" color="primary" />
                        </div>
                        <ContactInfo />
                    </React.Fragment>
                );
            case "avvist":
                return (
                    <React.Fragment>
                        <div className={commonStyle.introText}>
                            <p><b>Erklæring er avvist</b></p>
                            <div className={commonStyle.paragraphGroup}>
                                <p>Du har avvist erklæringen om ansvarsrett{formatProjectNameForForm(form)?.length ? ` for ${formatProjectNameForForm(form)}` : ''}, med følgende beskjed til ansvarlig søker:</p>
                                <p>
                                    {
                                        form?.statusReason?.length
                                            ? form.statusReason
                                            : ''
                                    }
                                </p>
                            </div>
                            <div className={commonStyle.paragraphGroup}>
                                <InputField id="foretakEpost" defaultValue={form?.formData?.foretak?.kontaktpersonEpost || ''} type="email" label="E-postadresse:" />
                            </div>
                            <Button content="Send kopi på e-post" color="primary" />
                        </div>
                        <ContactInfo />
                    </React.Fragment>
                );
            default:
                return '';
        }
    }


    render() {
        const submission = this.props.selectedSubmission;
        const form = this.props.selectedForm;
        const status = this.props.status;

        return submission && form
            ? (
                <Container>
                    <div className={commonStyle.headerSection}>
                        <Header content="Erklæring om ansvarsrett"></Header>
                        <span className={commonStyle.subtitle}>etter plan- og bygningsloven (pbl) § 23-3</span>
                    </div>
                    {
                        this.state.loadingMessage?.length
                            ? <LoadingAnimation fixed message={this.state.loadingMessage} />
                            : ''
                    }
                    {this.renderContent(status, form)}
                </Container>)
            : (
                <Container>
                    <p>Henter skjema</p>
                </Container>
            )
    }
}

const mapStateToProps = state => ({
    selectedSubmission: state.selectedSubmission,
    selectedForm: state.selectedForm,
    oidc: state.oidc
});

const mapDispatchToProps = {
    fetchSubmission,
    fetchSelectedForm,
    updateSelectedForm,
    saveSelectedForm,
    updateSignedStatus,
    getSignedDocument
};

export default connect(mapStateToProps, mapDispatchToProps)(Receipt);
