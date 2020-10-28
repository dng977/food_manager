package com.dng.foodmanager.receiptservice.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.CollectionId;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

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
