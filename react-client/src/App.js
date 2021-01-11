import React from 'react';
import { Switch,BrowserRouter, Route, Redirect } from 'react-router-dom';
import AuthIsLoaded from './components/auth/AuthIsLoaded';
import {routes} from './routes';
import history from './history';


export default () => {
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
