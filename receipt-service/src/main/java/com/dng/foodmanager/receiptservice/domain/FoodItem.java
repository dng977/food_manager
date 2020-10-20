package com.dng.foodmanager.receiptservice.domain;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@NoArgsConstructor
@Table(name = "food_items")
public class FoodItem extends BaseEntity {

    private String name;
    private int servingSize;
    private boolean countable;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_nutrition_raw")
    private FoodNutrition nutritionRaw;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_nutrition_cooked")
    private FoodNutrition nutritionCooked;

//    @OneToMany(mappedBy = "foodItem")
//    private List<FoodItemVariety> foodItemVarieties;

    @OneToMany(mappedBy = "foodItem")
    private List<FoodReference> referenceWords;

    //column for type

}
