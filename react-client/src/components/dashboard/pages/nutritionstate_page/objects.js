
export const macronutrient = {
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

}
export class MacroNutrientGeneral {
  constructor(label, limit, gramsRDA, gramsEaten,) {

  }
}

export class MacroNutrient {
  constructor({ render = true, label, lowerLimit, upperLimit, gramsRDA, gramsEaten, maxEnergy, color = { colorEaten: "black", colorRemaining: "black" }, subNutrients = [] }) {
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
      let calsInGram = [ macronutrient.carb, macronutrient.sugars, macronutrient.protein ].includes(this.label) ? 4 : 9;

      //Use gramsRDA as lower LIMIT
      //If there is a minimum amount of grams RDA (CARBS AND PROTEIN)


      this.minAmountPercentage = this.lowerLimit / 100;
      this.minCals = this.minAmountPercentage * maxEnergy;
      this.minGrams = this.minCals / calsInGram;

      this.maxAmountPercentage = this.upperLimit / 100;
      this.maxCals = this.maxAmountPercentage * maxEnergy;
      this.maxGrams = this.maxCals / calsInGram;

      this.totalCalsEaten = this.gramsEaten * calsInGram;
      this.calsEatenBySector=[0,0]

      if (render) {
        //if total exceedes max
        if (this.totalCalsEaten > this.maxCals) {
          this.calsEatenBySector = [ this.minCals, this.maxCals ];
          this.calsRemainingBySector = [ 0, 0 ]

          this.warningLabel = "!";
        }
        //if total exceeds only minimum
        else if (this.totalCalsEaten > this.minCals) {
          this.calsEatenBySector = [ this.minCals, this.totalCalsEaten - this.minCals ];
          this.calsRemainingBySector = [ 0, this.maxCals - this.calsEatenBySector[ 1 ] ];
        }
        //if total < minmum
        else {
          this.calsEatenBySector = [ this.totalCalsEaten, 0 ];
          this.calsRemainingBySector = [ this.minCals - this.calsEatenBySector[ 0 ], this.maxCals - this.minCals ];
        }

        this.freeSectorPercentage = this.calsEatenBySector[ 1 ] / maxEnergy;

        this.startAngle = [ 0, 0 ];
        this.endAngle = [ 0, 0 ]
      }
    }

  };

  setEndAngle = (sector, paddingAngle) => {
    if (sector === 0) {
      this.endAngle[ 0 ] = this.startAngle[ 0 ] - paddingAngle + this.minAmountPercentage * 360
    } else if (sector === 1) {
      this.endAngle[ 1 ] = this.startAngle[ 1 ] + paddingAngle - this.freeSectorPercentage * 360
    }
  }

} 

export class MicroNutrient {
  constructor({name, lowerLimit, upperLimit, amountEaten, unit}){
    this.name = name;
    this.unit = unit;
    this.lowerLimit = lowerLimit;
    this.upperLimit = upperLimit;
    this.amountEaten = amountEaten;
    this.checked = false;

    if(this.amountEaten < this.lowerLimit){
      this.percentageEaten = parseInt((this.amountEaten / this.lowerLimit) * 100, 10);
      this.percentageRemaining = 98 - this.percentageEaten;
    }else{
      this.checked = true;
      if(this.upperLimit){
        this.percentageEaten = parseInt(100 + ((this.amountEaten - this.lowerLimit) / (this.upperLimit - this.lowerLimit) * 100), 10);
        
      }else{
        this.percentageEaten = 100;
      }
      this.name = this.percentageEaten < 200 ? "✓ " + this.name : "! " + this.name;
      this.percentageRemaining = 0;
    }

  }
}