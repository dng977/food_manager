package com.dng.foodmanager.receiptservice.domain;

import com.dng.foodmanager.receiptservice.domain.id_classes.MealItemId;
import com.dng.foodmanager.receiptservice.dto.MealItemDto;
import com.fasterxml.jackson.databind.ser.Serializers;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "meal_items")
public class MealItem extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "mealId")
    private Meal meal;

    @ManyToOne
    @JoinColumn(name = "foodItemId")
    private FoodItem foodItem;

    @Nullable
    private Integer quantity;

    public MealItemDto toDto() {
        return new MealItemDto(foodItem.getId(),quantity);
    }
}
