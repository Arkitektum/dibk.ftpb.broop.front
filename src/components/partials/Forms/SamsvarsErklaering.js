// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { WizardNavigation } from 'dibk-design';

// Components
import Start from 'components/partials/Forms/SamsvarsErklaering/Start';
import ErklaeringenGjelder from 'components/partials/Forms/SamsvarsErklaering/ErklaeringenGjelder';
import GjenstaaendeArbeider from 'components/partials/Forms/SamsvarsErklaering/GjenstaaendeArbeider';
import Erklaering from 'components/partials/Forms/SamsvarsErklaering/Erklaering';

// Actions
import { updateSelectedForm } from 'actions/FormActions';

class KontrollErklaeringer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prosjektnavn: 'Bakkebygrenda',
            avvik: {
                ingen: false,
                observert: false,
                aapne: false
            },
            gjennomfoertKontroll: false
        }
    }

    componentDidMount() {
        if (this.props.selectedSubmission && Object.keys(this.props.selectedSubmission).length) {
            const formApiUrl = this.props.selectedSubmission?._links?.ansvarsrettdistribuert?.href;
            fetch(`https://dibk-ftpb-broop-api.azurewebsites.net${formApiUrl}`).then(res => res.json()).then(form => {
                this.props.updateSelectedForm(form);
            });
        }
    }

    componentDidUpdate() {
        const hasSelectedSubmission = this.props.selectedSubmission && Object.keys(this.props.selectedSubmission).length;
        const hasSelectedForm = this.props.selectedForm && Object.keys(this.props.selectedForm).length;
        if (hasSelectedSubmission && !hasSelectedForm) {
            const formApiUrl = this.props.selectedSubmission?._links?.ansvarsrettdistribuert?.href;
            fetch(`https://dibk-ftpb-broop-api.azurewebsites.net${formApiUrl}`).then(res => res.json()).then(form => {
                this.props.updateSelectedForm(form);
            });
        }
    }

    renderStep(activeStepId) {
        switch (activeStepId.toLowerCase()) {
            case 'start':
                return <Start />
            case 'erklaeringengjelder':
                return <ErklaeringenGjelder />
            case 'gjenstaaendearbeider':
                return <GjenstaaendeArbeider />
            case 'erklaering':
                return <Erklaering />
            default:
                return activeStepId
        }
    }

    render() {
        const formData = this.props.selectedForm?.formData;
        const activeStepId = this.props.stepId || 'start';
        const wizardSteps = {
            start: {
                id: 'start',
                name: 'Start',
                finished: false,
                hasErrors: false,
                link: {pathname: 'start'}
            },
            erklaeringenGjelder: {
                id: 'erklaeringenGjelder',
                name: 'Erklæringen gjelder',
                finished: false,
                hasErrors: false,
                link: {pathname: 'erklaeringenGjelder'}
            },
            gjenstaaendeArbeider: {
                id: 'gjenstaaendeArbeider',
                name: 'Gjenstående arbeider',
                finished: false,
                hasErrors: false,
                link: {pathname: 'gjenstaaendeArbeider'}
            },
            erklaering: {
                id: 'erklaering',
                name: 'Erklæring',
                finished: false,
                hasErrors: false,
                link: {pathname: 'erklaering'}
            }
        };
        return formData
            ? (
                <React.Fragment>
                    <WizardNavigation steps={wizardSteps} activeStepId={activeStepId} />
                    {this.renderStep(activeStepId)}
                </React.Fragment>)
            : (
                <p>Ingen data for samsvarserklæring</p>
            )
    }
}

const mapStateToProps = state => ({
    selectedSubmission: state.selectedSubmission,
    selectedForm: state.selectedForm
});

const mapDispatchToProps = {
    updateSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(KontrollErklaeringer);


