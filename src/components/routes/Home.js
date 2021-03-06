// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// DIBK Design
import { Button, Header, LoadingAnimation, Paper } from 'dibk-design';

// Template
import Container from 'components/template/Container';

// Partials
import ContactInfo from 'components/partials/ContactInfo';

// Actions
import { fetchSubmission } from 'actions/SubmissionActions';
import { fetchSelectedForm, updateSelectedForm, saveSelectedForm } from 'actions/FormActions';

// Helpers
import { formatDate, formatProjectNameForForm } from 'helpers/formatHelpers';

// Stylesheets
import commonStyle from 'components/routes/common.module.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      formFromUrlParameter: null,
      selectedFormOptionId: "",
      errorMessage: null,
      exampleForms: [
        {
          value: "2593ecac-fad0-420b-b760-b6a98005df42",
          label: "Ansvarsrett"
        },
        {
          value: "0e9f692e-c4a3-4b88-8c42-a0f0a7a759a1",
          label: "Kontrollerklæring"
        },
        {
          value: "152b9329-e64d-43a9-92f1-daa110230347",
          label: "Samsvarserklæring"
        }
      ]
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  componentDidMount() {
    const submissionId = this.props.match.params.submissionId;
    if (submissionId) {
      this.fetchSubmission(submissionId).then(form => {
        if (form) {
          this.setState({
            formFromUrlParameter: {
              value: form.referanseId,
              label: form.innsendingstype
            },
            errorMessage: null,
            loadingMessage: null
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
  }

  componentDidUpdate() {
    if (this.state.redirect) {
      this.setState({ redirect: null });
    }
  }

  handleLoginClick(event) {
    event.preventDefault();
    this.props.userManager.signinRedirect({ 'state': { signinRedirectPath: `/skjema/${this.props.selectedForm?.referanseId}/rediger` } });
  }

  fetchSubmission(submissionId) {
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
    }).finally(() => {
      this.setState({
        loadingMessage: null
      });
    });
  }

  handleStatusOnChange(status) {
    return this.props.updateSelectedForm({
      ...this.props.selectedForm,
      status
    }).then((updatedForm) => {
      this.props.saveSelectedForm(updatedForm);

    });
  }



  groupAnsvarsomraaderByFunksjon(ansvarsomraader) {
    let ansvarsomraaderGrouped = {}
    ansvarsomraader.filter(ansvarsomraade => {
      return ansvarsomraade.beskrivelseAvAnsvarsomraade?.length;
    }).forEach(ansvarsomraade => {
      if (!ansvarsomraaderGrouped[ansvarsomraade.funksjonKode]) {
        ansvarsomraaderGrouped[ansvarsomraade.funksjonKode] = {
          funksjonBeskrivelse: ansvarsomraade.funksjonBeskrivelse,
          ansvarsomraader: []
        };
      }
      ansvarsomraaderGrouped[ansvarsomraade.funksjonKode].ansvarsomraader.push(ansvarsomraade);
    })
    return ansvarsomraaderGrouped;
  }

  renderAnsvarsomraaderList(ansvarsomraader) {
    const ansvarsomraadeByFunksjon = this.groupAnsvarsomraaderByFunksjon(ansvarsomraader);
    return ansvarsomraadeByFunksjon && Object.keys(ansvarsomraadeByFunksjon)?.length
      ? Object.keys(ansvarsomraadeByFunksjon).map(ansvarsomraadeFunksjonKey => {
        const ansvarsomraadeFunksjon = ansvarsomraadeByFunksjon[ansvarsomraadeFunksjonKey];
        const ansvarsomraadeListElements = ansvarsomraadeFunksjon.ansvarsomraader.map((ansvarsomraade, ansvarsomraadeIndex) => {
          return (
            <li key={ansvarsomraadeIndex}>{ansvarsomraade.beskrivelseAvAnsvarsomraade}</li>
          )
        })
        return (
          <ul key={ansvarsomraadeFunksjonKey}>
            <li>{ansvarsomraadeFunksjon?.funksjonBeskrivelse}</li>
            <ul>{ansvarsomraadeListElements}</ul>
          </ul>
        )
      })
      : (
        <ul>
          <li>Ansvarlig søker</li>
        </ul>
      );
  }


  renderContent(form, submission) {
    switch (form.status) {
      case "tilSignering":
      case "iArbeid":
        return (
          <React.Fragment>
            <div className={commonStyle.introText}>
              <div className={commonStyle.paragraphGroup}>
                <p><b>Erklæring om ansvarsrett fra {form?.formData?.ansvarligSoeker?.navn} til signering</b></p>
              </div>
              <div className={commonStyle.paragraphGroup}>
                <p>Dette er en erklæring om ansvarsrett{formatProjectNameForForm(form)}.</p>
              </div>
              <div className={commonStyle.paragraphGroup}>
                {
                  form?.formData?.ansvarligForetak?.navn || form?.formData?.ansvarligForetak?.kontaktpersonNavn
                    ? (
                      <React.Fragment>
                        <b>Hvem er ansvarlig for signering?</b>
                        {
                          form?.formData?.ansvarligForetak?.navn
                            ? (<p>Ansvarlig foretak er: {form.formData.ansvarligForetak.navn}</p>)
                            : ''
                        }
                        {
                          form?.formData?.ansvarligForetak?.kontaktpersonNavn
                            ? (<p>Kontaktperson hos ansvarlig foretak er: {form.formData.ansvarligForetak.kontaktpersonNavn}</p>)
                            : ''
                        }
                      </React.Fragment>
                    )
                    : ''
                }
              </div>
              {
                form?.signeringsfrist
                  ? (
                    <div className={commonStyle.paragraphGroup}>
                      <b>Frist for signering</b>
                      <div>Frist for signering er {formatDate(form.signeringsfrist)}. Etter fristen vil det ikke lenger være mulig å signere erklæringen</div>
                    </div>
                  )
                  : ''
              }
              <div className={commonStyle.paragraphGroup}>
                <b>Erklæringen gjelder</b>
                {this.renderAnsvarsomraaderList(form.formData.ansvarsomraader)}
              </div>
            </div>
            <ContactInfo />
            <div className={commonStyle.marginTop}>
              <Button content="Logg inn" color='primary' onClick={this.handleLoginClick} />
            </div>
          </React.Fragment >
        );
      case "signert":
        const foretakEpost = form?.formData?.ansvarligForetak?.epost || form?.formData?.foretak?.kontaktpersonEpost;
        return (
          <React.Fragment>
            <div className={commonStyle.introText}>
              <div className={commonStyle.paragraphGroup}>
                <p><b>Erklæring er allerede signert</b></p>
              </div>
              <div className={commonStyle.paragraphGroup}>
                <p>
                  {
                    form?.formData?.foretak?.navn
                      ? `Erklæringen er allerede signert av ${form.formData.foretak.navn}`
                      : ''
                  }
                  {
                    foretakEpost
                      ? `En kopi av den signerte erklæringen er sendt til ${foretakEpost}.`
                      : ''
                  }
                </p>
              </div>
              <div className={commonStyle.paragraphGroup}>
                <p>Erklæringen gjelder{formatProjectNameForForm(form)}.</p>
              </div>
            </div>
            <ContactInfo />
          </React.Fragment>
        );
      case "avvist":
        return (
          <React.Fragment>
            <div className={commonStyle.introText}>
              <div className={commonStyle.paragraphGroup}>
                <p><b>Erklæring er avvist</b></p>
              </div>
              <div className={commonStyle.paragraphGroup}>
                <p>
                  {
                    form?.formData?.ansvarligForetak?.navn
                      ? `Erklæringen er avvist av ${form.formData.ansvarligForetak.navn} med følgende begrunnelse:`
                      : ''
                  }
                </p>
                <p>
                  {
                    form?.statusReason?.length
                      ? form.statusReason
                      : ''
                  }
                </p>
              </div>
              <div className={commonStyle.paragraphGroup}>
                <p>Erklæringen gjelder{formatProjectNameForForm(form)}.</p>
              </div>
              <div className={commonStyle.paragraphGroup}>
                <p>Avvisningen og begrunnelsen er sendt til {form?.formData?.ansvarligSoeker?.navn}, som er ansvarlig søker</p>
              </div>
            </div>
            <ContactInfo />
          </React.Fragment>
        );
      case "utgaatt":
        return (
          <React.Fragment>
            <div className={commonStyle.introText}>
              <div className={commonStyle.paragraphGroup}>
                <p><b>Fristen for å signere erklæringen er utgått</b></p>
              </div>
              <div className={commonStyle.paragraphGroup}>
                {
                  form?.signeringsfrist
                    ? <p>Fristen for å signere gikk ut {formatDate(form.signeringsfrist)}.</p>
                    : ''
                }
              </div>
              <div className={commonStyle.paragraphGroup}>
                <p>Erklæringen gjaldt{formatProjectNameForForm(form)}.</p>
              </div>
            </div>
            <ContactInfo type="utgaatt" />
          </React.Fragment>
        );
      default:
        return '';
    }
  }

  renderErrorMessage(errorMessage) {
    return (
      <React.Fragment>
        <Header content="Feil" />
        <p>{errorMessage}</p>
      </React.Fragment>
    );
  }


  render() {
    const form = this.props.selectedForm;
    const submission = this.props.selectedSubmission;
    const showDevTools = false;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    } else {
      return (
        <Container>
          {
            showDevTools
              ? (<div className='developmentTools'>
                <span>Testverktøy</span>
                <div>
                  <select value={this.state.selectedFormOptionId} onChange={event => this.fetchSubmission(event.target.value)}>
                    <option value="" disabled>Velg skjema</option>
                    {
                      this.state.exampleForms.map(exampleForm => {
                        return <option key={exampleForm.value} value={exampleForm.value}>{exampleForm.label}</option>
                      })
                    }
                    {
                      this.state.formFromUrlParameter
                        ? (<option value={this.state.formFromUrlParameter.value}>{this.state.formFromUrlParameter.label} (Fra Id)</option>)
                        : ''
                    }
                  </select>
                  <select value={form.status || ""} onChange={event => this.handleStatusOnChange(event.target.value)}>
                    <option value="" disabled>Velg status</option>
                    <option value="tilSignering">Til signering</option>
                    <option value="iArbeid">I arbeid</option>
                    <option value="signert">Signert</option>
                    <option value="avvist">Avvist</option>
                    <option value="utgaatt">Utgått</option>
                    <option value="trukket">Trukket</option>
                    <option value="avsluttet">Avsluttet</option>
                    <option value="feilet">Feilet</option>
                  </select>
                </div>
                <pre>Skjemareferanse:<br />{submission.referanseId || 'Ingen skjema er valgt'}</pre>
              </div>)
              : ''
          }

          <div className={commonStyle.headerSection}>
            <Header content="Erklæring om ansvarsrett"></Header>
            <span className={commonStyle.subtitle}>etter plan- og bygningsloven (pbl) § 23-3</span>
          </div>

          {this.state.errorMessage ? this.renderErrorMessage(this.state.errorMessage) : ''}
          {form ? <Paper>{this.renderContent(form, submission)}</Paper> : ''}
          {
            this.state.loadingMessage?.length
              ? <LoadingAnimation fixed message={this.state.loadingMessage} />
              : ''
          }
        </Container>
      )
    }
  }
}

const mapStateToProps = state => ({
  selectedSubmission: state.selectedSubmission,
  selectedForm: state.selectedForm,
  location: state.router.location
});

const mapDispatchToProps = {
  fetchSubmission,
  fetchSelectedForm,
  updateSelectedForm,
  saveSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
