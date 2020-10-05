package com.dng.foodmanager.receiptservice.repositories;

import com.dng.foodmanager.receiptservice.domain.ReceiptItem;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReceiptItemRepository extends CrudRepository<ReceiptItem, Long> {
    @Query(value = "SELECT * FROM receipt_items WHERE fk_receipt=?1", nativeQuery = true)
    List<ReceiptItem> findByReceipt(Long id);
}
