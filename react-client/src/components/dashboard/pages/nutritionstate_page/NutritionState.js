import React from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import NutritionPieChart from './components';
import { Grid, Typography } from '@material-ui/core';


const NutritionState = (props) => {
  const history = useHistory();
  if (!props.hasUserDetails) {
    history.push('/bodydetails');
  }
  return (
    <Grid container direction="column" xl alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="h5">Macro nutrients</Typography>

      </Grid>
      <Grid container item direction="row" alignItems="center" justify="space-evenly" >
        <NutritionPieChart energy={props.nutritionState.energy} nutritionRda={props.nutritionRda} macroState={props.nutritionState.macroNutrients} />

      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    hasUserDetails: state.nutrition.userDetails,
    nutritionRda: state.nutrition.nutritionRDA,
    nutritionState: state.nutrition.nutritionState,
  };
};

export default connect(mapStateToProps, {})(NutritionState);