package com.dng.foodmanager.receiptservice.domain;

import lombok.Data;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "food_dictionary")
public class FoodReference extends BaseEntity {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_foodItem")
    private FoodItem foodItem;

    private String referenceWord;
}
