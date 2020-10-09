package com.dng.foodmanager.receiptservice.repositories;

import java.util.List;

import com.dng.foodmanager.receiptservice.domain.Receipt;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ReceiptRepository extends CrudRepository<Receipt, Long> {

	List<Receipt> findByUsername(String username);

	@Modifying
	@Query(value = "DBCC CHECKIDENT (receipts, RESEED, ?1);", nativeQuery = true)
	void resetIdSeed(Long id);
}
