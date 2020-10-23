package com.dng.foodmanager.receiptservice.util;

public interface NutritionUtil {
    int calculateCalories(boolean men, int weight, int height, int age, ActivityFactor activityFactor);

    enum ActivityFactor {
        SEDENTARY,
        LIGHTLY_ACTIVE,
        MODERATELY_ACTIVE,
        VERY_ACTIVE,
        EXTRA_ACTIVE
    };

}
