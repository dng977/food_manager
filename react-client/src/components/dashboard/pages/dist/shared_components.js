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
exports.FoodLookUp = exports.DeleteAlertDialog = exports.EmptyTable = void 0;
var core_1 = require("@material-ui/core");
var prop_types_1 = require("prop-types");
var core_2 = require("@material-ui/core");
var react_1 = require("react");
var CloseRounded_1 = require("@material-ui/icons/CloseRounded");
var CheckRounded_1 = require("@material-ui/icons/CheckRounded");
var Autocomplete_1 = require("@material-ui/lab/Autocomplete");
var react_redux_1 = require("react-redux");
var foodActions_1 = require("../../../redux_store/food_store/foodActions");
exports.EmptyTable = function (props) {
    return (react_1["default"].createElement(core_1.TableBody, null,
        react_1["default"].createElement(core_1.TableRow, null,
            react_1["default"].createElement(core_1.TableCell, { colSpan: 3, align: "center" },
                react_1["default"].createElement("div", { className: "MuiTypography-body1" }, props.text)))));
};
exports.DeleteAlertDialog = function (_a) {
    var dialogTitle = _a.dialogTitle, onDeleteDialogNo = _a.onDeleteDialogNo, onDeleteDialogYes = _a.onDeleteDialogYes, openDeleteDialog = _a.openDeleteDialog, error = _a.error;
    var loading = react_redux_1.useSelector(function (state) { return state.feedback.dialogLoading; });
    console.log("render Dialog: ", openDeleteDialog);
    return (react_1["default"].createElement(core_1.Dialog, { open: openDeleteDialog, onClose: onDeleteDialogNo, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" }, loading ?
        react_1["default"].createElement(core_1.DialogTitle, null, "Deleting...") :
        error ?
            react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(core_1.DialogTitle, null, "" + error),
                react_1["default"].createElement(core_1.DialogActions, null,
                    react_1["default"].createElement(core_1.Button, { variant: "outlined", onClick: onDeleteDialogNo, color: "primary" }, "Close")))
            : openDeleteDialog ?
                react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(core_1.DialogTitle, { id: "alert-dialog-title" }, dialogTitle),
                    react_1["default"].createElement(core_1.DialogActions, null,
                        react_1["default"].createElement(core_1.Button, { variant: "outlined", onClick: onDeleteDialogNo, color: "primary" }, "No"),
                        react_1["default"].createElement(core_1.Button, { variant: "contained", onClick: onDeleteDialogYes, color: "secondary", autoFocus: true }, "Yes"))) : react_1["default"].createElement(react_1["default"].Fragment, null)));
};
exports.DeleteAlertDialog.propTypes = {
    dialogTitle: prop_types_1["default"].string,
    onDeleteDialogNo: prop_types_1["default"].func,
    onDeleteDialogYes: prop_types_1["default"].func,
    openDeleteDialog: prop_types_1["default"].bool,
    loading: prop_types_1["default"].bool,
    error: prop_types_1["default"].string
};
var mapStateToProps = function (state) {
    return {
        foodItems: state.food.searchedItems,
        loading: state.food.food_loading
    };
};
var reduxConnector = react_redux_1.connect(mapStateToProps, { fetchFoodItems: foodActions_1.fetchFoodItems });
exports.FoodLookUp = reduxConnector(function (props) {
    //Default props
    props = __assign({ label: "Search", editMode: false, hasConfirmButton: true, width: 180, required: true }, props);
    // console.log("lookupfield", props)
    var _a = react_1.useState(props.initSelectedValue ? props.initSelectedValue : null), selectedValue = _a[0], setSelectedValue = _a[1];
    var _b = react_1.useState(''), input = _b[0], setInput = _b[1];
    var _c = react_1.useState(input), debouncedInput = _c[0], setDebouncedInput = _c[1];
    var foodItems = props.rowIndex in props.foodItems ? props.foodItems[props.rowIndex] : [];
    react_1.useEffect(function () {
        var timerId = setTimeout(function () {
            setDebouncedInput(input);
        }, 1000);
        return function () {
            clearTimeout(timerId);
        };
    }, [input]);
    react_1.useEffect(function () {
        // if(props.initSelectedValue){
        //   console.log("SET INIT VALUE", props.initSelectedValue)
        //   setSelectedValue(props.initSelectedValue);
        // }
        if (debouncedInput.length && (!foodItems.length || !foodItems.some(function (item) { return item.name === debouncedInput; }))) {
            props.fetchFoodItems(debouncedInput, props.rowIndex);
        }
    }, [debouncedInput]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(core_1.Grid, { item: true, xs: 12 },
            react_1["default"].createElement(Autocomplete_1["default"], { value: props.initSelectedValue, loading: props.loading, fullWidth: true, style: { width: props.width }, onChange: function (event, newValue) {
                    setSelectedValue(newValue);
                    if (props.onChange)
                        props.onChange(newValue);
                }, onInputChange: function (event, newValue) {
                    setInput(newValue);
                }, options: foodItems, getOptionSelected: function (option, value) { return option.name === value.name; }, getOptionLabel: function (option) { return option.name; }, renderInput: function (params) { return (react_1["default"].createElement(core_2.TextField, __assign({ variant: "outlined" }, params, { label: props.label, size: "small", required: props.required }))); } })),
        props.editMode ?
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(core_2.IconButton, { onClick: function () { return props.closeEditMode(); }, size: 'small' },
                    react_1["default"].createElement(core_2.Tooltip, { title: "Cancel" },
                        react_1["default"].createElement(CloseRounded_1["default"], { color: "primary", fontSize: "small" }))))
            :
                null,
        props.hasConfirmButton && selectedValue ?
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(core_2.IconButton, { onClick: function () {
                        if (props.editMode)
                            props.closeEditMode();
                        props.onConfirm(selectedValue);
                    }, size: 'small' },
                    react_1["default"].createElement(core_2.Tooltip, { title: "Confirm" },
                        react_1["default"].createElement(CheckRounded_1["default"], { color: "primary", fontSize: "small" }))))
            :
                null));
});
