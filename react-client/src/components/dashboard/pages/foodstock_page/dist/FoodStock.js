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
var core_1 = require("@material-ui/core");
var AddRounded_1 = require("@material-ui/icons/AddRounded");
var styles_1 = require("@material-ui/core/styles");
var styles_2 = require("../../../shared/styles");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var foodActions_1 = require("../../../../redux_store/food_store/foodActions");
var DeleteRounded_1 = require("@material-ui/icons/DeleteRounded");
var redux_1 = require("redux");
var feedbackTypes_1 = require("../../../../redux_store/feedback_store/feedbackTypes");
var selectors_1 = require("../selectors");
var shared_components_1 = require("../shared_components");
var components_1 = require("./components");
var meals_components_1 = require("./meals_components");
var mapDispatchToProps = function (dispatch) {
    return __assign({ clearMessage: function () { return dispatch({ type: feedbackTypes_1.CLEAR_MESSAGE }); }, dispatch: dispatch }, redux_1.bindActionCreators({ editFoodStockItem: foodActions_1.editFoodStockItem, deleteFoodStockItems: foodActions_1.deleteFoodStockItems, addFoodItem: foodActions_1.addFoodStockItem, eatFoodStockItem: foodActions_1.eatFoodStockItem, deleteMeal: foodActions_1.deleteMeal, fetchMeals: foodActions_1.fetchMeals, eatMeal: foodActions_1.eatMeal, editMeal: foodActions_1.editMeal, addMeal: foodActions_1.addMeal }, dispatch));
};
var mapStateToProps = function (state) {
    var _a = selectors_1.getFoodStock(state), foodStockItems = _a[0], indexToKeyFS = _a[1];
    var _b = selectors_1.getMeals(state), meals = _b[0], indexToKeyMeals = _b[1];
    // console.log("Meals", ['asd'].concat(meals))
    // console.log(state.receipts.currentReceipt.receiptItems)
    return {
        loading: state.feedback.loading,
        message: state.feedback.message,
        foodStockItems: foodStockItems,
        indexToKeyFS: indexToKeyFS,
        indexToKeyMeals: indexToKeyMeals,
        meals: meals
    };
};
var reduxConnector = react_redux_1.connect(mapStateToProps, mapDispatchToProps);
var FoodStock = /** @class */ (function (_super) {
    __extends(FoodStock, _super);
    function FoodStock(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChangeTable = function (event, newValue) {
            _this.setState({ tableNumber: newValue });
        };
        _this.closeAddFoodDialog = function () { _this.setState({ openAddFoodDialog: false }); };
        _this.closeAddMealDialog = function () { _this.setState({ openAddMealDialog: false }); };
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
            _this.props.deleteFoodStockItems(_this.state.rowsSelected.map(function (row) { return _this.props.indexToKeyFS[row]; }));
            _this.setState({ openDeleteDialog: false, rowsSelected: [] });
        };
        _this.state = {
            openDeleteDialog: false,
            openAddFoodDialog: false,
            openAddMealDialog: false,
            rowsSelected: [],
            tableNumber: 1
        };
        // this.path = this.props.match.path;
        // this.params = this.props.match.params;
        // this.history = this.props.history
        _this.getMuiTheme = styles_1.createMuiTheme(styles_2.styles);
        _this.onDeleteDialogNo = _this.onDeleteDialogNo.bind(_this);
        _this.onDeleteDialogYes = _this.onDeleteDialogYes.bind(_this);
        _this.handleChangeTable = _this.handleChangeTable.bind(_this);
        _this.paperElevation = 4;
        return _this;
    }
    FoodStock.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        //Don't rerender when new items are selected
        var newLength = nextState.rowsSelected.length;
        var oldLength = this.state.rowsSelected.length;
        console.log(newLength, oldLength);
        if ((newLength - oldLength == 1 && newLength > 1) || (newLength - oldLength == -1 && newLength > 0))
            return false;
        return true;
    };
    FoodStock.prototype.render = function () {
        var _this = this;
        console.log("Rendering FOOD STOCK...");
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(styles_1.MuiThemeProvider, { theme: this.getMuiTheme },
                react_1["default"].createElement(core_1.Grid, { container: true, direction: "column", justify: "space-between", spacing: 2 },
                    react_1["default"].createElement(core_1.Grid, { item: true },
                        react_1["default"].createElement(core_1.Grid, { container: true, spacing: 2, alignItems: "center", justify: "space-between" },
                            react_1["default"].createElement(core_1.Grid, { item: true },
                                react_1["default"].createElement(core_1.Grid, { container: true, spacing: 2, alignItems: "center", justify: "flex-start" },
                                    react_1["default"].createElement(core_1.Grid, { item: true }, this.state.tableNumber === 0 ?
                                        react_1["default"].createElement(react_1["default"].Fragment, null,
                                            react_1["default"].createElement(core_1.Button, { variant: "contained", color: "primary", startIcon: react_1["default"].createElement(AddRounded_1["default"], null), onClick: function () { _this.setState({ openAddFoodDialog: true }); } }, "Add"),
                                            react_1["default"].createElement(components_1.AddNewFoodDialog, { openDialog: this.state.openAddFoodDialog, dialogTitle: "Add a new food", error: this.props.message, onCancel: this.closeAddFoodDialog, onConfirm: function (foodItemId, quantity) { return _this.props.addFoodItem(foodItemId, quantity, _this.closeAddFoodDialog); } }))
                                        :
                                            react_1["default"].createElement(react_1["default"].Fragment, null,
                                                react_1["default"].createElement(core_1.Button, { variant: "contained", color: "primary", startIcon: react_1["default"].createElement(AddRounded_1["default"], null), onClick: function () { _this.setState({ openAddMealDialog: true }); } }, "Add a new Meal"),
                                                react_1["default"].createElement(meals_components_1.AddMealDialog, { openDialog: this.state.openAddMealDialog, error: this.props.message, onCancel: this.closeAddMealDialog, onConfirm: function (mealDto) { return _this.props.addMeal(mealDto, _this.closeAddMealDialog); } }))))),
                            this.state.tableNumber === 0 ?
                                react_1["default"].createElement(core_1.Grid, { item: true },
                                    react_1["default"].createElement(core_1.Grid, { container: true, spacing: 2, alignItems: "center", justify: "flex-end" },
                                        react_1["default"].createElement(core_1.Grid, { item: true },
                                            react_1["default"].createElement(core_1.Button, { variant: "contained", color: "secondary", disabled: this.state.rowsSelected.length == 0, startIcon: react_1["default"].createElement(DeleteRounded_1["default"], null), onClick: this.onDeleteClick }, "Delete selected items"),
                                            react_1["default"].createElement(shared_components_1.DeleteAlertDialog, { dialogTitle: "Are you sure you want to delete these items?", error: this.props.message, onDeleteDialogNo: this.onDeleteDialogNo, onDeleteDialogYes: this.onDeleteDialogYes, openDeleteDialog: this.state.openDeleteDialog }))))
                                :
                                    null)),
                    react_1["default"].createElement(core_1.Grid, { item: true },
                        react_1["default"].createElement(core_1.Paper, { square: true, elevation: this.paperElevation },
                            react_1["default"].createElement(core_1.Tabs, { value: this.state.tableNumber, indicatorColor: "primary", textColor: "primary", onChange: this.handleChangeTable, "aria-label": "disabled tabs example", variant: "fullWidth" },
                                react_1["default"].createElement(core_1.Tab, { label: "Whole Foods" }),
                                react_1["default"].createElement(core_1.Tab, { label: "Meals" })))),
                    this.state.tableNumber === 0 ?
                        react_1["default"].createElement(core_1.Grid, { item: true },
                            react_1["default"].createElement(components_1.FoodTable, { loading: this.props.loading, paperElevation: this.paperElevation, eatFoodStockItem: this.props.eatFoodStockItem, editFoodStockItem: this.props.editFoodStockItem, foodStockItems: this.props.foodStockItems, indexToKey: this.props.indexToKeyFS, setRowsSelected: function (rowsSelected) { _this.setState({ rowsSelected: rowsSelected }); } }))
                        :
                            react_1["default"].createElement(core_1.Grid, { item: true },
                                react_1["default"].createElement(meals_components_1.MealsTable, { history: this.props.history, locationPath: this.props.location.pathname, loading: this.props.loading, paperElevation: this.paperElevation, eatMeal: this.props.eatMeal, editMeal: function (mealDto) { return _this.props.editMeal(mealDto, function () { }); }, meals: this.props.meals, indexToKey: this.props.indexToKeyMeals, setRowsSelected: function (rowsSelected) { _this.setState({ rowsSelected: rowsSelected }); } }))))));
    };
    return FoodStock;
}(react_1["default"].Component));
exports["default"] = redux_1.compose(react_router_dom_1.withRouter, reduxConnector)(FoodStock);
