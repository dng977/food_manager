package com.dng.foodmanager.receiptservice.util;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.stereotype.Service;

import java.util.EnumMap;
import java.util.Map;

@Service
public class NutritionUtilImpl implements NutritionUtil {
    private final Map<ActivityFactor, Pair<String, Float>> activityFactorMap;
    private final int initConstantMen = 655;
    private final float weightConstantMen = 9.6f;
    private final float heightConstantMen = 1.8f;
    private final float ageConstantMen = 4.7f;


    private final int initConstantWomen = 66;
    private final float weightConstantWomen = 13.7f ;
    private final float heightConstantWomen = 5f ;
    private final float ageConstantWomen = 6.8f ;

    public NutritionUtilImpl() {
        this.activityFactorMap = Map.of(
                ActivityFactor.SEDENTARY,Pair.of("little or no exercise", 1.2f),
                ActivityFactor.LIGHTLY_ACTIVE,Pair.of("light exercise/sports 1-3 days/week", 1.375f),
                ActivityFactor.MODERATELY_ACTIVE,Pair.of("moderate exercise/sports 3-5 days/week", 1.55f),
                ActivityFactor.VERY_ACTIVE,Pair.of("hard exercise/sports 6-7 days a week", 1.725f),
                ActivityFactor.EXTRA_ACTIVE,Pair.of("very hard exercise/sports & physical job or 2x training", 1.9f)
                );
    }

    @Override
    public int calculateCalories(boolean men, int weight, int height, int age, ActivityFactor activityFactor) {
        float bmr = calculateBMR(men,weight,height,age);
        return Math.round(bmr * activityFactorMap.get(activityFactor).getRight());
    }

    private float calculateBMR(boolean men, int weight, int height, int age) {
        return men
                ? initConstantMen + (weightConstantMen * weight) + (heightConstantMen * height) - (ageConstantMen * age)
                : initConstantWomen  + (weightConstantWomen * weight) + (heightConstantWomen * height) - (ageConstantWomen * age);
    }


}
