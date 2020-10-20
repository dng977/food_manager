package com.dng.foodmanager.receiptservice.repositories;

import java.util.List;

import com.dng.foodmanager.receiptservice.domain.Receipt;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ReceiptRepository extends CrudRepository<Receipt, Long> {

	List<Receipt> findByUserId(String userId);

	@Modifying
	@Query(value = "DECLARE @maxVal INT;\n" +
			"SELECT @maxVal = ISNULL(max(ID),0) from receipts;\n" +
			"DBCC CHECKIDENT(receipts, RESEED, @maxVal);", nativeQuery = true)
	void resetIdSeed();
}
