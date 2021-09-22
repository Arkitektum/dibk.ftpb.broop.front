// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// DIBK Design
import { Button, Header } from 'dibk-design';

// Template
import Container from 'components/template/Container';

// Partials
import ContactInfo from 'components/partials/ContactInfo';

// Actions
import { fetchSubmission } from 'actions/SubmissionActions';
import { fetchSelectedForm } from 'actions/FormActions';

// Stylesheets
import style from 'components/routes/Home.module.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      formFromUrlParameter: null,
      selectedFormOptionId: "",
      errorMessage: null,
      exampleForms: [
        {
          value: "15bfa3ca-aaa4-4c66-a64b-402eeabac496",
          label: "Ansvarsrett"
        },
        {
          value: "f23ec5bb-92bc-48b3-9eb5-35f01234ae7b",
          label: "Kontrollerklæring"
        },
        {
          value: "99d32a34-215f-45d3-a419-7e0b50953192",
          label: "Samsvarserklæring"
        }
      ]
    }
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
    });
  }

  getProjectNameForForm(form) {
    let projectName = '';
    if (form?.formData?.prosjektNavn) { // TODO add to API
      projectName += ` for ${form.formData.prosjektNavn}`;
    } else if (form?.formData?.eiendomByggesteder?.[0]?.adresselinje1) {
      projectName += ` for ${form.formData.eiendomByggesteder[0].adresselinje1}`;
    }
    if (form?.formData?.eiendomByggesteder?.[0]?.kommunenavn) {
      projectName += ` i ${form.formData.eiendomByggesteder[0].kommunenavn}`;
    }
    return projectName;

  }

  groupAnsvarsomraaderByFunksjon(ansvarsomraader) {
    let ansvarsomraaderGrouped = {}
    ansvarsomraader.forEach(ansvarsomraade => {
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
      : 'no list';
  }


  renderContent(status, form, submission) {
    switch (status) {
      case "opprettet":
      case "underBehandling":
      case "tilSignering":
        return (
          <React.Fragment>
            <div className={style.introText}>
              <Header content={`Erklæring om ansvarsrett fra ${form?.formData?.ansvarligSoeker?.navn} til signering`} />
              <div className={style.paragraphGroup}>
                <p>Dette er en erklæring om ansvarsrett{this.getProjectNameForForm(form)}.</p>
              </div>
              <div className={style.paragraphGroup}>
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
              </div>
              <div className={style.paragraphGroup}>
                {
                  form?.formData?.ansvarsomraader?.length
                    ? this.renderAnsvarsomraaderList(form.formData.ansvarsomraader)
                    : ''
                }
              </div>
            </div>
            <div className={style.paragraphGroup}>
              {
                form?.formData?.frist
                  ? <p>Frist for signering er ${form.formData.frist}.</p>
                  : ''
              }
              <p>Etter signering blir erklæringen sendt til {form?.formData?.ansvarligSoeker?.navn}.</p>
            </div>


            <ContactInfo />

            <Link to={`/skjema/${submission.referanseId}/rediger`}>
              <Button content="Logg inn" color='primary'></Button>
            </Link>
          </React.Fragment>
        );
      case "signert":
        const foretakEpost = form?.formData?.ansvarligForetak?.epost || form?.formData?.foretak?.kontaktpersonEpost;
        return (
          <React.Fragment>
            <div className={style.introText}>
              <Header content="Erklæring er allerede signert" />
              <div className={style.paragraphGroup}>
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
              <div className={style.paragraphGroup}>
                <p>Erklæringen gjelder{this.getProjectNameForForm(form)}.</p>
              </div>
            </div>
            <ContactInfo />
          </React.Fragment>
        );
      case "avvist":
        return (
          <React.Fragment>
            <div className={style.introText}>
              <Header content="Erklæring er avvist" />
              <div className={style.paragraphGroup}>
                <p>
                  {
                    form?.formData?.ansvarligForetak?.navn
                      ? `Erklæringen er avvist av ${form.formData.ansvarligForetak.navn} med følgende begrunnelse:`
                      : ''
                  }
                </p>
                <p>
                  {
                    form?.formData?.ansvarligForetak?.avvistBegrunnselse // TODO add to API
                      ? form.formData.ansvarligForetak.avvistBegrunnselse
                      : ''
                  }
                </p>
              </div>
              <div className={style.paragraphGroup}>
                <p>Erklæringen gjelder{this.getProjectNameForForm(form)}.</p>
              </div>
              <div className={style.paragraphGroup}>
                <p>Avvisningen og begrunnelsen er sendt til {form?.formData?.ansvarligSoeker?.navn}, som er ansvarlig søker</p>
              </div>
            </div>
            <ContactInfo />
          </React.Fragment>
        );
      case "utgått":
        return (
          <React.Fragment>
            <div className={style.introText}>
              <Header content="Fristen for å signere erklæringen er utgått" />
              <div className={style.paragraphGroup}>
                {
                  form?.formData?.frist
                    ? <p>Fristen for å signere gikk ut ${form.formData.frist}.</p> // TODO add to API
                    : ''
                }
              </div>
              <div className={style.paragraphGroup}>
                <p>Erklæringen gjaldt{this.getProjectNameForForm(form)}.</p>
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
    const status = this.state.status;
    const form = this.props.selectedForm;
    const submission = this.props.selectedSubmission;
    return (
      <Container>

        <div className='developmentTools'>
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

            <select value={this.state.status || ""} onChange={event => this.setState({ status: event.target.value })}>
              <option value="" disabled>Velg status</option>
              <option value="opprettet">Opprettet</option>
              <option value="underBehandling">Under behandling</option>
              <option value="tilSignering">Til signering</option>
              <option value="signert">Signert</option>
              <option value="avvist">Avvist</option>
              <option value="utgått">Utgått</option>
            </select>
          </div>
          <pre>Skjemareferanse:<br />{submission.referanseId || 'Ingen skjema er valgt'}</pre>
        </div>

        {this.state.errorMessage ? this.renderErrorMessage(this.state.errorMessage) : ''}
        {form ? this.renderContent(status, form, submission) : ''}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  selectedSubmission: state.selectedSubmission,
  selectedForm: state.selectedForm,
  location: state.router.location
});

const mapDispatchToProps = {
  fetchSubmission,
  fetchSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
