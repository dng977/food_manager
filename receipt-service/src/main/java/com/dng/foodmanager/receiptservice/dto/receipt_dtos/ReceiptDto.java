package com.dng.foodmanager.receiptservice.dto.receipt_dtos;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.List;

@RequiredArgsConstructor
@Getter
public class ReceiptDto {
    private final long id;
    private final String storeName;
    private static final SimpleDateFormat dateFormat
            = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    private final String date;
    private final boolean confirmed;
    private final List<ReceiptItemDto> receiptItemList;

}
