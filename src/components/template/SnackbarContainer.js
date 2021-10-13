// Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Snackbar from 'components/template/Snackbar';


class SnackbarContainer extends Component {

  render() {
    return this.props.snackbarVisible ? <Snackbar message={this.props.snackbarMessage} /> : '';
  }

}

const mapStateToProps = state => ({
    snackbarMessage: state.snackbarMessage,
    snackbarVisible: state.snackbarVisible
});


export default connect(mapStateToProps, null)(SnackbarContainer);
