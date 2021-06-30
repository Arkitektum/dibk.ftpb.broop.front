// Dependecies
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import WebFont from 'webfontloader';

// Utils
import configureStore, { history } from 'utils/configureStore';

// Routes
import Home from 'components/routes/Home';
import Commits from 'components/routes/Commits';
import NotFound from 'components/routes/NotFound';

// Partials
import MainNavigationBar from 'components/partials/MainNavigationBar';

WebFont.load({
  google: {
    families: ['Roboto:400,700&display=swap']
  }
});

const initialState = {};
const store = configureStore(initialState);

class App extends Component {
  render() {
    return (<Provider store={store}>
      <ConnectedRouter history={history}>
        <BrowserRouter basename="/dibk.ftpb.broop.front">
          <MainNavigationBar />
          <Switch>
            <Route exact={true} path="/commits/:commitId" render={(props) => (<Commits {...props} />)} />
            <Route exact={true} path="/commits" render={(props) => (<Commits {...props} />)} />
            <Route exact={true} path="/" render={(props) => (<Home {...props} />)} />
            <Route render={() => (<NotFound />)} />
          </Switch>
        </BrowserRouter>
      </ConnectedRouter>
    </Provider>);
  }
}

export default App;
