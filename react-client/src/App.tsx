import React from 'react';
import { Switch, Router, Route, Redirect, BrowserRouter } from 'react-router-dom';
import AuthIsLoaded from './components/auth/AuthIsLoaded';
import {routes} from './routes';
import { createTheme, ThemeProvider } from '@mui/material';
import { createBrowserHistory } from "history";

createBrowserHistory();

const defaultTheme = createTheme({
  components: {
    MuiTypography: {
      variants:[
        {
          props: {variant: 'h4'},
          style:{
            fontSize: '20px'
          }
        }
      ]
    },
  },
});
export default () => {
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
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
      </ThemeProvider>
    </div>
  );
};
