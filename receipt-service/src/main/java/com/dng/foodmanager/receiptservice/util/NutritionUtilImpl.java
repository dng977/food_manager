package com.dng.foodmanager.receiptservice.util;

import com.dng.foodmanager.receiptservice.dto.ActivityDto;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class NutritionUtilImpl implements NutritionUtil {
    private final LinkedHashMap<ActivityFactor, ActivityDto> activityList;
    private final int initConstantMen = 655;
    private final float weightConstantMen = 9.6f;
    private final float heightConstantMen = 1.8f;
    private final float ageConstantMen = 4.7f;


    private final int initConstantWomen = 66;
    private final float weightConstantWomen = 13.7f;
    private final float heightConstantWomen = 5f;
    private final float ageConstantWomen = 6.8f;

    public NutritionUtilImpl() {
        this.activityList = new LinkedHashMap<>();
        this.activityList.put(ActivityFactor.SEDENTARY, new ActivityDto(ActivityFactor.SEDENTARY, "little or no exercise", 1.2f));
        this.activityList.put(ActivityFactor.LIGHTLY_ACTIVE, new ActivityDto(ActivityFactor.LIGHTLY_ACTIVE, "light exercise/sports 1-3 days/week", 1.375f));
        this.activityList.put(ActivityFactor.MODERATELY_ACTIVE, new ActivityDto(ActivityFactor.MODERATELY_ACTIVE, "moderate exercise/sports 3-5 days/week", 1.55f));
        this.activityList.put(ActivityFactor.VERY_ACTIVE, new ActivityDto(ActivityFactor.VERY_ACTIVE, "hard exercise/sports 6-7 days a week", 1.725f));
        this.activityList.put(ActivityFactor.EXTRA_ACTIVE, new ActivityDto(ActivityFactor.EXTRA_ACTIVE, "very hard exercise/sports & physical job or 2x training", 1.9f));
    }


    @Override
    public int calculateCalories(boolean men, int weight, int height, int age, ActivityFactor activityFactor) {
        float bmr = calculateBMR(men, weight, height, age);
        return Math.round(bmr * activityList.get(activityFactor).getConstant());
    }

    @Override
    public List<ActivityDto> getActivityFactors() {
        return new ArrayList<>(activityList.values());
    }

    private float calculateBMR(boolean men, int weight, int height, int age) {
        return men
                ? initConstantMen + (weightConstantMen * weight) + (heightConstantMen * height) - (ageConstantMen * age)
                : initConstantWomen + (weightConstantWomen * weight) + (heightConstantWomen * height) - (ageConstantWomen * age);
    }


}
