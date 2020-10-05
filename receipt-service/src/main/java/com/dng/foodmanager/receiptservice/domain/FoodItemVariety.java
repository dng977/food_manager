package com.dng.foodmanager.receiptservice.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.List;

public class FoodItemVariety extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "fk_food_item")
    private FoodItem foodItem;

    private String name;

    private int servingSize;

    @OneToOne
    @JoinColumn(name = "fk_nutrition_raw")
    private FoodNutrition nutritionRaw;

    @OneToOne
    @JoinColumn(name = "fk_nutrition_cooked")
    private FoodNutrition nutritionCooked;

    //column for type

}