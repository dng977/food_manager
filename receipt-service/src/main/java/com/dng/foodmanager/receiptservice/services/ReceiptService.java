package com.dng.foodmanager.receiptservice.services;

import com.dng.foodmanager.receiptservice.dto.ReceiptDto;
import com.dng.foodmanager.receiptservice.dto.ReceiptItemDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;

public interface ReceiptService {
    void uploadReceipt(String userId, MultipartFile receiptImage) throws IOException;

    List<ReceiptDto> getReceipts(String userId);

    List<ReceiptItemDto> getReceiptItemsById(String userId, Long id);

    ReceiptDto getReceipt(String userId,Long valueOf) throws IOException;

    byte[] getReceiptImage(String userId, Long valueOf) throws IOException;

    List<ReceiptItemDto> editReceiptItems(String userId,Long id, List<ReceiptItemDto> receiptItemDtoList);

    void editReceiptItem(String userId, Long rid, Long iid, ReceiptItemDto receiptItemDto);

    List<ReceiptDto> deleteReceipt(String userId, Long id);

    List<ReceiptItemDto> addReceiptToFoodStock(String userId, Long receiptId);

}
