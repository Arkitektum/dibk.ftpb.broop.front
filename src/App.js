// Dependecies
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { OidcProvider } from 'redux-oidc';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import WebFont from 'webfontloader';
import { renderToStaticMarkup } from 'react-dom/server'
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

// Utils
import configureStore, { history } from 'utils/configureStore';
import userManagerPromise from 'utils/userManager';

// Routes
import Home from 'components/routes/Home';
import Form from 'components/routes/Forms/FormType/Form';
import Receipt from 'components/routes/Receipt';
import SignedOut from 'components/routes/SignedOut';
import NotFound from 'components/routes/NotFound';
import OidcCallback from 'components/routes/OidcCallback';
import OidcSignoutCallback from 'components/routes/OidcSignoutCallback';
import Pdf from 'components/routes/Pdf';

// Partials
import MainNavigationBar from 'components/partials/MainNavigationBar';
import Footer from 'components/partials/Footer';

// Template
import SnackbarContainer from 'components/template/SnackbarContainer';

// Actions
//import { convertSelectedFormToPDF } from 'actions/PrintActions';

// Stylesheets
import style from 'App.module.scss';

/* eslint import/no-webpack-loader-syntax: off */
import printStyle from '!!raw-loader!sass-loader!./print.scss';


WebFont.load({
  google: {
    families: ['Roboto:400,700&display=swap']
  }
});

library.add(
  faEdit,
  faTimes
);

const initialState = {};
const storePromise = configureStore(initialState, userManagerPromise);
let store = null;
let userManager = null;



const renderHtmlString = () => {

  localStorage.print = "true";
  //const htmlString = renderToString(<div className="page"><App /></div>);
  const htmlString = renderToStaticMarkup(<div className="page"><App /></div>);
  localStorage.print = "false";
  console.log(htmlString);

  document.head.innerHTML = `<style>${printStyle}</style>`;
  document.body.innerHTML = htmlString;

  //const pdfContentString = `<html><head><style>${printStyle}</style></head><body>${htmlString}</body></html>`.replace(/\r?\n|\r/g, "");
  // store.dispatch(convertSelectedFormToPDF(pdfContentString, 'D84A298B-5D3F-4D8C-BDC1-45EF3E2808B2'));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeIsLoaded: false,
      userManagerIsLoaded: false
    };
  }

  componentDidMount() {
    storePromise.then((storeConfig) => {
      store = storeConfig;
      if (!this.state.userManagerIsLoaded) {
        this.setState({
          userManagerIsLoaded: true
        });
      }
    });
    userManagerPromise.then(userManagerConfig => {
      userManager = userManagerConfig;
      this.setState({
        storeIsLoaded: true
      })
    })
  }

  handleLogoutClick(event) {
    event.preventDefault();
    this.props.userManager.signoutRedirect({ 'id_token_hint': this.props.user.id_token });
    this.props.userManager.removeUser();
  }

  render() {
    const isPrint = localStorage.print === "true";
    const showPreviewPdfButton = true;
    if ((this.state && userManager && this.state.userManagerIsLoaded && this.state.storeIsLoaded) || isPrint) {
      return (<Provider store={store}>
        <OidcProvider userManager={userManager} store={store}>
          <ConnectedRouter history={history}>
            <BrowserRouter>
              {
                !isPrint ? (<MainNavigationBar userManager={userManager} />) : ''
              }
              {
                !isPrint && showPreviewPdfButton ? (<button onClick={() => renderHtmlString()}>Preview PDF</button>) : ''
              }
              {
                isPrint
                  ? (
                    <Switch>
                      <Route exact={true} path="/skjema/:submissionId/rediger" render={(props) => (<Pdf {...props} />)} />
                    </Switch>
                  )
                  : (
                    <div className={style.appContainer}>
                      <Switch>
                        <Route exact path="/signin-oidc" render={() => (<OidcCallback userManager={userManager} />)} />
                        <Route exact path="/signout-callback-oidc" render={() => (<OidcSignoutCallback userManager={userManager} />)} />
                        <Route exact={true} path="/skjema/:submissionId/utlogget" render={(props) => (<SignedOut {...props} />)} />
                        <Route exact={true} path="/skjema/:submissionId/signert" render={(props) => (<Receipt {...props} status="signert" />)} />
                        <Route exact={true} path="/skjema/:submissionId/signatur-avvist" render={(props) => (<Receipt {...props} status="avvist" />)} />
                        <Route exact={true} path="/skjema/:submissionId/signatur-error" render={(props) => (<Receipt {...props} status="error" />)} />
                        <Route exact={true} path="/skjema/:submissionId/avvis" render={(props) => (<Form {...props} showRejectModal />)} />
                        <Route exact={true} path="/skjema/:submissionId/rediger" render={(props) => (<Form {...props} />)} />
                        <Route exact={true} path="/skjema/:submissionId" render={(props) => (<Home userManager={userManager} {...props} />)} />
                        <Route exact={true} path="/skjema" render={(props) => (<Home userManager={userManager} {...props} />)} />
                        <Route exact={true} path="/" render={(props) => (<Home userManager={userManager} {...props} />)} />
                        <Route render={() => (<NotFound />)} />
                      </Switch>
                      <Footer />
                      <SnackbarContainer />
                    </div>
                  )
              }
            </BrowserRouter>
          </ConnectedRouter>
        </OidcProvider>
      </Provider>);
    } else return '';
  }
}


export default App;
