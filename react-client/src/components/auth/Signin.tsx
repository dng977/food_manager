import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { signIn } from '../../redux_store/auth_store/authActions'
import { Link, Redirect } from 'react-router-dom';
import styles from './Signin.styles';
import { Link as RouterLink } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { renderTextField, Copyright } from '../shared/renderMaterial';
import { email } from './validators';
import { makeStyles } from '@mui/styles';
import { Box, Grid, Avatar, Typography, FormControlLabel, Checkbox, Button } from '@mui/material';

// const useStyles = makeStyles(styles);
const formName = 'signin';
const Signin = (props) => {

  const { handleSubmit, auth } = props;

  if (!auth.isEmpty) return <Redirect to="/dashboard" />;
  return (
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Grid container direction='column' component="main" justifyContent='center' alignItems='center' >
        <Grid item xs={4}>
          <Avatar >
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid item xs={4}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <form onSubmit={handleSubmit(formProps => props.signIn(formProps))}>
            <Field
              name="email"
              type="email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              validate={email}
              autoComplete="email"
              autoFocus
              component={renderTextField}
            />
            <Field
              name="password"
              type="password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              id="password"
              autoComplete="current-password"
              component={renderTextField}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" component={RouterLink} >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>

  );
}

function mapStateToProps(state) {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps, { signIn }),
  reduxForm({ form: formName })
)(Signin);
