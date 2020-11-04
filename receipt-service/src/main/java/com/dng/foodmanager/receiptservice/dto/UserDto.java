package com.dng.foodmanager.receiptservice.dto;

import com.dng.foodmanager.receiptservice.util.NutritionUtil.ActivityFactor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@RequiredArgsConstructor
@Getter
@Setter
public class UserDto {
    private final Integer weightKg;//kg
    private final Integer heightCm;//cm
    private final Integer ageY;
    private final Boolean male;
//    private final boolean lactation;
//    private final boolean pregnancy;
    private final ActivityFactor activityFactor;

}
