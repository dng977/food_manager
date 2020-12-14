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
var feedbackTypes_1 = require("./feedbackTypes");
var initState = {
    loading: true,
    message: '',
    numberLoading: 0,
    dialogLoading: false
};
exports["default"] = (function (state, action) {
    if (state === void 0) { state = initState; }
    console.log("DISPATCH: ", action.type);
    var newNumberLoading = 0;
    switch (action.type) {
        case feedbackTypes_1.LOADING:
            return __assign(__assign({}, state), { loading: true });
        case feedbackTypes_1.MESSAGE:
            return __assign(__assign({}, state), { message: action.payload, loading: false });
        case feedbackTypes_1.CLEAR_MESSAGE:
            return __assign(__assign({}, state), { message: '', loading: false });
        case feedbackTypes_1.PUSH_LOADING:
            newNumberLoading = state.numberLoading + 1;
            return __assign(__assign({}, state), { numberLoading: newNumberLoading, loading: true });
        case feedbackTypes_1.POP_LOADING:
            newNumberLoading = state.numberLoading > 0 ? state.numberLoading - 1 : 0;
            return __assign(__assign({}, state), { numberLoading: newNumberLoading, loading: newNumberLoading > 0 });
        case feedbackTypes_1.DIALOG_LOADING:
            return __assign(__assign({}, state), { dialogLoading: true });
        default:
            return __assign(__assign({}, state), { dialogLoading: false, message: '' });
    }
});
