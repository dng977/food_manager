package com.dng.foodmanager.domain;


import jakarta.persistence.MappedSuperclass;
import lombok.*;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
@ToString
public class Food extends BaseEntity {
    protected String name;
    protected String imagePath;

}
