import receipts from '../../apis/receipts';
import { FETCH_RECEIPTS, LOADING, DELETE_RECEIPT, EDIT_RECEIPT, FETCH_RECEIPT_IMAGE, ERROR, SET_CURRENT_RECEIPT, FETCH_RECEIPT_ITEMS, UNDO_LOADING } from './types';
import history from '../../history'; 

export const fetchReceipts = () => async (dispatch , getState, {getFirebase}) => {
  dispatch({type: LOADING});
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    const response = await receipts.request({
      method: 'get',
      url: 'receipts',
      headers:{
        'Authorization' : 'Bearer ' + idToken 
      }
    });
    dispatch({type: FETCH_RECEIPTS, payload: response.data});
  }).catch((error) => {
    console.log(error);
  })

};

export const fetchReceiptItems = (id) => async (dispatch , getState, {getFirebase}) => {
  dispatch({type: LOADING});
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    const response = await receipts.request({
      method: 'get',
      url: 'receipts/' + id + '/items',
      headers:{
        'Authorization' : 'Bearer ' + idToken 
      }
    });
    dispatch({type: FETCH_RECEIPT_ITEMS, payload: {id: id, imageData: '', receiptItems: response.data}});
  }).catch((error) => {
    console.log(error);
  })

};

export const uploadReceipt = (receiptImage) => async (dispatch , getState, {getFirebase}) => {
  dispatch({type: LOADING});
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    const response = await receipts.post('receipts',receiptImage,{
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
    const response = await receipts.get(`receipts/${id}/image`,{
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
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    const response = await receipts.delete(`receipts/${id}`,{
      headers:{
        'Authorization' : 'Bearer ' + idToken,
      },
    });
    dispatch({type: DELETE_RECEIPT, payload: id});
    callback();
  }).catch((error) => {
    dispatch({type: ERROR, payload: error});

  })

};
export const editReceipt = () => async (dispatch , getState, {getFirebase}) => {
  dispatch({type: LOADING});
  const firebase = getFirebase();
  firebase.auth().currentUser.getIdToken(true).then( async (idToken) => {
    const response = await receipts.request({
      method: 'get',
      url: 'receipts',
      headers:{
        'Authorization' : 'Bearer ' + idToken 
      }
    });
    dispatch({type: EDIT_RECEIPT, payload: response.data});
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
