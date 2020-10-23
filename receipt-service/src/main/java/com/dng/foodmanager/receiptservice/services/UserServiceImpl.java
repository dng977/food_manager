package com.dng.foodmanager.receiptservice.services;

import com.dng.foodmanager.receiptservice.domain.User;
import com.dng.foodmanager.receiptservice.dto.UserDto;
import com.dng.foodmanager.receiptservice.repositories.UserRepository;
import com.dng.foodmanager.receiptservice.util.NutritionUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final NutritionUtil nutritionUtil;
    private final UserRepository userRepository;

    @Override
    public void addNewUser(String uid, UserDto userDto) {
        User user = new User(uid);
        if(userDto != null){
            if(userDto.getAgeY() != null && userDto.getHeightCm() != null&& userDto.getWeightKg() != null && userDto.getActivityFactor() != null){
                Integer calories = nutritionUtil.calculateCalories(userDto.isMale(),userDto.getWeightKg(),userDto.getHeightCm(),userDto.getAgeY(),userDto.getActivityFactor());
                setUserFromDto(user,userDto);
                user.setDailyCalories(calories);
            }
        }

        userRepository.save(user);
    }

    private void setUserFromDto(User user, UserDto userDto){
        user.setAgeY(userDto.getAgeY());
        user.setHeightCm(userDto.getHeightCm());
        user.setWeightKg(userDto.getWeightKg());
        user.setActivityFactor(userDto.getActivityFactor());
    }
}
