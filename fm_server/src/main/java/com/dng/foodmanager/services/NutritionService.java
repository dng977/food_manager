package com.dng.foodmanager.services;

import com.dng.foodmanager.dto.ActivityDto;
import com.dng.foodmanager.dto.ChronoUnit;
import com.dng.foodmanager.dto.nutrition_dtos.NutritionRdaDto;
import com.dng.foodmanager.dto.nutrition_dtos.NutritionStateDto;

import java.util.List;

public interface NutritionService {
    List<ActivityDto> getActivities();
    NutritionStateDto getNutritionStateDto(String userId, Integer timeAgo, ChronoUnit chronoUnit);
    NutritionRdaDto getNutritionRda(String userId);
}
