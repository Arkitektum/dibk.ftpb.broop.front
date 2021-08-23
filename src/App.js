// Dependecies
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import WebFont from 'webfontloader';
import { renderToString } from 'react-dom/server'

// Utils
import configureStore, { history } from 'utils/configureStore';

// Routes
import Home from 'components/routes/Home';
import Form from 'components/routes/Forms/FormType/Form';
import NotFound from 'components/routes/NotFound';

// Partials
import MainNavigationBar from 'components/partials/MainNavigationBar';

// Actionks
import { convertSelectedFormToPDF } from 'actions/PrintActions';

/* eslint import/no-webpack-loader-syntax: off */
import printStyle from '!!raw-loader!sass-loader!./print.scss';


WebFont.load({
  google: {
    families: ['Roboto:400,700&display=swap']
  }
});

const initialState = {};
const store = configureStore(initialState);


const renderHtmlString = () => {
  const htmlString = renderToString(<div className="page"><App print /></div>);
  //document.head.innerHTML = `<style>${printStyle}</style>`;
  //document.body.innerHTML = htmlString;

  const pdfContentString = `<html><head><style>${printStyle}</style></head><body>${htmlString}</body></html>`.replace(/\r?\n|\r/g, "");
  store.dispatch(convertSelectedFormToPDF(pdfContentString, 'D84A298B-5D3F-4D8C-BDC1-45EF3E2808B2'));
}

class App extends Component {
  componentDidMount() {
    //  setTimeout(() => {renderHtmlString();}, 1000)
  }
  render() {
    return (<Provider store={store}>
      <ConnectedRouter history={history}>
        <BrowserRouter>
          {
            this.props.print ? '' : (<MainNavigationBar />)
          }
          <Switch>
            <Route exact={true} path="/:formType/:submissionId/:stepId" render={(props) => (<Form {...props} />)} />
            <Route exact={true} path="/:formType/:submissionId" render={(props) => (<Form {...props} />)} />
            <Route exact={true} path="/:formType" render={(props) => (<Home {...props} />)} />
            <Route exact={true} path="/" render={(props) => (<Home {...props} />)} />
            <Route render={() => (<NotFound />)} />
          </Switch>
          {
            this.props.print ? '' : (<button onClick={() => renderHtmlString()}>Last ned</button>)
          }
        </BrowserRouter>
      </ConnectedRouter>
    </Provider>);
  }
}


export default App;
