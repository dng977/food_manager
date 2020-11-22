package com.dng.foodmanager.receiptservice.dto;

import com.dng.foodmanager.receiptservice.domain.User;
import lombok.*;
import org.apache.tomcat.jni.Local;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@RequiredArgsConstructor
public class NutritionStateDto {
    private final LocalDate date;

    //----Nutrition----

    private final int energy;
    //----MacroNutrients----
    private MacroNutrients macroNutrients;
    
    // ----MicroNutrients----

    //Vitamins
    private Vitamins vitamins;
    //Minerals
    private Minerals minerals;

    public NutritionStateDto(LocalDate date){
        this.date = date;
        this.energy = 0;
        this.macroNutrients = new MacroNutrients();
        this.vitamins = new Vitamins();
        this.minerals = new Minerals();
    }

    public void setMacroNutrients(float water_g, float carbohydrates_g, float fiber_g, float fat_g, float satFat_g, float monoFat_g, float polyFat_g, float omega6_g, float omega3_g, float protein_g, int cholesterol_mg, float sugar_g, float sucrose_g) {
        this.macroNutrients = new MacroNutrients(water_g, carbohydrates_g, fiber_g, fat_g, satFat_g, monoFat_g, polyFat_g, omega6_g, omega3_g, protein_g, cholesterol_mg, sugar_g, sucrose_g);
    }

    public void setVitamins(float vitaminA_mcg, float vitaminC_mg, float vitaminD_mcg, float vitaminE_mg, float vitaminK_mcg, float thiaminB1_mg, float riboflavinB2_mg, float niacinB3_mg, float vitaminB6_mg, float folateB9_mcg, float vitaminB12_mcg, float pantothenicAcidB5_mg, float biotinB7_mcg, float choline_mg) {
        this.vitamins = new Vitamins(vitaminA_mcg, vitaminC_mg, vitaminD_mcg, vitaminE_mg, vitaminK_mcg, thiaminB1_mg, riboflavinB2_mg, niacinB3_mg, vitaminB6_mg, folateB9_mcg, vitaminB12_mcg, pantothenicAcidB5_mg, biotinB7_mcg, choline_mg);
    }

    public void setMinerals(int calcium_mg, float chromium_mcg, float copper_mcg, float fluoride_mg, float iodine_mcg, float iron_mg, float magnesium_mg, float manganese_mg, float molybdenum_mcg, int phosphorus_mg, float selenium_mcg, float zinc_mg, int potassium_mg, int sodium_mg, float chloride_g) {
        this.minerals = new Minerals(calcium_mg, chromium_mcg, copper_mcg, fluoride_mg, iodine_mcg, iron_mg, magnesium_mg, manganese_mg, molybdenum_mcg, phosphorus_mg, selenium_mcg, zinc_mg, potassium_mg, sodium_mg, chloride_g);
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    private class MacroNutrients {

        private float water_g;// L/d

        private float carbohydrates_g; // g/d

        private float fiber_g; // g/d

        private float fat_g; // g/d

        private float satFat_g; // g/d

        private float monoFat_g; // g/d

        private float polyFat_g; // g/d

        private float omega6_g; // g/d

        private float omega3_g; // g/d

        private float protein_g; // g/d

        private int cholesterol_mg; // mg/d

        private float sugar_g; // mg/d

        private float sucrose_g;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    private class Vitamins {
        private float vitaminA_mcg; // μg/d RAE

        private float vitaminC_mg; // mg/d

        private float vitaminD_mcg; // μg/d

        private float vitaminE_mg; // mg/d

        private float vitaminK_mcg; // μg/d

        private float thiaminB1_mg; // mg/d

        private float riboflavinB2_mg; // mg/d

        private float niacinB3_mg; // mg/d

        private float vitaminB6_mg; // mg/d

        private float folateB9_mcg; // μg/d

        private float vitaminB12_mcg; // μg/d

        private float pantothenicAcidB5_mg; // mg/d

        private float biotinB7_mcg; // μg/d -- NEED TO INCLUDE IN FOOD

        private float choline_mg; // mg/d

    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    private class Minerals {
        private int calcium_mg; // mg/d

        private float chromium_mcg; // μg/d -- NEED TO INCLUDE IN FOOD

        private float copper_mcg; // μg/d

        private float fluoride_mg; // mg/d -- NEED TO INCLUDE IN FOOD

        private float iodine_mcg; // μg/d -- NEED TO INCLUDE IN FOOD

        private float iron_mg; // mg/d

        private float magnesium_mg; // mg/d

        private float manganese_mg; // mg/d

        private float molybdenum_mcg; // μg/d -- NEED TO INCLUDE IN FOOD

        private int phosphorus_mg; // mg/d

        private float selenium_mcg; // μg/d

        private float zinc_mg; // mg/d

        private int potassium_mg; // mg/d

        private int sodium_mg; // mg/d

        private float chloride_g; // g/d -- NEED TO INCLUDE IN FOOp

    }


}
