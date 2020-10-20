import api from '../../apis/v1';
import { MESSAGE, FETCH_FOOD_ITEMS, FETCH_FOODSTOCK, UPDATE_FOODSTOCK, DELETE_FOODSTOCK, LOADING, FOOD_LOADING, ADD_ITEM_FOODSTOCK, DIALOG_LOADING } from './types';

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
    }).catch(error => {dispatch({type: MESSAGE, payload: "ERROR: " + error.message})});
    dispatch({type: FETCH_FOOD_ITEMS, payload: {[rowIndex]: response.data }})
  }).catch((error) => {
    console.log(error);
    dispatch({type: MESSAGE, payload: "ERROR: " + error.message})

  })

};

export const fetchFoodStock = ({actionsOnSuccess = []}) => async (dispatch , getState, {getFirebase}) => {
  console.log("Fetch food Stock: ")
  dispatch({type: LOADING});
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    api.request({
      method: 'get',
      url: `foodstock`,
      headers:{
        'Authorization' : 'Bearer ' + idToken 
      }
    }).then(response => {
      dispatch({type: FETCH_FOODSTOCK, payload: response.data})
      console.log("actionsonsuccess: ", actionsOnSuccess)
      actionsOnSuccess.forEach(action => {
        dispatch(action);
      })
    })
    .catch(error => {dispatch({type: MESSAGE, payload: "ERROR: " + error.message})});
    
  }).catch((error) => {
    console.log(error);
    dispatch({type: MESSAGE, payload: "ERROR: " + error.message})

  })

};

export const editFoodStockItem = (id, newValues) => async (dispatch , getState, {getFirebase}) => {
  // dispatch({type: LOADING});
  const oldFoodStockItem = getState().food.foodStock[id];
  const newFoodStockItem = {...oldFoodStockItem, ...newValues}
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    api.put('foodstock/item',newFoodStockItem,{
      headers:{
        'Authorization' : 'Bearer ' + idToken 
      }
    }).then(response => dispatch({type: UPDATE_FOODSTOCK, payload: newFoodStockItem}))
    .catch(error => {dispatch({type: MESSAGE, payload: "ERROR: " + error.message})});

  }).catch((error) => {
    console.log(error);
    dispatch({type: MESSAGE, payload: "ERROR: " + error.message})

  })
};

export const deleteFoodStockItems = (idArray) => async (dispatch , getState, {getFirebase}) => {
  dispatch({type: DIALOG_LOADING});
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    api.delete('foodstock',{
      data: idArray,
      headers:{
        'Authorization' : 'Bearer ' + idToken 
      }
    }).then(response => dispatch({type: DELETE_FOODSTOCK, payload: idArray}))
    .catch(error => {dispatch({type: MESSAGE, payload: "ERROR: " + error.message})});

  }).catch((error) => {
    console.log(error);
    dispatch({type: MESSAGE, payload: "ERROR: " + error.message})

  })
};

export const addFoodItem = (foodItemId, quantity, callBackOnSuccess) => async (dispatch , getState, {getFirebase}) => {
  dispatch({type: DIALOG_LOADING});
  const itemDto = {foodItemId, quantity}
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    api.post('foodstock/item/add',itemDto,{
      headers:{
        'Authorization' : 'Bearer ' + idToken 
      }
    }).then(response => {
      dispatch({type: ADD_ITEM_FOODSTOCK, payload: response.data});
      callBackOnSuccess();
    })
    .catch(error => {dispatch({type: MESSAGE, payload: "ERROR: " + error.message})});

  }).catch((error) => {
    console.log(error);
    dispatch({type: MESSAGE, payload: "ERROR: " + error.message})

  })
};