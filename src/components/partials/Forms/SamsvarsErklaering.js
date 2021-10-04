// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Start from 'components/partials/Forms/SamsvarsErklaering/Start';
import ErklaeringenGjelder from 'components/partials/Forms/SamsvarsErklaering/ErklaeringenGjelder';
import GjenstaaendeArbeider from 'components/partials/Forms/SamsvarsErklaering/GjenstaaendeArbeider';
import Erklaering from 'components/partials/Forms/SamsvarsErklaering/Erklaering';


class SamsvarsErklaeringer extends Component {

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

export default connect(mapStateToProps, null)(SamsvarsErklaeringer);


