package com.dng.foodmanager.receiptservice.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "receipts")
@ToString(callSuper = true, includeFieldNames = true)
public class Receipt extends BaseEntity {

    private String username;

    private String storeName; // TODO - temporary - use the store object instead
    @OneToOne
    private Store store;
    private LocalDate date;

    private Boolean confirmed;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "receipt")
    private List<ReceiptItem> receiptItems;


    @Builder
    public Receipt(Long id, Store store, LocalDate date, Boolean confirmed, List<ReceiptItem> receiptItems) {
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
