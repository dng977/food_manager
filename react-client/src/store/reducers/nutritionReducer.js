import _ from 'lodash';
import { FETCH_ACTIVITY_FACTORS,FETCH_NUTRITION_RDA,FETCH_NUTRITION_STATE,UPDATE_USER_STATE } from '../actions/types';

const initState = {
  userDetails: true,
  nutritionRDA: {},
  nutritionState: {},
  activityFactors: []
}
export default (state = initState, action) => {
  console.log("DISPATCH: ", action.type);
  switch (action.type) {
    case FETCH_ACTIVITY_FACTORS:
      return {...state, activityFactors: action.payload}
    case FETCH_NUTRITION_STATE:
      return {...state, nutritionState: action.payload};
    case FETCH_NUTRITION_RDA:
      return {...state, nutritionRDA: action.payload.nutritionRda, userDetails: action.payload.userDetails};
    case UPDATE_USER_STATE:
      return {...state, userDetails: true}
    default:
      return state;
  }
}