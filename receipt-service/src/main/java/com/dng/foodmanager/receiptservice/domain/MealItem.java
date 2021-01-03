package com.dng.foodmanager.receiptservice.domain;

import com.dng.foodmanager.receiptservice.dto.food_dtos.MealItemDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.*;

//@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name = "meal_items")
public class MealItem extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "mealId")
    private Meal meal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "foodItemId")
    private FoodItem foodItem;

    private boolean cooked;

    private Integer quantity;

    public MealItemDto toDto() {
        return new MealItemDto(this.foodItem.getId(),this.quantity, this.cooked);
    }
}
