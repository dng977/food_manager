package com.dng.foodmanager.domain;

import com.dng.foodmanager.domain.id_classes.FoodStockId;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;



@Entity
@Data
@Table(name = "food_stock")
@NoArgsConstructor
@IdClass(FoodStockId.class)
public class FoodStock {

    @Id
    private String userId;

    @Id
    private Long wholeFoodId;

    @ManyToOne
    @MapsId
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @MapsId
    @JoinColumn(name = "wholeFoodId")
    private WholeFood wholeFood;

    @Nullable
    private Float quantity;

    public FoodStock(String userId, WholeFood wholeFood, @Nullable Float quantity) {
        this.userId = userId;
        this.wholeFood = wholeFood;
        this.wholeFoodId = wholeFood.getId();
        this.quantity = quantity;
    }

}
