// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


// DIBK Design
import { Button } from 'dibk-design';

// Template
import Container from 'components/template/Container';

// Actions
import { fetchSubmission } from 'actions/SubmissionActions';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submission: null
    }
  }


  fetchSubmission(guid) {
    this.props.fetchSubmission(guid).then(response => {
      const submission = response?.payload || null;
      this.setState({ submission });
    })
  }


  render() {
    const submission = this.state.submission;
    return (
      <Container>
        <h1>Testskjemaer:</h1>
        <Button content="Hent ansvarsrett" onClick={() => this.fetchSubmission("D84A298B-5D3F-4D8C-BDC1-45EF3E2808B2")} />
        <Button content="Hent kontrollerklæring" onClick={() => this.fetchSubmission("07B1ACDB-BEBB-4B0A-BB1C-CB7ABA85A3AC")} />
        <Button content="Hent samsvarserklæring" onClick={() => this.fetchSubmission("C79BA4D1-8404-4D6F-8967-BADF75951DE5")} />

        {
          submission && Object.keys(submission).length
            ? (
              <div>
                <p>Skjema med referanse {submission.referanseId} er hentet</p>
                <Link to={`/Skjema/${submission.innsendingsType}/${submission.referanseId}/`}>
                  <Button content={`Gå til ${submission.innsendingsType.toLowerCase()}`} color='primary'></Button>
                </Link>
              </div>
            )
            : ''
        }
      </Container>
    )
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  fetchSubmission
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
