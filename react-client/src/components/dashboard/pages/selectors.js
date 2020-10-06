import { createSelector } from 'reselect'

const getData = (state) => state.receipts.receipts;
const getItemsData = (state) => state.receipts.currentReceipt.receiptItems;


export const getReceipts = createSelector(
  getData,(data) => {
    const indexToKey = [];
    const receiptData = Object.values(data).map((values, index) => {
      indexToKey[index] = parseInt(values.id, 10);
      return [ values.storeName, values.date, values.warning ];
    })
    return [receiptData, indexToKey];
  }
)

export const getReceiptItems = createSelector(getItemsData,(itemsData) => {
  const receiptData = Object.values(itemsData).map((values) => {
    let foodItem = values.foodItemDto;
    return [ values.referenceName, foodItem==null ? '?' : foodItem , values.status];
  })
  return receiptData;
  }
)
