package com.dng.foodmanager.receiptservice.repositories;

import com.dng.foodmanager.receiptservice.domain.NutritionState;
import com.dng.foodmanager.receiptservice.domain.NutritionStateId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface NutritionStateRepository extends CrudRepository<NutritionState, NutritionStateId> {
    @Query("select n from NutritionState n where n.date >= ?2 and n.userId = ?1")
    List<NutritionState> findAllWithDateAfter(String userId, Date date);

    @Query("select n from NutritionState n where n.date = ?2 and n.userId = ?1")
    Optional<NutritionState> findByUserIdAndDate(String userId, LocalDate date);


}
