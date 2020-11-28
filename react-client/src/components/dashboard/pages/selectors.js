import { createSelector } from 'reselect'

const getReceiptsData = (state) => state.receipts.receipts;
const getReceiptItemsData = (state) => state.receipts.currentReceipt.receiptItems;
const getFoodStockData = (state) => state.food.foodStock;
const getActivityFactorsData = (state) => state.nutrition.activityFactors;
const getMealsData = (state) => state.food.meals;

export const getReceipts = createSelector(
  getReceiptsData,(data) => {
    const indexToKey = [];
    const receiptData = Object.values(data).map((values, index) => {
      indexToKey[index] = parseInt(values.id, 10);
      return [ values.storeName, values.date, values.warning ];
    })
    return [receiptData, indexToKey];
  }
)

export const getReceiptItems = createSelector(getReceiptItemsData,(itemsData) => {
  const receiptData = Object.values(itemsData).map((values) => {
    let foodItem = values.foodItemReceiptDto;
    return [ values.referenceName, {id: values.id, foodList: foodItem==null ? '?' : foodItem } , values.status];
  })
  return receiptData;
  }
)

export const getFoodStock = createSelector(
  getFoodStockData,(data) => {
    const indexToKey = [];
    const foodStockData = Object.values(data).map((values, index) => {
      indexToKey[index] = parseInt(values.foodItemId, 10);
      return [ values.foodName, {...values}, {...values} ];
    })
    return [foodStockData, indexToKey];
  }
)
export const getMeals = createSelector(
  getMealsData,(data) => {
    const indexToKey = [];
    const mealsData = Object.values(data).map((values, index) => {
      indexToKey[index] = parseInt(values.foodItemId, 10);
      return [ values.name, {id: values.id, quantity: values.quantity, servingSize: values.quantity}, {id: values.id, quantity: values.quantity}, values ];
    })
    return [mealsData, indexToKey];
  }
)

export const getActivityFactors = createSelector(
  getActivityFactorsData,(data) => {
    return data.map(item => {
      return item.activityFactor + ": " + item.description;
    })
  }
)

