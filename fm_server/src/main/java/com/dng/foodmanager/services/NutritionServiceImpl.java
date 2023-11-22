package com.dng.foodmanager.services;

import com.dng.foodmanager.domain.LifeStageGroup;
import com.dng.foodmanager.domain.NutritionRDA;
import com.dng.foodmanager.domain.NutritionState;
import com.dng.foodmanager.domain.User;
import com.dng.foodmanager.dto.ActivityDto;
import com.dng.foodmanager.dto.ChronoUnit;
import com.dng.foodmanager.dto.nutrition_dtos.NutritionRdaDto;
import com.dng.foodmanager.dto.nutrition_dtos.NutritionStateDto;
import com.dng.foodmanager.repositories.*;
import com.dng.foodmanager.util.NutritionUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class NutritionServiceImpl implements NutritionService {

    private final NutritionUtil nutritionUtil;
    private final NutritionStateRepository nutritionStateRepository;
    private final NutritionRDARepository nutritionRDARepository;
    private final UserRepository userRepository;
    private final LifeStageGroupRepository lifeStageGroupRepository;

    private final FoodHistoryRepository foodHistoryRepository;
    @Override
    public List<ActivityDto> getActivities() {
        return nutritionUtil.getActivityFactors();
    }

    @Override
    public NutritionStateDto getNutritionStateDto(String userId, Integer timeAgo, ChronoUnit chronoUnit) {
        Instant now = Instant.now();
        if(timeAgo == null || timeAgo <= 0)
            timeAgo = 0;
        if(chronoUnit == null){
            chronoUnit = ChronoUnit.DAYS;
        }
        java.time.temporal.ChronoUnit javaChronoUnit = java.time.temporal.ChronoUnit.valueOf(chronoUnit.toString());
        Instant startDate = now.minus(timeAgo,javaChronoUnit );


        List<NutritionState> nutritionStateList = nutritionStateRepository.findByUserIdAndDate(userId, startDate, now);
        NutritionState nutritionState = new NutritionState(userId, now);
        nutritionStateList.forEach(nutritionState::add);
        return nutritionState.convertToDto();
    }

    @Override
    public NutritionRdaDto getNutritionRda(String userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if(userOptional.isPresent()){
            User user = userOptional.get();
            Optional<LifeStageGroup> lifeStageGroupOptional = user.getLifeStageGroup();
            if(lifeStageGroupOptional.isPresent()){
                Optional<NutritionRDA> nutritionRDAOptional = nutritionRDARepository.findById(lifeStageGroupOptional.get().getId());
                if(nutritionRDAOptional.isPresent()){
                    NutritionRdaDto nutritionRdaDto = nutritionRDAOptional.get().convertToDto();
                    nutritionRdaDto.setEnergy_kcal(user.getDailyCalories());
                    nutritionRdaDto.setUserDetails(true);
                    return nutritionRdaDto;
                }

            }
        }

        return new NutritionRdaDto(false);
    }


}
