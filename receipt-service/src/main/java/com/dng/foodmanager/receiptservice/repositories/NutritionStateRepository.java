package com.dng.foodmanager.receiptservice.repositories;

import com.dng.foodmanager.receiptservice.domain.NutritionState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface NutritionStateRepository extends CrudRepository<NutritionState,String> {
    @Query("select n from NutritionState n where n.date >= ?1")
    List<NutritionState> findAllWithDateAfter(Date date);
}
