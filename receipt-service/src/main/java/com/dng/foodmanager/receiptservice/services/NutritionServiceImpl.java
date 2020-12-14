package com.dng.foodmanager.receiptservice.services;

import com.dng.foodmanager.receiptservice.domain.LifeStageGroup;
import com.dng.foodmanager.receiptservice.domain.NutritionRDA;
import com.dng.foodmanager.receiptservice.domain.NutritionState;
import com.dng.foodmanager.receiptservice.domain.User;
import com.dng.foodmanager.receiptservice.dto.ActivityDto;
import com.dng.foodmanager.receiptservice.dto.nutrition_dtos.NutritionRdaDto;
import com.dng.foodmanager.receiptservice.dto.nutrition_dtos.NutritionStateDto;
import com.dng.foodmanager.receiptservice.repositories.LifeStageGroupRepository;
import com.dng.foodmanager.receiptservice.repositories.NutritionRDARepository;
import com.dng.foodmanager.receiptservice.repositories.NutritionStateRepository;
import com.dng.foodmanager.receiptservice.repositories.UserRepository;
import com.dng.foodmanager.receiptservice.util.NutritionUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

    @Override
    public List<ActivityDto> getActivities() {
        return nutritionUtil.getActivityFactors();
    }

    @Override
    public NutritionStateDto getNutritionStateDto(String userId) {
        Optional<NutritionState> nutritionStateOptional = nutritionStateRepository.findByUserIdAndDate(userId, LocalDate.now());
        if (nutritionStateOptional.isPresent()) {
            return nutritionStateOptional.get().convertToDto();
        } else {
           return new NutritionStateDto(LocalDate.now());
        }


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
