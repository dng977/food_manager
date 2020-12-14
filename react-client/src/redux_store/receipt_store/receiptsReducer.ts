import _ from 'lodash';
import { ReceiptDto, ReceiptItemDto } from '../../apis/dtos/serverDtos';
import { IdMap } from '../sharedTypes';
import { FETCH_RECEIPTS, UPLOAD_RECEIPT, DELETE_RECEIPT, FETCH_RECEIPT_IMAGE, SET_CURRENT_RECEIPT, FETCH_RECEIPT_ITEMS, EDIT_RECEIPT_ITEM, ReceiptsState, ReceiptActions } from './receiptTypes';


const initState: ReceiptsState= { 
  receipts: {},
  currentReceipt: {id: 0, receiptItems: {}, imageData: null},
}
export default (state = initState, action : ReceiptActions): ReceiptsState=> {
  console.log("DISPATCH: ", action.type);
  switch (action.type) {
    case FETCH_RECEIPTS:
      return { ...state, receipts: { ...(_.mapKeys(action.payload, 'id')) } };
    case FETCH_RECEIPT_ITEMS:
      return { ...state, 
        currentReceipt: {id: action.payload.id, imageData: null, receiptItems: { ...(_.mapKeys(action.payload.receiptItems, 'id'))}}, 
        }
    case FETCH_RECEIPT_IMAGE:
      return { ...state, currentReceipt: {...state.currentReceipt,id: action.payload.id, imageData: action.payload.imageData} };
    case DELETE_RECEIPT:
      return {...state, currentReceipt: initState.currentReceipt, receipts: (_.omit(state.receipts, action.payload)) };
    case EDIT_RECEIPT_ITEM:
      return { ...state, 
        currentReceipt: {
         ...state.currentReceipt, receiptItems: { ...state.currentReceipt.receiptItems, [action.payload.id]: action.payload }
        }, 
          };
    default:
      return state;
  }
}