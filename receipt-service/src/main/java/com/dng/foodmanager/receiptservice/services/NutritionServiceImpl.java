package com.dng.foodmanager.receiptservice.services;

import com.dng.foodmanager.receiptservice.dto.ActivityDto;
import com.dng.foodmanager.receiptservice.util.NutritionUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class NutritionServiceImpl implements NutritionService {

    private final NutritionUtil nutritionUtil;
    @Override
    public List<ActivityDto> getActivities() {
        return nutritionUtil.getActivityFactors();
    }
}
