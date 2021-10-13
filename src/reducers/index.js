// Dependencies
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Reducers
import CodelistFunksjonReducer from 'reducers/CodelistFunksjonReducer';
import SelectedFormReducer from 'reducers/SelectedFormReducer';
import SelectedSubmissionReducer from 'reducers/SelectedSubmissionReducer';
import SnackbarMessageReducer from 'reducers/SnackbarMessageReducer';
import SnackbarLastInitReducer from 'reducers/SnackbarLastInitReducer';
import SnackbarVisibleReducer from 'reducers/SnackbarVisibleReducer';

const reducers = history => combineReducers({
  router: connectRouter(history),
  codelistFunksjon: CodelistFunksjonReducer,
  selectedForm: SelectedFormReducer,
  selectedSubmission: SelectedSubmissionReducer,
  snackbarMessage: SnackbarMessageReducer,
  snackbarLastInit: SnackbarLastInitReducer,
  snackbarVisible: SnackbarVisibleReducer
});

export default reducers;
