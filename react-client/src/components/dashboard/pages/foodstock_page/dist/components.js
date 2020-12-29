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
                                react_1["default"].createElement(shared_components_1.FoodLookUp, { width: 250, rowIndex: 0, hasConfirmButton: false, onChange: function (selectedFood) { return setSelectedFood(selectedFood); }, loading: loading }),
                                selectedFood ?
                                    react_1["default"].createElement(core_1.Grid, { item: true },
                                        react_1["default"].createElement(exports.FoodPortionControl, { servingDesc: selectedFood.servingDesc, baseServing: selectedFood.servingSize, onPortionChange: onPortionChange, servingInGrams: servingInGrams }))
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
                    customBodyRender: function (value, _a) {
                        var rowIndex = _a.rowIndex, rowData = _a.rowData;
                        return react_1["default"].createElement(exports.QuantityCell, { value: value, submitEdit: function (newQuantity) {
                                console.log(value, rowData);
                                var newFoodStockDto = __assign(__assign({}, rowData), { quantity: newQuantity }); //rowData or Value
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
    var value = _a.value, onEat = _a.onEat, onPrepare = _a.onPrepare;
    var _b = react_1["default"].useState(new fractional_1.Fraction(1, 1)), servingUnits = _b[0], setServingUnits = _b[1];
    var _c = react_1["default"].useState(value.foodItemDto.servingSize), servingInGrams = _c[0], setServingInGrams = _c[1];
    var _d = react_1["default"].useState(value.hasRaw ? "raw" : "cooked"), condition = _d[0], setCondition = _d[1];
    //eval(servingUnits)
    var onPortionChange = function (servingInGrams) {
        setServingInGrams(servingInGrams);
        setServingUnits(getServingInUnits(servingInGrams, value.foodItemDto.servingSize));
    };
    react_1.useEffect(function () {
        setServingUnits(new fractional_1.Fraction(1, 1));
        setServingInGrams(value.foodItemDto.servingSize);
        setCondition(value.hasRaw ? "raw" : "cooked");
    }, [value]);
    var handleOnEatClick = function () {
        var eatFoodStockDto = {
            foodId: value.foodItemDto.id,
            quantity: servingInGrams,
            cooked: condition === "cooked"
        };
        onEat(eatFoodStockDto);
    };
    return (value.quantity !== 0 ?
        react_1["default"].createElement(core_1.Grid, { container: true, wrap: "nowrap", alignItems: "center", justify: "flex-start", spacing: 2 },
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(exports.FoodPortionControl, { servingDesc: value.foodItemDto.servingDesc, baseServing: value.foodItemDto.servingSize, portionUnits: servingUnits, servingInGrams: servingInGrams, onPortionChange: onPortionChange })),
            onPrepare ? null : react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(core_1.RadioGroup, { "aria-label": "gender", name: "condition", value: condition, onChange: function (event) { setCondition(event.target.value); } },
                    react_1["default"].createElement(core_1.FormControlLabel, { value: "raw", disabled: !value.hasRaw, control: react_1["default"].createElement(core_1.Radio, { size: "small", color: "primary" }), label: "Raw" }),
                    react_1["default"].createElement(core_1.FormControlLabel, { value: "cooked", disabled: !value.hasCooked, control: react_1["default"].createElement(core_1.Radio, { size: "small", color: "primary" }), label: "Cooked" }))),
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(core_1.Button, { variant: "contained", color: "primary", onClick: handleOnEatClick }, "Eat")))
        :
            react_1["default"].createElement(core_1.Grid, { container: true, wrap: "nowrap", alignItems: "center", justify: "center", spacing: 2 },
                react_1["default"].createElement(core_1.Grid, { item: true }, onPrepare ?
                    react_1["default"].createElement(core_1.Button, { variant: "contained", color: "secondary", onClick: onPrepare }, "Prepare")
                    :
                        react_1["default"].createElement(core_1.Tooltip, { title: "No more quantiy left of this item." },
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement(core_1.Button, { variant: "contained", disabled: true, color: "primary" }, "Eat"))))));
};
// export const QuantityCell = React.memo(({ submitEdit, value, hasEditMode }) => {
exports.QuantityCell = function (_a) {
    //console.log("before", currentQuantity);
    var submitEdit = _a.submitEdit, value = _a.value, hasEditMode = _a.hasEditMode;
    var _b = react_1.useState({ grams: value.quantity, units: new fractional_1.Fraction(value.quantity, value.servingSize) }), currentQuantity = _b[0], setCurrentQuantity = _b[1];
    var _c = react_1.useState(false), editMode = _c[0], setEditMode = _c[1];
    var _d = react_1.useState(currentQuantity.grams === null || currentQuantity.grams === 0 ? value.servingSize : currentQuantity.grams), quantityInGrams = _d[0], setQuantityInGrams = _d[1];
    react_1.useEffect(function () {
        if (value.quantity !== currentQuantity.grams) {
            var grams = value.quantity;
            var units = new fractional_1.Fraction(value.quantity, value.servingSize);
            setCurrentQuantity({ grams: grams, units: units });
            setQuantityInGrams(grams === null || grams === 0 ? value.servingSize : grams);
        }
    }, [value]);
    var onPortionChange = function (servingInGrams) {
        setQuantityInGrams(servingInGrams);
    };
    var handleSubmit = function (_event) {
        setEditMode(false);
        setCurrentQuantity({ units: getServingInUnits(quantityInGrams, value.servingSize), grams: quantityInGrams });
        submitEdit(quantityInGrams);
    };
    var handleCancel = function (_event) {
        setEditMode(false);
    };
    return (editMode ?
        react_1["default"].createElement(core_1.Grid, { container: true, direction: "column", alignItems: "center", justify: "center", spacing: 0 },
            react_1["default"].createElement(core_1.Grid, { item: true, xs: true },
                react_1["default"].createElement(exports.FoodPortionControl, { servingDesc: value.servingDesc, baseServing: value.servingSize ? value.servingSize : quantityInGrams, servingInGrams: quantityInGrams, onPortionChange: onPortionChange })),
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
                                        react_1["default"].createElement(core_1.IconButton, { color: "primary" },
                                            react_1["default"].createElement(DeleteOutlineRounded_1["default"], null))))
                                :
                                    null),
                value.servingDesc ?
                    react_1["default"].createElement(core_1.Grid, { item: true },
                        react_1["default"].createElement(core_1.Typography, { variant: "caption" }, "/" + value.servingDesc.toLowerCase() + "/"))
                    :
                        null));
};
exports.QuantityCell.propTypes = {
    hasEditMode: prop_types_1["default"].bool
};
exports.QuantityCell.defaultProps = {
    hasEditMode: true
};
var getServingInUnits = function (servingInGrams, baseServing) {
    if (baseServing === 0)
        return new fractional_1.Fraction(0, 1);
    return new fractional_1.Fraction(servingInGrams, baseServing);
};
exports.FoodPortionControl = function (_a) {
    var servingDesc = _a.servingDesc, baseServing = _a.baseServing, servingInGrams = _a.servingInGrams, onPortionChange = _a.onPortionChange;
    // console.log("SERVING DESC", servingDesc)
    var changeServing = function (plus) {
        if (plus) {
            if (servingInGrams < baseServing) {
                var newservingInGrams = servingInGrams * 2;
                if (servingInGrams < baseServing && newservingInGrams > baseServing) {
                    onPortionChange(baseServing);
                }
                else {
                    onPortionChange(newservingInGrams);
                }
            }
            else
                onPortionChange(servingInGrams + baseServing);
        }
        else {
            if (servingInGrams <= baseServing)
                onPortionChange(servingInGrams / 2);
            else
                onPortionChange(servingInGrams - baseServing);
        }
    };
    return (react_1["default"].createElement(core_1.Grid, { container: true, direction: "column", alignItems: "center", justify: "center", spacing: 0 },
        react_1["default"].createElement(core_1.Grid, { item: true, container: true, wrap: "nowrap", alignItems: "center", justify: "flex-start", spacing: 1 },
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(core_1.IconButton, { size: "small", color: "primary", onClick: function () { return changeServing(false); } },
                    react_1["default"].createElement(RemoveRounded_1["default"], null))),
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(core_1.Typography, { noWrap: true }, getServingInUnits(servingInGrams, baseServing) + " (" + servingInGrams + " g)")),
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(core_1.IconButton, { size: "small", color: "primary", onClick: function () { return changeServing(true); } },
                    react_1["default"].createElement(AddRounded_1["default"], null)))),
        servingDesc ?
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(core_1.Typography, { variant: "caption" }, "/" + servingDesc.toLowerCase() + "/"))
            :
                null));
};
exports.FoodPortionControl.propTypes = {
    servingDesc: prop_types_1["default"].string,
    baseServing: prop_types_1["default"].number,
    portionUnits: prop_types_1["default"].instanceOf(fractional_1.Fraction),
    servingInGrams: prop_types_1["default"].number,
    onPortionChange: prop_types_1["default"].func
};
