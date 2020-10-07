import { FETCH_FOOD_ITEMS, FOOD_LOADING } from '../actions/types';

const initState = {
  searchedItems: [],
  loading: false
}
export default (state = initState, action) => {
  console.log("DISPATCH: ", action.type);
  switch (action.type) {
    case FETCH_FOOD_ITEMS:
      return { ...state, searchedItems: action.payload, loading: false };
    case FOOD_LOADING:
      return { ...state, loading: true }
    default:
      return state;
  }
}