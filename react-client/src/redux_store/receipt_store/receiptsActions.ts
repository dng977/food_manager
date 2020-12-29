import apiRequest, { api } from '../../apis/v1';
import { FETCH_RECEIPTS, DELETE_RECEIPT, FETCH_RECEIPT_IMAGE, SET_CURRENT_RECEIPT, FETCH_RECEIPT_ITEMS, EDIT_RECEIPT_ITEM, ReceiptActions, FetchReceiptsAction, FetchReceiptItemsAction, FetchReceiptImageAction, DeleteReceiptAction, EditReceiptItemAction, } from './receiptTypes';
import history from '../../history';
import { itemStatus } from '../../components/dashboard/pages/receipt_page/constants';
import { fetchFoodStock } from '../food_store/foodActions';
import { MESSAGE, MessageAction } from '../feedback_store/feedbackTypes';
import { AppThunk, AppThunkDispatch, IdMap } from '../sharedTypes';
import { FoodItemDto, ReceiptDto, ReceiptItemDto, ReceiptItemStatus } from '../../apis/dtos/serverDtos';

export const fetchReceipts = (): AppThunk<FetchReceiptsAction> => async (dispatch, _getState, getFirebase) => {
  apiRequest({
    loading: true,
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: 'receipts',
    },
    onSuccess: (response: { data: ReceiptDto[]; }) => dispatch({ type: FETCH_RECEIPTS, payload: response.data })
  });
};

interface BoundaryFormData extends FormData {
  _boundary: string;
}
export const uploadReceipt = (receiptImage: FormData): AppThunk<FetchReceiptsAction> => async (dispatch, _getState, getFirebase) => {
  // console.log("boundary: ", receiptImage._boundary)
  apiRequest({
    loading: true,
    dispatch,
    getFirebase,
    request: {
      method: 'post',
      url: 'receipts',
      payload: receiptImage,
      // otherHeaders: {
      //   'Content-Type': 'multipart/form-data'
      // }
    },
    onSuccess: response => dispatch({ type: FETCH_RECEIPTS, payload: response.data })
  });
};

export const fetchReceiptItems = (id: number, onError: () => void): AppThunk<FetchReceiptItemsAction> => async (dispatch, getState, getFirebase) => {
  if (getState().receipts.currentReceipt.id === id)
    return
  apiRequest({
    loading: true,
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: 'receipts/' + id + '/items',
    },
    onSuccess: response => dispatch({ type: FETCH_RECEIPT_ITEMS, payload: { id: id, receiptItems: response.data } }),
    onError: _error => onError()
  });
};


export const fetchReceiptImage = (id: number): AppThunk<FetchReceiptImageAction> => async (dispatch, getState, getFirebase) => {
  //
  if (getState().receipts.currentReceipt.imageData !== null)
    return;

  apiRequest({
    loading: false,
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: `receipts/${id}/image`,
    },
    onSuccess: response => dispatch({ type: FETCH_RECEIPT_IMAGE, payload: { id, imageData: response.data } })
  });
};
export const deleteReceipt = (id: number, callback): AppThunk<DeleteReceiptAction> => async (dispatch, _getState, getFirebase) => {
  callback();

  apiRequest({
    loading: true,
    dispatch,
    getFirebase,
    request: {
      method: 'delete',
      url: `receipts/${id}`,
    },
    onSuccess: _response => dispatch({ type: DELETE_RECEIPT, payload: id })
  });

};
export const editReceiptItem = (oldItemId: number, newFoodItemDto: FoodItemDto): AppThunk<EditReceiptItemAction> => async (dispatch, getState, getFirebase) => {
  //dispatch({type: LOADING});
  const id = getState().receipts.currentReceipt.id
  const oldReceiptItem = getState().receipts.currentReceipt.receiptItems[ oldItemId ]

  const newReceiptItem: ReceiptItemDto = { ...oldReceiptItem, foodItemReceiptDto: [ newFoodItemDto ], status: ReceiptItemStatus.RECOGNIZED }

  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'put',
      url: `receipts/${id}/items/${newReceiptItem.id}`,
      payload: newReceiptItem
    },
    onSuccess: () => dispatch({ type: EDIT_RECEIPT_ITEM, payload: newReceiptItem })
  });
};

const itemsReadyForStock = (receiptItems: IdMap<ReceiptItemDto>) => {
  return Object.values(receiptItems).some((item: ReceiptItemDto) => item.status === ReceiptItemStatus.RECOGNIZED)
}

export const addReceiptItemsToFoodStock = (): AppThunk<FetchReceiptItemsAction | MessageAction> => async (dispatch, getState, getFirebase) => {
  if (!itemsReadyForStock(getState().receipts.currentReceipt.receiptItems)) {
    dispatch({ type: MESSAGE, payload: "Recognized items have already been added to Food Stock!" })
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
      dispatch({ type: FETCH_RECEIPT_ITEMS, payload: { id: id, receiptItems: response.data } });
      dispatch(fetchFoodStock([ { type: MESSAGE, payload: "Items have been added successfully" } ]));
    }
  });
};


// export const setCurrentReceipt = (id) => {
//   return {
//     type: SET_CURRENT_RECEIPT,
//     payload: id
//   }
// }
