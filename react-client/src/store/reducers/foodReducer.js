import { EDIT_RECEIPT_ITEM, FETCH_FOOD_ITEMS, FOOD_LOADING } from '../actions/types';
import _ from 'lodash';

const initState = {
  searchedItems: {},
  loading: false
}
export default (state = initState, action) => {
  console.log("DISPATCH: ", action.type);
  switch (action.type) {
    case FETCH_FOOD_ITEMS:
      return { ...state, searchedItems: {...state.searchedItems, ...action.payload }, loading: false };
    case FOOD_LOADING:
      return { ...state, loading: true }
    case EDIT_RECEIPT_ITEM:
      return { ...state, searchedItems: _.omit(state.searchedItems, action.payload.rowIndex)}
    default:
      return state;
  }
}