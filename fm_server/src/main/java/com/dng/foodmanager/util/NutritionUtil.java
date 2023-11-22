package com.dng.foodmanager.util;

import com.dng.foodmanager.domain.ActivityFactor;
import com.dng.foodmanager.dto.ActivityDto;

import java.util.List;

public interface NutritionUtil {
    int calculateCalories(boolean men, int weight, int height, int age, ActivityFactor activityFactor);
    List<ActivityDto> getActivityFactors();

    ;

}
