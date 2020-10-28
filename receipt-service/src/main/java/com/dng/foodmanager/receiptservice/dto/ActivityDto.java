package com.dng.foodmanager.receiptservice.dto;

import com.dng.foodmanager.receiptservice.util.NutritionUtil;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ActivityDto {
    private final NutritionUtil.ActivityFactor activityFactor;
    private final String description;
    @JsonIgnore
    private final float constant;
}
