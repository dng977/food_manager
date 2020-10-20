package com.dng.foodmanager.receiptservice.domain;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "food_stock")
@AllArgsConstructor
@NoArgsConstructor
public class FoodStock extends BaseEntity {

    private String userId;
    @OneToOne
    @JoinColumn(name = "fk_foodItem",unique = true)
    private FoodItem foodItem;

    @Nullable
    private Integer quantity;



}
