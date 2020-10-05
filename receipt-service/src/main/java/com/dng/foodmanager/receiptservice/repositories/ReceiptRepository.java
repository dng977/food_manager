package com.dng.foodmanager.receiptservice.repositories;

import java.util.List;

import com.dng.foodmanager.receiptservice.domain.Receipt;
import org.springframework.data.repository.CrudRepository;

public interface ReceiptRepository extends CrudRepository<Receipt, Long> {

	List<Receipt> findByUsername(String username);
}
