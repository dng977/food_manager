package com.dng.foodmanager.repositories;

import com.dng.foodmanager.domain.ReceiptItem;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReceiptItemRepository extends CrudRepository<ReceiptItem, Long> {
    @Query(value = "select ri from ReceiptItem ri where ri.receipt.id = :id")
    List<ReceiptItem> findByReceipt(Long id);

    @Modifying
    @Query(value = "DECLARE @maxVal INT\n" +
            "SELECT @maxVal = ISNULL(max(ID),0) from receipt_item\n" +
            "DBCC CHECKIDENT(receipt_items, RESEED, @maxVal)", nativeQuery = true)
    void resetIdSeed();

    @Query(value = "SELECT TOP 1 id FROM receipt_item where fk_receipt=?1", nativeQuery = true)
    Long findFirstIdByReceipt(Long id);

}
