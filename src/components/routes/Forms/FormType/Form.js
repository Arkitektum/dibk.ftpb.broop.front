// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Template
import Container from 'components/template/Container';

// Partials
import Ansvarsrett from 'components/partials/Forms/Ansvarsrett';
import KontrollErklaering from 'components/partials/Forms/KontrollErklaering';
import SamsvarsErklaering from 'components/partials/Forms/SamsvarsErklaering';

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
        if (!this.props.selectedSubmission || !Object.keys(this.props.selectedSubmission).length) {
            this.props.fetchSubmission(submissionId).then((response) => {
                const submission = response?.payload || null;
                this.setState({ submission });
            });
        }
    }

    renderForm(formType, selectedSubmission) {
        const stepId = this.props.match.params.stepId;

        switch (formType) {
            case 'Ansvarsrett':
                return <Ansvarsrett selectedSubmission={selectedSubmission} />
            case 'Kontrollerklaering':
                return <KontrollErklaering selectedSubmission={selectedSubmission} stepId={stepId} />
            case 'Samsvarserklaering':
                return <SamsvarsErklaering selectedSubmission={selectedSubmission} stepId={stepId} />
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


