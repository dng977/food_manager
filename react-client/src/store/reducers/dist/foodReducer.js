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
var types_1 = require("../actions/types");
var lodash_1 = require("lodash");
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
        case types_1.FETCH_FOOD_ITEMS:
            return __assign(__assign({}, state), { searchedItems: __assign(__assign({}, state.searchedItems), action.payload), food_loading: false });
        case types_1.EDIT_RECEIPT_ITEM:
            return __assign(__assign({}, state), { searchedItems: lodash_1["default"].omit(state.searchedItems, action.payload.rowIndex) });
        case types_1.FETCH_FOODSTOCK:
            return __assign(__assign({}, state), { foodStock: __assign({}, (lodash_1["default"].mapKeys(action.payload, 'foodItemId'))), searchedItems: {} });
        case types_1.EDIT_FOODSTOCK:
            return __assign(__assign({}, state), { foodStock: __assign(__assign({}, state.foodStock), (_a = {}, _a[action.payload.foodItemDto.id] = action.payload, _a)) });
        case types_1.DELETE_FOODSTOCK:
            return __assign(__assign({}, state), { foodStock: lodash_1["default"].omit(state.foodStock, action.payload) });
        case types_1.FOOD_LOADING:
            return __assign(__assign({}, state), { food_loading: true });
        // case ADD_ITEM_FOODSTOCK:
        //   return {...state, foodStock: {...(_.mapKeys(action.payload, 'foodItemId'))}, searchedItems: {}}
        case types_1.FETCH_MEALS:
            return __assign(__assign({}, state), { meals: __assign({}, (lodash_1["default"].mapKeys(action.payload, 'id'))), searchedItems: {} });
        case types_1.EDIT_MEAL:
            return __assign(__assign({}, state), { meals: __assign(__assign({}, state.meals), (_b = {}, _b[action.payload.id] = action.payload, _b)) });
        case types_1.DELETE_MEALS:
            return __assign(__assign({}, state), { meals: lodash_1["default"].omit(state.meals, action.payload) });
        default:
            return state;
    }
});
