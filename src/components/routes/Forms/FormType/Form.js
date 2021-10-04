// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderToString } from 'react-dom/server'
import { Link, Redirect } from 'react-router-dom';


// Componentstststsnts
import App from 'App';

// DIBK Design
import { Button, Header, LoadingAnimation, Textarea } from 'dibk-design';

// Template
import Container from 'components/template/Container';
import Dialog from 'components/template/Dialog';

// Partials
import Ansvarsrett from 'components/partials/Forms/Ansvarsrett';
import KontrollErklaering from 'components/partials/Forms/KontrollErklaering';
import SamsvarsErklaering from 'components/partials/Forms/SamsvarsErklaering';
import ContactInfo from 'components/partials/ContactInfo';

// Actions
import { fetchSubmission } from 'actions/SubmissionActions';
import { fetchSelectedForm } from 'actions/FormActions';
import { initiateSigning } from 'actions/SigningActions';
import { convertSelectedFormToPDF } from 'actions/PrintActions';

// Stylesheets
import commonStyle from 'components/routes/common.module.scss';

/* eslint import/no-webpack-loader-syntax: off */
import printStyle from '!!raw-loader!sass-loader!../../../../print.scss';


class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            rejectionMessage: null,
            loadingMessage: null
        }
        this.handleClickOutsideRejectDialog = this.handleClickOutsideRejectDialog.bind(this);

    }

    componentDidMount() {
        const submissionId = this.props.match.params.submissionId;
        if (!this.props.selectedSubmission || !Object.keys(this.props.selectedSubmission).length) {
            this.fecthFormData(submissionId);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.state.redirect) {
            this.setState({ redirect: null });
        }
    }

    fecthFormData(submissionId) {
        this.setState({
            loadingMessage: 'Henter innsending'
        });
        return this.props.fetchSubmission(submissionId).then(() => {
            this.setState({
                loadingMessage: 'Henter skjema'
            });
            if (this.props.selectedSubmission && Object.keys(this.props.selectedSubmission).length) {
                return this.props.fetchSelectedForm(this.props.selectedSubmission).then((response) => {
                    const selectedForm = response.payload;
                    if (selectedForm) {
                        this.setState({
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


    renderForm(formType, selectedSubmission) {
        switch (formType) {
            case 'ansvarsrett':
                return <Ansvarsrett selectedSubmission={selectedSubmission} />
            case 'kontrollerklaering':
                return <KontrollErklaering selectedSubmission={selectedSubmission} />
            case 'samsvarserklaering':
                return <SamsvarsErklaering selectedSubmission={selectedSubmission} />
            default:
                return ''
        }
    }


    renderHtmlContentForPdf() {
        localStorage.print = "true";
        const htmlString = renderToString(<div className="page"><App /></div>);
        localStorage.print = "false";
        const htmlContentString = `<html><head><style>${printStyle}</style></head><body>${htmlString}</body></html>`.replace(/\r?\n|\r/g, "");
        return htmlContentString;
    }

    handleSigningButtonClick() {
        this.setState({
            loadingMessage: 'Genererer PDF-fil'
        });
        const htmlContentForPdf = this.renderHtmlContentForPdf();
        const selectedSubmission = this.props.selectedSubmission
        this.props.convertSelectedFormToPDF(htmlContentForPdf, selectedSubmission.referanseId).then(() => {
            this.setState({
                loadingMessage: 'Klargjør signering'
            });
            this.props.initiateSigning(selectedSubmission.referanseId, 'token-a-roonie').then(response => {
                this.setState({
                    loadingMessage: null
                });
                let signingUrl = response.signingUrl;
                signingUrl += `?skjema=${selectedSubmission.referanseId}`;
                signingUrl += process?.env?.NODE_ENV === 'development' ? '&origin=localhost' : '';
                window.location.href = signingUrl;
            }).catch(error => {
                this.setState({
                    loadingMessage: null
                });
            });
        }).catch(error => {
            this.setState({
                loadingMessage: null
            });
        })
    }

    handleClickOutsideRejectDialog() {
        this.setState({
            redirect: `rediger`
        });
    }


    render() {
        const selectedSubmission = this.props.selectedSubmission
        const formType = selectedSubmission.innsendingstype;
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        } else {
            return selectedSubmission
                ? (
                    <Container>
                        {this.renderForm(formType, selectedSubmission)}
                        <Button content="Til signering" color="primary" onClick={() => this.handleSigningButtonClick()} />
                        {
                            this.state.loadingMessage?.length
                                ? <LoadingAnimation fixed message={this.state.loadingMessage} />
                                : ''
                        }
                        <div className={`${commonStyle.marginTop} ${commonStyle.marginBottom}`}>
                            <Link to="avvis" title='Avvis erklæring'>
                                Avvis erklæring
                            </Link>
                            <p>
                                Trykk på lenken over hvis du ikke ønsker å signere erklæringen.<br />
                                Du får muligheten til å skrive en begrunnelse som sendes til ansvarlig søker.
                            </p>
                        </div>
                        {
                            this.props.showRejectModal
                                ? (
                                    <Dialog onClickOutside={this.handleClickOutsideRejectDialog} maxWidth="960px">
                                        <Header content="Du har valgt å avvise erklæringen" size={2} />
                                        <p>Her Må du skrive en begrunnelse til ansvarlig søker:</p>
                                        <Textarea id="rejectionMessage" onChange={event => this.setState({ rejectionMessage: event.target.value })} />
                                        <div className={commonStyle.marginTop}>
                                            <Button content="Avvis og send" color="primary" disabled={!this.state.rejectionMessage?.trim()?.length} />
                                        </div>
                                        <p>
                                            <Link to="rediger" title='Avvis erklæring'>
                                                Avbryt og gå tilbake til erklæringen.
                                            </Link>
                                        </p>
                                    </Dialog>)
                                : ''
                        }
                        <ContactInfo />
                    </Container>)
                : (
                    <Container>
                        <p>Henter skjema</p>
                    </Container>
                )
        }
    }
}

const mapStateToProps = state => ({
    selectedSubmission: state.selectedSubmission,
    form: state.selectedForm,
    location: state.router.location
});

const mapDispatchToProps = {
    fetchSubmission,
    fetchSelectedForm,
    initiateSigning,
    convertSelectedFormToPDF
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);


