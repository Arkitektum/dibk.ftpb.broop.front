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
        switch (formType) {
            case 'Ansvarsrett':
                return <Ansvarsrett selectedSubmission={selectedSubmission} />
            case 'Kontrollerklaering':
                return <KontrollErklaering selectedSubmission={selectedSubmission} />
            case 'Samsvarserklaering':
                return <SamsvarsErklaering selectedSubmission={selectedSubmission} />
            default:
                return ''
        }
    }


    render() {
        const selectedSubmission = this.props.selectedSubmission
        const formType = selectedSubmission.innsendingstype;
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


