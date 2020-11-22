import _ from 'lodash';
import { EDIT_RECEIPT_ITEMS, FETCH_RECEIPTS, UPLOAD_RECEIPT, LOADING, DELETE_RECEIPT, FETCH_RECEIPT_IMAGE, MESSAGE, CLEAR_MESSAGE, SET_CURRENT_RECEIPT, FETCH_RECEIPT_ITEMS, EDIT_RECEIPT_ITEM } from '../actions/types';

const initState = { 
  receipts: {},
  currentReceipt: {id: 0, receiptItems: [], imageData: ''},
}
export default (state = initState, action) => {
  console.log("DISPATCH: ", action.type);
  switch (action.type) {
    case FETCH_RECEIPTS:
      return { ...state, receipts: { ...(_.mapKeys(action.payload, 'id')) } };
    case FETCH_RECEIPT_ITEMS:
      return { ...state, 
        currentReceipt: {id: action.payload.id, imageData: '', receiptItems: action.payload.receiptItems}, 
        }
    case UPLOAD_RECEIPT:
      return { ...state, receipts: { ...state.receipts, [ action.payload.id ]: action.payload } };
    case FETCH_RECEIPT_IMAGE:
      return { ...state, currentReceipt: {...state.currentReceipt,id: action.payload.id, imageData: action.payload.imageData} };
    case DELETE_RECEIPT:
      return {...state, currentReceipt: initState.currentReceipt, receipts: (_.omit(state.receipts, action.payload)) };
    case EDIT_RECEIPT_ITEM:
      return { ...state, 
        currentReceipt: {
         ...state.currentReceipt, receiptItems: state.currentReceipt.receiptItems.map(item => item.id === action.payload.newReceiptItem.id ? action.payload.newReceiptItem : item)
        }, 
          };

    case SET_CURRENT_RECEIPT:
      return { ...state, currentReceipt: {...state.currentReceipt, id: action.payload, imageData: ''}}
    default:
      return state;
  }
}