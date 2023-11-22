package com.dng.foodmanager.repositories;

import com.dng.foodmanager.domain.Receipt;
import com.dng.foodmanager.domain.ReceiptItem;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@RunWith(SpringRunner.class)
@DataJpaTest
public class ReceiptRepositoryTest {

    @Autowired
    ReceiptRepository receiptRepository;

    @Autowired
    ReceiptItemRepository receiptItemRepository;

    @Test
    public void shouldSaveReceiptItem() {
        Long testId = 1L;
        List<ReceiptItem> receiptItemSet = List.of(new ReceiptItem());
        Receipt receipt = Receipt.builder().id(testId).receiptItems(receiptItemSet).build();
        receiptRepository.save(receipt);

        assertTrue(receiptItemRepository.findAll().iterator().hasNext());
    }
}