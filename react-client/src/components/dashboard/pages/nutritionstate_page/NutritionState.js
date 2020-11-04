import React from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import MacroPieChart from './components';
import {Grid, Typography} from '@material-ui/core';


const NutritionState = (props) => {
  const history = useHistory();
  if(!props.hasUserDetails){
    history.push('/bodydetails');
  }
  return (
    <Grid container alignContent="center" justify="center">
      <Grid item>
      <Typography variant="h5" align="center" >Macro Nutrients</Typography>
      <br/>
      <MacroPieChart nutritionRda={props.nutritionRda} macroState={props.nutritionState.macroNutrients}/>

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

export default connect(mapStateToProps, {} )(NutritionState);