package com.dng.foodmanager.receiptservice.repositories;

import com.dng.foodmanager.receiptservice.domain.Receipt;
import com.dng.foodmanager.receiptservice.domain.ReceiptItem;
import com.dng.foodmanager.receiptservice.services.ReceiptService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.swing.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

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