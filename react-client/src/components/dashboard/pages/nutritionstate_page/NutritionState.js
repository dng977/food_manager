import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory, withRouter } from 'react-router-dom';
import NutritionPieChart, { NutritionBarChart } from './components';
import { Grid, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { compose } from 'redux';


class NutritionState extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      tableNumber: 0
    }
    console.log("USERDETAILS: ", this.props.hasUserDetails);

  }
//asdsn

  handleChangeTable = (event, newValue) => {
    this.setState({ tableNumber: newValue });
  };

  render() {
    console.log("nutrition state history: ", this.props.history);
    return (
      <Grid container direction="column" alignItems="stretch" justify="space-between" spacing={2}>
        <Grid item >
          <Paper square elevation={4}>
            <Tabs
              value={this.state.tableNumber}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleChangeTable}
              aria-label="disabled tabs example"
              variant="fullWidth"
            >
              <Tab label="Macro nutrients" />
              <Tab label="Vitamins" />
              <Tab label="Minerals" />

            </Tabs>
          </Paper>
        </Grid>
        {this.state.tableNumber === 0 ?
          <>
            <Grid container item direction="row" alignItems="center" justify="space-evenly" >
              <NutritionPieChart energy={this.props.nutritionState.energy} nutritionRda={this.props.nutritionRda} macroState={this.props.nutritionState.macroNutrients} />
            </Grid>
          </>
          : this.state.tableNumber === 1 ?
            <Grid container item alignItems="center" justify="space-evenly" >
              <NutritionBarChart nutritionRda={this.props.nutritionRda} microNutrients={this.props.nutritionState.vitamins} />
            </Grid>

            :
            <Grid container item alignItems="center" justify="space-evenly" >
              <NutritionBarChart nutritionRda={this.props.nutritionRda} microNutrients={this.props.nutritionState.minerals} />
            </Grid>

        }

      </Grid>
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