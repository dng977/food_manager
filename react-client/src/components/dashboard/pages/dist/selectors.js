"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.getActivityFactors = exports.getMeals = exports.getFoodStock = exports.getReceiptItems = exports.getReceipts = void 0;
var reselect_1 = require("reselect");
var selectReceiptsData = function (state) { return state.receipts.receipts; };
var selectReceiptItemsData = function (state) { return state.receipts.currentReceipt.receiptItems; };
var selectFoodStockData = function (state) { return state.food.foodStock; };
var selectActivityFactorsData = function (state) { return state.nutrition.activityFactors; };
var selectMealsData = function (state) { return state.food.meals; };
exports.getReceipts = reselect_1.createSelector(selectReceiptsData, function (data) {
    var indexToKey = [];
    var receiptData = Object.values(data).map(function (values, index) {
        indexToKey[index] = values.id;
        return [values.storeName, values.date, false];
    });
    return [receiptData, indexToKey];
});
exports.getReceiptItems = reselect_1.createSelector(selectReceiptItemsData, function (itemsData) {
    var receiptData = Object.values(itemsData).map(function (values) {
        var foodItem = values.foodItemReceiptDto;
        return [values.referenceName, { id: values.id, foodList: foodItem == null ? '?' : foodItem }, values.status];
    });
    return receiptData;
});
exports.getFoodStock = reselect_1.createSelector(selectFoodStockData, function (data) {
    var indexToKey = [];
    console.log(data);
    var foodStockData = Object.values(data).map(function (values, index) {
        indexToKey[index] = values.foodItemDto.id;
        return [values.foodItemDto.name, __assign({}, values), __assign({}, values)];
    });
    return [foodStockData, indexToKey];
});
exports.getMeals = reselect_1.createSelector(selectMealsData, function (data) {
    var indexToKey = [];
    var mealsData = Object.values(data).map(function (values, index) {
        indexToKey[index] = values.id;
        return [values.name, __assign({}, values), __assign({}, values), __assign({}, values)];
    });
    return [mealsData, indexToKey];
});
exports.getActivityFactors = reselect_1.createSelector(selectActivityFactorsData, function (data) {
    return data.map(function (item) {
        return item.activityFactor + ": " + item.description;
    });
});
