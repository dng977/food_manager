package com.dng.foodmanager.receiptservice.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@NoArgsConstructor
@Table(name = "meals")
public class Meal extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String name;

    private String description;

    @OneToMany(fetch = FetchType.LAZY)
    private List<MealItem> ingredients;

}
