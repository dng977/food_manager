package com.dng.foodmanager.receiptservice.domain;

import com.dng.foodmanager.receiptservice.domain.id_classes.MealItemId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@Table(name = "meal_items")
@IdClass(MealItemId.class)
public class MealItem {
    @Id
    private Long mealId;

    @Id
    private Long foodItemId;

    @ManyToOne
    @MapsId
    @JoinColumn(name = "mealId")
    private Meal meal;

    @ManyToOne
    @MapsId
    @JoinColumn(name = "foodItemId")
    private FoodItem foodItem;

    @Nullable
    private Integer quantity;

}
