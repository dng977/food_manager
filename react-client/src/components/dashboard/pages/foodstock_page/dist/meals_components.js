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
exports.EatMealCell = exports.MealsTable = exports.AddMealDialog = void 0;
var core_1 = require("@material-ui/core");
var KeyboardArrowRightRounded_1 = require("@material-ui/icons/KeyboardArrowRightRounded");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var shared_components_1 = require("../shared_components");
var lodash_1 = require("lodash");
var components_1 = require("./components");
var mui_datatables_1 = require("mui-datatables");
exports.AddMealDialog = function (_a) {
    var onCancel = _a.onCancel, onConfirm = _a.onConfirm, error = _a.error, openDialog = _a.openDialog;
    console.log("render add meal dialog: ", openDialog);
    var loading = react_redux_1.useSelector(function (state) { return state.feedback.dialogLoading; });
    var _b = react_1.useState(''), name = _b[0], setName = _b[1];
    var _c = react_1.useState(''), description = _c[0], setDescription = _c[1];
    var _d = react_1.useState(null), servings = _d[0], setServings = _d[1];
    var _e = react_1.useState([null]), ingredientList = _e[0], setIngredientList = _e[1];
    var onPortionChange = function (indexToChange, servingInGrams) {
        console.log("On port change");
        // ingredientList[indexToChange].mealItemDto.quantity = servingInGrams;
        // setIngredientList(ingredientList);
        setIngredientList(ingredientList.map(function (ingredient, ind) {
            if (ind === indexToChange)
                ingredient.mealItemDto.quantity = servingInGrams;
            return ingredient;
        }));
    };
    var onConditionChange = function (indexToChange, newCondition) {
        // ingredientList[indexToChange].mealItemDto.cooked = newCondition === "raw" ? false : true;
        // setIngredientList(ingredientList);
        setIngredientList(ingredientList.map(function (ingredient, ind) {
            if (ind === indexToChange)
                ingredient.mealItemDto.cooked = newCondition === "raw" ? false : true;
            return ingredient;
        }));
    };
    var updateIngredientList = function (newFoodItem, selFoodIndex) {
        console.log("updIngList");
        var lastIndex = ingredientList.length - 1;
        var reducer = function (acc, cur, idx) {
            //Add the previous element if index is different from selFood
            if (idx !== selFoodIndex) {
                return acc.concat([cur]);
            }
            //If there is a new ingredient
            if (newFoodItem && idx === lastIndex) {
                return acc.concat([{ mealItemDto: { foodItemId: newFoodItem.id, quantity: newFoodItem.servingSize, cooked: false }, foodItemDto: newFoodItem }, null]);
            }
            if (newFoodItem && idx !== lastIndex) {
                return acc.concat([{ mealItemDto: { foodItemId: newFoodItem.id, quantity: newFoodItem.servingSize, cooked: false }, foodItemDto: newFoodItem }]);
            }
            if (!newFoodItem) {
                return acc;
            }
        };
        var newList = ingredientList.reduce(reducer, []);
        console.log(newList);
        setIngredientList(newList);
    };
    var onClose = function () {
        setIngredientList([null]);
        setServings(null);
        console.log("on clse:", ingredientList);
        onCancel();
    };
    var createMealDto = function () {
        var totalQuantity = 0;
        var ingredients = ingredientList.filter(function (ing) { return ing !== null; }).map(function (ingredient) {
            totalQuantity += ingredient.mealItemDto.quantity;
            return ingredient.mealItemDto;
        });
        return {
            id: null,
            name: name,
            description: description,
            ingredients: ingredients,
            quantity: totalQuantity,
            quantityLeft: totalQuantity,
            servings: servings
        };
    };
    console.log("before render");
    return (react_1["default"].createElement(core_1.ThemeProvider, { theme: components_1.dialogTheme },
        react_1["default"].createElement(core_1.Dialog, { open: openDialog, onClose: onClose, fullWidth: true, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" }, loading ?
            react_1["default"].createElement(core_1.DialogTitle, null, "Adding...") :
            error ?
                react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(core_1.DialogTitle, null, "" + error),
                    react_1["default"].createElement(core_1.DialogActions, null,
                        react_1["default"].createElement(core_1.Button, { variant: "outlined", onClick: onClose, color: "primary" }, "Close")))
                : openDialog ?
                    react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement(core_1.DialogTitle, { id: "alert-dialog-title" }, "Add a new Meal"),
                        react_1["default"].createElement("form", { onSubmit: function () { onConfirm(createMealDto()); setIngredientList([null]); } },
                            react_1["default"].createElement(core_1.DialogContent, { dividers: true },
                                react_1["default"].createElement(core_1.Grid, { container: true, direction: "column", alignItems: "stretch", justify: "flex-start", spacing: 3 },
                                    react_1["default"].createElement(core_1.Grid, { item: true },
                                        react_1["default"].createElement(core_1.TextField, { onChange: function (event) { return setName(event.target.value); }, label: "Name", autoFocus: true, id: "name", fullWidth: true, variant: "outlined", size: "small", required: true })),
                                    react_1["default"].createElement(core_1.Divider, { light: true }),
                                    react_1["default"].createElement(core_1.Grid, { item: true },
                                        react_1["default"].createElement(core_1.Grid, { container: true, direction: "column", alignItems: "flex-start", justify: "flex-start", spacing: 1 }, ingredientList.map(function (ingredientTuple, index) {
                                            console.log("ingredientTuple: ", ingredientTuple);
                                            var mealItemDto = null;
                                            var foodItemDto = null;
                                            if (ingredientTuple !== null) {
                                                mealItemDto = ingredientTuple.mealItemDto;
                                                foodItemDto = ingredientTuple.foodItemDto;
                                            }
                                            return (react_1["default"].createElement(core_1.Grid, { item: true, container: true, alignItems: "center", justify: "flex-start", spacing: 3, key: index },
                                                react_1["default"].createElement(core_1.Grid, { item: true },
                                                    react_1["default"].createElement(shared_components_1.FoodLookUp, { label: index === (ingredientList.length - 1) ? "Add ingredient" : "#" + (index + 1), initSelectedValue: foodItemDto, width: 200, rowIndex: 0, hasConfirmButton: false, onChange: function (selectedFood) { return updateIngredientList(selectedFood, index); }, required: ingredientList.length <= 1 })),
                                                ingredientTuple === null ? null :
                                                    react_1["default"].createElement(react_1["default"].Fragment, null,
                                                        react_1["default"].createElement(core_1.Grid, { item: true },
                                                            react_1["default"].createElement(components_1.FoodPortionControl, { maxQuantity: null, servingDesc: foodItemDto.servingDesc, baseServing: foodItemDto.servingSize, onPortionChange: function (servingInGrams) { return onPortionChange(index, servingInGrams); }, quantity: mealItemDto.quantity })),
                                                        react_1["default"].createElement(core_1.Grid, { item: true },
                                                            react_1["default"].createElement(core_1.RadioGroup, { "aria-label": "gender", name: "condition", value: mealItemDto.cooked ? "cooked" : "raw", onChange: function (event) { onConditionChange(index, event.target.value); } },
                                                                react_1["default"].createElement(core_1.FormControlLabel, { value: "raw", disabled: !foodItemDto.hasRaw, control: react_1["default"].createElement(core_1.Radio, { size: "small", color: "primary" }), label: "Raw" }),
                                                                react_1["default"].createElement(core_1.FormControlLabel, { value: "cooked", disabled: !foodItemDto.hasCooked, control: react_1["default"].createElement(core_1.Radio, { size: "small", color: "primary" }), label: "Cooked" }))))));
                                        }))),
                                    react_1["default"].createElement(core_1.Divider, null),
                                    react_1["default"].createElement(core_1.Grid, { item: true },
                                        react_1["default"].createElement(core_1.FormControl, { size: "small", variant: "outlined", style: { width: 120 } },
                                            react_1["default"].createElement(core_1.InputLabel, { id: "servings-select-label" }, "Servings"),
                                            react_1["default"].createElement(core_1.Select, { MenuProps: {
                                                    PaperProps: {
                                                        style: {
                                                            maxHeight: 200
                                                        }
                                                    }
                                                }, labelId: "servings-select-label", id: "servings-select", label: "Servings LABEL", value: servings, required: true, onChange: function (_a) {
                                                    var target = _a.target;
                                                    return setServings(target.value);
                                                } }, lodash_1["default"].range(1, 20, 1).map(function (number) { return (react_1["default"].createElement(core_1.MenuItem, { key: number, value: number }, number)); })))),
                                    react_1["default"].createElement(core_1.Divider, null),
                                    react_1["default"].createElement(core_1.Grid, { item: true },
                                        react_1["default"].createElement(core_1.TextField, { onChange: function (event) { return setDescription(event.target.value); }, id: "desc", label: "Description", multiline: true, rows: 5, rowsMax: 15, variant: "outlined", fullWidth: true })))),
                            react_1["default"].createElement(core_1.DialogActions, null,
                                react_1["default"].createElement(core_1.Button, { fullWidth: true, variant: "outlined", onClick: onClose, color: "primary" }, "Cancel"),
                                react_1["default"].createElement(core_1.Button, { fullWidth: true, type: "submit", variant: "contained", color: "primary" }, "Add")))) : react_1["default"].createElement(react_1["default"].Fragment, null))));
};
var MealsTable = /** @class */ (function (_super) {
    __extends(MealsTable, _super);
    function MealsTable(props) {
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
            customToolbar: null,
            download: false,
            search: false,
            print: false,
            viewColumns: false,
            filter: false,
            sort: true,
            sortOrder: { name: "Quantity", direction: "desc" },
            selectableRows: "none",
            selectableRowsHeader: false,
            selectToolbarPlacement: 'none',
            // rowsSelected: [],
            // onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {
            //   console.log(rowsSelected)
            //   this.props.setRowsSelected(rowsSelected)
            //   //setRowsSelected(rowsSelected)
            // },
            expandableRowsOnClick: true,
            onRowClick: function (rowData, _a) {
                var dataIndex = _a.dataIndex;
                _this.props.history.push(_this.props.locationPath + "/meal/" + dataIndex);
            }
        };
        _this.columns = [
            {
                name: 'Meal Name',
                options: {
                    sort: false
                }
            },
            {
                name: '',
                options: {
                    sort: false,
                    customBodyRender: function (value) {
                        return react_1["default"].createElement(exports.EatMealCell, { value: value, onPrepare: function () { return _this.props.editMeal({ id: value.id, quantityLeft: value.quantity }); }, onEat: function (eatMealDto) { return _this.props.eatMeal(eatMealDto); } });
                    }
                }
            },
            {
                name: 'Quantity',
                options: {
                    sort: true,
                    customBodyRender: function (value, _a) {
                        return (react_1["default"].createElement(core_1.Grid, { container: true, alignItems: "center", justify: "center" },
                            react_1["default"].createElement(core_1.Grid, { item: true },
                                react_1["default"].createElement(components_1.QuantityCell, { hasEditMode: false, foodItem: { quantity: value.quantityLeft, servingSize: value.quantity / value.servings }, emptyContents: function () { return _this.props.editMeal({ id: value.id, quantityLeft: 0 }); }, mealQuantity: value.quantity }))));
                    },
                    sortCompare: function (order) {
                        return function (obj1, obj2) {
                            console.log(order);
                            var val1 = obj1.data.quantityLeft;
                            var val2 = obj2.data.quantityLeft;
                            return (val1 - val2) * (order === 'asc' ? 1 : -1);
                        };
                    }
                }
            },
            // {
            //   name: 'Expiry Date',
            //   options: {
            //     customBodyRender: () => {
            //       return <Typography variant="caption">-</Typography>;
            //     }
            //   }
            // },
            {
                name: 'Info',
                options: {
                    sort: false,
                    customBodyRender: function (_a) {
                        var rowIndex = _a.rowIndex;
                        return react_1["default"].createElement(core_1.IconButton, { color: "primary", onClick: function () { _this.props.editMeal(rowIndex); } },
                            react_1["default"].createElement(KeyboardArrowRightRounded_1["default"], null));
                    }
                }
            }
        ];
        return _this;
    }
    MealsTable.prototype.render = function () {
        return (react_1["default"].createElement(mui_datatables_1["default"], { text: "Loading", data: this.props.meals, columns: this.columns, options: this.options, components: this.props.loading ? {
                TableBody: function (props) { return react_1["default"].createElement(shared_components_1.EmptyTable, __assign({}, props, { text: "Loading..." })); }
            } : {} }));
    };
    return MealsTable;
}(react_1["default"].Component));
exports.MealsTable = MealsTable;
exports.EatMealCell = function (_a) {
    var value = _a.value, onEat = _a.onEat, onPrepare = _a.onPrepare;
    var baseServing = value.quantity / value.servings;
    var quantityStmt = baseServing <= value.quantityLeft ? baseServing : value.quantityLeft;
    var _b = react_1["default"].useState(quantityStmt), quantity = _b[0], setQuantity = _b[1];
    var onPortionChange = function (servingInGrams) {
        console.log("onport change-serving in grams: ", servingInGrams);
        setQuantity(servingInGrams);
    };
    react_1.useEffect(function () {
        setQuantity(quantityStmt);
    }, [value]);
    var handleOnEatClick = function () {
        var eatMealDto = {
            foodId: value.id,
            quantity: quantity,
            cooked: null
        };
        onEat(eatMealDto);
    };
    return (react_1["default"].createElement(core_1.Grid, { container: true, wrap: "nowrap", alignItems: "center", justify: "center", spacing: 2 }, value.quantityLeft !== 0 ?
        react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(components_1.FoodPortionControl, { servingDesc: null, baseServing: quantityStmt < value.quantityLeft ? quantityStmt : value.quantityLeft, quantity: quantity, onPortionChange: onPortionChange, maxQuantity: value.quantityLeft })),
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(core_1.Button, { variant: "contained", color: "primary", onClick: handleOnEatClick }, "Eat")))
        :
            react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(core_1.Grid, { item: true },
                    react_1["default"].createElement(core_1.Button, { variant: "contained", color: "secondary", onClick: function () { return onPrepare(); } }, "Prepare")),
                react_1["default"].createElement(core_1.Grid, { item: true },
                    react_1["default"].createElement(core_1.Typography, { variant: "body2", noWrap: true }, value.servings + " servings (" + value.quantity + " g)")))));
};
