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
var lodash_1 = require("lodash");
var receiptTypes_1 = require("./receiptTypes");
var initState = {
    receipts: {},
    currentReceipt: { id: 0, receiptItems: {}, imageData: null }
};
exports["default"] = (function (state, action) {
    var _a;
    if (state === void 0) { state = initState; }
    console.log("DISPATCH: ", action.type);
    switch (action.type) {
        case receiptTypes_1.FETCH_RECEIPTS:
            return __assign(__assign({}, state), { receipts: __assign({}, (lodash_1["default"].mapKeys(action.payload, 'id'))) });
        case receiptTypes_1.FETCH_RECEIPT_ITEMS:
            return __assign(__assign({}, state), { currentReceipt: { id: action.payload.id, imageData: null, receiptItems: __assign({}, (lodash_1["default"].mapKeys(action.payload.receiptItems, 'id'))) } });
        case receiptTypes_1.FETCH_RECEIPT_IMAGE:
            return __assign(__assign({}, state), { currentReceipt: __assign(__assign({}, state.currentReceipt), { id: action.payload.id, imageData: action.payload.imageData }) });
        case receiptTypes_1.DELETE_RECEIPT:
            return __assign(__assign({}, state), { currentReceipt: initState.currentReceipt, receipts: (lodash_1["default"].omit(state.receipts, action.payload)) });
        case receiptTypes_1.EDIT_RECEIPT_ITEM:
            return __assign(__assign({}, state), { currentReceipt: __assign(__assign({}, state.currentReceipt), { receiptItems: __assign(__assign({}, state.currentReceipt.receiptItems), (_a = {}, _a[action.payload.id] = action.payload, _a)) }) });
        default:
            return state;
    }
});
