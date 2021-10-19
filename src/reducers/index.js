// Dependencies
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Reducers
import SelectedFormReducer from 'reducers/SelectedFormReducer';
import SelectedSubmissionReducer from 'reducers/SelectedSubmissionReducer';
import SnackbarMessageReducer from 'reducers/SnackbarMessageReducer';
import SnackbarLastInitReducer from 'reducers/SnackbarLastInitReducer';
import SnackbarVisibleReducer from 'reducers/SnackbarVisibleReducer';
import IsSignedInReducer from 'reducers/IsSignedInReducer';

const reducers = history => combineReducers({
  router: connectRouter(history),
  selectedForm: SelectedFormReducer,
  selectedSubmission: SelectedSubmissionReducer,
  snackbarMessage: SnackbarMessageReducer,
  snackbarLastInit: SnackbarLastInitReducer,
  snackbarVisible: SnackbarVisibleReducer,
  isSignedIn: IsSignedInReducer
});

export default reducers;
