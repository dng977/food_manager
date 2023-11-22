package com.dng.foodmanager.services;

import com.dng.foodmanager.domain.FoodNutrition;
import com.dng.foodmanager.domain.NutritionState;
import com.dng.foodmanager.domain.WholeFood;
import com.dng.foodmanager.dto.food_dtos.EatFoodDto;
import com.dng.foodmanager.dto.nutrition_dtos.NutritionStateDto;

import java.util.Optional;
public interface FoodService {
    NutritionStateDto eat(String userId, EatFoodDto eatFoodDto);

    default void updateNutritionStateForWholeFood(NutritionState nutritionState, WholeFood wholeFood, int quantity, boolean cooked) {
        Optional<FoodNutrition> foodNutritionOptional = cooked ? wholeFood.getNutritionCooked() : wholeFood.getNutritionRaw();
        System.out.println(foodNutritionOptional.toString());
        if (foodNutritionOptional.isEmpty())
            throw new IllegalArgumentException("Nutrition info for either raw or cooked isn't present: " + wholeFood.getName() + ", " + wholeFood.getId());
        FoodNutrition foodNutrition = foodNutritionOptional.get();
        nutritionState.setNutrients(
                quantity,
                true,
                foodNutrition.getEnergy_kcal().isPresent() ? foodNutrition.getEnergy_kcal().get() : 0,
                foodNutrition.getWater_g().isPresent() ? foodNutrition.getWater_g().get() : 0,
                foodNutrition.getCarbohydrates_g().isPresent() ? foodNutrition.getCarbohydrates_g().get() : 0,
                foodNutrition.getFiber_g().isPresent() ? foodNutrition.getFiber_g().get() : 0,
                foodNutrition.getFat_g().isPresent() ? foodNutrition.getFat_g().get() : 0,
                foodNutrition.getSatFat_g().isPresent() ? foodNutrition.getSatFat_g().get() : 0,
                foodNutrition.getMonoFat_g().isPresent() ? foodNutrition.getMonoFat_g().get() : 0,
                foodNutrition.getPolyFat_g().isPresent() ? foodNutrition.getPolyFat_g().get() : 0,
                foodNutrition.getOmega6_g().isPresent() ? foodNutrition.getOmega6_g().get() : 0,
                foodNutrition.getOmega3_g().isPresent() ? foodNutrition.getOmega3_g().get() : 0,
                foodNutrition.getProtein_g().isPresent() ? foodNutrition.getProtein_g().get() : 0,
                foodNutrition.getCholesterol_mg().isPresent() ? foodNutrition.getCholesterol_mg().get() : 0,
                foodNutrition.getSugar_g().isPresent() ? foodNutrition.getSugar_g().get() : 0,
                foodNutrition.getSucrose_g().isPresent() ? foodNutrition.getSucrose_g().get() : 0,
                foodNutrition.getVitaminA_mcg().isPresent() ? foodNutrition.getVitaminA_mcg().get() : 0,
                foodNutrition.getVitaminC_mg().isPresent() ? foodNutrition.getVitaminC_mg().get() : 0,
                foodNutrition.getVitaminD_mcg().isPresent() ? foodNutrition.getVitaminD_mcg().get() : 0,
                foodNutrition.getVitaminE_mg().isPresent() ? foodNutrition.getVitaminE_mg().get() : 0,
                foodNutrition.getVitaminK_mcg().isPresent() ? foodNutrition.getVitaminK_mcg().get() : 0,
                foodNutrition.getThiaminB1_mg().isPresent() ? foodNutrition.getThiaminB1_mg().get() : 0,
                foodNutrition.getRiboflavinB2_mg().isPresent() ? foodNutrition.getRiboflavinB2_mg().get() : 0,
                foodNutrition.getNiacinB3_mg().isPresent() ? foodNutrition.getNiacinB3_mg().get() : 0,
                foodNutrition.getVitaminB6_mg().isPresent() ? foodNutrition.getVitaminB6_mg().get() : 0,
                foodNutrition.getFolateB9_mcg().isPresent() ? foodNutrition.getFolateB9_mcg().get() : 0,
                foodNutrition.getVitaminB12_mcg().isPresent() ? foodNutrition.getVitaminB12_mcg().get() : 0,
                foodNutrition.getPantothenicAcidB5_mg().isPresent() ? foodNutrition.getPantothenicAcidB5_mg().get() : 0,
                0,
                foodNutrition.getCholine_mg().isPresent() ? foodNutrition.getCholine_mg().get() : 0,
                foodNutrition.getCalcium_mg().isPresent() ? foodNutrition.getCalcium_mg().get() : 0,
                0,
                foodNutrition.getCopper_mg().isPresent() ? foodNutrition.getCopper_mg().get() : 0,
                0,
                0,
                foodNutrition.getIron_mg().isPresent() ? foodNutrition.getIron_mg().get() : 0,
                foodNutrition.getMagnesium_mg().isPresent() ? foodNutrition.getMagnesium_mg().get() : 0,
                foodNutrition.getManganese_mg().isPresent() ? foodNutrition.getManganese_mg().get() : 0,
                0,
                foodNutrition.getPhosphorus_mg().isPresent() ? foodNutrition.getPhosphorus_mg().get() : 0,
                foodNutrition.getSelenium_mcg().isPresent() ? foodNutrition.getSelenium_mcg().get() : 0,
                foodNutrition.getZinc_mg().isPresent() ? foodNutrition.getZinc_mg().get() : 0,
                foodNutrition.getPotassium_mg().isPresent() ? foodNutrition.getPotassium_mg().get() : 0,
                foodNutrition.getSodium_mg().isPresent() ? foodNutrition.getSodium_mg().get() : 0,
                0,
                foodNutrition.getLycopene_mcg().isPresent() ? foodNutrition.getLycopene_mcg().get() : 0,
                foodNutrition.getLutZea_mcg().isPresent() ? foodNutrition.getLutZea_mcg().get() : 0
        );
        System.out.println("NUTRITION STATE: 2 : " +  nutritionState.getEnergy_kcal());
    }


}
