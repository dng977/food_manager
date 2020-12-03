import apiRequest, {api} from '../../apis/v1';
import { FETCH_RECEIPTS, LOADING, DELETE_RECEIPT, EDIT_RECEIPT, FETCH_RECEIPT_IMAGE, MESSAGE, SET_CURRENT_RECEIPT, FETCH_RECEIPT_ITEMS, UNDO_LOADING, EDIT_RECEIPT_ITEM, ADD_RECEIPT_ITEMS_TO_FOODSTOCK } from './types';
import history from '../../history'; 
import { itemStatus } from '../../components/dashboard/pages/receipt_page/constants';
import { fetchFoodStock } from './foodActions';

export const fetchReceipts = () => async (dispatch , getState, {getFirebase}) => {
  apiRequest({
    loading: true,
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: 'receipts',
    },
    onSuccess: response => dispatch({type: FETCH_RECEIPTS, payload: response.data})
  });
};

export const fetchReceiptItems = (id, onError) => async (dispatch , getState, {getFirebase}) => {
  if(getState().receipts.currentReceipt.id === id)
    return
  apiRequest({
    loading: true,
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: 'receipts/' + id + '/items',
    },
    onSuccess: response => dispatch({type: FETCH_RECEIPT_ITEMS, payload: {id: id, receiptItems: response.data}}),
    onError: error => onError()
  });
};

export const uploadReceipt = (receiptImage) => async (dispatch , getState, {getFirebase}) => {
  apiRequest({
    loading: true,
    dispatch,
    getFirebase,
    request: {
      method: 'post',
      url: 'receipts',
      payload: receiptImage,
      otherHeaders: {
        'Content-Type': `multipart/form-data; boundary=${receiptImage._boundary}`
      }
    },
    onSuccess: response => dispatch({type: FETCH_RECEIPTS, payload: response.data})
  });
};
export const fetchReceiptImage = (id) => async (dispatch , getState, {getFirebase}) => {
  //
  if(getState().receipts.currentReceipt.imageData !== '')
    return;

  apiRequest({
    loading: false,
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: `receipts/${id}/image`,
    },
    onSuccess: response => dispatch({type: FETCH_RECEIPT_IMAGE, payload: {id, imageData: response.data}})
  });  
};
export const deleteReceipt = (id, callback) => async (dispatch , getState, {getFirebase}) => {
  callback();
  
  apiRequest({
    loading: true,
    dispatch,
    getFirebase,
    request: {
      method: 'delete',
      url: `receipts/${id}`,
    },
    onSuccess: response => dispatch({type: DELETE_RECEIPT, payload: id})
  });  

};
export const editReceiptItem = (oldItemId,newFoodItemDto) => async (dispatch , getState, {getFirebase}) => {
  //dispatch({type: LOADING});
  const id = getState().receipts.currentReceipt.id
  const oldReceiptItem = getState().receipts.currentReceipt.receiptItems[oldItemId]

  const newReceiptItem = {...oldReceiptItem, foodItemReceiptDto: [newFoodItemDto], status: itemStatus.RECOGNIZED}
  
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'put',
      url: `receipts/${id}/items/${newReceiptItem.id}`,
      payload: newReceiptItem
    },
    onSuccess: () => dispatch({type: EDIT_RECEIPT_ITEM, payload: {newReceiptItem}})
  });  
};

const itemsReadyForStock = (receiptItems) => {
  return Object.values(receiptItems).some(item => item.status === itemStatus.RECOGNIZED)
}

export const addReceiptItemsToFoodStock = () => async (dispatch , getState, {getFirebase}) => {
  if(!itemsReadyForStock(getState().receipts.currentReceipt.receiptItems)){
    dispatch({type: MESSAGE, payload: "Recognized items have already been added to Food Stock!"})
    return;
  }
  const id = getState().receipts.currentReceipt.id
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: `receipts/foodstock/${id}`,
    },
    onSuccess: response => {
      console.log("RI: ", response.data);
      dispatch({type: FETCH_RECEIPT_ITEMS, payload: {id: id, receiptItems: response.data}});
      dispatch(fetchFoodStock({actionsOnSuccess: [{type: MESSAGE, payload: "Items have been added successfully"}]}))
    }
  });  
};


export const setCurrentReceipt = (id) => {
  return{
    type: SET_CURRENT_RECEIPT,
    payload: id
  }
}
