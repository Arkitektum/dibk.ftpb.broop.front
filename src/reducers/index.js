// Dependencies
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as oidcReducer } from 'redux-oidc';

// Reducers
import SelectedFormReducer from 'reducers/SelectedFormReducer';
import SelectedSubmissionReducer from 'reducers/SelectedSubmissionReducer';
import SnackbarMessageReducer from 'reducers/SnackbarMessageReducer';
import SnackbarLastInitReducer from 'reducers/SnackbarLastInitReducer';
import SnackbarVisibleReducer from 'reducers/SnackbarVisibleReducer';
import ValidationMessagesReducer from 'reducers/ValidationMessagesReducer';
import IsValidatedReducer from 'reducers/IsValidatedReducer'

const reducers = history => combineReducers({
  router: connectRouter(history),
  oidc: oidcReducer,
  selectedForm: SelectedFormReducer,
  selectedSubmission: SelectedSubmissionReducer,
  snackbarMessage: SnackbarMessageReducer,
  snackbarLastInit: SnackbarLastInitReducer,
  snackbarVisible: SnackbarVisibleReducer,
  validationMessages: ValidationMessagesReducer,
  isValidated: IsValidatedReducer
});

export default reducers;
