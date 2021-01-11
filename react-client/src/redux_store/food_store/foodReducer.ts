import { DELETE_FOODSTOCK, EDIT_FOODSTOCK, FETCH_FOODSTOCK, FETCH_FOOD_ITEMS, FOOD_LOADING, FETCH_MEALS, DELETE_MEAL, EDIT_MEAL, FoodActionTypes } from './foodTypes';
import _ from 'lodash';
import { EditReceiptItemAction, EDIT_RECEIPT_ITEM } from '../receipt_store/receiptTypes';
import { IdMap } from '../sharedTypes';
import { FoodItemDto, FoodStockDto, MealDto } from '../../apis/dtos/serverDtos';

interface FoodState {
  foodStock: IdMap<FoodStockDto>;
  searchedItems: IdMap<FoodItemDto[]>;
  food_loading: boolean;
  meals: IdMap<MealDto>;
}
const initState: FoodState = {
  foodStock: {},
  searchedItems: {},
  food_loading: false,
  meals: {},
}
const reducer = (state = initState, action: FoodActionTypes | EditReceiptItemAction): FoodState => {
  console.log("DISPATCH: ", action.type);
  switch (action.type) {
    case FETCH_FOOD_ITEMS:
      return { ...state, searchedItems: {...state.searchedItems, ...action.payload }, food_loading: false };
    case EDIT_RECEIPT_ITEM:
      return { ...state, searchedItems: _.omit(state.searchedItems, action.payload.id)}
    case FETCH_FOODSTOCK:
      return {...state, foodStock: {...(_.mapKeys(action.payload, (value) => value.foodItemDto.id))}, searchedItems: {}}
    case EDIT_FOODSTOCK:
      return {...state, foodStock: {...state.foodStock, [action.payload.foodItemDto.id]: action.payload}}
    case DELETE_FOODSTOCK:
      return {...state, foodStock: _.omit(state.foodStock, action.payload)};
    case FOOD_LOADING:
      return {...state, food_loading: true}
    case FETCH_MEALS:
      return {...state, meals: {...(_.mapKeys(action.payload, 'id'))}, searchedItems: {}}
    case EDIT_MEAL:
      return {...state, meals: {...state.meals, [action.payload.id]: {...state.meals[action.payload.id],...action.payload}}}
    case DELETE_MEAL:
      return {...state, meals: _.omit(state.meals, action.payload)};
    
    default:
      return state;
  }
}

export default reducer;