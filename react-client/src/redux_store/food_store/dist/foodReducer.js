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
var foodTypes_1 = require("./foodTypes");
var lodash_1 = require("lodash");
var receiptTypes_1 = require("../receipt_store/receiptTypes");
var initState = {
    foodStock: {},
    searchedItems: {},
    food_loading: false,
    meals: {}
};
exports["default"] = (function (state, action) {
    var _a, _b;
    if (state === void 0) { state = initState; }
    console.log("DISPATCH: ", action.type);
    switch (action.type) {
        case foodTypes_1.FETCH_FOOD_ITEMS:
            return __assign(__assign({}, state), { searchedItems: __assign(__assign({}, state.searchedItems), action.payload), food_loading: false });
        case receiptTypes_1.EDIT_RECEIPT_ITEM:
            return __assign(__assign({}, state), { searchedItems: lodash_1["default"].omit(state.searchedItems, action.payload.id) });
        case foodTypes_1.FETCH_FOODSTOCK:
            return __assign(__assign({}, state), { foodStock: __assign({}, (lodash_1["default"].mapKeys(action.payload, function (value) { return value.foodItemDto.id; }))), searchedItems: {} });
        case foodTypes_1.EDIT_FOODSTOCK:
            return __assign(__assign({}, state), { foodStock: __assign(__assign({}, state.foodStock), (_a = {}, _a[action.payload.foodItemDto.id] = action.payload, _a)) });
        case foodTypes_1.DELETE_FOODSTOCK:
            return __assign(__assign({}, state), { foodStock: lodash_1["default"].omit(state.foodStock, action.payload) });
        case foodTypes_1.FOOD_LOADING:
            return __assign(__assign({}, state), { food_loading: true });
        case foodTypes_1.FETCH_MEALS:
            return __assign(__assign({}, state), { meals: __assign({}, (lodash_1["default"].mapKeys(action.payload, 'id'))), searchedItems: {} });
        case foodTypes_1.EDIT_MEAL:
            return __assign(__assign({}, state), { meals: __assign(__assign({}, state.meals), (_b = {}, _b[action.payload.id] = __assign(__assign({}, state.meals[action.payload.id]), action.payload), _b)) });
        case foodTypes_1.DELETE_MEAL:
            return __assign(__assign({}, state), { meals: lodash_1["default"].omit(state.meals, action.payload) });
        default:
            return state;
    }
});
