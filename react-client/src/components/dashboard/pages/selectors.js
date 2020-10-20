import { createSelector } from 'reselect'

const getReceiptsData = (state) => state.receipts.receipts;
const getReceiptItemsData = (state) => state.receipts.currentReceipt.receiptItems;
const getFoodStockData = (state) => state.food.foodStock;

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
    let foodItem = values.plainFoodItemDto;
    return [ values.referenceName, foodItem==null ? '?' : foodItem , values.status];
  })
  return receiptData;
  }
)

export const getFoodStock = createSelector(
  getFoodStockData,(data) => {
    const indexToKey = [];
    const foodStockData = Object.values(data).map((values, index) => {
      indexToKey[index] = parseInt(values.id, 10);
      return [ values.foodName, {countable: values.countable, quantity: values.quantity, servingSize: values.servingSize}, {servingSize: values.servingSize, countable: values.countable} ];
    })
    return [foodStockData, indexToKey];
  }
)
