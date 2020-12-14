/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.27.744 on 2020-12-06 16:32:21.

export interface ActivityDto {
    activityFactor: ActivityFactor;
    description: string;
}

export interface UserDto {
    weightKg: number;
    heightCm: number;
    ageY: number;
    male: boolean;
    activityFactor: ActivityFactor;
}

export interface EatFoodDto {
    foodId: number;
    quantity: number;
    cooked?: boolean;
}

export interface FoodItemDto {
    id: number;
    name?: string;
    defaultQuantity?: number;
    servingSize?: number;
    servingDesc?: string;
    nutrition?: FoodNutrition;
}

export interface FoodStockDto {
    foodItemDto: FoodItemDto;
    quantity: number;
    hasRaw?: boolean;
    hasCooked?: boolean;
}

export interface MealDto {
    id: number;
    name: string;
    description: string;
    quantity: number;
    ingredients: MealItemDto[];
}

export interface MealItemDto {
    foodItemId: number;
    quantity: number;
    cooked: boolean;
}

export interface NutritionRdaDto {
    userDetails: boolean;
    energy_kcal: number;
    water_g: number;
    carbohydrates_g: number;
    fiber_g: number;
    fat_g: number;
    omega6_g: number;
    omega3_g: number;
    protein_g: number;
    cholesterol_mg: number;
    fatLLimit: number;
    fatULimit: number;
    monoFatLLimit: number;
    monoFatULimit: number;
    polyFatLLimit: number;
    polyFatULimit: number;
    omega6LLimit: number;
    omega6ULimit: number;
    omega3LLimit: number;
    omega3ULimit: number;
    carbLLimit: number;
    carbULimit: number;
    satFatLLimit: number;
    satFatULimit: number;
    sugarULimit: number;
    proteinLLimit: number;
    proteinULimit: number;
    vitaminAUpper_mcg: number;
    vitaminCUpper_mg: number;
    vitaminDUpper_mcg: number;
    vitaminEUpper_mg: number;
    niacinB3Upper_mg: number;
    vitaminB6Upper_mg: number;
    folateB9Upper_mcg: number;
    cholineUpper_mg: number;
    calciumUpper_mg: number;
    copperUpper_mcg: number;
    fluorideUpper_mg: number;
    iodineUpper_mcg: number;
    ironUpper_mg: number;
    magnesiumUpper_mg: number;
    manganeseUpper_mg: number;
    molybdenumUpper_mcg: number;
    phosphorusUpper_mg: number;
    seleniumUpper_mcg: number;
    zincUpper_mg: number;
    chlorideUpper_g: number;
    vitaminA_mcg: number;
    vitaminC_mg: number;
    vitaminD_mcg: number;
    vitaminE_mg: number;
    vitaminK_mcg: number;
    thiaminB1_mg: number;
    riboflavinB2_mg: number;
    niacinB3_mg: number;
    vitaminB6_mg: number;
    folateB9_mcg: number;
    vitaminB12_mcg: number;
    pantothenicAcidB5_mg: number;
    biotinB7_mcg: number;
    choline_mg: number;
    calcium_mg: number;
    chromium_mcg: number;
    copper_mcg: number;
    fluoride_mg: number;
    iodine_mcg: number;
    iron_mg: number;
    magnesium_mg: number;
    manganese_mg: number;
    molybdenum_mcg: number;
    phosphorus_mg: number;
    selenium_mcg: number;
    zinc_mg: number;
    potassium_mg: number;
    sodium_mg: number;
    chloride_g: number;
}

export interface NutritionStateDto {
    date: Date;
    energy: number;
    macroNutrients: MacroNutrients;
    vitamins: Vitamins;
    minerals: Minerals;
}

export interface MacroNutrients {
    water_g: number;
    carbohydrates_g: number;
    fiber_g: number;
    fat_g: number;
    satFat_g: number;
    monoFat_g: number;
    polyFat_g: number;
    omega6_g: number;
    omega3_g: number;
    protein_g: number;
    cholesterol_mg: number;
    sugar_g: number;
    sucrose_g: number;
}

export interface Minerals {
    calcium_mg: number;
    chromium_mcg: number;
    copper_mcg: number;
    fluoride_mg: number;
    iodine_mcg: number;
    iron_mg: number;
    magnesium_mg: number;
    manganese_mg: number;
    molybdenum_mcg: number;
    phosphorus_mg: number;
    selenium_mcg: number;
    zinc_mg: number;
    potassium_mg: number;
    sodium_mg: number;
    chloride_g: number;
}

export interface Vitamins {
    vitaminA_mcg: number;
    vitaminC_mg: number;
    vitaminD_mcg: number;
    vitaminE_mg: number;
    vitaminK_mcg: number;
    thiaminB1_mg: number;
    riboflavinB2_mg: number;
    niacinB3_mg: number;
    vitaminB6_mg: number;
    folateB9_mcg: number;
    vitaminB12_mcg: number;
    pantothenicAcidB5_mg: number;
    biotinB7_mcg: number;
    choline_mg: number;
}

export interface ReceiptDto {
    id: number;
    storeName: string;
    date: string;
    confirmed: boolean;
    receiptItemList: ReceiptItemDto[];
}

export interface ReceiptItemDto {
    id: number;
    referenceName: string;
    foodItemReceiptDto: FoodItemDto[];
    status: ReceiptItemStatus;
}

export interface FoodNutrition {
    ndbNo: number;
    shrtDesc?: string;
    water_g?: number;
    energy_kcal?: number;
    protein_g?: number;
    fat_g?: number;
    ash_g?: number;
    carbohydrates_g?: number;
    fiber_g?: number;
    sugar_g?: number;
    sucrose_g?: number;
    calcium_mg?: number;
    iron_mg?: number;
    magnesium_mg?: number;
    phosphorus_mg?: number;
    potassium_mg?: number;
    sodium_mg?: number;
    zinc_mg?: number;
    copper_mg?: number;
    manganese_mg?: number;
    selenium_mcg?: number;
    vitaminC_mg?: number;
    thiaminB1_mg?: number;
    riboflavinB2_mg?: number;
    niacinB3_mg?: number;
    pantothenicAcidB5_mg?: number;
    vitaminB6_mg?: number;
    folateB9_mcg?: number;
    folicAcid_mcg?: number;
    foodFolate_mcg?: number;
    folateDFE_mcg?: number;
    choline_mg?: number;
    vitaminB12_mcg?: number;
    vitaminA_mcg?: number;
    vitAIU?: number;
    retinol?: number;
    alphaCarot?: number;
    betaCarot?: number;
    betaCrypt?: number;
    lycopene_mcg?: number;
    lutZea_mcg?: number;
    vitaminE_mg?: number;
    vitaminD_mcg?: number;
    vitDUI?: number;
    vitaminK_mcg?: number;
    satFat_g?: number;
    monoFat_g?: number;
    polyFat_g?: number;
    omega3_g?: number;
    omega6_g?: number;
    cholesterol_mg?: number;
    serving1_g?: number;
    serving1_desc?: string;
    serving2_g?: number;
    serving2_desc?: string;
    refuse?: number;
}

export enum ActivityFactor {
    SEDENTARY = "SEDENTARY",
    LIGHTLY_ACTIVE = "LIGHTLY_ACTIVE",
    MODERATELY_ACTIVE = "MODERATELY_ACTIVE",
    VERY_ACTIVE = "VERY_ACTIVE",
    EXTRA_ACTIVE = "EXTRA_ACTIVE",
}

export enum ReceiptItemStatus {
    UNRECOGNIZED = "UNRECOGNIZED",
    UNSURE = "UNSURE",
    RECOGNIZED = "RECOGNIZED",
    INSTOCK = "INSTOCK",
}
