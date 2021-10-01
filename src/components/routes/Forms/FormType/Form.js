// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderToString } from 'react-dom/server'

// Componentstststsnts
import App from 'App';

// DIBK Design
import { Button, LoadingAnimation } from 'dibk-design';

// Template
import Container from 'components/template/Container';

// Partials
import Ansvarsrett from 'components/partials/Forms/Ansvarsrett';
import KontrollErklaering from 'components/partials/Forms/KontrollErklaering';
import SamsvarsErklaering from 'components/partials/Forms/SamsvarsErklaering';

// Actions
import { fetchSubmission } from 'actions/SubmissionActions';
import { initiateSigning } from 'actions/SigningActions';
import { convertSelectedFormToPDF } from 'actions/PrintActions';

/* eslint import/no-webpack-loader-syntax: off */
import printStyle from '!!raw-loader!sass-loader!../../../../print.scss';


class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            convertingSelectedFormToPDF: false,
            initiatingSigning: false
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
        switch (formType) {
            case 'ansvarsrett':
                return <Ansvarsrett selectedSubmission={selectedSubmission} />
            case 'kontrollerklaering':
                return <KontrollErklaering selectedSubmission={selectedSubmission} />
            case 'samsvarserklaering':
                return <SamsvarsErklaering selectedSubmission={selectedSubmission} />
            default:
                return ''
        }
    }


    renderHtmlContentForPdf() {
        localStorage.print = "true";
        const htmlString = renderToString(<div className="page"><App /></div>);
        localStorage.print = "false";
        const htmlContentString = `<html><head><style>${printStyle}</style></head><body>${htmlString}</body></html>`.replace(/\r?\n|\r/g, "");
        return htmlContentString;
    }

    handleSigningButtonClick() {
        this.setState({
            convertingSelectedFormToPDF: true
        });
        const htmlContentForPdf = this.renderHtmlContentForPdf();
        const selectedSubmission = this.props.selectedSubmission
        this.props.convertSelectedFormToPDF(htmlContentForPdf, selectedSubmission.referanseId).then(() => {
            this.setState({
                convertingSelectedFormToPDF: false,
                initiatingSigning: true
            });
            this.props.initiateSigning(selectedSubmission.referanseId, 'token-a-roonie').then(response => {
                this.setState({
                    initiatingSigning: false
                });
                let signingUrl = response.signingUrl;
                signingUrl += `?skjema=${selectedSubmission.referanseId}`;
                signingUrl += process?.env?.NODE_ENV === 'development' ? '&origin=localhost' : '';
                window.location.href = signingUrl;
            });
        })




    }


    render() {
        const selectedSubmission = this.props.selectedSubmission
        const formType = selectedSubmission.innsendingstype;

        return selectedSubmission
            ? (
                <Container>
                    {this.renderForm(formType, selectedSubmission)}
                    <Button content="Til signering" color="primary" onClick={() => this.handleSigningButtonClick()} />
                    {
                        this.state.convertingSelectedFormToPDF || this.state.initiatingSigning
                            ? <LoadingAnimation fixed="true" message={this.state.convertingSelectedFormToPDF ? 'Genererer PDF-fil' : 'Klargjør signering'} />
                            : ''
                    }
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
    fetchSubmission,
    initiateSigning,
    convertSelectedFormToPDF
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);


