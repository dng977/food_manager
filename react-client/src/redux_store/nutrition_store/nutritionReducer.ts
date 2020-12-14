import _ from 'lodash';
import { FETCH_ACTIVITY_FACTORS,FETCH_NUTRITION_RDA,FETCH_NUTRITION_STATE,NutritionActions,NutritionStoreState,UPDATE_USER_STATE } from './nutritionTypes';

const initState : NutritionStoreState = {
  userDetails: false,
  nutritionRDA: {},
  nutritionState: {},
  activityFactors: [],
}
export default (state = initState, action: NutritionActions) : NutritionStoreState => {
  console.log("DISPATCH: ", action.type);
  switch (action.type) {
    case FETCH_ACTIVITY_FACTORS:
      return {...state, activityFactors: action.payload}
    case FETCH_NUTRITION_STATE:
      return {...state, nutritionState: action.payload};
    case FETCH_NUTRITION_RDA:
      return {...state, nutritionRDA: action.payload, userDetails: action.payload.userDetails};
    case UPDATE_USER_STATE:
      return {...state, userDetails: true}
    default:
      return state;
  }
}