import axios from 'axios';
import { PUSH_LOADING, MESSAGE, POP_LOADING } from '../redux_store/feedback_store/feedbackTypes';

export const api = axios.create({
  baseURL: 'http://localhost:9090/api/v1/',
});

const apiRequest = ({loading=false, dispatch, getFirebase,request:{method, url, payload = {}, otherHeaders = {}} ,onSuccess, 
  onError = error => {
    dispatch({type: MESSAGE, payload: "ERROR: " + error.message})

  }
}) => {
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
      onError(error);
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