// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Snackbar from 'components/template/Snackbar';

// Actions
import { hideSnackbarMessage } from 'actions/SnackbarActions';

class SnackbarContainer extends Component {

    render() {
        return this.props.snackbarVisible ? <Snackbar message={this.props.snackbarMessage} onCloseClick={this.props.hideSnackbarMessage} /> : '';
    }

}

const mapStateToProps = state => ({
    snackbarMessage: state.snackbarMessage,
    snackbarVisible: state.snackbarVisible
});

const mapDispatchToProps = {
    hideSnackbarMessage
};


export default connect(mapStateToProps, mapDispatchToProps)(SnackbarContainer);
