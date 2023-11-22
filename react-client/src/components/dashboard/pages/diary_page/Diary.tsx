import React, { } from 'react';
import { Button, Grid, Tabs, Tab, Paper, Divider } from '@mui/material';
import AddRoundedIcon from '@mui/material/'
import { RouteChildrenProps, RouteComponentProps, withRouter } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../../redux_store/rootReducer';
import { bindActionCreators, compose } from 'redux';
import FoodCard from '../../../shared/FoodCard';
import { getMeals } from '../selectors';
import { CLEAR_MESSAGE } from '../../../../redux_store/feedback_store/feedbackTypes';
import { deleteMeal, editMeal, eatMeal } from '../../../../redux_store/food_store/foodActions';

const mapDispatchToProps = (dispatch) => {
  return {
    clearMessage: () => dispatch({ type: CLEAR_MESSAGE }),
    dispatch,
    ...bindActionCreators({ eatMeal, editMeal }, dispatch)
  }
}
const mapStateToProps = (state: RootState) => {
  return {
    foodHistory: state.food.foodHistory
  };
};

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof reduxConnector>
type DiaryProps = PropsFromRedux & RouteComponentProps;
type DiaryState = {
  openDeleteDialog: boolean;
  openAddFoodDialog: boolean;
  openAddEditMealDialog: boolean;
  rowsSelected: number[];
  tableNumber: number;
}
class Diary extends React.Component<DiaryProps, DiaryState> {
  render() {
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          {Object.values(this.props.foodHistory).map((food, ind) => {
            return (
              <Grid item key={"meal" + ind}>
                <FoodCard
                  name={food.name}
                  imageBytes={food.imageBytes}
                  foodHistory={food}
                  history={this.props.history}
                  locationPath={this.props.location.pathname}
                />
              </Grid>);
          }
          )
          }
        </Grid>
      </React.Fragment>

    );
  }

}
export default compose(withRouter, reduxConnector)(Diary);
