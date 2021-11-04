// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { Link, Redirect } from 'react-router-dom';


// Components
import App from 'App';

// DIBK Design
import { Button, Dialog, Header, Label, LoadingAnimation, Textarea } from 'dibk-design';

// Template
import Container from 'components/template/Container';

// Partials
import Ansvarsrett from 'components/partials/Forms/Ansvarsrett';
import KontrollErklaering from 'components/partials/Forms/KontrollErklaering';
import SamsvarsErklaering from 'components/partials/Forms/SamsvarsErklaering';

// Actions
import { fetchSubmission } from 'actions/SubmissionActions';
import { fetchSelectedForm, updateSelectedForm, saveSelectedForm } from 'actions/FormActions';
import { updateSignedStatus } from 'actions/SigningActions';
import { convertSelectedFormToPDF } from 'actions/PrintActions';
import { validateErklaeringCheckboxes, validateAnsvarsomraadeTiltaksklasse, validateDekkesOmradetAvSentralGodkjenning, validateSamsvarKontrollCheckboxes, validateAnsvarligForetakKontaktpersonEpost, validateAnsvarligForetakKontaktpersonNavn, validateAnsvarligForetakKontaktpersonTelefonnummer } from 'actions/ValidationActions';

// Helpers
import { getEnvironmentVariable } from 'helpers/environmentVariableHelpers';

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
    this.handleSubmitRejectionButtonClick = this.handleSubmitRejectionButtonClick.bind(this);
  }

  componentDidMount() {
    const submissionId = this.props.match.params.submissionId;
    if (!this.props.selectedSubmission || !Object.keys(this.props.selectedSubmission).length) {
      this.fecthFormData(submissionId).then(form => {
        this.redirectIfNotValidStatus();
      });
    } else {
      this.redirectIfNotValidStatus();
    }
  }

  componentDidUpdate() {
    if (this.state.redirect) {
      this.setState({ redirect: null });
    }
  }

  redirectIfNotValidStatus() {
    const validStatuses = ['tilSignering', 'iArbeid']
    const isValidStatus = validStatuses.some(status => {
      return this.props.form.status === status;
    });
    if (!isValidStatus) {
      this.setState({
        redirect: `/skjema/${this.props.form.referanseId}`
      });
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

    if (this.props.form?.signeringsUrl?.length) {
      window.location.href = this.props.form?.signeringsUrl;
    } else {
      const accessToken = this.props.oidc?.user?.access_token;
      this.props.convertSelectedFormToPDF(htmlContentForPdf, selectedSubmission.referanseId, accessToken).then(() => {
        this.setState({
          loadingMessage: 'Klargjør signering'
        });
        this.props.updateSignedStatus(selectedSubmission.referanseId, null, 'InitiateSigning', accessToken).then(response => {
          this.setState({
            loadingMessage: null
          });
          let signingUrl = response.signingUrl;
          const environment = getEnvironmentVariable('environment');
          signingUrl += `?skjema=${selectedSubmission.referanseId}`;
          signingUrl += environment?.length ? `&environment=${environment}` : '';
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
  }

  handleClickOutsideRejectDialog() {
    this.setState({
      redirect: `rediger`
    });
  }

  handleSubmitRejectionButtonClick() {
    return this.props.updateSelectedForm({
      ...this.props.form,
      status: 'avvist',
      statusReason: this.state.rejectionMessage
    }).then((updatedForm) => {
      const accessToken = this.props.oidc?.user?.access_token;
      this.props.saveSelectedForm(updatedForm, accessToken).then(() => {
        window.location.href = `/skjema/${this.props.form.referanseId}/signatur-avvist`;
      })

    });
  }

  runValidations() {
    this.props.validateErklaeringCheckboxes();
    this.props.validateAnsvarsomraadeTiltaksklasse();
    this.props.validateDekkesOmradetAvSentralGodkjenning();
    this.props.validateSamsvarKontrollCheckboxes();
    this.props.validateAnsvarligForetakKontaktpersonEpost();
    this.props.validateAnsvarligForetakKontaktpersonNavn();
    this.props.validateAnsvarligForetakKontaktpersonTelefonnummer();
  }


  render() {
    const selectedSubmission = this.props.selectedSubmission
    const formType = selectedSubmission.innsendingstype;
    const isPrint = localStorage.print === "true";
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    } else {
      return selectedSubmission
        ? (
          <Container>
            <div className={commonStyle.headerSection}>
              <Header content="Erklæring om ansvarsrett"></Header>
              <span className={commonStyle.subtitle}>etter plan- og bygningsloven (pbl) § 23-3</span>
            </div>
            {this.renderForm(formType, selectedSubmission)}
            {
              isPrint
                ? ''
                : (
                  <React.Fragment>


                    {
                      this.props.validationMessages && Object.keys(this.props.validationMessages)?.length
                        ? (
                          <div className={commonStyle.warningBox}>
                            <h2 className={commonStyle.boxTitle}>Du kan ikke signere erklæringen før alle opplysningene er fylt ut:</h2>
                            <ul className={commonStyle.boxList}>
                              {
                                Object.keys(this.props.validationMessages).map(validationMessageKey => {
                                  const validationMessage = this.props.validationMessages[validationMessageKey];
                                  return <li key={validationMessageKey}>{validationMessage}</li>
                                })
                              }
                            </ul>
                          </div>
                        )
                        : ''
                    }

                    {
                      this.props.isValidated
                        ? (<Button content="Til signering" color="primary" disabled={this.props.validationMessages && Object.keys(this.props.validationMessages)?.length ? true : false} onClick={() => this.handleSigningButtonClick()} />)
                        : (<Button content="Kontroller" color="primary" onClick={() => this.runValidations()} />)
                    }


                    {
                      this.state.loadingMessage?.length
                        ? <LoadingAnimation fixed message={this.state.loadingMessage} />
                        : ''
                    }
                    <div className={`${commonStyle.marginTop} ${commonStyle.marginBottom}`}>
                      <Label normalCursor>Har du oppdaget noe feil i erklæringen?</Label>
                      <Link to="avvis" title='Avvis erklæring'>
                        Meld fra til ansvarlig søker
                      </Link>
                    </div>
                    {
                      this.props.showRejectModal
                        ? (
                          <Dialog onClickOutside={this.handleClickOutsideRejectDialog} closeButton maxWidth="960px">
                            <Header content="Meld inn feil til ansvarlig søker" size={2} />
                            <p>Skriv en begrunnelse i tekstboksen under. Ansvarlig søker må rette opp feilen og sende en ny lenke for signering.</p>
                            <Textarea id="rejectionMessage" value={this.state.rejectionMessage || ''} onChange={event => this.setState({ rejectionMessage: event.target.value })} resize="vertical" />
                            <div className={commonStyle.marginTop}>
                              <Button content="Avvis erklæring" onClick={this.handleSubmitRejectionButtonClick} color="primary" disabled={!this.state.rejectionMessage?.trim()?.length} />
                            </div>
                            <p>
                              <Link to="rediger" title='Avvis erklæring'>
                                Avbryt og gå tilbake til erklæringen.
                              </Link>
                            </p>
                          </Dialog>)
                        : ''
                    }
                  </React.Fragment>
                )
            }
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
  isValidated: state.isValidated,
  validationMessages: state.validationMessages,
  location: state.router.location,
  oidc: state.oidc
});

const mapDispatchToProps = {
  fetchSubmission,
  fetchSelectedForm,
  updateSelectedForm,
  saveSelectedForm,
  updateSignedStatus,
  convertSelectedFormToPDF,
  validateErklaeringCheckboxes,
  validateAnsvarsomraadeTiltaksklasse,
  validateDekkesOmradetAvSentralGodkjenning,
  validateSamsvarKontrollCheckboxes,
  validateAnsvarligForetakKontaktpersonEpost,
  validateAnsvarligForetakKontaktpersonNavn,
  validateAnsvarligForetakKontaktpersonTelefonnummer
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);


