
export const macronutrient = {
  carb: 'Carbs',
  sugars: 'Sugars',
  protein: 'Protein',
  fat: 'Fat',
  monoFat: 'Monounsaturated fat',
  polyFat: 'Polyunsaturated fat',
  omega3: 'Omega 3',
  omega6: 'Omega 6',
  satFat: 'Saturated fat'

}

export class MacroNutrient {
  constructor(label, lowerLimit, upperLimit, gramsRDA, gramsEaten,maxEnergy, {colorEaten, colorRemaining}, subNutrients) {
    this.label = label;
    //color
    this.colorEaten = colorEaten;
    this.colorRemaining = colorRemaining;
    //nutrition
    this.lowerLimit = lowerLimit;
    this.upperLimit = upperLimit;
    this.gramsEaten = gramsEaten;
    this.gramsRDA = gramsRDA;

    let calsInGram = [macronutrient.carb, macronutrient.sugars, macronutrient.protein].includes(this.label) ? 4 :  9;
    
    this.calsEaten = [this.gramsEaten * calsInGram, 0];
    this.calsRemaining = [0, 0];
    this.minAmountPercentage = [0, 0];

    //If there is a minimum amount of grams RDA (CARBS AND PROTEIN)
    if(this.gramsRDA){
      let minAmountCals = this.gramsRDA * calsInGram;
      this.lowerLimit = minAmountCals / maxEnergy * 100;
    }

    if(this.lowerLimit){
      this.calsRemaining[0] = this.lowerLimit / 100 * maxEnergy - this.calsEaten[0];
      this.minAmountPercentage[0] = this.calsRemaining[0] / maxEnergy;
      //If calories are more than the minimum
      if(this.calsRemaining[0] < 0) {
        //Show them in another pie(2) and transfer the values to it
        this.calsEaten[1] = -1 * this.calsRemaining[0];

        this.calsRemaining[0] = 0;
        this.calsEaten[0] = this.calsEaten[0] - this.calsEaten[1];
        
        this.minAmountPercentage[1] = this.calsEaten[1] / maxEnergy;
      }
    }else{ //satfat exception calsEaten = calsEaten2
      this.calsRemaining[0] = 0;
      this.minAmountPercentage[0] = this.calsEaten[0] / maxEnergy;
    }

    //show max when exceeded
    this.maxAmountPercentage = this.upperLimit / 100;   

    this.subNutrients = subNutrients;

    this.startAngle = [0, 0];

    this.getEndAngle1 = () => this.startAngle[0] - 1 + this.minAmountPercentage[0] * 360;
    this.getEndAngle2 = () => this.startAngle[1] - 1 - this.minAmountPercentage[1] * 360;
  };
    
} 