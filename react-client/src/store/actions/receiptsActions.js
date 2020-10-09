import api from '../../apis/v1';
import { FETCH_RECEIPTS, LOADING, DELETE_RECEIPT, EDIT_RECEIPT, FETCH_RECEIPT_IMAGE, ERROR, SET_CURRENT_RECEIPT, FETCH_RECEIPT_ITEMS, UNDO_LOADING, EDIT_RECEIPT_ITEM } from './types';
import history from '../../history'; 
import { itemStatus } from '../../components/dashboard/pages/receipt_page/constants';

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
    });
    dispatch({type: FETCH_RECEIPTS, payload: response.data});
  }).catch((error) => {
    console.log(error);
    dispatch({type: ERROR, payload: error})
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
    });
    dispatch({type: FETCH_RECEIPT_ITEMS, payload: {id: id, imageData: '', receiptItems: response.data}});
  }).catch((error) => {
    dispatch({type: ERROR, payload: error})
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
    });
    dispatch({type: FETCH_RECEIPTS, payload: response.data});
  }).catch((error) => {
    console.log(error);
    dispatch({type: ERROR, payload: error});
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
    });
    dispatch({type: FETCH_RECEIPT_IMAGE, payload: {id, imageData: response.data}});
  }).catch((error) => {
    console.log(error);
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
    });
    dispatch({type: DELETE_RECEIPT, payload: id});
    
  }).catch((error) => {
    dispatch({type: ERROR, payload: error});

  })

};
export const editReceiptItem = (rowIndex,newFoodItemDto) => async (dispatch , getState, {getFirebase}) => {
  dispatch({type: LOADING});
  const id = getState().receipts.currentReceipt.id
  const oldReceiptItem = getState().receipts.currentReceipt.receiptItems[rowIndex]
  const newReceiptItem = {...oldReceiptItem, foodItemDto: [newFoodItemDto], status: itemStatus.RECOGNIZED}
  dispatch({type: EDIT_RECEIPT_ITEM, payload: {newReceiptItem, rowIndex}});
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    const response = await api.put(`receipts/${id}/items/${newReceiptItem.id}`,newReceiptItem,{
      headers:{
        'Authorization' : 'Bearer ' + idToken,
      },
    });

  }).catch((error) => {
    console.log(error);
  })
};

export const setCurrentReceipt = (id) => {
  return{
    type: SET_CURRENT_RECEIPT,
    payload: id
  }
}
