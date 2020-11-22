package com.dng.foodmanager.receiptservice.dto;

import com.dng.foodmanager.receiptservice.domain.ActivityFactor;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ActivityDto {
    private final ActivityFactor activityFactor;
    private final String description;
    @JsonIgnore
    private final float constant;
}
