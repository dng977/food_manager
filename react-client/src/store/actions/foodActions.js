import api from '../../apis/v1';
import { ERROR, FETCH_FOOD_ITEMS, FOOD_LOADING } from './types';

export const fetchFoodItems = (foodName, rowIndex) => async (dispatch , getState, {getFirebase}) => {
  console.log("Fetch food items: ", foodName)
  dispatch({type: FOOD_LOADING});
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    const response = await api.request({
      method: 'get',
      url: `fooditems/${foodName}`,
      headers:{
        'Authorization' : 'Bearer ' + idToken 
      }
    });
    dispatch({type: FETCH_FOOD_ITEMS, payload: {[rowIndex]: response.data }})
  }).catch((error) => {
    console.log(error);
    dispatch({type: ERROR, payload: error})

  })

};