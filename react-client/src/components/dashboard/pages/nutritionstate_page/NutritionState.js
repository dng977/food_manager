import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NutritionPieChart, NutritionBarChart, NutritionComposed } from './components';
import { Grid, Paper, Tab, Tabs } from '@mui/material';
import { compose } from 'redux';


class NutritionState extends PureComponent {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <NutritionComposed nutritionRda={this.props.nutritionRda} nutritionState={this.props.nutritionState}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nutritionRda: state.nutrition.nutritionRDA,
    nutritionState: state.nutrition.nutritionState,
  };
};

export default compose(
  connect(mapStateToProps, {}),
  withRouter
)(NutritionState);