package com.dng.foodmanager.domain;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;


@Entity
@Data
@Table(name = "life_stage_groups")
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LifeStageGroup {
    @Id
    private String id;
    private int lowerLimit;
    private int upperLimit;
    private boolean pregnancy = false;
    private boolean lactation = false;
    private boolean male;
    private String description;

    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY)
    private List<User> users;
}
