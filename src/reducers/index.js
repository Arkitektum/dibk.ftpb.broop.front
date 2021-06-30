// Dependencies
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Reducers
import CommitsReducer from 'reducers/CommitsReducer';
import NameReducer from 'reducers/NameReducer';

const reducers = history => combineReducers({
  router: connectRouter(history),
  commits: CommitsReducer,
  name: NameReducer
});

export default reducers;
