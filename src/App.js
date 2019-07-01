import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserIsAuthenticated } from './helpers/auth';

import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/pages/Dashboard';
import AddClient from './components/clients/AddClient';
import ClientDetails from './components/clients/ClientDetails';
import EditClient from './components/clients/EditClient';
import Login from './components/auth/Login';
import Settings from './components/settings/Settings';
import Signup from './components/clients/Signup';

// import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { Provider } from 'react-redux';
import store1 from './store1';
import { rrfProps } from './store1'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store1}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router>
            <div className="App">
              <AppNavbar branding="Client Panel" />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={UserIsAuthenticated(Dashboard)} />
                  <Route exact path="/client/add" component={UserIsAuthenticated(AddClient)} />
                  <Route exact path="/client/:id" component={UserIsAuthenticated(ClientDetails)} />
                  <Route exact path="/client/edit/:id" component={UserIsAuthenticated(EditClient)} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/settings" component={UserIsAuthenticated(Settings)} />
                  <Route exact path="/signup" component={Signup} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </div>
          </Router>
        </ReactReduxFirebaseProvider>


      </Provider>

    );
  }
}

export default App;
