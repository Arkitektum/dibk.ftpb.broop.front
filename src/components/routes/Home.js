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

  componentDidMount() {
    const guid = '24E4920B-DEA0-462E-A481-6F061D3EB2EA'
    this.props.fetchSubmission(guid).then((response) => {
      const submission = response?.payload || null;
      this.setState({ submission });
    });
  }

  render() {
    const submission = this.state.submission;
    return submission && Object.keys(submission).length 
    ? (<Container>
      <h1>Testskjemaer:</h1>
      <Link to={`/Skjema/${submission.innsendingsType}/${submission.referanseId}/`}>
        <Button content={submission.innsendingsType} color='primary'></Button>
      </Link>
      <Link to={`/Skjema/KontrollErklaering/${submission.referanseId}/`}>
        <Button content='KontrollErklaering' color='primary'></Button>
      </Link>
    </Container>)
    : ''
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  fetchSubmission
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
