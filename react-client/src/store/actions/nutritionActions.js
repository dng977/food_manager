import { FETCH_ACTIVITY_FACTORS, FETCH_NUTRITION_RDA, FETCH_NUTRITION_STATE, MESSAGE, UPDATE_USER_STATE } from "./types";
import api from '../../apis/v1';
import { sendUserDataToServer } from "./authActions";
import { SubmissionError } from "redux-form";

export const fetchActivityFactors = () => async (dispatch , getState, {getFirebase}) => {
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    const response = await api.request({
      method: 'get',
      url: 'nutrition/activity',
      headers:{
        'Authorization' : 'Bearer ' + idToken 
      }
    }).catch(error => {dispatch({type: MESSAGE, payload: "ERROR: " + error.message})});
    dispatch({type: FETCH_ACTIVITY_FACTORS, payload: response.data});
  }).catch((error) => {
    dispatch({type: MESSAGE, payload: "ERROR: " + error.message})
    console.log(error);
  })

};

export const sendUserData = (formProps) => async (dispatch , getState, {getFirebase}) => {
  let userDto = {...formProps,male: formProps.male === "male" ? true: false,  activityFactor: formProps.activityFactor.split(':')[0]};
  return new Promise((resolve, reject) => {
    const firebase = getFirebase();
    firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
      return sendUserDataToServer(idToken, userDto).then(
        dispatch({type: UPDATE_USER_STATE})
        );
    }).catch((error) => {
      console.log(error.message);
      reject(new SubmissionError({_error: error.message}));
    });
  });

};

export const fetchNutritionState = () => async (dispatch , getState, {getFirebase}) => {
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    const response = await api.request({
      method: 'get',
      url: 'nutrition/state',
      headers:{
        'Authorization' : 'Bearer ' + idToken 
      }
    }).catch(error => {dispatch({type: MESSAGE, payload: "ERROR: " + error.message})});
    dispatch({type: FETCH_NUTRITION_STATE, payload: response.data});
  }).catch((error) => {
    dispatch({type: MESSAGE, payload: "FIREBASE ERROR: " + error.message})
    console.log(error);
  })
};

export const fetchNutritionRda = () => async (dispatch , getState, {getFirebase}) => {
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    const response = await api.request({
      method: 'get',
      url: 'nutrition/rda',
      headers:{
        'Authorization' : 'Bearer ' + idToken 
      }
    }).catch(error => {dispatch({type: MESSAGE, payload: "ERROR: " + error.message})});
    let {userDetails, ...nutritionRda} = response.data;
    dispatch({type: FETCH_NUTRITION_RDA, payload: {userDetails, nutritionRda}});
  }).catch((error) => {
    dispatch({type: MESSAGE, payload: "FIREBASE ERROR: " + error.message})
    console.log(error);
  })
};