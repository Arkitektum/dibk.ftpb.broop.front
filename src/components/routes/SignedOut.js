// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { Header, LoadingAnimation } from 'dibk-design';

// Template
import Container from 'components/template/Container';

// Partials
import ContactInfo from 'components/partials/ContactInfo';

// Actions
import { fetchSubmission } from 'actions/SubmissionActions';
import { fetchSelectedForm } from 'actions/FormActions';

// Stylesheets
import commonStyle from 'components/routes/common.module.scss';


class SignedOut extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null,
            loadingMessage: null
        };
    }

    componentDidMount() {
        const submissionId = this.props.match.params.submissionId;
        if (submissionId) {
            this.fecthFormData(submissionId);
        }
    }

    fecthFormData(submissionId) {
        this.setState({
            loadingMessage: 'Henter innsending'
        });
        return this.props.fetchSubmission(submissionId).then(() => {
            if (this.props.selectedSubmission && Object.keys(this.props.selectedSubmission).length) {
                this.setState({
                    loadingMessage: 'Henter skjema'
                });
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
        }).finally(() => {
            this.setState({
                loadingMessage: null
            });
        });;
    }

    render() {
        const submission = this.props.selectedSubmission;
        const form = this.props.selectedForm;
        return submission && form
            ? (
                <Container>
                    <div className={commonStyle.headerSection}>
                        <Header content="Erklæring om ansvarsrett"></Header>
                        <span className={commonStyle.subtitle}>etter plan- og bygningsloven (pbl) § 23-3</span>
                    </div>
                    {
                        this.state.loadingMessage?.length
                            ? <LoadingAnimation fixed message={this.state.loadingMessage} />
                            : ''
                    }
                    <div className={commonStyle.introText}>
                        <p><b>Du er nå logget ut</b></p>
                        <div className={commonStyle.paragraphGroup}>
                            <p>Endringene er lagret. For å komme tilbake til erklæringen og signere den, må du bruke den samme lenken som første gang du åpnet ansvarsretten.</p>
                        </div>
                    </div>
                    <ContactInfo />
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
    selectedForm: state.selectedForm,
    oidc: state.oidc
});

const mapDispatchToProps = {
    fetchSubmission,
    fetchSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedOut);
