// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { WizardNavigation } from 'dibk-design';

// Components
import Start from 'components/partials/Forms/KontrollErklaering/Start';
import ErklaeringenGjelder from 'components/partials/Forms/KontrollErklaering/ErklaeringenGjelder';
import Sluttrapport from 'components/partials/Forms/KontrollErklaering/Sluttrapport';
import Erklaering from 'components/partials/Forms/KontrollErklaering/Erklaering';

// Actions
import { fetchSelectedForm, updateSelectedForm } from 'actions/FormActions';

class KontrollErklaeringer extends Component {

    componentDidMount() {
        if (this.props.selectedSubmission && Object.keys(this.props.selectedSubmission).length) {
            this.props.fetchSelectedForm(this.props.selectedSubmission);
        }
    }

    componentDidUpdate() {
        const hasSelectedSubmission = this.props.selectedSubmission && Object.keys(this.props.selectedSubmission).length;
        const hasSelectedForm = this.props.selectedForm && Object.keys(this.props.selectedForm).length;
        if (hasSelectedSubmission && !hasSelectedForm) {
            this.props.fetchSelectedForm(this.props.selectedSubmission);
        }
    }

    renderStep(activeStepId) {
        switch (activeStepId.toLowerCase()) {
            case 'start':
                return <Start />
            case 'erklaeringengjelder':
                return <ErklaeringenGjelder />
            case 'sluttrapport':
                return <Sluttrapport />
            case 'erklaering':
                return <Erklaering />
            default:
                return activeStepId
        }
    }

    renderPrint() {
        return (
            <React.Fragment>
                <Start />
                <ErklaeringenGjelder />
                <Sluttrapport />
                <Erklaering />
            </React.Fragment>
        )
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
                link: { pathname: 'start' }
            },
            erklaeringenGjelder: {
                id: 'erklaeringenGjelder',
                name: 'Erklæringen gjelder',
                finished: false,
                hasErrors: false,
                link: { pathname: 'erklaeringenGjelder' }
            },
            sluttrapport: {
                id: 'sluttrapport',
                name: 'Sluttrapport for kontroll',
                finished: false,
                hasErrors: false,
                link: { pathname: 'sluttrapport' }
            },
            erklaering: {
                id: 'erklaering',
                name: 'Erklæring',
                finished: false,
                hasErrors: false,
                link: { pathname: 'erklaering' }
            }
        };
        return formData
            ? this.props.print
                ? this.renderPrint()
                : (
                    <React.Fragment>
                        <WizardNavigation steps={wizardSteps} activeStepId={activeStepId} />
                        {this.renderStep(activeStepId)}
                    </React.Fragment>
                )

            : (
                <p>Ingen data om ansvarlig søker</p>
            )
    }
}

const mapStateToProps = state => ({
    selectedSubmission: state.selectedSubmission,
    selectedForm: state.selectedForm
});

const mapDispatchToProps = {
    fetchSelectedForm,
    updateSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(KontrollErklaeringer);
