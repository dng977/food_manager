package com.dng.foodmanager.domain;

import com.dng.foodmanager.dto.food_dtos.FoodHistoryDto;
import com.dng.foodmanager.services.FileStorageService;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

import java.time.Instant;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "[food_history]")
public class FoodHistory extends BaseEntity{
    private Instant date;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "fk_meal")
    private Meal meal;
    @ManyToOne
    @JoinColumn(name = "fk_wholeFood")
    private WholeFood wholeFood;
    private Integer quantity;
    @NonNull
    private Boolean cooked;

    public FoodHistoryDto getDto(FileStorageService fileStorageService){
        if(meal != null){
            byte[] bytesImage = null;
            if (this.meal.imagePath != null)
                bytesImage = fileStorageService.loadBytesFile(this.meal.imagePath, false);
            boolean emptyImage = this.meal.imagePath == null || bytesImage == null;
            return new FoodHistoryDto(this.getId(),this.meal.getName(),this.quantity,bytesImage,emptyImage, this.date, this.cooked);
        }else if (wholeFood != null){
            return new FoodHistoryDto(this.getId(),this.wholeFood.getName(),this.quantity,null,true, this.date, this.cooked);
        }else{
            return new FoodHistoryDto(0L,"empty",0,null,true, this.date, this.cooked);
        }
    }

}
