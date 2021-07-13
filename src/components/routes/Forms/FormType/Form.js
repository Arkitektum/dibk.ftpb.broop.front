// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { Header } from 'dibk-design';

// Template
import Container from 'components/template/Container';

// Partials
import DistribuertAnsvarsrett from 'components/partials/Forms/DistribuertAnsvarsrett';

// Actions
import { fetchSubmission } from 'actions/SubmissionActions';


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: null
        }
    }

    componentDidMount() {
        const submissionId = this.props.match.params.submissionId;
        if (!this.props.submission || Object.keys(!this.props.submission).length) {
            this.props.fetchSubmission(submissionId).then((response) => {
                const submission = response?.payload || null;
                this.setState({ submission });
            });
        }
    }

    renderForm(formType, selectedSubmission) {
        switch (formType) {
            case 'DistribuertAnsvarsrett':
                return <DistribuertAnsvarsrett selectedSubmission={selectedSubmission} />
            default:
                return ''
        }
    }


    render() {
        const formType = this.props.match.params.formType;
        const selectedSubmission = this.props.selectedSubmission
        return selectedSubmission
            ? (
                <Container>
                    {this.renderForm(formType, selectedSubmission)}
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
    form: state.selectedForm
});

const mapDispatchToProps = {
    fetchSubmission
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);


