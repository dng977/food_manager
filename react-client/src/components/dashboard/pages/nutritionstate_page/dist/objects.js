"use strict";
exports.__esModule = true;
exports.MicroNutrient = exports.MacroNutrient = exports.MacroNutrientGeneral = exports.macronutrient = void 0;
exports.macronutrient = {
    carb: 'Carbs',
    sugars: 'Sugars',
    protein: 'Protein',
    fat: 'Fat',
    monoFat: 'Monounsaturated fat',
    polyFat: 'Polyunsaturated fat',
    omega3: 'Omega 3',
    omega6: 'Omega 6',
    satFat: 'Saturated fat',
    water: 'Water',
    fiber: 'Fiber',
    cholesterol: 'Cholesterol'
};
var MacroNutrientGeneral = /** @class */ (function () {
    function MacroNutrientGeneral(label, limit, gramsRDA, gramsEaten) {
    }
    return MacroNutrientGeneral;
}());
exports.MacroNutrientGeneral = MacroNutrientGeneral;
var MacroNutrient = /** @class */ (function () {
    function MacroNutrient(_a) {
        var _this = this;
        var _b = _a.render, render = _b === void 0 ? true : _b, label = _a.label, lowerLimit = _a.lowerLimit, upperLimit = _a.upperLimit, gramsRDA = _a.gramsRDA, gramsEaten = _a.gramsEaten, maxEnergy = _a.maxEnergy, _c = _a.color, color = _c === void 0 ? { colorEaten: "black", colorRemaining: "black" } : _c, _d = _a.subNutrients, subNutrients = _d === void 0 ? [] : _d;
        this.setEndAngle = function (sector, paddingAngle) {
            if (sector === 0) {
                _this.endAngle[0] = _this.startAngle[0] - paddingAngle + _this.minAmountPercentage * 360;
            }
            else if (sector === 1) {
                _this.endAngle[1] = _this.startAngle[1] + paddingAngle - _this.freeSectorPercentage * 360;
            }
        };
        this.render = render;
        this.label = label;
        //color
        this.colorEaten = color.colorEaten;
        this.colorRemaining = color.colorRemaining;
        //nutrition
        this.lowerLimit = lowerLimit;
        this.upperLimit = upperLimit;
        this.gramsEaten = gramsEaten;
        this.gramsRDA = gramsRDA; //use RDA or not ? 
        this.subNutrients = subNutrients;
        //If no calories are involved (water, fiber)
        if (!this.lowerLimit || !this.upperLimit) {
            this.minGrams = gramsRDA;
        }
        else {
            var calsInGram = [exports.macronutrient.carb, exports.macronutrient.sugars, exports.macronutrient.protein].includes(this.label) ? 4 : 9;
            //Use gramsRDA as lower LIMIT
            //If there is a minimum amount of grams RDA (CARBS AND PROTEIN)
            this.minAmountPercentage = this.lowerLimit / 100;
            this.minCals = this.minAmountPercentage * maxEnergy;
            this.minGrams = this.minCals / calsInGram;
            this.maxAmountPercentage = this.upperLimit / 100;
            this.maxCals = this.maxAmountPercentage * maxEnergy;
            this.maxGrams = this.maxCals / calsInGram;
            this.totalCalsEaten = this.gramsEaten * calsInGram;
            this.calsEatenBySector = [0, 0];
            if (render) {
                //if total exceedes max
                if (this.totalCalsEaten > this.maxCals) {
                    this.calsEatenBySector = [this.minCals, this.maxCals];
                    this.calsRemainingBySector = [0, 0];
                    this.warningLabel = "!";
                }
                //if total exceeds only minimum
                else if (this.totalCalsEaten > this.minCals) {
                    this.calsEatenBySector = [this.minCals, this.totalCalsEaten - this.minCals];
                    this.calsRemainingBySector = [0, this.maxCals - this.calsEatenBySector[1]];
                }
                //if total < minmum
                else {
                    this.calsEatenBySector = [this.totalCalsEaten, 0];
                    this.calsRemainingBySector = [this.minCals - this.calsEatenBySector[0], this.maxCals - this.minCals];
                }
                this.freeSectorPercentage = this.calsEatenBySector[1] / maxEnergy;
                this.startAngle = [0, 0];
                this.endAngle = [0, 0];
            }
        }
    }
    ;
    return MacroNutrient;
}());
exports.MacroNutrient = MacroNutrient;
var MicroNutrient = /** @class */ (function () {
    function MicroNutrient(_a) {
        var name = _a.name, lowerLimit = _a.lowerLimit, upperLimit = _a.upperLimit, amountEaten = _a.amountEaten, unit = _a.unit;
        this.name = name;
        this.unit = unit;
        this.lowerLimit = lowerLimit;
        this.upperLimit = upperLimit;
        this.amountEaten = amountEaten;
        this.checked = false;
        if (this.amountEaten < this.lowerLimit) {
            this.percentageEaten = (this.amountEaten / this.lowerLimit) * 100;
            this.percentageRemaining = 98 - this.percentageEaten;
        }
        else {
            this.checked = true;
            if (this.upperLimit) {
                this.percentageEaten = 100 + ((this.amountEaten - this.lowerLimit) / (this.upperLimit - this.lowerLimit) * 100);
            }
            else {
                this.percentageEaten = 100;
            }
            this.name = this.percentageEaten < 200 ? "✓ " + this.name : "! " + this.name;
            this.percentageRemaining = 0;
        }
    }
    return MicroNutrient;
}());
exports.MicroNutrient = MicroNutrient;
