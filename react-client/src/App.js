import React from 'react';
import { Switch,BrowserRouter, Route, Redirect } from 'react-router-dom';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import Dashboard from './components/dashboard/Dashboard';
import Signin from './components/auth/Signin';
import AuthIsLoaded from './components/auth/AuthIsLoaded';
import {routes} from './routes';
import history from './history';


export default ({ children }) => {
  return (
    <div>
      <BrowserRouter history={history}>
        <AuthIsLoaded>
          <Switch>
            {routes.map((route, key) => {
              return(
                <Route
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                  key={key}
                />
              );
            })}
          <Redirect from="/" to="/signin"/>
          </Switch>
        </AuthIsLoaded>
      </BrowserRouter>
    </div>
  );
};
