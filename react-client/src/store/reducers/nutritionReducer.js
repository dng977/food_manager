import _ from 'lodash';
import { FETCH_ACTIVITY_FACTORS,UPDATE_USER_STATE } from '../actions/types';

const initState = {
  userDetails: false,
  nutritionRDA: {},
  nutritionState: {},
  activityFactors: []
}
export default (state = initState, action) => {
  console.log("DISPATCH: ", action.type);
  switch (action.type) {
    case FETCH_ACTIVITY_FACTORS:
      return {...state, activityFactors: action.payload}
    case UPDATE_USER_STATE:
      return {...state, userDetails: true}
    default:
      return state;
  }
}