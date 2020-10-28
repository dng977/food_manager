import { FETCH_ACTIVITY_FACTORS, MESSAGE, UPDATE_USER_STATE } from "./types";
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
  let userDto = {...formProps, activityFactor: formProps.activityFactor.split(':')[0]};
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