// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Start from 'components/partials/Forms/SamsvarsErklaering/Start';
import ErklaeringenGjelder from 'components/partials/Forms/SamsvarsErklaering/ErklaeringenGjelder';
import GjenstaaendeArbeider from 'components/partials/Forms/SamsvarsErklaering/GjenstaaendeArbeider';
import Erklaering from 'components/partials/Forms/SamsvarsErklaering/Erklaering';

// Actions
import { fetchSelectedForm, updateSelectedForm } from 'actions/FormActions';

class SamsvarsErklaeringer extends Component {

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

    render() {
        const formData = this.props.selectedForm?.formData;
        return formData
            ? (
                <React.Fragment>
                    <Start />
                    <ErklaeringenGjelder />
                    <GjenstaaendeArbeider />
                    <Erklaering />
                </React.Fragment>
            )
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
    fetchSelectedForm,
    updateSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(SamsvarsErklaeringer);


