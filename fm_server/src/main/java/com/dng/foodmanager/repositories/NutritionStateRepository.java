package com.dng.foodmanager.repositories;

import com.dng.foodmanager.domain.NutritionState;
import com.dng.foodmanager.domain.id_classes.NutritionStateId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface NutritionStateRepository extends CrudRepository<NutritionState, NutritionStateId> {
    @Query("select n from NutritionState n where n.date >= ?2 and n.userId = ?1")
    List<NutritionState> findAllWithDateAfter(String userId, Date date);

    @Query(value = "SELECT * from nutrition_state n where CAST(n.date AS DATE) = ?2 and n.user_id = ?1", nativeQuery = true)
    Optional<NutritionState> findByUserIdAndDate(String userId, Instant date);

    @Query(value = "SELECT * from nutrition_state n where CAST(n.date AS DATE) >= ?2 AND CAST(n.date AS DATE) <= ?3 AND n.user_id = ?1", nativeQuery = true)
    List<NutritionState> findByUserIdAndDate(String userId, Instant startDate, Instant endDate);


}
