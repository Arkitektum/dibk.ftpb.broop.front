// Dependencies
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Reducers
import NameReducer from 'reducers/NameReducer';
import SelectedFormReducer from 'reducers/SelectedFormReducer';
import SelectedSubmissionReducer from 'reducers/SelectedSubmissionReducer';

const reducers = history => combineReducers({
  router: connectRouter(history),
  name: NameReducer,
  selectedForm: SelectedFormReducer,
  selectedSubmission: SelectedSubmissionReducer
});

export default reducers;
