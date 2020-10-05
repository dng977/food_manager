package com.dng.foodmanager.receiptservice.domain;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "food_stock")
public class FoodStock extends BaseEntity {

    private Long userId;
    @OneToOne
    @JoinColumn(name = "fk_foodItem")
    private FoodItem foodItem;
    private int quantity;



}
