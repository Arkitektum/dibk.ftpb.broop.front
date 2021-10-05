// Dependencies
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Reducers
import CodelistFunksjonReducer from 'reducers/CodelistFunksjonReducer';
import SelectedFormReducer from 'reducers/SelectedFormReducer';
import SelectedSubmissionReducer from 'reducers/SelectedSubmissionReducer';

const reducers = history => combineReducers({
  router: connectRouter(history),
  codelistFunksjon: CodelistFunksjonReducer,
  selectedForm: SelectedFormReducer,
  selectedSubmission: SelectedSubmissionReducer
});

export default reducers;
