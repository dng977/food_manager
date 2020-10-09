package com.dng.foodmanager.receiptservice.repositories;

import com.dng.foodmanager.receiptservice.domain.ReceiptItem;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReceiptItemRepository extends CrudRepository<ReceiptItem, Long> {
    @Query(value = "SELECT * FROM receipt_items WHERE fk_receipt=?1", nativeQuery = true)
    List<ReceiptItem> findByReceipt(Long id);

    @Modifying
    @Query(value = "DBCC CHECKIDENT (receipt_items, RESEED, ?1)", nativeQuery = true)
    void resetIdSeed(Long id);

    @Query(value = "SELECT TOP 1 id FROM receipt_items where fk_receipt=?1", nativeQuery = true)
    Long findFirstIdByReceipt(Long id);
}
