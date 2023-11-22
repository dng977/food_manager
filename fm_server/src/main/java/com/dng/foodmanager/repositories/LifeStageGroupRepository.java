package com.dng.foodmanager.repositories;

import com.dng.foodmanager.domain.LifeStageGroup;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface LifeStageGroupRepository extends CrudRepository<LifeStageGroup, String> {

    @Query("select lsg from LifeStageGroup lsg where lsg.lowerLimit <= :age and lsg.upperLimit >= :age and lsg.male = :male and lsg.pregnancy = :pregnancy and lsg.lactation = :lactation")
    Optional<LifeStageGroup> getIdFromBodyDetails(int age, boolean male, boolean pregnancy, boolean lactation);


}
