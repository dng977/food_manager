package com.dng.foodmanager.receiptservice.domain;

import com.dng.foodmanager.receiptservice.util.NutritionUtil.ActivityFactor;
import com.fasterxml.jackson.databind.ser.Serializers;
import lombok.*;
import org.springframework.web.bind.annotation.RequestBody;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "users")
@ToString()
public class User {
    @Id
    @Column(name="id")
    private String userId;

    private Integer weightKg;//kg
    private Integer heightCm;//cm
    @Column(name = "age_y")
    private Integer ageY;
    private ActivityFactor activityFactor;

    private Integer dailyCalories = 2000;


    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY)
    private List<NutritionState> nutritionState;

    public User(String userId){
        this.userId = userId;
    }


}
