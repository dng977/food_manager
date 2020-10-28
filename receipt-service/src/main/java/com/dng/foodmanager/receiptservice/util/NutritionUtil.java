package com.dng.foodmanager.receiptservice.util;

import com.dng.foodmanager.receiptservice.dto.ActivityDto;

import java.util.List;

public interface NutritionUtil {
    int calculateCalories(boolean men, int weight, int height, int age, ActivityFactor activityFactor);
    List<ActivityDto> getActivityFactors();

    enum ActivityFactor {
        SEDENTARY,
        LIGHTLY_ACTIVE,
        MODERATELY_ACTIVE,
        VERY_ACTIVE,
        EXTRA_ACTIVE
    };

}
