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
exports.FoodPortionControl = exports.QuantityCell = exports.EatCell = exports.FoodTable = exports.AddNewFoodDialog = exports.dialogTheme = void 0;
var core_1 = require("@material-ui/core");
var react_1 = require("react");
var RemoveRounded_1 = require("@material-ui/icons/RemoveRounded");
var AddRounded_1 = require("@material-ui/icons/AddRounded");
var EditRounded_1 = require("@material-ui/icons/EditRounded");
var CloseRounded_1 = require("@material-ui/icons/CloseRounded");
var CheckRounded_1 = require("@material-ui/icons/CheckRounded");
var DeleteOutlineRounded_1 = require("@material-ui/icons/DeleteOutlineRounded");
var react_redux_1 = require("react-redux");
var fractional_1 = require("fractional");
var prop_types_1 = require("prop-types");
var shared_components_1 = require("../shared_components");
var mui_datatables_1 = require("mui-datatables");
var InfoRounded_1 = require("@material-ui/icons/InfoRounded");
exports.dialogTheme = core_1.createMuiTheme({
    overrides: {
        MuiDialogTitle: {
            root: {
                textAlign: 'center'
            }
        },
        MuiDialogActions: {
            root: {
                justifyContent: 'space-between'
            },
            spacing: {}
        }
    }
});
exports.AddNewFoodDialog = function (_a) {
    var dialogTitle = _a.dialogTitle, onCancel = _a.onCancel, onConfirm = _a.onConfirm, error = _a.error, openDialog = _a.openDialog;
    console.log("render add dialog: ", openDialog);
    var loading = react_redux_1.useSelector(function (state) { return state.feedback.dialogLoading; });
    var _b = react_1.useState(null), selectedFood = _b[0], setSelectedFood = _b[1];
    var _c = react_1["default"].useState(0), servingInGrams = _c[0], setServingInGrams = _c[1];
    var _d = react_1.useState(true), emptyInput = _d[0], setEmptyInput = _d[1];
    react_1.useEffect(function () {
        if (selectedFood) {
            setServingInGrams(selectedFood.servingSize);
            setEmptyInput(false);
        }
        else {
            setEmptyInput(true);
        }
    }, [selectedFood]);
    var onPortionChange = function (servingInGrams) {
        setServingInGrams(servingInGrams);
    };
    return (react_1["default"].createElement(core_1.ThemeProvider, { theme: exports.dialogTheme },
        react_1["default"].createElement(core_1.Dialog, { open: openDialog, onClose: onCancel, fullWidth: true, maxWidth: "xs", "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" }, loading ?
            react_1["default"].createElement(core_1.DialogTitle, null, "Adding...") :
            error ?
                react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(core_1.DialogTitle, null, "" + error),
                    react_1["default"].createElement(core_1.DialogActions, null,
                        react_1["default"].createElement(core_1.Button, { variant: "outlined", onClick: onCancel, color: "primary" }, "Close")))
                : openDialog ?
                    react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement(core_1.DialogTitle, { id: "alert-dialog-title" }, dialogTitle),
                        react_1["default"].createElement(core_1.DialogContent, { dividers: true },
                            react_1["default"].createElement(core_1.Grid, { container: true, direction: "column", alignItems: "center", justify: "center", spacing: 3 },
                                react_1["default"].createElement(shared_components_1.FoodLookUp, { width: 250, rowIndex: 0, hasConfirmButton: false, onChange: function (selectedFood) { return setSelectedFood(selectedFood); } }),
                                selectedFood ?
                                    react_1["default"].createElement(core_1.Grid, { item: true },
                                        react_1["default"].createElement(exports.FoodPortionControl, { servingDesc: selectedFood.servingDesc, baseServing: selectedFood.servingSize, onPortionChange: onPortionChange, quantity: servingInGrams, maxQuantity: null }))
                                    :
                                        null)),
                        react_1["default"].createElement(core_1.DialogActions, null,
                            react_1["default"].createElement(core_1.Button, { fullWidth: true, variant: "outlined", onClick: onCancel, color: "primary" }, "Cancel"),
                            react_1["default"].createElement(core_1.Button, { fullWidth: true, disabled: emptyInput, variant: "contained", onClick: function () { onConfirm(selectedFood.id, servingInGrams); setSelectedFood(null); }, color: "primary", autoFocus: true }, "Add"))) : react_1["default"].createElement(react_1["default"].Fragment, null))));
};
exports.AddNewFoodDialog.propTypes = {
    dialogTitle: prop_types_1["default"].string.isRequired,
    onCancel: prop_types_1["default"].func.isRequired,
    onConfirm: prop_types_1["default"].func.isRequired,
    openDialog: prop_types_1["default"].bool.isRequired,
    error: prop_types_1["default"].string.isRequired
};
var FoodTable = /** @class */ (function (_super) {
    __extends(FoodTable, _super);
    function FoodTable(props) {
        var _this = _super.call(this, props) || this;
        _this.options = {
            rowHover: true,
            elevation: _this.props.paperElevation,
            rowsPerPage: 5,
            rowsPerPageOptions: [],
            filterType: "dropdown",
            responsive: "standard",
            // tableBodyHeight: "600px",
            tableBodyMaxHeight: "800px",
            selectableRows: "multiple",
            selectableRowsHeader: true,
            selectToolbarPlacement: 'none',
            customToolbar: null,
            download: false,
            search: false,
            print: false,
            viewColumns: false,
            filter: false,
            sort: false,
            rowsSelected: [],
            onRowSelectionChange: function (_currentRowsSelected, _allRowsSelected, rowsSelected) {
                console.log(rowsSelected);
                _this.props.setRowsSelected(rowsSelected);
                //setRowsSelected(rowsSelected)
            },
            expandableRowsOnClick: true,
            onRowClick: function (_rowData, _a) {
                // history.push(`${url}/${dataIndex}`);
            }
        };
        _this.columns = [
            {
                name: 'Food Name'
            },
            {
                name: '',
                options: {
                    customBodyRender: function (value, _tableMeta) {
                        return react_1["default"].createElement(exports.EatCell, { value: value, onEat: function (eatFoodStockDto) { return _this.props.eatFoodStockItem(eatFoodStockDto); } });
                    }
                }
            },
            {
                name: 'Quantity',
                options: {
                    customBodyRender: function (value) {
                        return react_1["default"].createElement(exports.QuantityCell, { foodItem: { quantity: value.quantity, servingDesc: value.foodItemDto.servingDesc, servingSize: value.foodItemDto.servingSize }, submitEdit: function (newQuantity) {
                                var newFoodStockDto = __assign(__assign({}, value), { quantity: newQuantity });
                                _this.props.editFoodStockItem(newFoodStockDto);
                            } });
                    },
                    sortCompare: function (order) {
                        return function (obj1, obj2) {
                            console.log(order);
                            var val1 = obj1.data.quantity;
                            var val2 = obj2.data.quantity;
                            return (val1 - val2) * (order === 'asc' ? 1 : -1);
                        };
                    }
                }
            },
            {
                name: 'Expiry Date',
                options: {
                    customBodyRender: function (_value) {
                        return react_1["default"].createElement(core_1.Typography, { variant: "caption" }, "-");
                    }
                }
            },
            {
                name: 'Info',
                options: {
                    customBodyRender: function (_value) {
                        return react_1["default"].createElement(InfoRounded_1["default"], { color: "action" });
                    }
                }
            }
        ];
        return _this;
    }
    FoodTable.prototype.render = function () {
        return (react_1["default"].createElement(mui_datatables_1["default"], { text: "Loading", data: this.props.foodStockItems, columns: this.columns, options: this.options, components: this.props.loading ? {
                TableBody: function (props) { return react_1["default"].createElement(shared_components_1.EmptyTable, __assign({}, props, { text: "Loading..." })); }
            } : {} }));
    };
    return FoodTable;
}(react_1["default"].Component));
exports.FoodTable = FoodTable;
exports.EatCell = function (_a) {
    var value = _a.value, onEat = _a.onEat;
    var cQstatement = value.quantity <= value.foodItemDto.servingSize ? value.quantity : value.foodItemDto.servingSize;
    var _b = react_1["default"].useState(cQstatement), currentQuantity = _b[0], setCurrentQuantity = _b[1];
    var _c = react_1["default"].useState(value.hasRaw ? "raw" : "cooked"), condition = _c[0], setCondition = _c[1];
    //eval(servingUnits)
    var onPortionChange = function (currentQuantity) {
        setCurrentQuantity(currentQuantity);
    };
    react_1.useEffect(function () {
        setCurrentQuantity(cQstatement);
        setCondition(value.hasRaw ? "raw" : "cooked");
    }, [value]);
    var handleOnEatClick = function () {
        var eatFoodStockDto = {
            foodId: value.foodItemDto.id,
            quantity: currentQuantity,
            cooked: condition === "cooked"
        };
        onEat(eatFoodStockDto);
    };
    return (value.quantity !== 0 ?
        react_1["default"].createElement(core_1.Grid, { container: true, wrap: "nowrap", alignItems: "center", justify: "flex-start", spacing: 2 },
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(exports.FoodPortionControl, { maxQuantity: value.quantity, servingDesc: value.foodItemDto.servingDesc, baseServing: value.foodItemDto.servingSize, quantity: currentQuantity, onPortionChange: onPortionChange })),
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(core_1.RadioGroup, { "aria-label": "gender", name: "condition", value: condition, onChange: function (event) { setCondition(event.target.value); } },
                    react_1["default"].createElement(core_1.FormControlLabel, { value: "raw", disabled: !value.hasRaw, control: react_1["default"].createElement(core_1.Radio, { size: "small", color: "primary" }), label: "Raw" }),
                    react_1["default"].createElement(core_1.FormControlLabel, { value: "cooked", disabled: !value.hasCooked, control: react_1["default"].createElement(core_1.Radio, { size: "small", color: "primary" }), label: "Cooked" }))),
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(core_1.Button, { variant: "contained", color: "primary", onClick: handleOnEatClick }, "Eat")))
        :
            react_1["default"].createElement(core_1.Grid, { container: true, wrap: "nowrap", alignItems: "center", justify: "center", spacing: 2 },
                react_1["default"].createElement(core_1.Grid, { item: true },
                    react_1["default"].createElement(core_1.Tooltip, { title: "No more quantiy left of this item." },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement(core_1.Button, { variant: "contained", disabled: true, color: "primary" }, "Eat"))))));
};
// export const QuantityCell = React.memo(({ submitEdit, value, hasEditMode }) => {
exports.QuantityCell = function (_a) {
    //console.log("before", currentQuantity);
    var submitEdit = _a.submitEdit, foodItem = _a.foodItem, _b = _a.hasEditMode, hasEditMode = _b === void 0 ? true : _b, emptyContents = _a.emptyContents;
    var _c = react_1.useState({ grams: foodItem.quantity, units: new fractional_1.Fraction(foodItem.quantity, foodItem.servingSize) }), currentQuantity = _c[0], setCurrentQuantity = _c[1];
    var _d = react_1.useState(false), editMode = _d[0], setEditMode = _d[1];
    var _e = react_1.useState(currentQuantity.grams === null || currentQuantity.grams === 0 ? foodItem.servingSize : currentQuantity.grams), quantityInGrams = _e[0], setQuantityInGrams = _e[1];
    react_1.useEffect(function () {
        if (foodItem.quantity !== currentQuantity.grams) {
            var grams = foodItem.quantity;
            var units = new fractional_1.Fraction(foodItem.quantity, foodItem.servingSize);
            setCurrentQuantity({ grams: grams, units: units });
            setQuantityInGrams(grams === null || grams === 0 ? foodItem.servingSize : grams);
        }
    }, [foodItem]);
    var onPortionChange = function (servingInGrams) {
        setQuantityInGrams(servingInGrams);
    };
    var handleSubmit = function (_event) {
        setEditMode(false);
        setCurrentQuantity({ units: getServingInUnits(quantityInGrams, foodItem.servingSize), grams: quantityInGrams });
        submitEdit(quantityInGrams);
    };
    var handleCancel = function (_event) {
        setEditMode(false);
    };
    return (editMode ?
        react_1["default"].createElement(core_1.Grid, { container: true, direction: "column", alignItems: "center", justify: "center", spacing: 0 },
            react_1["default"].createElement(core_1.Grid, { item: true, xs: true },
                react_1["default"].createElement(exports.FoodPortionControl, { maxQuantity: null, servingDesc: foodItem.servingDesc, baseServing: foodItem.servingSize ? foodItem.servingSize : quantityInGrams, quantity: quantityInGrams, onPortionChange: onPortionChange })),
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(core_1.IconButton, { size: "small", onClick: handleSubmit },
                    react_1["default"].createElement(CheckRounded_1["default"], null)),
                react_1["default"].createElement(core_1.IconButton, { size: "small", onClick: handleCancel },
                    react_1["default"].createElement(CloseRounded_1["default"], null))))
        :
            react_1["default"].createElement(core_1.Grid, { container: true, direction: "column", alignItems: "center", justify: "center", spacing: 0 },
                react_1["default"].createElement(core_1.Grid, { item: true, container: true, wrap: "nowrap", alignItems: "center", justify: "center", spacing: 1 },
                    react_1["default"].createElement(core_1.Grid, { item: true }, currentQuantity.grams === null ?
                        react_1["default"].createElement(core_1.Tooltip, { title: "Not specified" },
                            react_1["default"].createElement("div", null, "-")) :
                        react_1["default"].createElement(core_1.Typography, { noWrap: true }, currentQuantity.units + " (" + currentQuantity.grams + " g)")),
                    hasEditMode ?
                        react_1["default"].createElement(core_1.Grid, { item: true },
                            react_1["default"].createElement(core_1.IconButton, { onClick: function () { setEditMode(true); }, size: 'small' },
                                react_1["default"].createElement(core_1.Tooltip, { title: "Edit" },
                                    react_1["default"].createElement(EditRounded_1["default"], { color: "primary", fontSize: "small" }))))
                        :
                            currentQuantity.grams !== 0 ?
                                react_1["default"].createElement(core_1.Grid, { item: true },
                                    react_1["default"].createElement(core_1.Tooltip, { title: "Empty" },
                                        react_1["default"].createElement(core_1.IconButton, { onClick: emptyContents, color: "primary" },
                                            react_1["default"].createElement(DeleteOutlineRounded_1["default"], null))))
                                :
                                    null),
                foodItem.servingDesc ?
                    react_1["default"].createElement(core_1.Grid, { item: true },
                        react_1["default"].createElement(core_1.Typography, { variant: "caption" }, "/" + foodItem.servingDesc.toLowerCase() + "/"))
                    :
                        null));
};
var getServingInUnits = function (quantity, baseServing) {
    if (baseServing === 0)
        return new fractional_1.Fraction(0, 1);
    return new fractional_1.Fraction(quantity, baseServing);
};
exports.FoodPortionControl = function (_a) {
    var servingDesc = _a.servingDesc, baseServing = _a.baseServing, quantity = _a.quantity, onPortionChange = _a.onPortionChange, maxQuantity = _a.maxQuantity;
    console.log(quantity, maxQuantity);
    var _b = react_1.useState(false), minusDisabled = _b[0], setMinusDisabled = _b[1];
    var plusDisabledStmt = maxQuantity && quantity === maxQuantity ? true : false;
    var _c = react_1.useState(plusDisabledStmt), plusDisabled = _c[0], setPlusDisabled = _c[1];
    react_1.useEffect(function () {
        setPlusDisabled(plusDisabledStmt);
    }, [maxQuantity, quantity]);
    var changeServing = function (plus) {
        if (plus) {
            //Enable minus 
            if (quantity < 1) {
                setMinusDisabled(false);
            }
            var newQuantity = void 0;
            //If quantity < 1 unit(base serving)
            if (quantity < baseServing) {
                newQuantity = quantity * 2;
            }
            else {
                newQuantity = quantity + baseServing;
            }
            //if there is maxQuantity and it is exceeded
            if (maxQuantity && newQuantity >= maxQuantity) {
                onPortionChange(maxQuantity);
                setPlusDisabled(true);
            }
            else {
                //Change quantity to base serving to keep the proportions right
                if (quantity < baseServing && newQuantity > baseServing) {
                    onPortionChange(baseServing);
                }
                else
                    onPortionChange(newQuantity);
            }
        }
        else {
            if (quantity === maxQuantity) {
                setPlusDisabled(false);
            }
            if (quantity <= baseServing) {
                var newQuantity = quantity / 2;
                if (newQuantity < 1) {
                    setMinusDisabled(true);
                }
                onPortionChange(newQuantity);
            }
            else
                onPortionChange(quantity - baseServing);
        }
    };
    return (react_1["default"].createElement(core_1.Grid, { container: true, direction: "column", alignItems: "center", justify: "center", spacing: 0 },
        react_1["default"].createElement(core_1.Grid, { item: true, container: true, wrap: "nowrap", alignItems: "center", justify: "flex-start", spacing: 1 },
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(core_1.IconButton, { size: "small", disabled: minusDisabled, color: "primary", onClick: function () { return changeServing(false); } },
                    react_1["default"].createElement(RemoveRounded_1["default"], null))),
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(core_1.Typography, { noWrap: true }, getServingInUnits(quantity, baseServing) + " (" + quantity + " g)")),
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(core_1.IconButton, { size: "small", disabled: plusDisabled, color: "primary", onClick: function () { return changeServing(true); } },
                    react_1["default"].createElement(AddRounded_1["default"], null)))),
        servingDesc ?
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(core_1.Typography, { variant: "caption" }, "/" + servingDesc.toLowerCase() + "/"))
            :
                null));
};
