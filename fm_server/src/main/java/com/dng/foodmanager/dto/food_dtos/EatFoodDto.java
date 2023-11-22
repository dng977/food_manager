package com.dng.foodmanager.dto.food_dtos;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

@Getter
@Setter
@RequiredArgsConstructor
public class EatFoodDto {
    //whole or meal
    private final Long foodId;
    private final Integer quantity;

    @Nullable
    private final byte[] imageBytes;

    private Boolean cooked;

}

