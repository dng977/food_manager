package com.dng.foodmanager.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import java.util.List;
import java.util.Optional;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @Column(name = "id")
    private String userId;

    @Nullable
    private Integer weightKg;//kg
    @Nullable
    private Integer heightCm;//cm
    @Nullable
    @Column(name = "age_y")
    private Integer ageY;
    @Nullable
    private Boolean male;
    @Nullable
    private ActivityFactor activityFactor;

    @ManyToOne
    @JoinColumn(name = "fk_lifeStageGroup")
    private LifeStageGroup lifeStageGroup;

    private Integer dailyCalories = 2000;

    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<NutritionState> nutritionState;

    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<FoodStock> foodStock;

    @OneToMany(mappedBy = "id", fetch = FetchType.LAZY)
    private List<Meal> meals;

    private Boolean admin;

    public User(String userId) {
        this.userId = userId;
        this.admin = false;
    }

    public Optional<LifeStageGroup> getLifeStageGroup() {
        return Optional.ofNullable(this.lifeStageGroup);
    }

    @Override
    public String toString() {
        return "User{" +
                "userId='" + userId + '\'' +
                ", weightKg=" + weightKg +
                ", heightCm=" + heightCm +
                ", ageY=" + ageY +
                ", male=" + male +
                ", activityFactor=" + activityFactor +
                ", lifeStageGroup=" + lifeStageGroup +
                ", dailyCalories=" + dailyCalories +
                '}';
    }
}
