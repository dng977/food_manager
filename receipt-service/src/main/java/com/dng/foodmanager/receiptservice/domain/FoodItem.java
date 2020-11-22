package com.dng.foodmanager.receiptservice.domain;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.List;
import java.util.Optional;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@NoArgsConstructor
@Table(name = "food_items")
public class FoodItem extends BaseEntity {

    private String name;
    private Integer defaultQuantity;
    private Integer servingSize;
    private String servingDesc;
    private ServingUnit servingUnit;

    @Nullable
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_nutrition_raw")
    private FoodNutrition nutritionRaw;

    @Nullable
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_nutrition_cooked")
    private FoodNutrition nutritionCooked;

//    @OneToMany(mappedBy = "foodItem")
//    private List<FoodItemVariety> foodItemVarieties;

    @OneToMany(mappedBy = "foodItem")
    private List<FoodReference> referenceWords;

    //column for type


    public Optional<FoodNutrition> getNutritionRaw() {
        return Optional.ofNullable(nutritionRaw);
    }

    public Optional<FoodNutrition> getNutritionCooked() {
        return Optional.ofNullable(nutritionCooked);
    }

    public String getServingDesc() {
        return servingDesc == null ? "" : servingDesc;
    }

    public Integer getDefaultQuantity() {
        if(defaultQuantity == null){
            return getServingSize();
        }
        return defaultQuantity;
    }

    public Integer getServingSize() {
        if(servingSize == null) {
            return 100;
        }
            return servingSize;
    }

    public Optional<ServingUnit> getServingUnit() {
        return Optional.ofNullable(servingUnit);
    }
}
