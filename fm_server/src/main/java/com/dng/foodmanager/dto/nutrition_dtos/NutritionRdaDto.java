package com.dng.foodmanager.dto.nutrition_dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NutritionRdaDto {
    private Boolean userDetails;

    private Integer energy_kcal;
    
    private Float water_g;// L/d
    
    private Integer carbohydrates_g; // g/d
    
    private Integer fiber_g; // g/d
    
    private Integer fat_g; // g/d
    
    private Float omega6_g; // g/d
    
    private Float omega3_g; // g/d
    
    private Integer protein_g; // g/d
    
    private Integer cholesterol_mg; // mg/d(CLVC)

    //Acceptable MacroNutrient Distribution Ranges:
    
    private Integer fatLLimit; // %
    
    private Integer fatULimit; // %

    
    private Integer monoFatLLimit; // %(CLVC)
    
    private Integer monoFatULimit; // %(CLVC)

    
    private Integer polyFatLLimit; // %(CLVC)
    
    private Integer polyFatULimit; // %(CLVC)

    
    private Float omega6LLimit; // %
    
    private Float omega6ULimit; // %

    
    private Float omega3LLimit; // %
    
    private Float omega3ULimit; // %

    
    private Integer carbLLimit; // %
    
    private Integer carbULimit; // %


    private Integer satFatLLimit; // % (CLVC)

    private Integer satFatULimit; // % (CLVC)

    
    private Integer sugarULimit; // % (British Nutrition Foundation)

    
    private Integer proteinLLimit; // %
    
    private Integer proteinULimit; // %

    //--Tolerable Upper Intakes Levels--

    //----Vitamins----
    
    private Integer vitaminAUpper_mcg; // μg/d
    
    private Integer vitaminCUpper_mg; // mg/d
    
    private Integer vitaminDUpper_mcg; // μg/d
    
    private Integer vitaminEUpper_mg; // mg/d
    
    private Integer niacinB3Upper_mg; // mg/d
    
    private Integer vitaminB6Upper_mg; // mg/d
    
    private Integer folateB9Upper_mcg; // μg/d
    
    private Integer cholineUpper_mg; // mg/d

    //----Minerals----
    
    private Integer calciumUpper_mg; // mg/d
    
    private Integer copperUpper_mcg; // μg/d
    
    private Integer fluorideUpper_mg; // mg/d
    
    private Integer iodineUpper_mcg; // μg/d
    
    private Integer ironUpper_mg; // mg/d
    
    private Integer magnesiumUpper_mg; // mg/d
    
    private Integer manganeseUpper_mg; // mg/d
    
    private Integer molybdenumUpper_mcg; // μg/d
    
    private Integer phosphorusUpper_mg; // mg/d
    
    private Integer seleniumUpper_mcg; // μg/d
    
    private Integer zincUpper_mg; // mg/d
    
    private Float chlorideUpper_g; // g/d



    //----MicroNutrients----

    //Vitamins
    
    private Integer vitaminA_mcg; // μg/d RAE
    
    private Integer vitaminC_mg; // mg/d
    
    private Integer vitaminD_mcg; // μg/d
    
    private Integer vitaminE_mg; // mg/d
    
    private Integer vitaminK_mcg; // μg/d
    
    private Integer thiaminB1_mg; // mg/d
    
    private Integer riboflavinB2_mg; // mg/d
    
    private Integer niacinB3_mg; // mg/d
    
    private Integer vitaminB6_mg; // mg/d
    
    private Integer folateB9_mcg; // μg/d
    
    private Integer vitaminB12_mcg; // μg/d
    
    private Integer pantothenicAcidB5_mg; // mg/d
    
    private Integer biotinB7_mcg; // μg/d
    
    private Integer choline_mg; // mg/d

    //Minerals
    
    private Integer calcium_mg; // mg/d
    
    private Integer chromium_mcg; // μg/d
    
    private Integer copper_mcg; // μg/d
    
    private Integer fluoride_mg; // mg/d
    
    private Integer iodine_mcg; // μg/d
    
    private Integer iron_mg; // mg/d
    
    private Integer magnesium_mg; // mg/d
    
    private Integer manganese_mg; // mg/d
    
    private Integer molybdenum_mcg; // μg/d
    
    private Integer phosphorus_mg; // mg/d
    
    private Integer selenium_mcg; // μg/d
    
    private Integer zinc_mg; // mg/d
    
    private Integer potassium_mg; // mg/d
    
    private Integer sodium_mg; // mg/d
    
    private Float chloride_g; // g/d

    public NutritionRdaDto(Boolean userDetails) {
        this.userDetails = userDetails;
    }


    public NutritionRdaDto(Float water_g, Integer carbohydrates_g, Integer fiber_g, Integer fat_g, Float omega6_g, Float omega3_g, Integer protein_g, Integer cholesterol_mg, Integer fatLLimit, Integer fatULimit, Integer monoFatLLimit, Integer monoFatULimit, Integer polyFatLLimit, Integer polyFatULimit, Float omega6LLimit, Float omega6ULimit, Float omega3LLimit, Float omega3ULimit, Integer carbLLimit, Integer carbULimit,Integer satFatLLimit, Integer satFatULimit, Integer sugarULimit, Integer proteinLLimit, Integer proteinULimit, Integer vitaminAUpper_mcg, Integer vitaminCUpper_mg, Integer vitaminDUpper_mcg, Integer vitaminEUpper_mg, Integer niacinB3Upper_mg, Integer vitaminB6Upper_mg, Integer folateB9Upper_mcg, Integer cholineUpper_mg, Integer calciumUpper_mg, Integer copperUpper_mcg, Integer fluorideUpper_mg, Integer iodineUpper_mcg, Integer ironUpper_mg, Integer magnesiumUpper_mg, Integer manganeseUpper_mg, Integer molybdenumUpper_mcg, Integer phosphorusUpper_mg, Integer seleniumUpper_mcg, Integer zincUpper_mg, Float chlorideUpper_g, Integer vitaminA_mcg, Integer vitaminC_mg, Integer vitaminD_mcg, Integer vitaminE_mg, Integer vitaminK_mcg, Integer thiaminB1_mg, Integer riboflavinB2_mg, Integer niacinB3_mg, Integer vitaminB6_mg, Integer folateB9_mcg, Integer vitaminB12_mcg, Integer pantothenicAcidB5_mg, Integer biotinB7_mcg, Integer choline_mg, Integer calcium_mg, Integer chromium_mcg, Integer copper_mcg, Integer fluoride_mg, Integer iodine_mcg, Integer iron_mg, Integer magnesium_mg, Integer manganese_mg, Integer molybdenum_mcg, Integer phosphorus_mg, Integer selenium_mcg, Integer zinc_mg, Integer potassium_mg, Integer sodium_mg, Float chloride_g) {
        this.water_g = water_g;
        this.carbohydrates_g = carbohydrates_g;
        this.fiber_g = fiber_g;
        this.fat_g = fat_g;
        this.omega6_g = omega6_g;
        this.omega3_g = omega3_g;
        this.protein_g = protein_g;
        this.cholesterol_mg = cholesterol_mg;
        this.fatLLimit = fatLLimit;
        this.fatULimit = fatULimit;
        this.monoFatLLimit = monoFatLLimit;
        this.monoFatULimit = monoFatULimit;
        this.polyFatLLimit = polyFatLLimit;
        this.polyFatULimit = polyFatULimit;
        this.omega6LLimit = omega6LLimit;
        this.omega6ULimit = omega6ULimit;
        this.omega3LLimit = omega3LLimit;
        this.omega3ULimit = omega3ULimit;
        this.carbLLimit = carbLLimit;
        this.carbULimit = carbULimit;
        this.satFatLLimit = satFatLLimit;
        this.satFatULimit = satFatULimit;
        this.sugarULimit = sugarULimit;
        this.proteinLLimit = proteinLLimit;
        this.proteinULimit = proteinULimit;
        this.vitaminAUpper_mcg = vitaminAUpper_mcg;
        this.vitaminCUpper_mg = vitaminCUpper_mg;
        this.vitaminDUpper_mcg = vitaminDUpper_mcg;
        this.vitaminEUpper_mg = vitaminEUpper_mg;
        this.niacinB3Upper_mg = niacinB3Upper_mg;
        this.vitaminB6Upper_mg = vitaminB6Upper_mg;
        this.folateB9Upper_mcg = folateB9Upper_mcg;
        this.cholineUpper_mg = cholineUpper_mg;
        this.calciumUpper_mg = calciumUpper_mg;
        this.copperUpper_mcg = copperUpper_mcg;
        this.fluorideUpper_mg = fluorideUpper_mg;
        this.iodineUpper_mcg = iodineUpper_mcg;
        this.ironUpper_mg = ironUpper_mg;
        this.magnesiumUpper_mg = magnesiumUpper_mg;
        this.manganeseUpper_mg = manganeseUpper_mg;
        this.molybdenumUpper_mcg = molybdenumUpper_mcg;
        this.phosphorusUpper_mg = phosphorusUpper_mg;
        this.seleniumUpper_mcg = seleniumUpper_mcg;
        this.zincUpper_mg = zincUpper_mg;
        this.chlorideUpper_g = chlorideUpper_g;
        this.vitaminA_mcg = vitaminA_mcg;
        this.vitaminC_mg = vitaminC_mg;
        this.vitaminD_mcg = vitaminD_mcg;
        this.vitaminE_mg = vitaminE_mg;
        this.vitaminK_mcg = vitaminK_mcg;
        this.thiaminB1_mg = thiaminB1_mg;
        this.riboflavinB2_mg = riboflavinB2_mg;
        this.niacinB3_mg = niacinB3_mg;
        this.vitaminB6_mg = vitaminB6_mg;
        this.folateB9_mcg = folateB9_mcg;
        this.vitaminB12_mcg = vitaminB12_mcg;
        this.pantothenicAcidB5_mg = pantothenicAcidB5_mg;
        this.biotinB7_mcg = biotinB7_mcg;
        this.choline_mg = choline_mg;
        this.calcium_mg = calcium_mg;
        this.chromium_mcg = chromium_mcg;
        this.copper_mcg = copper_mcg;
        this.fluoride_mg = fluoride_mg;
        this.iodine_mcg = iodine_mcg;
        this.iron_mg = iron_mg;
        this.magnesium_mg = magnesium_mg;
        this.manganese_mg = manganese_mg;
        this.molybdenum_mcg = molybdenum_mcg;
        this.phosphorus_mg = phosphorus_mg;
        this.selenium_mcg = selenium_mcg;
        this.zinc_mg = zinc_mg;
        this.potassium_mg = potassium_mg;
        this.sodium_mg = sodium_mg;
        this.chloride_g = chloride_g;
    }
}
