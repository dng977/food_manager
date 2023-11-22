package com.dng.foodmanager.repositories;

import com.dng.foodmanager.domain.Receipt;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReceiptRepository extends CrudRepository<Receipt, Long> {

	List<Receipt> findByUserId(String userId);

	@Modifying
	@Query(value = "DECLARE @maxVal INT;\n" +
			"SELECT @maxVal = ISNULL(max(ID),0) from receipts;\n" +
			"DBCC CHECKIDENT(receipts, RESEED, @maxVal);", nativeQuery = true)
	void resetIdSeed();
}
