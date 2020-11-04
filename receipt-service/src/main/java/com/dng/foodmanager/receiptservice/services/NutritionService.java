package com.dng.foodmanager.receiptservice.services;

import com.dng.foodmanager.receiptservice.dto.ActivityDto;
import com.dng.foodmanager.receiptservice.dto.NutritionRdaDto;
import com.dng.foodmanager.receiptservice.dto.NutritionStateDto;

import java.util.List;

public interface NutritionService {
    List<ActivityDto> getActivities();
    NutritionStateDto getNutritionStateDto(String userId);
    NutritionRdaDto getNutritionRda(String userId);
}
