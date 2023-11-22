package com.dng.foodmanager.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;




@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stores")
public class Store extends BaseEntity {

    private String name;
}
