import React, { useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';
import { Redirect, useHistory } from 'react-router-dom';
import styles from './Signup.styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { renderTextField, Copyright } from '../shared/renderMaterial';
import { Link as RouterLink } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';

const useStyles = makeStyles(styles);

const Signup = (props) => {
  const history = useHistory();
  const { handleSubmit,auth,  error, submitFailed, submitSucceeded, clearAsyncError } = props;
  useEffect(()=>{
   console.log(error);
    if(!error && !auth.isEmpty)
      history.push('/bodydetails');
  }, [error, submitSucceeded])
  const classes = useStyles();
  console.log(error);
  // if (!submitFailed && !error && !auth.isEmpty) return <Redirect to='/bodydetails' />
  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={Boolean(error)}
        onClose={(event, reason) => {
          if (reason === "timeout") {
            clearAsyncError("_error");
          }
        }}
        autoHideDuration={2000}
        message={error}
      />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(formProps => props.signUp(formProps))}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                component={renderTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                component={renderTextField}

              />
            </Grid>
            <Grid item xs={12}>
              <Field
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                component={renderTextField}

              />
            </Grid>
            <Grid item xs={12}>
              <Field
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                component={renderTextField}

              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin" component={RouterLink} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps, { signUp }),
  reduxForm({ form: 'signup' })
)(Signup);
