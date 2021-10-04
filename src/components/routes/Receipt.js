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
import { fetchSelectedForm } from 'actions/FormActions';
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
        if (submissionId) {
            this.fetchSubmission(submissionId).then(form => {
                if (form) {
                    this.setState({
                        errorMessage: null
                    });
                } else {
                    this.setState({
                        errorMessage: `Kunne ikke hente skjema med referanse: ${submissionId}`
                    });
                }
            }).catch(error => {
                console.log("Home component did mount", error);
            });
        }
        const stage = getStageFromStatus(this.props.status);
        this.props.updateSignedStatus(submissionId, 'query-token-a-roonie', stage) // TODO: get query token
    }


    fetchSubmission(submissionId) {
        return this.props.fetchSubmission(submissionId).then(() => {
            if (this.props.selectedSubmission && Object.keys(this.props.selectedSubmission).length) {
                return this.props.fetchSelectedForm(this.props.selectedSubmission).then((response) => {
                    const selectedForm = response.payload;
                    if (selectedForm) {
                        this.setState({
                            selectedFormOptionId: selectedForm.referanseId,
                            status: selectedForm.status,
                            errorMessage: null
                        });
                    } else {
                        this.setState({
                            errorMessage: `Kunne ikke hente skjema med referanse: ${submissionId}`
                        });
                    }
                    return selectedForm;
                }).catch(error => {
                    console.log("fetchSelectedForm", error)
                });
            }
        }).catch(error => {
            console.log("fetchSubmission", error)
    handleDownloadButtonClick() {
        const submissionId = this.props.match.params.submissionId;
        this.setState({
            loadingMessage: 'Henter signert dokument'
        });
        this.props.getSignedDocument(submissionId).then(signedDocument => {
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


    renderContent(status, form, submission) {
        const foretakEpost = form?.formData?.ansvarligForetak?.epost || form?.formData?.foretak?.kontaktpersonEpost;
        switch (status) {
            case "signert":
                return (
                    <React.Fragment>
                        <div className={commonStyle.introText}>
                            <Header content="Erklæring er signert" />
                            <div className={commonStyle.paragraphGroup}>
                                <p>Erklæringen om ansvarsrett{formatProjectNameForForm(form)?.length ? ` for ${formatProjectNameForForm(form)}` : ''} er signert og sendt til ansvarlig søker.</p>
                            </div>
                            <div className={commonStyle.paragraphGroup}>
                                <p>{
                                    foretakEpost?.length
                                        ? `En kopi av den signerte erklæringen er sendt til ${foretakEpost}. Du kan også laste ned en kopi ved å trykke på knappen under.`
                                        : 'Du kan laste ned en kopi ved å trykke på knappen under.'}
                                </p>
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
                            <Header content="Erklæring er avvist" />
                            <div className={commonStyle.paragraphGroup}>
                                <p>Du har avvist erklæringen om ansvarsrett{formatProjectNameForForm(form)?.length ? ` for ${formatProjectNameForForm(form)}` : ''}, med følgende beskjed til ansvarlig søker:</p>
                                <p>
                                    {
                                        form?.formData?.ansvarligForetak?.avvistBegrunnselse // TODO add to API
                                            ? form.formData.ansvarligForetak.avvistBegrunnselse
                                            : ''
                                    }
                                </p>
                            </div>
                            <div className={commonStyle.paragraphGroup}>
                                <InputField id="foretakEpost" value={foretakEpost} type="email" label="E-postadresse:" />
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
                    {
                        this.state.loadingMessage?.length
                            ? <LoadingAnimation fixed message={this.state.loadingMessage} />
                            : ''
                    }
                    {this.renderContent(status, form, submission)}
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
    selectedForm: state.selectedForm
});

const mapDispatchToProps = {
    fetchSubmission,
    fetchSelectedForm,
    updateSignedStatus,
    getSignedDocument
};

export default connect(mapStateToProps, mapDispatchToProps)(Receipt);


