package com.dng.foodmanager.dto.food_dtos;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import java.util.List;
import java.util.Optional;

@Getter
@Setter
@RequiredArgsConstructor
public class MealDto {
    private final Long id;
    @Nullable
    private final String name;
    @Nullable
    private final String description;
    @Nullable
    private final Integer quantity;
    @Nullable
    private final Integer quantityLeft;
    @Nullable
    private final Integer servings;
    @Nullable
    private final List<MealItemDto> ingredients;
    @Nullable
    private final byte[] imageBytes;

    private final boolean emptyImage;

    public Optional<Boolean> getEmptyImage() {
        return Optional.of(emptyImage);
    }

    public Optional<String> getName() {
        return Optional.ofNullable(name);
    }

    public Optional<String> getDescription() {
        return Optional.ofNullable(description);
    }

    public Optional<Integer> getQuantity() {
        return Optional.ofNullable(quantity);
    }

    public Optional<Integer> getQuantityLeft() {
        return Optional.ofNullable(quantityLeft);
    }

    public Optional<Integer> getServings() {
        return Optional.ofNullable(servings);
    }

    public Optional<List<MealItemDto>> getIngredients() {
        return Optional.ofNullable(ingredients);
    }

    public Optional<byte[]> getImageBytes() {
        return Optional.ofNullable(imageBytes);
    }


}
