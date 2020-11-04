package com.dng.foodmanager.receiptservice.domain;

import com.dng.foodmanager.receiptservice.util.NutritionUtil.ActivityFactor;
import com.fasterxml.jackson.databind.ser.Serializers;
import lombok.*;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.persistence.*;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "users")
@ToString()
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
//    private boolean lactation;
//    private boolean pregnancy;
    @Nullable
    private ActivityFactor activityFactor;

    @ManyToOne
    @JoinColumn(name = "fk_lifeStageGroup")
    private LifeStageGroup lifeStageGroup;

    private Integer dailyCalories = 2000;


    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY)
    private List<NutritionState> nutritionState;

    public User(String userId) {
        this.userId = userId;
    }

    public Optional<LifeStageGroup> getLifeStageGroup() {
        return Optional.ofNullable(this.lifeStageGroup);
    }
}
