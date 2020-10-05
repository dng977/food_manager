package com.dng.foodmanager.receiptservice.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "receipt_items")
@ToString(callSuper = true, includeFieldNames = true)
public class ReceiptItem extends BaseEntity{
    //Line/reference name
    private String referenceName;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "fk_receipt")
    @ToString.Exclude
    private Receipt receipt;

    @ManyToMany()
    @JoinTable(
            name = "receipt_items_foods",
            joinColumns = @JoinColumn(
                    name = "fk_receipt_item",
                    referencedColumnName = "id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "fk_food_item",
                    referencedColumnName = "id"
            )
    )
    private List<FoodItem> recognizedFoods;

    private ReceiptItemStatus status;

    public void setReceipt(Receipt receipt) {
        this.receipt = receipt;
    }
}
