import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchActivityFactors, sendUserData } from '../../redux_store/nutrition_store/nutritionActions';
import { Redirect, useHistory } from 'react-router-dom';
import styles from './BodyDetails.styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { renderRadioGroup, renderSelect } from '../shared/renderMaterial';
import { getActivityFactors } from '../dashboard/pages/selectors';
import { Radio } from '@material-ui/core';

const useStyles = makeStyles(styles);
const range = (start, stop) => Array.from({ length: (stop - start) + 1 }, (_, i) => start + i);

const BodyDetails = (props) => {
  props.fetchActivityFactors();
  
  const history = useHistory();

  const classes = useStyles();
  const { handleSubmit, sendUserData } = props;

  if (props.userDetails) {
    let previousState = history.location.state ? history.location.state.from : '/dashboard';
    return <Redirect to={previousState === '/signup' ? '/dashboard' : previousState}/>;
  };
  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Body Info
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(formProps => sendUserData(formProps))}>
          <Grid container spacing={2} >
            <Grid item xs={12} >
              <Field
                name="weightKg"
                variant="outlined"
                // validate={[required,]}
                required
                fullWidth
                label="Weight (kg)"
                autoFocus
                itemList={range(20, 120)}
                component={renderSelect}
              >
                <option>option one</option>
              </Field>
            </Grid>
            <Grid item xs={12} >
              <Field
                variant="outlined"
                required
                fullWidth
                label="Height (cm)"
                name="heightCm"
                itemList={range(150, 200)}
                component={renderSelect}

              />
            </Grid>
            <Grid item xs={12}>
              <Field
                variant="outlined"
                required
                fullWidth
                label="Age"
                name="ageY"
                autoComplete="ageAuto"
                itemList={range(0, 100)}
                component={renderSelect}

              />
            </Grid>

            <Grid item xs={12}>
              <Field
                variant="outlined"
                required
                fullWidth
                label="Activity"
                name="activityFactor"
                itemList={props.activityFactorList}
                component={renderSelect}
              />
            </Grid>
            <Grid item xs={12}>
              <Field required name="male" label="Sex" component={renderRadioGroup}>
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </Field>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Confirm
          </Button>
        </form>
      </div>

    </Container>
  );
}

function mapStateToProps(state) {
  return {
    userDetails: state.nutrition.userDetails,
    activityFactorList: getActivityFactors(state)
  }
}

export default compose(
  connect(mapStateToProps, { fetchActivityFactors, sendUserData }),
  reduxForm({ initialValues: { weightKg: "70", ageY: "20", heightCm: "170", male: "male" }, form: 'bodyDetails' })
)(BodyDetails);
