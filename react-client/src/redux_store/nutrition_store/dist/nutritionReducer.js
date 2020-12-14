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
var nutritionTypes_1 = require("./nutritionTypes");
var initState = {
    userDetails: false,
    nutritionRDA: {},
    nutritionState: {},
    activityFactors: []
};
exports["default"] = (function (state, action) {
    if (state === void 0) { state = initState; }
    console.log("DISPATCH: ", action.type);
    switch (action.type) {
        case nutritionTypes_1.FETCH_ACTIVITY_FACTORS:
            return __assign(__assign({}, state), { activityFactors: action.payload });
        case nutritionTypes_1.FETCH_NUTRITION_STATE:
            return __assign(__assign({}, state), { nutritionState: action.payload });
        case nutritionTypes_1.FETCH_NUTRITION_RDA:
            return __assign(__assign({}, state), { nutritionRDA: action.payload, userDetails: action.payload.userDetails });
        case nutritionTypes_1.UPDATE_USER_STATE:
            return __assign(__assign({}, state), { userDetails: true });
        default:
            return state;
    }
});
