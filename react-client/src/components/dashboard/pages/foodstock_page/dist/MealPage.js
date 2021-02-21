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
var core_1 = require("@material-ui/core");
var react_1 = require("react");
var LabelRounded_1 = require("@material-ui/icons/LabelRounded");
var KeyboardBackspaceRounded_1 = require("@material-ui/icons/KeyboardBackspaceRounded");
var EditRounded_1 = require("@material-ui/icons/EditRounded");
var styles_1 = require("../../../shared/styles");
var foodActions_1 = require("../../../../redux_store/food_store/foodActions");
var feedbackTypes_1 = require("../../../../redux_store/feedback_store/feedbackTypes");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var MealPage_styles_1 = require("./MealPage.styles");
var shared_components_1 = require("../shared_components");
var meals_components_1 = require("./meals_components");
var mapDispatchToProps = function (dispatch) {
    return __assign({ clearMessage: function () { return dispatch({ type: feedbackTypes_1.CLEAR_MESSAGE }); }, dispatch: dispatch }, redux_1.bindActionCreators({ deleteMeal: foodActions_1.deleteMeal, editMeal: foodActions_1.editMeal }, dispatch));
};
var mapStateToProps = function (state) {
    return {
        meals: state.food.meals,
        dialogLoading: state.feedback.dialogLoading,
        loading: state.feedback.loading,
        message: state.feedback.message
    };
};
;
var reduxConnector = react_redux_1.connect(mapStateToProps, mapDispatchToProps);
var MealPage = /** @class */ (function (_super) {
    __extends(MealPage, _super);
    function MealPage(props) {
        var _this = _super.call(this, props) || this;
        _this.getMeal = function () {
            return _this.props.meals[_this.mealId];
        };
        _this.goToMeals = function () {
            _this.props.history.replace(_this.props.match.path.replace('/meal/:id', ''));
        };
        _this.openEditMealDialog = function (open) { _this.setState({ editMealDialogOpened: open }); };
        _this.onDeleteClick = function () {
            _this.setState({ openDeleteDialog: true });
        };
        _this.onDeleteDialogNo = function () {
            _this.setState({ openDeleteDialog: false });
            if (_this.props.message) {
                _this.props.clearMessage();
            }
        };
        _this.onDeleteDialogYes = function () {
            console.log("on delete");
            _this.props.deleteMeal(_this.getMeal().id, _this.goToMeals);
        };
        _this.mealId = props.match.params["id"];
        _this.classes = props.classes;
        _this.getMuiTheme = core_1.createMuiTheme(styles_1.styles);
        _this.state = {
            editMealDialogOpened: false,
            openDeleteDialog: false
        };
        return _this;
    }
    MealPage.prototype.render = function () {
        var _this = this;
        console.log("MEALPAGE RENDER!");
        return (react_1["default"].createElement(core_1.MuiThemeProvider, { theme: this.getMuiTheme },
            react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(core_1.Grid, { container: true, direction: "column", justify: "space-between", spacing: 2 },
                    react_1["default"].createElement(core_1.Grid, { item: true },
                        react_1["default"].createElement(core_1.Button, { onClick: this.goToMeals, variant: "text", color: "primary", startIcon: react_1["default"].createElement(KeyboardBackspaceRounded_1["default"], null) }, "Meals")),
                    react_1["default"].createElement(core_1.Grid, { item: true },
                        react_1["default"].createElement(core_1.Grid, { container: true, spacing: 2, alignItems: "center", justify: "space-between" },
                            react_1["default"].createElement(core_1.Grid, { item: true },
                                react_1["default"].createElement(core_1.Typography, { variant: "h4" }, this.getMeal().name)),
                            react_1["default"].createElement(core_1.Grid, { item: true },
                                react_1["default"].createElement(core_1.Grid, { container: true, spacing: 2, alignItems: "center", justify: "flex-end" },
                                    react_1["default"].createElement(core_1.Grid, { item: true },
                                        react_1["default"].createElement(core_1.Button, { onClick: function () { return _this.openEditMealDialog(true); }, variant: "contained", color: "primary", startIcon: react_1["default"].createElement(EditRounded_1["default"], null) }, "Edit"),
                                        react_1["default"].createElement(meals_components_1.AddEditMealDialog, { openDialog: this.state.editMealDialogOpened, error: this.props.message, onCancel: function () { return _this.openEditMealDialog(false); }, onConfirm: function (mealDto) { return _this.props.editMeal(mealDto, function () { return _this.openEditMealDialog(false); }); }, mealDto: this.getMeal(), title: "Edit Meal" })),
                                    react_1["default"].createElement(core_1.Grid, { item: true },
                                        react_1["default"].createElement(core_1.Button, { onClick: this.onDeleteClick, variant: "contained", color: "secondary", startIcon: react_1["default"].createElement(EditRounded_1["default"], null) }, "Delete"),
                                        react_1["default"].createElement(shared_components_1.DeleteAlertDialog, { dialogTitle: "Are you sure you want to delete this meal?", error: "", loading: this.props.dialogLoading, onDeleteDialogNo: this.onDeleteDialogNo, onDeleteDialogYes: this.onDeleteDialogYes, openDeleteDialog: this.state.openDeleteDialog })))))),
                    react_1["default"].createElement(core_1.Divider, null),
                    react_1["default"].createElement(core_1.Grid, { item: true },
                        react_1["default"].createElement(core_1.Grid, { container: true, spacing: 2, alignItems: "flex-start", justify: "space-between" },
                            react_1["default"].createElement(core_1.Grid, { container: true, item: true, xs: 12, md: 6, justify: "flex-start", spacing: 2 },
                                react_1["default"].createElement(core_1.Grid, { item: true, xs: 12, md: 12 },
                                    react_1["default"].createElement(core_1.Typography, { variant: "body1", align: "center" },
                                        this.getMeal().servings,
                                        " servings"),
                                    react_1["default"].createElement(core_1.Divider, { light: true })),
                                react_1["default"].createElement(core_1.Grid, { item: true, xs: 12, md: 6 },
                                    react_1["default"].createElement(core_1.Typography, { variant: "body1" }, "Igredients"),
                                    react_1["default"].createElement(core_1.List, { className: this.classes.ingredients, dense: true }, this.getMeal().ingredients.map(function (ingredient) {
                                        return (react_1["default"].createElement(core_1.ListItem, { key: "ing-" + ingredient.foodItemDto.id, divider: true, disableGutters: true },
                                            react_1["default"].createElement(core_1.ListItemIcon, null,
                                                react_1["default"].createElement(LabelRounded_1["default"], { fontSize: "small" })),
                                            react_1["default"].createElement(core_1.ListItemText, { primaryTypographyProps: { variant: "body2" }, primary: ingredient.foodItemDto.name + ": " + ingredient.quantity + "g" })));
                                    }))),
                                react_1["default"].createElement(core_1.Divider, { light: true, variant: "middle", orientation: "vertical", flexItem: true }),
                                react_1["default"].createElement(core_1.Grid, { item: true, xs: 12, md: 5 },
                                    react_1["default"].createElement(core_1.Typography, { variant: "body1" }, "Description"),
                                    react_1["default"].createElement(core_1.Typography, { variant: "body2", style: { marginTop: "16px" } }, this.getMeal().description),
                                    react_1["default"].createElement(core_1.Divider, { light: true, variant: "middle", orientation: "vertical", flexItem: true }))),
                            react_1["default"].createElement(core_1.Grid, { item: true, xs: 12, md: 6 },
                                react_1["default"].createElement("img", { src: "/res/banitsa.jpg", width: "85%", style: { margin: "auto", display: "block", borderRadius: "5%" } }))))))));
    };
    return MealPage;
}(react_1["default"].Component));
exports["default"] = redux_1.compose(react_router_dom_1.withRouter, reduxConnector, core_1.withStyles(MealPage_styles_1["default"]))(MealPage);
