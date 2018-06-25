import registerServiceWorker from './registerServiceWorker';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from './theme';
import { Router, Route, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './redux/store';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import App from './AppContainer';
import Dashboard from './pages/dashboard';
import Authentication from './Authentication';
import Login from './pages/login';
import Register from './pages/register';
import ResetPassword from './pages/resetPassword';

import Home from './pages/home';
import Entry from './pages/entry';
import Today from './pages/today';
import UserProfile from './pages/userProfile';

injectTapEventPlugin();

export const routeList = {
  index: '/',
  login: '/login',
  register: '/register',
  resetPassword: '/resetPassword',
  authentication: '/authentication',
  dashboard: '/dashboard',
  entries: '/entries',
  entry: '/entry/',
  today: '/today',
  account: '/account',
};

const router = (
  <MuiThemeProvider muiTheme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <Route path={routeList.index} component={App}>
          <IndexRedirect to={routeList.authentication} />
          <Route path={routeList.login} component={Login} />
          <Route path={routeList.register} component={Register} />
          <Route path={routeList.resetPassword} component={ResetPassword} />
          <Route component={Authentication} path={routeList.authentication}>
            <Route component={Dashboard}>
              <IndexRedirect to={routeList.entries} />
              <Route path={routeList.entries} component={Home} />
              <Route path={routeList.entry + ':id'} component={Entry} />
              <Route path={routeList.today} component={Today} />
              <Route path={routeList.account} component={UserProfile} />
            </Route>
          </Route>
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(
  router,
  document.getElementById('root')
);
registerServiceWorker();