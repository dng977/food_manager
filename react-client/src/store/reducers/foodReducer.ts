import { DELETE_FOODSTOCK, EDIT_FOODSTOCK, EDIT_RECEIPT_ITEM, FETCH_FOODSTOCK, FETCH_FOOD_ITEMS, FOOD_LOADING, FETCH_MEALS, DELETE_MEALS, EDIT_MEAL, FoodDictionary, FoodActionTypes } from '../actions/types';
import _ from 'lodash';

interface FoodState {
  foodStock: FoodDictionary;
  searchedItems: FoodDictionary;
  food_loading: boolean;
  meals: FoodDictionary;
}
const initState: FoodState = {
  foodStock: {},
  searchedItems: {},
  food_loading: false,
  meals: {},
}
export default (state = initState, action: FoodActionTypes): FoodState => {
  console.log("DISPATCH: ", action.type);
  switch (action.type) {
    case FETCH_FOOD_ITEMS:
      return { ...state, searchedItems: {...state.searchedItems, ...action.payload }, food_loading: false };
    case EDIT_RECEIPT_ITEM:
      return { ...state, searchedItems: _.omit(state.searchedItems, action.payload.rowIndex)}
    case FETCH_FOODSTOCK:
      return {...state, foodStock: {...(_.mapKeys(action.payload, 'foodItemId'))}, searchedItems: {}}
    case EDIT_FOODSTOCK:
      return {...state, foodStock: {...state.foodStock, [action.payload.foodItemDto.id]: action.payload}}
    case DELETE_FOODSTOCK:
      return {...state, foodStock: _.omit(state.foodStock, action.payload)};
    case FOOD_LOADING:
      return {...state, food_loading: true}
    // case ADD_ITEM_FOODSTOCK:
    //   return {...state, foodStock: {...(_.mapKeys(action.payload, 'foodItemId'))}, searchedItems: {}}

    case FETCH_MEALS:
      return {...state, meals: {...(_.mapKeys(action.payload, 'id'))}, searchedItems: {}}
    case EDIT_MEAL:
      return {...state, meals: {...state.meals, [action.payload.id]: action.payload}}
    case DELETE_MEALS:
      return {...state, meals: _.omit(state.meals, action.payload)};
    

    default:
      return state;
  }
}