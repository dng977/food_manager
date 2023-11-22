package com.dng.foodmanager.domain;

import com.dng.foodmanager.dto.food_dtos.MealItemDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



//@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name = "meal_items")
public class MealItem extends BaseEntity {

    @ManyToOne
    @Setter
    @JoinColumn(name = "mealId")
    private Meal meal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wholeFoodId")
    private WholeFood wholeFood;

    private boolean cooked;

    private Integer quantity;

    public MealItemDto toDto() {
        return new MealItemDto(this.wholeFood.toDto(), this.quantity, this.cooked);
    }

    public void updateMealItem(boolean cooked, Integer quantity) {
        this.cooked = cooked;
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "MealItem{" +
                ", wholeFood=" + wholeFood +
                ", cooked=" + cooked +
                ", quantity=" + quantity +
                '}';
    }

    public MealItem copy(Meal newMeal) {
        return new MealItem(newMeal, this.wholeFood, this.cooked, this.quantity);
    }
}
