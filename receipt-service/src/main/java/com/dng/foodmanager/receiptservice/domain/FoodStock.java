package com.dng.foodmanager.receiptservice.domain;

import com.dng.foodmanager.receiptservice.domain.id_classes.FoodStockId;
import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Entity
@Data
@Table(name = "food_stock")
@NoArgsConstructor
@IdClass(FoodStockId.class)
public class FoodStock {

    @Id
    private String userId;

    @Id
    private Long foodItemId;

    @ManyToOne
    @MapsId
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @MapsId
    @JoinColumn(name = "foodItemId")
    private FoodItem foodItem;

    @Nullable
    private Integer quantity;

    public FoodStock(String userId, FoodItem foodItem, @Nullable Integer quantity) {
        this.userId = userId;
        this.foodItem = foodItem;
        this.foodItemId = foodItem.getId();
        this.quantity = quantity;
    }

}
