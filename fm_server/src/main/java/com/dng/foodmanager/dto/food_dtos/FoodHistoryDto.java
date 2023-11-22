package com.dng.foodmanager.dto.food_dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
public class FoodHistoryDto {
    protected final Long id;
    @Nullable
    protected final String name;
    @Nullable
    private final Integer quantity;
    @Nullable
    private final byte[] imageBytes;
    private final boolean emptyImage;
    private Instant date;
    boolean cooked;

}
