import _ from 'lodash';
import { FETCH_RECEIPTS, UPLOAD_RECEIPT, FETCH_RECEIPT, LOADING, DELETE_RECEIPT, EDIT_RECEIPT, FETCH_RECEIPT_IMAGE, ERROR, CLEAR_ERROR, SET_CURRENT_RECEIPT, FETCH_RECEIPT_ITEMS } from '../actions/types';

const initState = { 
  receipts: {},
  loading: true, 
  currentReceipt: {id: '', receiptItems: [], imageData: ''},
  error: '' 
}
export default (state = initState, action) => {
  console.log("DISPATCH: ", action.type);
  switch (action.type) {
    case FETCH_RECEIPTS:
      return { ...state, receipts: { ...(_.mapKeys(action.payload, 'id')) }, currentReceipt: initState.currentReceipt, loading: false };
    case FETCH_RECEIPT_ITEMS:
      return { ...state, 
        currentReceipt: action.payload, 
        loading: false}
    case UPLOAD_RECEIPT:
      return { ...state, receipts: { [ action.payload.id ]: action.payload }, loading: false };
    case FETCH_RECEIPT_IMAGE:
      return { ...state, currentReceipt: {...state.currentReceipt,id: action.payload, imageData: action.payload.imageData}, loading: false };
    case DELETE_RECEIPT:
      return {...state, receipts: (_.omit(state.receipts, action.payload)), loading: false };
    case EDIT_RECEIPT:
      return { ...state, receipts: { [ action.payload.id ]: action.payload }, loading: false };
    case LOADING:
      return { ...state, loading: true }
    case ERROR:
      return { ...state, error: action.payload, loading: false }
    case CLEAR_ERROR:
      return { ...state, error: ''}
    case SET_CURRENT_RECEIPT:
      return { ...state, currentReceipt: {...state.currentReceipt, id: action.payload, imageData: ''}}
    default:
      return state;
  }
}