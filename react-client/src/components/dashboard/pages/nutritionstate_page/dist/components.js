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
exports.__esModule = true;
exports.NutritionBarChart = exports.NutritionPieChart = exports.NutritionComposed = void 0;
var react_1 = require("react");
var recharts_1 = require("recharts");
var objects_1 = require("./objects");
var lodash_1 = require("lodash");
var material_1 = require("@mui/material");
var PieChartRounded_1 = require("@mui/icons-material/PieChartRounded");
var NutritionComposed = /** @class */ (function (_super) {
    __extends(NutritionComposed, _super);
    function NutritionComposed(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChangeTable = function (event, newValue) {
            _this.setState({ tableNumber: newValue });
        };
        _this.state = {
            tableNumber: 0
        };
        return _this;
    }
    NutritionComposed.prototype.render = function () {
        return (react_1["default"].createElement(material_1.Grid, { container: true, direction: "column", alignItems: "stretch", justifyContent: "space-between", spacing: 2 }, this.props.nutritionRda == null || this.props.nutritionState == null ?
            react_1["default"].createElement("div", null, "Loading Nutrition...") :
            react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(material_1.Grid, { item: true },
                    react_1["default"].createElement(material_1.Paper, { square: true, elevation: 4 },
                        react_1["default"].createElement(material_1.Tabs, { value: this.state.tableNumber, indicatorColor: "primary", textColor: "primary", onChange: this.handleChangeTable, "aria-label": "disabled tabs example", variant: "fullWidth" },
                            react_1["default"].createElement(material_1.Tab, { label: "Macro nutrients" }),
                            react_1["default"].createElement(material_1.Tab, { label: "Vitamins" }),
                            react_1["default"].createElement(material_1.Tab, { label: "Minerals" })))),
                this.state.tableNumber === 0 ?
                    react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement(material_1.Grid, { container: true, item: true, direction: "row", alignItems: "center", justifyContent: "space-evenly" },
                            react_1["default"].createElement(NutritionPieChart, { energy: this.props.nutritionState.energy, nutritionRda: this.props.nutritionRda, macroState: this.props.nutritionState.macroNutrients })))
                    : this.state.tableNumber === 1 ?
                        react_1["default"].createElement(material_1.Grid, { container: true, item: true, alignItems: "center", justifyContent: "space-evenly" },
                            react_1["default"].createElement(NutritionBarChart, { nutritionRda: this.props.nutritionRda, microNutrients: this.props.nutritionState.vitamins }))
                        :
                            react_1["default"].createElement(material_1.Grid, { container: true, item: true, alignItems: "center", justifyContent: "space-evenly" },
                                react_1["default"].createElement(NutritionBarChart, { nutritionRda: this.props.nutritionRda, microNutrients: this.props.nutritionState.minerals })))));
    };
    return NutritionComposed;
}(react_1["default"].Component));
exports.NutritionComposed = NutritionComposed;
var NutritionPieChart = /** @class */ (function (_super) {
    __extends(NutritionPieChart, _super);
    function NutritionPieChart(props) {
        var _this = _super.call(this, props) || this;
        _this.getData = function () {
            var data = [];
            if (!lodash_1["default"].isEmpty(_this.props.nutritionRda) && !lodash_1["default"].isEmpty(_this.props.macroState)) {
                data = [
                    new objects_1.MacroNutrient({
                        label: objects_1.macronutrient.carb,
                        lowerLimit: _this.props.nutritionRda.carbLLimit,
                        upperLimit: _this.props.nutritionRda.carbULimit,
                        // gramsRDA: this.props.nutritionRda.carbohydrates_g,
                        gramsEaten: _this.props.macroState.carbohydrates_g,
                        maxEnergy: _this.props.nutritionRda.energy_kcal,
                        color: { colorEaten: '#00695c', colorRemaining: '#e0f2f1' }
                    }),
                    new objects_1.MacroNutrient({
                        label: objects_1.macronutrient.protein,
                        lowerLimit: _this.props.nutritionRda.proteinLLimit,
                        upperLimit: _this.props.nutritionRda.proteinULimit,
                        // gramsRDA: this.props.nutritionRda.protein_g,
                        gramsEaten: _this.props.macroState.protein_g,
                        maxEnergy: _this.props.nutritionRda.energy_kcal,
                        color: { colorEaten: '#1565c0', colorRemaining: '#e3f2fd' }
                    }),
                    new objects_1.MacroNutrient({
                        render: false,
                        label: objects_1.macronutrient.fat,
                        lowerLimit: _this.props.nutritionRda.fatLLimit,
                        upperLimit: _this.props.nutritionRda.fatULimit,
                        gramsEaten: _this.props.macroState.fat_g,
                        maxEnergy: _this.props.nutritionRda.energy_kcal,
                        subNutrients: [
                            new objects_1.MacroNutrient({
                                label: objects_1.macronutrient.monoFat,
                                lowerLimit: _this.props.nutritionRda.monoFatLLimit,
                                upperLimit: _this.props.nutritionRda.monoFatULimit,
                                gramsEaten: _this.props.macroState.monoFat_g,
                                maxEnergy: _this.props.nutritionRda.energy_kcal,
                                color: { colorEaten: '#6a1b9a', colorRemaining: '#f3e5f5' }
                            }),
                            new objects_1.MacroNutrient({
                                label: objects_1.macronutrient.polyFat,
                                lowerLimit: _this.props.nutritionRda.polyFatLLimit,
                                upperLimit: _this.props.nutritionRda.polyFatULimit,
                                gramsEaten: _this.props.macroState.polyFat_g,
                                maxEnergy: _this.props.nutritionRda.energy_kcal,
                                color: { colorEaten: '#4527a0', colorRemaining: '#ede7f6' },
                                subNutrients: [
                                    new objects_1.MacroNutrient({
                                        render: false,
                                        label: objects_1.macronutrient.omega3,
                                        lowerLimit: _this.props.nutritionRda.omega3LLimit,
                                        upperLimit: _this.props.nutritionRda.omega3ULimit,
                                        gramsRDA: _this.props.nutritionRda.omega3_g,
                                        gramsEaten: _this.props.macroState.omega3_g,
                                        maxEnergy: _this.props.nutritionRda.energy_kcal
                                    }),
                                    new objects_1.MacroNutrient({
                                        render: false,
                                        label: objects_1.macronutrient.omega6,
                                        lowerLimit: _this.props.nutritionRda.omega6LLimit,
                                        upperLimit: _this.props.nutritionRda.omega6ULimit,
                                        gramsRDA: _this.props.nutritionRda.omega6_g,
                                        gramsEaten: _this.props.macroState.omega6_g,
                                        maxEnergy: _this.props.nutritionRda.energy_kcal
                                    }),
                                ]
                            }),
                            new objects_1.MacroNutrient({
                                label: objects_1.macronutrient.satFat,
                                lowerLimit: _this.props.nutritionRda.satFatLLimit,
                                upperLimit: _this.props.nutritionRda.satFatULimit,
                                gramsEaten: _this.props.macroState.satFat_g,
                                maxEnergy: _this.props.nutritionRda.energy_kcal,
                                color: { colorEaten: '#283593', colorRemaining: '#e8eaf6' }
                            }),
                        ]
                    }),
                    new objects_1.MacroNutrient({
                        render: false,
                        label: objects_1.macronutrient.water,
                        gramsRDA: _this.props.nutritionRda.water_g,
                        gramsEaten: _this.props.macroState.water_g
                    }),
                    new objects_1.MacroNutrient({
                        render: false,
                        label: objects_1.macronutrient.fiber,
                        gramsRDA: _this.props.nutritionRda.fiber_g,
                        gramsEaten: _this.props.macroState.fiber_g
                    }),
                ];
            }
            return data;
        };
        _this.flatMapRenderData = function (data) {
            return data.flatMap(function (nutrient) {
                var list = [];
                if (nutrient.render) {
                    list.push(nutrient);
                }
                if (nutrient.subNutrients.length) {
                    var subnuts = (_this.flatMapRenderData(nutrient.subNutrients));
                    list = list.concat(subnuts);
                }
                return list;
            });
        };
        _this.getDataToRender = function (data) {
            var dataToRender = _this.flatMapRenderData(data);
            console.log("dttorender", dataToRender);
            _this.calculateAngles(dataToRender, 0, -3);
            return dataToRender;
        };
        _this.calculateSecondSectorCals = function (data) {
            var percentageMinAmountSectors = 0;
            var secondSectorCalsEaten = 0;
            data.forEach(function (nutrient) {
                percentageMinAmountSectors += nutrient.minAmountPercentage;
                console.log(nutrient.calsEatenBySector);
                secondSectorCalsEaten += nutrient.calsEatenBySector[1];
            });
            var secondSectorTotalCals = (1 - percentageMinAmountSectors) * _this.props.nutritionRda.energy_kcal;
            return [secondSectorCalsEaten, secondSectorTotalCals];
        };
        _this.calculateAngles = function (data, start, start2) {
            var _a = _this.calculateSecondSectorCals(data), secondSectorCalsEaten = _a[0], secondSectorTotalCals = _a[1];
            //CHECK IF SECOND SECTOR IS FULL
            if (secondSectorCalsEaten > secondSectorTotalCals) {
                data.forEach(function (nutrient) {
                    if (nutrient.calsEatenBySector[1] > 0) {
                        nutrient.freeSectorPercentage = ((nutrient.calsEatenBySector[1] / secondSectorCalsEaten) * secondSectorTotalCals) / _this.props.nutritionRda.energy_kcal;
                    }
                });
            }
            var angleReducer = function (acc, cur, idx) {
                var paddingAngle = idx === data.length - 1 ? 3 : 2;
                //CALCULATE ANGLES
                cur.startAngle[0] = acc[0];
                cur.setEndAngle(0, paddingAngle);
                if (cur.calsEatenBySector[1] > 0) {
                    cur.startAngle[1] = acc[1];
                    cur.setEndAngle(1, paddingAngle);
                }
                return [cur.minAmountPercentage * 360 + acc[0], acc[1] - cur.freeSectorPercentage * 360];
            };
            data.reduce(angleReducer, [start, start2]);
        };
        _this.renderCells = function (data) {
            return data.map(function (entry, index) { return react_1["default"].createElement(recharts_1.Cell, { key: "cell-" + index, fill: entry.color }); });
        };
        _this.renderPie = function (object) {
            var minimumCalsExceeded = object.calsEatenBySector[1] > 0;
            var pie1 = react_1["default"].createElement(recharts_1.Pie, { key: "pie-" + object.label, data: [{ name: object.label + "-rem", value: object.calsRemainingBySector[0] }, { name: object.label, value: object.calsEatenBySector[0] }], cx: '50%', cy: '50%', labelLine: false, stroke: 5, dataKey: "value", animationDuration: _this.animationDuration, startAngle: object.startAngle[0], endAngle: object.endAngle[0] },
                react_1["default"].createElement(recharts_1.Label, { offset: 10, position: "outside", key: 'label', fill: object.colorEaten }, !minimumCalsExceeded ?
                    // `${parseInt(object.gramsEaten, 10)} / ${parseInt(object.minGrams)} g`
                    Math.round(object.gramsEaten / object.minGrams * 100) + " %"
                    :
                        Math.round(object.minGrams) + "g  \u2713"),
                react_1["default"].createElement(recharts_1.Cell, { key: "cell-" + object.label, fill: object.colorRemaining }),
                react_1["default"].createElement(recharts_1.Cell, { key: "cell-" + object.label + "2", fill: object.colorEaten, stroke: "grey", strokeWidth: "1" }));
            if (minimumCalsExceeded) {
                var pie2 = (react_1["default"].createElement(recharts_1.Pie, { key: "pie-" + object.label + "-2", data: [{ name: object.label, value: object.calsEatenBySector[1] }], cx: '50%', cy: '50%', labelLine: false, dataKey: "value", animationDuration: _this.animationDuration, startAngle: object.startAngle[1], endAngle: object.endAngle[1] },
                    react_1["default"].createElement(recharts_1.Cell, { key: "cell-" + object.label + "2-2", fill: object.colorEaten, stroke: "grey", strokeWidth: "1" })));
                return [pie1, pie2];
            }
            return pie1;
        };
        _this.renderPies = function (data) {
            if (data)
                return data.map(function (object) { return _this.renderPie(object); });
        };
        _this.renderLegendItem = function (object) {
            var minimumCalsExceeded = object.totalCalsEaten > object.minCals;
            return (react_1["default"].createElement("div", { key: object.label },
                react_1["default"].createElement(material_1.ListItem, null,
                    object.render ?
                        react_1["default"].createElement(PieChartRounded_1["default"], { style: { color: object.colorEaten } })
                        : null,
                    react_1["default"].createElement(material_1.ListItemText, null,
                        react_1["default"].createElement(material_1.Typography, { style: { color: object.colorEaten, fontWeight: "bold" }, variant: "caption" }, (object.subNutrients.length ? "Total" : "") + " " + object.label + " : "),
                        react_1["default"].createElement(material_1.Typography, { style: { color: object.maxGrams && object.gramsEaten > object.maxGrams ? "red" : "none", fontWeight: "bold" }, variant: "caption" }, Number(object.gramsEaten).toFixed(2) + "g  "),
                        react_1["default"].createElement(material_1.Typography, { style: { color: object.maxGrams && object.gramsEaten > object.maxGrams ? "red" : "none" }, variant: "caption" }, !object.maxGrams || object.gramsEaten < object.minGrams ?
                            " / " + Number(object.minGrams).toFixed(2) + " g (min)"
                            : object.gramsEaten < object.maxGrams ?
                                " < " + Number(object.maxGrams).toFixed(2) + " g (max) "
                                : "! "),
                        react_1["default"].createElement(material_1.Typography, { style: { color: object.colorEaten, fontWeight: "bold" }, variant: "caption" }, minimumCalsExceeded ? "✓" : ""))),
                object.subNutrients.length ?
                    react_1["default"].createElement("div", { key: object.label },
                        react_1["default"].createElement(material_1.Divider, { key: object.label + "divider" }),
                        react_1["default"].createElement(material_1.ListItem, { key: object.label + "2" }, _this.renderLegend(object.subNutrients))) : null));
        };
        _this.renderToolTip = function (_a) {
            var active = _a.active, payload = _a.payload;
            if (payload.length) {
                var nutrient = payload[0].payload;
                if (active) {
                    return (react_1["default"].createElement(material_1.Paper, { style: { marginLeft: 10, marginRight: 10 }, elevation: 4 },
                        react_1["default"].createElement(material_1.Typography, { style: { marginTop: 10, margin: "inherit" }, variant: "subtitle1" }, "" + nutrient.name),
                        react_1["default"].createElement(material_1.Typography, { style: { marginBottom: 10, margin: "inherit" }, variant: "subtitle1" }, nutrient.amountEaten + " / " + (nutrient.percentageEaten > 100 && nutrient.upperLimit ? nutrient.upperLimit + " " + nutrient.unit + "(max)" : nutrient.lowerLimit + " " + nutrient.unit))));
                }
            }
            return null;
        };
        _this.renderLegend = function (data) {
            return (react_1["default"].createElement(material_1.List, { dense: true }, data.map(function (object) {
                return (object.subNutrients.length ?
                    react_1["default"].createElement(material_1.Paper, { key: object.label, children: _this.renderLegendItem(object), style: { background: "white", borderStyle: "ridge" } })
                    :
                        _this.renderLegendItem(object));
            })));
        };
        _this.pieRadius = 160;
        _this.pieChartHeight = _this.pieRadius * 2 + 30;
        _this.pieChartWidth = _this.pieRadius * 2 + 50;
        _this.animationDuration = 500;
        return _this;
    }
    NutritionPieChart.prototype.render = function () {
        var data = this.getData();
        if (data.length === 0) {
            return react_1["default"].createElement(react_1["default"].Fragment, null);
        }
        console.log("DATA: ", data);
        var dataToRender = this.getDataToRender(data);
        var rp = this.renderPies(dataToRender);
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(material_1.Grid, { item: true },
                react_1["default"].createElement(material_1.Typography, { variant: "subtitle1", align: "center" }, "Energy consumed: " + this.props.energy + " / " + this.props.nutritionRda.energy_kcal + " kcal (maximum) "),
                react_1["default"].createElement(recharts_1.PieChart, { outerRadius: this.pieRadius, width: this.pieChartWidth, height: this.pieChartHeight },
                    rp,
                    react_1["default"].createElement(recharts_1.Pie, { key: "pie-border", data: [{ name: "border", value: 1 }], cx: '50%', cy: '50%', labelLine: false, innerRadius: this.pieRadius - 24, dataKey: "value", 
                        // animationBegin={300}
                        animationDuration: this.animationDuration, children: react_1["default"].createElement(recharts_1.Cell, { key: "cell-border", fill: "black", stroke: "grey", strokeWidth: "1" }) }))),
            react_1["default"].createElement(material_1.Grid, { item: true },
                react_1["default"].createElement(material_1.Paper, { style: { background: "white", borderStyle: "solid" } }, this.renderLegend(data)))));
    };
    return NutritionPieChart;
}(react_1["default"].Component));
exports.NutritionPieChart = NutritionPieChart;
var NutritionBarChart = /** @class */ (function (_super) {
    __extends(NutritionBarChart, _super);
    function NutritionBarChart(props) {
        var _this = _super.call(this, props) || this;
        _this.getData = function () {
            var data = [];
            if (!lodash_1["default"].isEmpty(_this.props.nutritionRda) && !lodash_1["default"].isEmpty(_this.props.microNutrients)) {
                data = Object.entries(_this.props.microNutrients).map(function (_a) {
                    var key = _a[0], value = _a[1];
                    var splitKey = String(key).split('_');
                    var name = splitKey[0];
                    var unit = splitKey[1];
                    return new objects_1.MicroNutrient({
                        name: name,
                        unit: unit,
                        lowerLimit: _this.props.nutritionRda[key],
                        upperLimit: _this.props.nutritionRda[name + "Upper_" + unit],
                        amountEaten: value
                    });
                });
                data.sort(function (a, b) { return a.checked > b.checked ? 1 : a.checked < b.checked ? -1 : 0; });
            }
            return data;
        };
        _this.renderRefLineLabel = function (labelName) { return function (props) {
            return react_1["default"].createElement("text", { textAnchor: "middle", x: props.viewBox.x, y: props.viewBox.y - 10 }, labelName);
        }; };
        _this.renderToolTip = function (_a) {
            var active = _a.active, payload = _a.payload;
            if (payload.length) {
                var nutrient = payload[0].payload;
                if (active) {
                    return (react_1["default"].createElement(material_1.Paper, { style: { marginLeft: 10, marginRight: 10 }, elevation: 4 },
                        react_1["default"].createElement(material_1.Typography, { style: { marginTop: 10, margin: "inherit" }, variant: "subtitle1" }, "" + nutrient.name),
                        react_1["default"].createElement(material_1.Typography, { style: { marginBottom: 10, margin: "inherit" }, variant: "subtitle1" }, nutrient.amountEaten + " / " + (nutrient.percentageEaten > 100 && nutrient.upperLimit ? nutrient.upperLimit + " " + nutrient.unit + "(max)" : nutrient.lowerLimit + " " + nutrient.unit))));
                }
            }
            return null;
        };
        _this.renderBarLabel = function (props) {
            return react_1["default"].createElement("text", { opacity: (props.value / 1.5 + 30) + "%", textAnchor: "middle", fill: "white", x: props.x + props.width / 2, y: props.y + props.height / 2, dy: "0.355rem" }, Math.round(props.value) + "%");
        };
        return _this;
    }
    NutritionBarChart.prototype.render = function () {
        var data = this.getData();
        return (react_1["default"].createElement(material_1.Grid, { item: true },
            react_1["default"].createElement(recharts_1.BarChart, { layout: "vertical", width: 600, height: 500, data: data },
                react_1["default"].createElement(recharts_1.CartesianAxis, null),
                react_1["default"].createElement(recharts_1.XAxis, { unit: "%", orientation: "top", type: "number", domain: [0, 250], tick: false }),
                react_1["default"].createElement(recharts_1.YAxis, { width: 140, type: "category", dataKey: "name", tickSize: 5 }),
                react_1["default"].createElement(recharts_1.ReferenceLine, { isFront: true, x: 100, label: this.renderRefLineLabel("Minimum"), stroke: "green", strokeWidth: 2, strokeDasharray: "5" }),
                react_1["default"].createElement(recharts_1.ReferenceLine, { x: 200, label: this.renderRefLineLabel("Maximum"), stroke: "red", strokeWidth: 2, isFront: true, strokeDasharray: "5" }),
                react_1["default"].createElement(recharts_1.Tooltip, { isAnimationActive: false, content: this.renderToolTip }),
                react_1["default"].createElement(recharts_1.Bar, { unit: "%", animationDuration: 300, maxBarSize: 30, dataKey: "percentageEaten", fill: "#388e3c", stackId: "limit" },
                    react_1["default"].createElement(recharts_1.LabelList, { position: "inside", content: this.renderBarLabel })),
                react_1["default"].createElement(recharts_1.Bar, { animationDuration: 300, maxBarSize: 30, dataKey: "percentageRemaining", fill: "#e8f5e9", stackId: "limit" }))));
    };
    return NutritionBarChart;
}(react_1["default"].PureComponent));
exports.NutritionBarChart = NutritionBarChart;
