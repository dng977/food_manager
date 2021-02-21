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
exports.eatMeal = exports.deleteMeal = exports.editMeal = exports.addMeal = exports.fetchMeals = exports.eatFoodStockItem = exports.addFoodStockItem = exports.deleteFoodStockItems = exports.editFoodStockItem = exports.fetchFoodStock = exports.fetchFoodItems = void 0;
var v1_1 = require("../../apis/v1");
var feedbackTypes_1 = require("../feedback_store/feedbackTypes");
var nutritionTypes_1 = require("../nutrition_store/nutritionTypes");
var foodTypes_1 = require("./foodTypes");
exports.fetchFoodItems = function (foodName, rowIndex) { return function (dispatch, _getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        dispatch({ type: foodTypes_1.FOOD_LOADING });
        v1_1["default"]({
            dispatch: dispatch,
            getFirebase: getFirebase,
            request: {
                method: 'get',
                url: "fooditems/" + foodName
            },
            onSuccess: function (response) {
                var _a;
                return dispatch({ type: foodTypes_1.FETCH_FOOD_ITEMS, payload: (_a = {}, _a[rowIndex] = response.data, _a) });
            }
        });
        return [2 /*return*/];
    });
}); }; };
exports.fetchFoodStock = function (actionsOnSuccess) {
    if (actionsOnSuccess === void 0) { actionsOnSuccess = []; }
    return function (dispatch, getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            v1_1["default"]({
                loading: true,
                dispatch: dispatch,
                getFirebase: getFirebase,
                request: {
                    method: 'get',
                    url: 'foodstock/items'
                },
                onSuccess: function (response) {
                    dispatch({ type: foodTypes_1.FETCH_FOODSTOCK, payload: response.data });
                    console.log(getState().nutrition);
                    if (actionsOnSuccess.length)
                        actionsOnSuccess.forEach(function (action) {
                            dispatch(action);
                        });
                }
            });
            return [2 /*return*/];
        });
    }); };
};
exports.editFoodStockItem = function (newFoodStockItem) { return function (dispatch, getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // dispatch({type: LOADING});
        v1_1["default"]({
            dispatch: dispatch,
            getFirebase: getFirebase,
            request: {
                method: 'put',
                url: 'foodstock/items',
                payload: newFoodStockItem
            },
            onSuccess: function () { return dispatch({ type: foodTypes_1.EDIT_FOODSTOCK, payload: newFoodStockItem }); }
        });
        return [2 /*return*/];
    });
}); }; };
exports.deleteFoodStockItems = function (idArray) { return function (dispatch, getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        dispatch({ type: feedbackTypes_1.DIALOG_LOADING });
        v1_1["default"]({
            dispatch: dispatch,
            getFirebase: getFirebase,
            request: {
                method: 'delete',
                url: 'foodstock/items',
                payload: idArray
            },
            onSuccess: function () { return dispatch({ type: foodTypes_1.DELETE_FOODSTOCK, payload: idArray }); }
        });
        return [2 /*return*/];
    });
}); }; };
exports.addFoodStockItem = function (foodItemId, quantity, callBackOnSuccess) { return function (dispatch, getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    var itemDto;
    return __generator(this, function (_a) {
        dispatch({ type: feedbackTypes_1.DIALOG_LOADING });
        itemDto = { foodItemDto: { id: foodItemId }, quantity: quantity };
        v1_1["default"]({
            dispatch: dispatch,
            getFirebase: getFirebase,
            request: {
                method: 'post',
                url: 'foodstock/items/add',
                payload: itemDto
            },
            onSuccess: function (response) {
                dispatch({ type: foodTypes_1.FETCH_FOODSTOCK, payload: response.data });
                callBackOnSuccess();
            }
        });
        return [2 /*return*/];
    });
}); }; };
exports.eatFoodStockItem = function (eatFoodDto) { return function (dispatch, getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        v1_1["default"]({
            dispatch: dispatch,
            getFirebase: getFirebase,
            request: {
                method: 'post',
                url: 'foodstock/items/eat',
                payload: eatFoodDto
            },
            onSuccess: function (response) {
                dispatch({ type: nutritionTypes_1.FETCH_NUTRITION_STATE, payload: response.data });
                var oldFoodStockItem = getState().food.foodStock[eatFoodDto.foodId];
                var newFoodStockItem = __assign(__assign({}, oldFoodStockItem), { quantity: oldFoodStockItem.quantity ? oldFoodStockItem.quantity - eatFoodDto.quantity : oldFoodStockItem.quantity });
                dispatch({ type: foodTypes_1.EDIT_FOODSTOCK, payload: newFoodStockItem });
            }
        });
        return [2 /*return*/];
    });
}); }; };
exports.fetchMeals = function () { return function (dispatch, getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        v1_1["default"]({
            loading: true,
            dispatch: dispatch,
            getFirebase: getFirebase,
            request: {
                method: 'get',
                url: 'foodstock/meals'
            },
            onSuccess: function (response) {
                dispatch({ type: foodTypes_1.FETCH_MEALS, payload: response.data });
            }
        });
        return [2 /*return*/];
    });
}); }; };
exports.addMeal = function (mealDto, callBackOnSuccess) { return function (dispatch, getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        dispatch({ type: feedbackTypes_1.DIALOG_LOADING });
        v1_1["default"]({
            dispatch: dispatch,
            getFirebase: getFirebase,
            request: {
                method: 'post',
                url: 'foodstock/meals',
                payload: mealDto
            },
            onSuccess: function (response) {
                dispatch({ type: foodTypes_1.FETCH_MEALS, payload: response.data });
                callBackOnSuccess();
            },
            onError: function () {
                dispatch({ type: feedbackTypes_1.CLEAR_MESSAGE });
            }
        });
        return [2 /*return*/];
    });
}); }; };
exports.editMeal = function (mealDto, callBackOnSuccess) { return function (dispatch, getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        dispatch({ type: feedbackTypes_1.DIALOG_LOADING });
        v1_1["default"]({
            dispatch: dispatch,
            getFirebase: getFirebase,
            request: {
                method: 'put',
                url: 'foodstock/meals',
                payload: mealDto
            },
            onSuccess: function () {
                dispatch({ type: foodTypes_1.EDIT_MEAL, payload: mealDto });
                callBackOnSuccess();
            },
            onError: function (error) {
                console.log(error);
            }
        });
        return [2 /*return*/];
    });
}); }; };
exports.deleteMeal = function (id, callBack) { return function (dispatch, getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        dispatch({ type: feedbackTypes_1.DIALOG_LOADING });
        v1_1["default"]({
            dispatch: dispatch,
            getFirebase: getFirebase,
            request: {
                method: 'delete',
                url: "foodstock/meals/" + id
            },
            onSuccess: function () {
                dispatch({ type: foodTypes_1.DELETE_MEAL, payload: id });
                callBack();
            }
        });
        return [2 /*return*/];
    });
}); }; };
exports.eatMeal = function (eatFoodDto) { return function (dispatch, getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        v1_1["default"]({
            dispatch: dispatch,
            getFirebase: getFirebase,
            request: {
                method: 'post',
                url: 'foodstock/meals/eat',
                payload: eatFoodDto
            },
            onSuccess: function (response) {
                dispatch({ type: nutritionTypes_1.FETCH_NUTRITION_STATE, payload: response.data });
                var oldMeal = getState().food.meals[eatFoodDto.foodId];
                var newMeal = __assign(__assign({}, oldMeal), { quantityLeft: oldMeal.quantityLeft - eatFoodDto.quantity });
                dispatch({ type: foodTypes_1.EDIT_MEAL, payload: newMeal });
            }
        });
        return [2 /*return*/];
    });
}); }; };
