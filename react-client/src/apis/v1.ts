import axios from 'axios';
import { PUSH_LOADING, MESSAGE, POP_LOADING } from '../redux_store/feedback_store/feedbackTypes';
require('dotenv').config();
export const api = axios.create({
  baseURL: process.env.NODE_ENV == "production" ? 
  "http://192.168.0.12:9090/api/v1/" :
  "http://localhost:9090/api/v1/"
});

const apiRequest = ({loading=false, dispatch, getFirebase,request:{method, url, payload = {}, otherHeaders = {}} ,onSuccess, 
  onError = error => {
    dispatch({type: MESSAGE, payload: "ERROR: " + error.message})

  }
}) => {
  console.log("API REQUEST: ", url);
  if(loading)
    dispatch({type: PUSH_LOADING});
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    api.request({
      method: method,
      url: url,
      data: payload,
      headers:{
        'Authorization' : 'Bearer ' + idToken,
        ...otherHeaders
      }
    }).then(response => {
      onSuccess(response);
      if(loading)
        dispatch({type: POP_LOADING});
    })
    .catch(error => {
      console.error("ERROR: " + error.message + "\n" +  error.response.data);
      onError(error)
      dispatch({type: MESSAGE, payload: "ERROR: " + error.message})
      if(loading)
        dispatch({type: POP_LOADING});
    })
  }).catch(error => {
    console.log(error);
    dispatch({type: MESSAGE, payload: "FIREBASE ERROR: " + error.message})
    if(loading)
      dispatch({type: POP_LOADING});

  });
}
export default apiRequest;