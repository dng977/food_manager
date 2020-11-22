import { FETCH_ACTIVITY_FACTORS, FETCH_NUTRITION_RDA, FETCH_NUTRITION_STATE, LOADING, MESSAGE, POP_LOADING, PUSH_LOADING, UPDATE_USER_STATE } from "./types";
import apiRequest, {api} from '../../apis/v1';

import { sendUserDataToServer } from "./authActions";
import { SubmissionError } from "redux-form";

export const fetchActivityFactors = () => async (dispatch , getState, {getFirebase}) => {
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: 'nutrition/activity',
    },
    onSuccess: response => dispatch({type: FETCH_ACTIVITY_FACTORS, payload: response.data}),
  })
};

export const sendUserData = (formProps) => async (dispatch , getState, {getFirebase}) => {
  dispatch({type: LOADING});
  let userDto = {...formProps,male: formProps.male === "male" ? true: false,  activityFactor: formProps.activityFactor.split(':')[0]};
  return new Promise((resolve, reject) => {
    const firebase = getFirebase();
    firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
      return sendUserDataToServer(idToken, userDto).then( () => {
        dispatch({type: UPDATE_USER_STATE});
        
        // dispatch({type: POP_LOADING});
      });
    }).catch((error) => {
      console.log(error.message);
      reject(new SubmissionError({_error: error.message}));
      dispatch({type: POP_LOADING});

    });
  });

};

export const fetchNutritionState = () => async (dispatch , getState, {getFirebase}) => {
  apiRequest({
    loading: true,
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: 'nutrition/state',
    },
    onSuccess: response => dispatch({type: FETCH_NUTRITION_STATE, payload: response.data}),
  });
};

export const fetchNutritionRda = () => async (dispatch , getState, {getFirebase}) => {
  apiRequest({
    loading: true,
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: 'nutrition/rda',
    },
    onSuccess: response => {
      let {userDetails, ...nutritionRda} = response.data;
      dispatch({type: FETCH_NUTRITION_RDA, payload: {userDetails, nutritionRda}});
    },
  });
};