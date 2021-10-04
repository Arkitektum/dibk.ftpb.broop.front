// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Start from 'components/partials/Forms/KontrollErklaering/Start';
import ErklaeringenGjelder from 'components/partials/Forms/KontrollErklaering/ErklaeringenGjelder';
import Vedlegg from 'components/partials/Forms/KontrollErklaering/Vedlegg';
import Sluttrapport from 'components/partials/Forms/KontrollErklaering/Sluttrapport';
import Erklaering from 'components/partials/Forms/KontrollErklaering/Erklaering';


class KontrollErklaeringer extends Component {

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

export default connect(mapStateToProps, null)(KontrollErklaeringer);
