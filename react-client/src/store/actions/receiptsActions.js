import api from '../../apis/v1';
import { FETCH_RECEIPTS, LOADING, DELETE_RECEIPT, EDIT_RECEIPT, FETCH_RECEIPT_IMAGE, MESSAGE, SET_CURRENT_RECEIPT, FETCH_RECEIPT_ITEMS, UNDO_LOADING, EDIT_RECEIPT_ITEM, ADD_RECEIPT_ITEMS_TO_FOODSTOCK } from './types';
import history from '../../history'; 
import { itemStatus } from '../../components/dashboard/pages/receipt_page/constants';
import { fetchFoodStock } from './foodActions';

export const fetchReceipts = () => async (dispatch , getState, {getFirebase}) => {
  dispatch({type: LOADING});
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    const response = await api.request({
      method: 'get',
      url: 'receipts',
      headers:{
        'Authorization' : 'Bearer ' + idToken 
      }
    }).catch(error => {dispatch({type: MESSAGE, payload: "ERROR: " + error.message})});
    dispatch({type: FETCH_RECEIPTS, payload: response.data});
  }).catch((error) => {
    console.log(error);
    dispatch({type: MESSAGE, payload: "ERROR: " + error.message})
  })

};

export const fetchReceiptItems = (id) => async (dispatch , getState, {getFirebase}) => {
  if(getState().receipts.currentReceipt.id === id)
    return
  dispatch({type: LOADING});
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    const response = await api.request({
      method: 'get',
      url: 'receipts/' + id + '/items',
      headers:{
        'Authorization' : 'Bearer ' + idToken 
      }
    }).catch(error => {dispatch({type: MESSAGE, payload: "ERROR: " + error.message})});
    dispatch({type: FETCH_RECEIPT_ITEMS, payload: {id: id, receiptItems: response.data}});
  }).catch((error) => {
    dispatch({type: MESSAGE, payload: "ERROR: " + error.message})
    console.log(error);
  })

};

export const uploadReceipt = (receiptImage) => async (dispatch , getState, {getFirebase}) => {
  dispatch({type: LOADING});
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    const response = await api.post('receipts',receiptImage,{
      headers:{
        'Authorization' : 'Bearer ' + idToken,
        'Content-Type': `multipart/form-data; boundary=${receiptImage._boundary}`
      },
    }).catch(error => {dispatch({type: MESSAGE, payload: "ERROR: " + error.message})});
    dispatch({type: FETCH_RECEIPTS, payload: response.data});
  }).catch((error) => {
    console.log(error);
    dispatch({type: MESSAGE, payload: "ERROR: " + error.message})

  })

};
export const fetchReceiptImage = (id) => async (dispatch , getState, {getFirebase}) => {
  //
  if(getState().receipts.currentReceipt.imageData !== '')
    return;
  dispatch({type: LOADING});
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    const response = await api.get(`receipts/${id}/image`,{
      headers:{
        'Authorization' : 'Bearer ' + idToken,
      },
    }).catch(error => {dispatch({type: MESSAGE, payload: "ERROR: " + error.message})});
    dispatch({type: FETCH_RECEIPT_IMAGE, payload: {id, imageData: response.data}});
  }).catch((error) => {
    console.log(error);
    dispatch({type: MESSAGE, payload: "ERROR: " + error.message})

  })

};
export const deleteReceipt = (id, callback) => async (dispatch , getState, {getFirebase}) => {
  dispatch({type: LOADING});
  callback();
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    const response = await api.delete(`receipts/${id}`,{
      headers:{
        'Authorization' : 'Bearer ' + idToken,
      },
    }).catch(error => {dispatch({type: MESSAGE, payload: "ERROR: " + error.message})});
    dispatch({type: DELETE_RECEIPT, payload: id});
    
  }).catch((error) => {
    dispatch({type: MESSAGE, payload: "ERROR: " + error.message})

  })

};
export const editReceiptItem = (rowIndex,newFoodItemDto) => async (dispatch , getState, {getFirebase}) => {
  //dispatch({type: LOADING});
  const id = getState().receipts.currentReceipt.id
  const oldReceiptItem = getState().receipts.currentReceipt.receiptItems[rowIndex]
  const newReceiptItem = {...oldReceiptItem, plainFoodItemDto: [newFoodItemDto], status: itemStatus.RECOGNIZED}
  
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    const response = await api.put(`receipts/${id}/items/${newReceiptItem.id}`,newReceiptItem,{
      headers:{
        'Authorization' : 'Bearer ' + idToken,
      },
    }).catch(error => {dispatch({type: MESSAGE, payload: "ERROR: " + error.message})});
    dispatch({type: EDIT_RECEIPT_ITEM, payload: {newReceiptItem, rowIndex}});
  }).catch((error) => {
    dispatch({type: MESSAGE, payload: "ERROR: " + error.message})

  })
};

const itemsReadyForStock = (receiptItems) => {
  return receiptItems.some(item => item.status === itemStatus.RECOGNIZED)
}
export const addReceiptItemsToFoodStock = () => async (dispatch , getState, {getFirebase}) => {
  if(!itemsReadyForStock(getState().receipts.currentReceipt.receiptItems)){
    dispatch({type: MESSAGE, payload: "Recognized items have already been added to Food Stock!"})
    return;
  }
  const id = getState().receipts.currentReceipt.id
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    const response = await api.get(`receipts/foodstock/${id}`,{
      headers:{
        'Authorization' : 'Bearer ' + idToken,
      },
    }).then((response) => {
      console.log("RI: ", response.data);
      dispatch({type: FETCH_RECEIPT_ITEMS, payload: {id: id, receiptItems: response.data}});
      dispatch(fetchFoodStock({actionsOnSuccess: [{type: MESSAGE, payload: "Items have been added successfully"}]}))
    }).catch(error => dispatch({type: MESSAGE, payload: error.message}));

  }).catch((error) => {
    console.log("ERROR: ", error)
    dispatch({type: MESSAGE, payload: "ERROR: " + error.message})

  })
};



export const setCurrentReceipt = (id) => {
  return{
    type: SET_CURRENT_RECEIPT,
    payload: id
  }
}
