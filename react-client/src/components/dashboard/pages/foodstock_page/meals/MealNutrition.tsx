import React, {  } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NutritionComposed } from '../../nutritionstate_page/components';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../../../../../redux_store/rootReducer';
import { FoodActionTypes } from '../../../../../redux_store/food_store/foodTypes';
import { fetchMealNutrition } from '../../../../../redux_store/food_store/foodActions';
import { LoadingActions } from '../../../../../redux_store/feedback_store/feedbackTypes';


const mapDispatchToProps = (dispatch: Dispatch<FoodActionTypes | LoadingActions>) => {
  return {
    ...bindActionCreators({ fetchMealNutrition }, dispatch)
  }
}
const mapStateToProps = (state: RootState) => {
  return {
    nutritionRda: state.nutrition.nutritionRDA,
    mealNutrition: state.food.mealNutrition,
    pageLoading: state.feedback.pageLoading
  };
};

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof reduxConnector>

type MealProps = PropsFromRedux & RouteComponentProps;
type MealNutritionState = {
  nutritionLoaded: boolean;
}
class MealNutrition extends React.Component<MealProps, MealNutritionState> {

  constructor(props){
    super(props);
    this.state = {nutritionLoaded: false};
  }

  // componentDidMount(){
  //   this.props.fetchMealNutrition(this.props.match.params[ "id" ]);
  // }
  static getDerivedStateFromProps(props, state) {
    console.log("GET DERIVED STATE - MEALNTRITION: ", props, state);
    if(!state.nutritionLoaded){
      props.fetchMealNutrition(props.match.params[ "id" ]);
    }
    return {nutritionLoaded: true};
  }

  render(){

    return (
        <NutritionComposed nutritionRda={this.props.nutritionRda} nutritionState={this.props.mealNutrition}/>
    );
  }
}

export default compose(
  withRouter,
  reduxConnector
)(MealNutrition);