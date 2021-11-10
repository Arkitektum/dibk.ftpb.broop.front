// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';


// Partials
import Ansvarsrett from 'components/partials/Pdf/Ansvarsrett';

// Actions
import { fetchSubmission } from 'actions/SubmissionActions';
import { fetchSelectedForm } from 'actions/FormActions';


class Pdf extends Component {

  componentDidMount() {
    const submissionId = this.props.match.params.submissionId;
    if (!this.props.selectedSubmission || !Object.keys(this.props.selectedSubmission).length) {
      this.fecthFormData(submissionId);
    }
  }

  fecthFormData(submissionId) {
    return this.props.fetchSubmission(submissionId).then(() => {
      if (this.props.selectedSubmission && Object.keys(this.props.selectedSubmission).length) {
        return this.props.fetchSelectedForm(this.props.selectedSubmission).then((response) => {
          return response.payload;
        }).catch(error => {
          console.log("fetchSelectedForm", error)
        });
      }
    }).catch(error => {
      console.log("fetchSubmission", error)
    });
  }

  renderForm(formType, selectedSubmission) {
    switch (formType) {
      case 'ansvarsrett':
        return <Ansvarsrett selectedSubmission={selectedSubmission} />
      case 'kontrollerklaering':
        return ''
      case 'samsvarserklaering':
        return ''
      default:
        return ''
    }
  }

  render() {
    const selectedSubmission = this.props.selectedSubmission
    const formType = selectedSubmission.innsendingstype;
    return selectedSubmission
      ? this.renderForm(formType, selectedSubmission)
      : ''
  }
}

const mapStateToProps = state => ({
  selectedSubmission: state.selectedSubmission,
  form: state.selectedForm
});

const mapDispatchToProps = {
  fetchSubmission,
  fetchSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Pdf);
