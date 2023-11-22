"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var react_1 = require("react");
var material_1 = require("@mui/material");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var FoodCard_1 = require("../../../shared/FoodCard");
var feedbackTypes_1 = require("../../../../redux_store/feedback_store/feedbackTypes");
var foodActions_1 = require("../../../../redux_store/food_store/foodActions");
var mapDispatchToProps = function (dispatch) {
    return __assign({ clearMessage: function () { return dispatch({ type: feedbackTypes_1.CLEAR_MESSAGE }); }, dispatch: dispatch }, redux_1.bindActionCreators({ eatMeal: foodActions_1.eatMeal, editMeal: foodActions_1.editMeal }, dispatch));
};
var mapStateToProps = function (state) {
    return {
        foodHistory: state.food.foodHistory
    };
};
var reduxConnector = react_redux_1.connect(mapStateToProps, mapDispatchToProps);
var Diary = /** @class */ (function (_super) {
    __extends(Diary, _super);
    function Diary() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Diary.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(material_1.Grid, { container: true, spacing: 3 }, Object.values(this.props.foodHistory).map(function (food, ind) {
                return (react_1["default"].createElement(material_1.Grid, { item: true, key: "meal" + ind },
                    react_1["default"].createElement(FoodCard_1["default"], { name: food.name, imageBytes: food.imageBytes, foodHistory: food, history: _this.props.history, locationPath: _this.props.location.pathname })));
            }))));
    };
    return Diary;
}(react_1["default"].Component));
exports["default"] = redux_1.compose(react_router_dom_1.withRouter, reduxConnector)(Diary);
