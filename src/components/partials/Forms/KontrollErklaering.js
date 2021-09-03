// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Start from 'components/partials/Forms/KontrollErklaering/Start';
import ErklaeringenGjelder from 'components/partials/Forms/KontrollErklaering/ErklaeringenGjelder';
import Vedlegg from 'components/partials/Forms/KontrollErklaering/Vedlegg';
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

    render() {
        const formData = this.props.selectedForm?.formData;
        return formData
            ? (
                <React.Fragment>
                    <Start />
                    <ErklaeringenGjelder />
                    <Vedlegg/>
                    <Sluttrapport />
                    <Erklaering />
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
