// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// DIBK Design
import { Button } from 'dibk-design';

// Template
import Container from 'components/template/Container';

// Partials
import ContactInfo from 'components/partials/ContactInfo';

// Actions
import { fetchSubmission } from 'actions/SubmissionActions';
import { fetchSelectedForm } from 'actions/FormActions';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null
    }
  }


  fetchSubmission(guid) {
    this.props.fetchSubmission(guid).then(response => {
      if (this.props.selectedSubmission && Object.keys(this.props.selectedSubmission).length) {
        this.props.fetchSelectedForm(this.props.selectedSubmission);
      }
    })
  }

  getProjectNameForForm(form) {
    let projectName = '';
    if (form?.formData?.prosjektNavn) { // TODO add to API
      projectName += ` for ${form.formData.prosjektNavn}`;
    } else if (form?.formData?.eiendomByggested?.[0]?.adresse?.adresselinje1) {
      projectName += ` for ${form.formData.eiendomByggested[0].adresse.adresselinje1}`;
    }
    if (form?.formData?.eiendomByggested?.[0]?.kommunenavn) { // TODO add to API
      projectName += ` i ${form.formData.eiendomByggested[0].kommunenavn}`;
    }
    return projectName;

  }

  groupAnsvarsomraaderByFunksjon(ansvarsomraader) {
    let ansvarsomraaderGrouped = {}
    ansvarsomraader.forEach(ansvarsomraade => {
      if (!ansvarsomraaderGrouped[ansvarsomraade.funksjon.kodeverdi]) {
        ansvarsomraaderGrouped[ansvarsomraade.funksjon.kodeverdi] = {
          kodebeskrivelse: ansvarsomraade.funksjon.kodebeskrivelse,
          ansvarsomraader: []
        };
      }
      ansvarsomraaderGrouped[ansvarsomraade.funksjon.kodeverdi].ansvarsomraader.push(ansvarsomraade);
    })
    return ansvarsomraaderGrouped;
  }

  renderAnsvarsomraaderList(ansvarsomraader) {
    const ansvarsomraadeByFunksjon = this.groupAnsvarsomraaderByFunksjon(ansvarsomraader);
    console.log("ansvarsomraadeByFunksjon", ansvarsomraadeByFunksjon)
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
            <li>{ansvarsomraadeFunksjon?.kodebeskrivelse}</li>
            <ul>{ansvarsomraadeListElements}</ul>
          </ul>
        )
      })
      : 'no list';
  }


  renderContent(status, form, submission) {
    const foretak = form?.formData?.foretak || form?.formData?.ansvarsrett?.foretak;
    switch (status) {
      case "tilSignering":
        return (
          <React.Fragment>
            <h1>Erklæring om ansvarsrett fra {form?.formData?.ansvarligSoeker?.navn} til signering</h1>
            <p>Dette er en erklæring om ansvarsrett{this.getProjectNameForForm(form)}.</p>
            {
              foretak?.navn
                ? (<p>Ansvarlig foretak er: {foretak.navn}</p>)
                : ''
            }
            {
              foretak?.kontaktperson?.navn
                ? (<p>Kontaktperson hos ansvarlig foretak er: {foretak.kontaktperson.navn}</p>)
                : ''
            }

            {
              form?.formData?.ansvarsrett?.ansvarsomraader?.length
                ? this.renderAnsvarsomraaderList(form.formData.ansvarsrett.ansvarsomraader)
                : ''
            }
            {
              form?.formData?.frist
                ? <p>Frist for signering er ${form.formData.frist}.</p>
                : ''
            }
            <p>Etter signering blir erklæringen sendt til {form?.formData?.ansvarligSoeker?.navn}.</p>

            <ContactInfo />

            <Link to={`/${submission.innsendingsType}/${submission.referanseId}/`}>
              <Button content="Logg inn" color='primary'></Button>
            </Link>
          </React.Fragment>
        );
      case "iArbeid":
        return (
          <React.Fragment>
            I arbeid
          </React.Fragment>
        );
      case "signert":
        return (
          <React.Fragment>
            Signert
          </React.Fragment>
        );
      case "avvist":
        return (
          <React.Fragment>
            Avvist
          </React.Fragment>
        );
      case "utgaatt":
        return (
          <React.Fragment>
            Utgått
          </React.Fragment>
        );
      default:
        return '';
    }
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
            <select onChange={event => this.fetchSubmission(event.target.value)}>
              <option value="" disabled selected>Velg skjema</option>
              <option value="D84A298B-5D3F-4D8C-BDC1-45EF3E2808B2">Ansvarsrett</option>
              <option value="07B1ACDB-BEBB-4B0A-BB1C-CB7ABA85A3AC">Kontrollerklæring</option>
              <option value="C79BA4D1-8404-4D6F-8967-BADF75951DE5">Samsvarserklæring</option>
            </select>



            <select onChange={event => this.setState({ status: event.target.value })}>
              <option value="" disabled selected>Velg status</option>
              <option value="tilSignering">Til signering</option>
              <option value="iArbeid">I arbeid</option>
              <option value="signert">Signert</option>
              <option value="avvist">Avvist</option>
              <option value="utgaatt">Utgått</option>
            </select>
          </div>
          <pre>Skjemareferanse:<br />{submission.referanseId || 'Ingen skjema er valgt'}</pre>
        </div>

        {this.renderContent(status, form, submission)}


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
  fetchSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
