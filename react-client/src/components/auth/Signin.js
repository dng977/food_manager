import React, { useEffect } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { signIn } from '../../redux_store/auth_store/authActions'
import { Redirect } from 'react-router-dom';
import styles from './Signin.styles';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { renderTextField, Copyright } from '../shared/renderMaterial';
import { FormControl, FormHelperText, FormLabel } from '@material-ui/core';
import { email, minLength } from './validators';

const useStyles = makeStyles(styles);
const formName = 'signin';
const Signin = (props) => {

  const classes = useStyles();

  const { handleSubmit, auth, authError } = props;

if (!auth.isEmpty) return <Redirect to="/dashboard" />;
return (
  <Grid container component="main" className={classes.root}>
    <CssBaseline />
    <Grid item xs={false} sm={4} md={7} className={classes.image} />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
          </Typography>
        <form className={classes.form} onSubmit={handleSubmit(formProps => props.signIn(formProps ))}>
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
            className={classes.submit}
          >
            Sign In
            </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
                </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" component={RouterLink} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </form>
      </div>
    </Grid>
  </Grid>
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
