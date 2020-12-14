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
exports.sendUserData = exports.fetchNutritionRda = exports.fetchNutritionState = exports.fetchActivityFactors = void 0;
var nutritionTypes_1 = require("./nutritionTypes");
var v1_1 = require("../../apis/v1");
var authActions_1 = require("../auth_store/authActions");
var redux_form_1 = require("redux-form");
var feedbackTypes_1 = require("../feedback_store/feedbackTypes");
exports.fetchActivityFactors = function () { return function (dispatch, getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        v1_1["default"]({
            dispatch: dispatch,
            getFirebase: getFirebase,
            request: {
                method: 'get',
                url: 'nutrition/activity'
            },
            onSuccess: function (response) { return dispatch({ type: nutritionTypes_1.FETCH_ACTIVITY_FACTORS, payload: response.data }); }
        });
        return [2 /*return*/];
    });
}); }; };
exports.fetchNutritionState = function () { return function (dispatch, getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        v1_1["default"]({
            loading: true,
            dispatch: dispatch,
            getFirebase: getFirebase,
            request: {
                method: 'get',
                url: 'nutrition/state'
            },
            onSuccess: function (response) { return dispatch({ type: nutritionTypes_1.FETCH_NUTRITION_STATE, payload: response.data }); }
        });
        return [2 /*return*/];
    });
}); }; };
exports.fetchNutritionRda = function () { return function (dispatch, getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        v1_1["default"]({
            loading: true,
            dispatch: dispatch,
            getFirebase: getFirebase,
            request: {
                method: 'get',
                url: 'nutrition/rda'
            },
            onSuccess: function (response) {
                dispatch({ type: nutritionTypes_1.FETCH_NUTRITION_RDA, payload: response.data });
            }
        });
        return [2 /*return*/];
    });
}); }; };
function getId(x) {
    if (x !== null)
        console.log(x.length);
}
exports.sendUserData = function (formProps) { return function (dispatch, getState, getFirebase) { return __awaiter(void 0, void 0, void 0, function () {
    var userDto;
    return __generator(this, function (_a) {
        dispatch({ type: feedbackTypes_1.LOADING });
        userDto = __assign(__assign({}, formProps), { male: formProps.male === "male" ? true : false, activityFactor: formProps.activityFactor.split(':')[0] });
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var _a;
                var firebase = getFirebase();
                if (firebase.auth().currentUser) {
                    (_a = firebase.auth().currentUser) === null || _a === void 0 ? void 0 : _a.getIdToken(true).then(function (idToken) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, authActions_1.sendUserDataToServer(idToken, userDto).then(function () {
                                    dispatch({ type: nutritionTypes_1.UPDATE_USER_STATE });
                                    // dispatch({type: POP_LOADING});
                                })];
                        });
                    }); })["catch"](function (error) {
                        console.log(error.message);
                        reject(new redux_form_1.SubmissionError({ _error: error.message }));
                        dispatch({ type: feedbackTypes_1.POP_LOADING });
                    });
                }
                else {
                    reject(new redux_form_1.SubmissionError({ _error: "FIREBASE ERROR - currentUser is null" }));
                }
            })];
    });
}); }; };
