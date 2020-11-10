import apiRequest, { api } from '../../apis/v1';
import { MESSAGE, FETCH_FOOD_ITEMS, FETCH_FOODSTOCK, UPDATE_FOODSTOCK, DELETE_FOODSTOCK, LOADING, FOOD_LOADING, ADD_ITEM_FOODSTOCK, DIALOG_LOADING, EAT_ITEM_FOODSTOCK, FETCH_NUTRITION_STATE } from './types';

export const fetchFoodItems = (foodName, rowIndex) => async (dispatch, getState, { getFirebase }) => {
  dispatch({ type: FOOD_LOADING });
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: `fooditems/${foodName}`,
    },
    onSuccess: response => dispatch({ type: FETCH_FOOD_ITEMS, payload: { [ rowIndex ]: response.data } }),
  });
};

export const fetchFoodStock = (actionsOnSuccess = []) => async (dispatch, getState, { getFirebase }) => {
  apiRequest({
    loading: true,
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: 'foodstock',
    },
    onSuccess: response => {
      dispatch({ type: FETCH_FOODSTOCK, payload: response.data })
      console.log(getState().nutrition);
      if(actionsOnSuccess.length)
        actionsOnSuccess.forEach(action => {
          dispatch(action);
        })
    }
  });

};

export const editFoodStockItem = (id, newValues) => async (dispatch, getState, { getFirebase }) => {
  // dispatch({type: LOADING});
  const oldFoodStockItem = getState().food.foodStock[ id ];
  const newFoodStockItem = { ...oldFoodStockItem, ...newValues }
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'put',
      url: 'foodstock/item',
      payload: newFoodStockItem
    },
    onSuccess: response => dispatch({ type: UPDATE_FOODSTOCK, payload: newFoodStockItem }),
  });
};

export const deleteFoodStockItems = (idArray) => async (dispatch, getState, { getFirebase }) => {
  dispatch({ type: DIALOG_LOADING });
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'delete',
      url: 'foodstock',
      payload: idArray
    },
    onSuccess: response => dispatch({ type: DELETE_FOODSTOCK, payload: idArray }),
  });
};

export const addFoodItem = (foodItemId, quantity, callBackOnSuccess) => async (dispatch, getState, { getFirebase }) => {
  dispatch({ type: DIALOG_LOADING });
  const itemDto = { foodItemId, quantity }
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'post',
      url: 'foodstock/item/add',
      payload: itemDto
    },
    onSuccess: response => {
      dispatch({ type: ADD_ITEM_FOODSTOCK, payload: response.data });
      callBackOnSuccess();
    }
  });
};

export const eatFoodStockItem = (eatFoodStockDto = { foodItemId: null, quantity: null, cooked: false }) => async (dispatch, getState, { getFirebase }) => {
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'post',
      url: 'foodstock/item/eat',
      payload: eatFoodStockDto
    },
    onSuccess: response => {
      dispatch({ type: FETCH_NUTRITION_STATE, payload: response.data });

      const oldFoodStockItem = getState().food.foodStock[ eatFoodStockDto.foodItemId ];
      const newFoodStockItem = { ...oldFoodStockItem, quantity: oldFoodStockItem.quantity ? oldFoodStockItem.quantity - eatFoodStockDto.quantity : oldFoodStockItem.quantity };
      dispatch({ type: UPDATE_FOODSTOCK, payload: newFoodStockItem });
    }
  });
};