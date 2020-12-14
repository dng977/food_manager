"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActivityFactors = exports.getMeals = exports.getFoodStock = exports.getReceiptItems = exports.getReceipts = void 0;

var _lodash = require("lodash");

var _reselect = require("reselect");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getReceiptsData = function getReceiptsData(state) {
  return state.receipts.receipts;
};

var getReceiptItemsData = function getReceiptItemsData(state) {
  return state.receipts.currentReceipt.receiptItems;
};

var getFoodStockData = function getFoodStockData(state) {
  return state.food.foodStock;
};

var getActivityFactorsData = function getActivityFactorsData(state) {
  return state.nutrition.activityFactors;
};

var getMealsData = function getMealsData(state) {
  return state.food.meals;
};

var getReceipts = (0, _reselect.createSelector)(getReceiptsData, function (data) {
  var indexToKey = [];
  var receiptData = Object.values(data).map(function (values, index) {
    indexToKey[index] = parseInt(values.id, 10);
    return [values.storeName, values.date, values.warning];
  });
  return [receiptData, indexToKey];
});
exports.getReceipts = getReceipts;
var getReceiptItems = (0, _reselect.createSelector)(getReceiptItemsData, function (itemsData) {
  var receiptData = Object.values(itemsData).map(function (values) {
    var foodItem = values.foodItemReceiptDto;
    return [values.referenceName, {
      id: values.id,
      foodList: foodItem == null ? '?' : foodItem
    }, values.status];
  });
  return receiptData;
});
exports.getReceiptItems = getReceiptItems;
var getFoodStock = (0, _reselect.createSelector)(getFoodStockData, function (data) {
  var indexToKey = [];
  var foodStockData = Object.entries(data).map(function (_ref, index) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    indexToKey[index] = key;
    return [value.foodItemDto.name, _objectSpread({}, value), _objectSpread({}, value)];
  });
  return [foodStockData, indexToKey];
});
exports.getFoodStock = getFoodStock;
var getMeals = (0, _reselect.createSelector)(getMealsData, function (data) {
  var indexToKey = [];
  var mealsData = Object.values(data).map(function (values, index) {
    indexToKey[index] = parseInt(values.foodItemId, 10);
    return [values.name, {
      id: values.id,
      quantity: values.quantity,
      servingSize: values.quantity
    }, {
      id: values.id,
      quantity: values.quantity
    }, values];
  });
  return [mealsData, indexToKey];
});
exports.getMeals = getMeals;
var getActivityFactors = (0, _reselect.createSelector)(getActivityFactorsData, function (data) {
  return data.map(function (item) {
    return item.activityFactor + ": " + item.description;
  });
});
exports.getActivityFactors = getActivityFactors;