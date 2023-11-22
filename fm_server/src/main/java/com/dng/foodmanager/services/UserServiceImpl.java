package com.dng.foodmanager.services;

import com.dng.foodmanager.domain.LifeStageGroup;
import com.dng.foodmanager.domain.User;
import com.dng.foodmanager.dto.UserDto;
import com.dng.foodmanager.repositories.LifeStageGroupRepository;
import com.dng.foodmanager.repositories.UserRepository;
import com.dng.foodmanager.util.NutritionUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final NutritionUtil nutritionUtil;
    private final UserRepository userRepository;
    private final LifeStageGroupRepository lifeStageGroupRepository;
    private final MealService mealService;
    @Value("${adminUID}")
    private String adminUID;

    @Override
    public void updateUser(String uid, UserDto userDto) {
        Optional<User> userOptional = userRepository.findById(uid);
        User user = userOptional.orElseGet(() -> new User(uid));

        if(userDto != null){
            if(userDto.getMale() != null && userDto.getAgeY() != null && userDto.getHeightCm() != null&& userDto.getWeightKg() != null && userDto.getActivityFactor() != null){
                //1) Calculate calories
                Integer calories = nutritionUtil.calculateCalories(userDto.getMale(),userDto.getWeightKg(),userDto.getHeightCm(),userDto.getAgeY(),userDto.getActivityFactor());
                setUserFromDto(user,userDto);
                user.setDailyCalories(calories);

                //2) Get lifeStageGroup
                Optional<LifeStageGroup> lsgOptional = lifeStageGroupRepository.getIdFromBodyDetails(userDto.getAgeY(), userDto.getMale(), false, false);
                if(lsgOptional.isPresent()){
                    user.setLifeStageGroup(lsgOptional.get());
                }else{
                    log.error("LIFE STAGE GROUP NOT SET TO USER with ID: " + uid);
                }
            }else{
                log.warn("userDto has nulls -> User won't have Details (id: " + uid);
            }
        }else{
            log.warn("USERDTO was null -> User won't have Details (id: " + uid);

        }

        userRepository.save(user);
        
        if(userOptional.isEmpty()){
            mealService.loadDefaultMeals(user, adminUID);
        }

    }

    private void setUserFromDto(User user, UserDto userDto){
        user.setAgeY(userDto.getAgeY());
        user.setHeightCm(userDto.getHeightCm());
        user.setWeightKg(userDto.getWeightKg());
        user.setActivityFactor(userDto.getActivityFactor());
        user.setMale(userDto.getMale());
    }

    @Override
    public void loadUser(String userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if(userOptional.isEmpty()){
            User newUser = new User(userId);
            if(userId.equals(adminUID)){
                newUser.setAdmin(true);
            }
            userRepository.save(new User(userId));
            log.info("----User: " + userId + " has been loaded!----");
        }
    }
}
