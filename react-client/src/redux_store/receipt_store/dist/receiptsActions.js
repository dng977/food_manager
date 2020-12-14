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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.addReceiptItemsToFoodStock = exports.editReceiptItem = exports.deleteReceipt = exports.fetchReceiptImage = exports.fetchReceiptItems = exports.uploadReceipt = exports.fetchReceipts = void 0;
var v1_1 = require("../../apis/v1");
var receiptTypes_1 = require("./receiptTypes");
var foodActions_1 = require("../food_store/foodActions");
var feedbackTypes_1 = require("../feedback_store/feedbackTypes");
var serverDtos_1 = require("../../apis/dtos/serverDtos");
exports.fetchReceipts = function () { return function (dispatch, _getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        v1_1["default"]({
            loading: true,
            dispatch: dispatch,
            getFirebase: getFirebase,
            request: {
                method: 'get',
                url: 'receipts'
            },
            onSuccess: function (response) { return dispatch({ type: receiptTypes_1.FETCH_RECEIPTS, payload: response.data }); }
        });
        return [2 /*return*/];
    });
}); }; };
exports.uploadReceipt = function (receiptImage) { return function (dispatch, _getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // console.log("boundary: ", receiptImage._boundary)
        v1_1["default"]({
            loading: true,
            dispatch: dispatch,
            getFirebase: getFirebase,
            request: {
                method: 'post',
                url: 'receipts',
                payload: receiptImage
            },
            onSuccess: function (response) { return dispatch({ type: receiptTypes_1.FETCH_RECEIPTS, payload: response.data }); }
        });
        return [2 /*return*/];
    });
}); }; };
exports.fetchReceiptItems = function (id, onError) { return function (dispatch, getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (getState().receipts.currentReceipt.id === id)
            return [2 /*return*/];
        v1_1["default"]({
            loading: true,
            dispatch: dispatch,
            getFirebase: getFirebase,
            request: {
                method: 'get',
                url: 'receipts/' + id + '/items'
            },
            onSuccess: function (response) { return dispatch({ type: receiptTypes_1.FETCH_RECEIPT_ITEMS, payload: { id: id, receiptItems: response.data } }); },
            onError: function (_error) { return onError(); }
        });
        return [2 /*return*/];
    });
}); }; };
exports.fetchReceiptImage = function (id) { return function (dispatch, getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        //
        if (getState().receipts.currentReceipt.imageData !== null)
            return [2 /*return*/];
        v1_1["default"]({
            loading: false,
            dispatch: dispatch,
            getFirebase: getFirebase,
            request: {
                method: 'get',
                url: "receipts/" + id + "/image"
            },
            onSuccess: function (response) { return dispatch({ type: receiptTypes_1.FETCH_RECEIPT_IMAGE, payload: { id: id, imageData: response.data } }); }
        });
        return [2 /*return*/];
    });
}); }; };
exports.deleteReceipt = function (id, callback) { return function (dispatch, _getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        callback();
        v1_1["default"]({
            loading: true,
            dispatch: dispatch,
            getFirebase: getFirebase,
            request: {
                method: 'delete',
                url: "receipts/" + id
            },
            onSuccess: function (_response) { return dispatch({ type: receiptTypes_1.DELETE_RECEIPT, payload: id }); }
        });
        return [2 /*return*/];
    });
}); }; };
exports.editReceiptItem = function (oldItemId, newFoodItemDto) { return function (dispatch, getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    var id, oldReceiptItem, newReceiptItem;
    return __generator(this, function (_a) {
        id = getState().receipts.currentReceipt.id;
        oldReceiptItem = getState().receipts.currentReceipt.receiptItems[oldItemId];
        newReceiptItem = __assign(__assign({}, oldReceiptItem), { foodItemReceiptDto: [newFoodItemDto], status: serverDtos_1.ReceiptItemStatus.RECOGNIZED });
        v1_1["default"]({
            dispatch: dispatch,
            getFirebase: getFirebase,
            request: {
                method: 'put',
                url: "receipts/" + id + "/items/" + newReceiptItem.id,
                payload: newReceiptItem
            },
            onSuccess: function () { return dispatch({ type: receiptTypes_1.EDIT_RECEIPT_ITEM, payload: newReceiptItem }); }
        });
        return [2 /*return*/];
    });
}); }; };
var itemsReadyForStock = function (receiptItems) {
    return Object.values(receiptItems).some(function (item) { return item.status === serverDtos_1.ReceiptItemStatus.RECOGNIZED; });
};
exports.addReceiptItemsToFoodStock = function () { return function (dispatch, getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        if (!itemsReadyForStock(getState().receipts.currentReceipt.receiptItems)) {
            dispatch({ type: feedbackTypes_1.MESSAGE, payload: "Recognized items have already been added to Food Stock!" });
            return [2 /*return*/];
        }
        id = getState().receipts.currentReceipt.id;
        v1_1["default"]({
            dispatch: dispatch,
            getFirebase: getFirebase,
            request: {
                method: 'get',
                url: "receipts/foodstock/" + id
            },
            onSuccess: function (response) {
                console.log("RI: ", response.data);
                dispatch({ type: receiptTypes_1.FETCH_RECEIPT_ITEMS, payload: { id: id, receiptItems: response.data } });
                foodActions_1.fetchFoodStock([{ type: feedbackTypes_1.MESSAGE, payload: "Items have been added successfully" }]);
            }
        });
        return [2 /*return*/];
    });
}); }; };
// export const setCurrentReceipt = (id) => {
//   return {
//     type: SET_CURRENT_RECEIPT,
//     payload: id
//   }
// }
