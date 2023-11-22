package com.dng.foodmanager.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "receipts")
@ToString(callSuper = true, includeFieldNames = true)
public class Receipt extends BaseEntity {

    private String userId;

    private String storeName; // TODO - temporary - use the store object instead
    @OneToOne
    private Store store;
    private Instant date;

    private Boolean confirmed;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "receipt", fetch = FetchType.LAZY)
    private List<ReceiptItem> receiptItems;


    @Builder
    public Receipt(Long id, Store store, Instant date, Boolean confirmed, List<ReceiptItem> receiptItems) {
        super(id);
        this.store = store;
        this.date = date;
        this.confirmed = confirmed;
        setReceiptItems(receiptItems);
    }

    public void setReceiptItems(List<ReceiptItem> receiptItems) {
        if(receiptItems!=null&&!receiptItems.isEmpty()){
            receiptItems.forEach(receiptItem -> receiptItem.setReceipt(this));
        }

        this.receiptItems = receiptItems;

    }
}
