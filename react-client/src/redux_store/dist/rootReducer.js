"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var authReducer_1 = require("./auth_store/authReducer");
var redux_firestore_1 = require("redux-firestore");
var redux_form_1 = require("redux-form");
var react_redux_firebase_1 = require("react-redux-firebase");
var receiptsReducer_1 = require("./receipt_store/receiptsReducer");
var foodReducer_1 = require("./food_store/foodReducer");
var feedbackReducer_1 = require("./feedback_store/feedbackReducer");
var nutritionReducer_1 = require("./nutrition_store/nutritionReducer");
var authTypes_1 = require("./auth_store/authTypes");
var appReducer = redux_1.combineReducers({
    auth: authReducer_1["default"],
    firestore: redux_firestore_1.firestoreReducer,
    firebase: react_redux_firebase_1.firebaseReducer,
    form: redux_form_1.reducer,
    receipts: receiptsReducer_1["default"],
    food: foodReducer_1["default"],
    feedback: feedbackReducer_1["default"],
    nutrition: nutritionReducer_1["default"]
});
var rootReducer = function (state, action) {
    if (action.type === authTypes_1.SIGNOUT_SUCCESS) {
        state = {};
    }
    return appReducer(state, action);
};
exports["default"] = rootReducer;
// the key name will be the data property on the state objectimport { combineReducers } from 'redux';
