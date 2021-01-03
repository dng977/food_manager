package com.dng.foodmanager.receiptservice.domain;

import com.dng.foodmanager.receiptservice.domain.id_classes.NutritionStateId;
import com.dng.foodmanager.receiptservice.dto.nutrition_dtos.NutritionStateDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "[nutrition_state]")
@IdClass(NutritionStateId.class)
@ToString
public class NutritionState {

    @JsonIgnore
    @Id
    private String userId;

    @Id
//    @Temporal(TemporalType.DATE)
    private LocalDate date;

    @JsonIgnore
    @ManyToOne
    @MapsId
    @JoinColumn(name = "userId")
    private User user;
    //----Nutrition----

    @Column(name = "[energy_(kcal)]")
    private Integer energy_kcal;

    //----MacroNutrients----

    @Column(name = "[water_(l)]", precision = 9, scale = 2)
    private BigDecimal water_g;// L/d
    @Column(name = "[carb_(g)]", precision = 9, scale = 2)
    private BigDecimal carbohydrates_g; // g/d
    @Column(name = "[fiber_(g)]", precision = 9, scale = 2)
    private BigDecimal fiber_g; // g/d
    @Column(name = "[fat_(g)]", precision = 9, scale = 2)
    private BigDecimal fat_g; // g/d
    @Column(name = "[sat_fat_(g)]", precision = 9, scale = 2)
    private BigDecimal satFat_g; // g/d
    @Column(name = "[mono_fat_(g)]", precision = 9, scale = 2)
    private BigDecimal monoFat_g; // g/d
    @Column(name = "[poly_fat_(g)]", precision = 9, scale = 2)
    private BigDecimal polyFat_g; // g/d
    @Column(name = "[omega_6_(g)]", precision = 9, scale = 2) //linolenic
    private BigDecimal omega6_g; // g/d
    @Column(name = "[omega_3_(g)]", precision = 9, scale = 2) //alpha-linolenic
    private BigDecimal omega3_g; // g/d
    @Column(name = "[protein_(g)]", precision = 9, scale = 2)
    private BigDecimal protein_g; // g/d
    @Column(name = "[cholesterol_(mg)]")
    private Integer cholesterol_mg; // mg/d
    @Column(name = "[sugar_(g)]", precision = 9, scale = 2)
    private BigDecimal sugar_g; // mg/d
    @Column(name = "[sucrose_(g)]", precision = 9, scale = 2)
    private BigDecimal sucrose_g; // mg/d

    // ----MicroNutrients----

    //Vitamins
    @Column(name = "[vitamin_a_(μg)]", precision = 9, scale = 2)
    private BigDecimal vitaminA_mcg; // μg/d RAE
    @Column(name = "[vitamin_c_(mg)]", precision = 9, scale = 2)
    private BigDecimal vitaminC_mg; // mg/d
    @Column(name = "[vitamin_d_(μg)]", precision = 9, scale = 2)
    private BigDecimal vitaminD_mcg; // μg/d
    @Column(name = "[vitamin_e_(mg)]", precision = 9, scale = 2)
    private BigDecimal vitaminE_mg; // mg/d
    @Column(name = "[vitamin_k_(μg)]", precision = 9, scale = 2)
    private BigDecimal vitaminK_mcg; // μg/d
    @Column(name = "[thiamin_b1_(mg)]", precision = 9, scale = 2)
    private BigDecimal thiaminB1_mg; // mg/d
    @Column(name = "[riboflavin_b2_(mg)]", precision = 9, scale = 2)
    private BigDecimal riboflavinB2_mg; // mg/d
    @Column(name = "[niacin_b3_(mg)]", precision = 9, scale = 2)
    private BigDecimal niacinB3_mg; // mg/d
    @Column(name = "[vitamin_b6_(mg)]", precision = 9, scale = 2)
    private BigDecimal vitaminB6_mg; // mg/d
    @Column(name = "[folate_b9_(μg)]", precision = 9, scale = 2)
    private BigDecimal folateB9_mcg; // μg/d
    @Column(name = "[vitamin_b12_(μg)]", precision = 9, scale = 2)
    private BigDecimal vitaminB12_mcg; // μg/d
    @Column(name = "[pantothenic_acid_b5_(mg)]", precision = 9, scale = 2)
    private BigDecimal pantothenicAcidB5_mg; // mg/d
    @Column(name = "[biotin_b7_(μg)]", precision = 9, scale = 2)
    private BigDecimal biotinB7_mcg; // μg/d -- NEED TO INCLUDE IN FOOD
    @Column(name = "[choline_(mg)]", precision = 9, scale = 2)
    private BigDecimal choline_mg; // mg/d

    //Minerals
    @Column(name = "[calcium_(mg)]", precision = 9, scale = 2)
    private Integer calcium_mg; // mg/d
    @Column(name = "[chromium_(μg)]", precision = 9, scale = 2)
    private BigDecimal chromium_mcg; // μg/d -- NEED TO INCLUDE IN FOOD
    @Column(name = "[copper_(μg)]", precision = 9, scale = 2)
    private BigDecimal copper_mcg; // μg/d
    @Column(name = "[fluoride_(mg)]", precision = 9, scale = 2)
    private BigDecimal fluoride_mg; // mg/d -- NEED TO INCLUDE IN FOOD
    @Column(name = "[iodine_(μg)]", precision = 9, scale = 2)
    private BigDecimal iodine_mcg; // μg/d -- NEED TO INCLUDE IN FOOD
    @Column(name = "[iron_(mg)]", precision = 9, scale = 2)
    private BigDecimal iron_mg; // mg/d
    @Column(name = "[magnesium_(mg)]", precision = 9, scale = 2)
    private BigDecimal magnesium_mg; // mg/d
    @Column(name = "[manganese_(mg)]", precision = 9, scale = 2)
    private BigDecimal manganese_mg; // mg/d
    @Column(name = "[molybdenum_(μg)]", precision = 9, scale = 2)
    private BigDecimal molybdenum_mcg; // μg/d -- NEED TO INCLUDE IN FOOD
    @Column(name = "[phosphorus_(mg)]", precision = 9, scale = 2)
    private Integer phosphorus_mg; // mg/d
    @Column(name = "[selenium_(μg)]", precision = 9, scale = 2)
    private BigDecimal selenium_mcg; // μg/d
    @Column(name = "[zinc_(mg)]", precision = 9, scale = 2)
    private BigDecimal zinc_mg; // mg/d
    @Column(name = "[potassium_(mg)]", precision = 9, scale = 2)
    private Integer potassium_mg; // mg/d
    @Column(name = "[sodium_(mg)]", precision = 9, scale = 2)
    private Integer sodium_mg; // mg/d
    @Column(name = "[chloride_(g)]", precision = 9, scale = 2)
    private BigDecimal chloride_g; // g/d -- NEED TO INCLUDE IN FOOD


    //OTHER - important but not essential

    @Column(name = "[lycopene_(μg)]", precision = 9, scale = 2)
    private BigDecimal lycopene_mcg;
    @Column(name = "[Lut+Zea_ (μg)]", precision = 9, scale = 2)
    private BigDecimal lutZea_mcg;

    public NutritionState(String userId, LocalDate date) {
        this.userId = userId;
        this.date = date;
        this.energy_kcal = 0;
        this.water_g = BigDecimal.valueOf(0);
        this.carbohydrates_g = BigDecimal.valueOf(0);
        this.fiber_g = BigDecimal.valueOf(0);
        this.fat_g = BigDecimal.valueOf(0);
        this.satFat_g = BigDecimal.valueOf(0);
        this.monoFat_g = BigDecimal.valueOf(0);
        this.polyFat_g = BigDecimal.valueOf(0);
        this.omega6_g = BigDecimal.valueOf(0);
        this.omega3_g = BigDecimal.valueOf(0);
        this.protein_g = BigDecimal.valueOf(0);
        this.cholesterol_mg = 0;
        this.sugar_g = BigDecimal.valueOf(0);
        this.sucrose_g = BigDecimal.valueOf(0);
        this.vitaminA_mcg = BigDecimal.valueOf(0);
        this.vitaminC_mg = BigDecimal.valueOf(0);
        this.vitaminD_mcg = BigDecimal.valueOf(0);
        this.vitaminE_mg = BigDecimal.valueOf(0);
        this.vitaminK_mcg = BigDecimal.valueOf(0);
        this.thiaminB1_mg = BigDecimal.valueOf(0);
        this.riboflavinB2_mg = BigDecimal.valueOf(0);
        this.niacinB3_mg = BigDecimal.valueOf(0);
        this.vitaminB6_mg = BigDecimal.valueOf(0);
        this.folateB9_mcg = BigDecimal.valueOf(0);
        this.vitaminB12_mcg = BigDecimal.valueOf(0);
        this.pantothenicAcidB5_mg = BigDecimal.valueOf(0);
        this.biotinB7_mcg = BigDecimal.valueOf(0);
        this.choline_mg = BigDecimal.valueOf(0);
        this.calcium_mg = 0;
        this.chromium_mcg = BigDecimal.valueOf(0);
        this.copper_mcg = BigDecimal.valueOf(0);
        this.fluoride_mg = BigDecimal.valueOf(0);
        this.iodine_mcg = BigDecimal.valueOf(0);
        this.iron_mg = BigDecimal.valueOf(0);
        this.magnesium_mg = BigDecimal.valueOf(0);
        this.manganese_mg = BigDecimal.valueOf(0);
        this.molybdenum_mcg = BigDecimal.valueOf(0);
        this.phosphorus_mg = 0;
        this.selenium_mcg = BigDecimal.valueOf(0);
        this.zinc_mg = BigDecimal.valueOf(0);
        this.potassium_mg = 0;
        this.sodium_mg = 0;
        this.chloride_g = BigDecimal.valueOf(0);
        this.lycopene_mcg = BigDecimal.valueOf(0);
        this.lutZea_mcg = BigDecimal.valueOf(0);
    }

    public void setNutrients(int amountEaten, boolean update, int energy_kcal, double water_g, double carbohydrates_g, double fiber_g, double fat_g, double satFat_g, double monoFat_g, double polyFat_g, double omega6_g, double omega3_g, double protein_g, int cholesterol_mg, double sugar_g, double sucrose_g, double vitaminA_mcg, double vitaminC_mg, double vitaminD_mcg, double vitaminE_mg, double vitaminK_mcg, double thiaminB1_mg, double riboflavinB2_mg, double niacinB3_mg, double vitaminB6_mg, double folateB9_mcg, double vitaminB12_mcg, double pantothenicAcidB5_mg, double biotinB7_mcg, double choline_mg, int calcium_mg, double chromium_mcg, double copper_mcg, double fluoride_mg, double iodine_mcg, double iron_mg, double magnesium_mg, double manganese_mg, double molybdenum_mcg, int phosphorus_mg, double selenium_mcg, double zinc_mg, int potassium_mg, int sodium_mg, double chloride_g, double lycopene_mcg, double lutZea_mcg) {
        // /100 since nutrition is calculated per 100g
        System.out.println("SET NUTRIENTS METHOD");
        if (update) {
            this.energy_kcal += amountEaten * energy_kcal / 100;
            this.water_g = BigDecimal.valueOf(this.water_g.floatValue() + amountEaten * water_g / 100);
            this.carbohydrates_g = BigDecimal.valueOf(this.carbohydrates_g.floatValue() + amountEaten * carbohydrates_g / 100);
            this.fiber_g = BigDecimal.valueOf(this.fiber_g.floatValue() + amountEaten * fiber_g / 100);
            this.fat_g = BigDecimal.valueOf(this.fat_g.floatValue() + amountEaten * fat_g / 100);
            this.satFat_g = BigDecimal.valueOf(this.satFat_g.floatValue() + amountEaten * satFat_g / 100);
            this.monoFat_g = BigDecimal.valueOf(this.monoFat_g.floatValue() + amountEaten * monoFat_g / 100);
            this.polyFat_g = BigDecimal.valueOf(this.polyFat_g.floatValue() + amountEaten * polyFat_g / 100);
            this.omega6_g = BigDecimal.valueOf(this.omega6_g.floatValue() + amountEaten * omega6_g / 100);
            this.omega3_g = BigDecimal.valueOf(this.omega3_g.floatValue() + amountEaten * omega3_g / 100);
            this.protein_g = BigDecimal.valueOf(this.protein_g.floatValue() + amountEaten * protein_g / 100);
            this.cholesterol_mg += amountEaten * cholesterol_mg / 100;
            this.sugar_g = BigDecimal.valueOf(this.sugar_g.floatValue() + amountEaten * sugar_g / 100);
            this.sucrose_g = BigDecimal.valueOf(this.sucrose_g.floatValue() + amountEaten * sucrose_g / 100);
            this.vitaminA_mcg = BigDecimal.valueOf(this.vitaminA_mcg.floatValue() + amountEaten * vitaminA_mcg / 100);
            this.vitaminC_mg = BigDecimal.valueOf(this.vitaminC_mg.floatValue() + amountEaten * vitaminC_mg / 100);
            this.vitaminD_mcg = BigDecimal.valueOf(this.vitaminD_mcg.floatValue() + amountEaten * vitaminD_mcg / 100);
            this.vitaminE_mg = BigDecimal.valueOf(this.vitaminE_mg.floatValue() + amountEaten * vitaminE_mg / 100);
            this.vitaminK_mcg = BigDecimal.valueOf(this.vitaminK_mcg.floatValue() + amountEaten * vitaminK_mcg / 100);
            this.thiaminB1_mg = BigDecimal.valueOf(this.thiaminB1_mg.floatValue() + amountEaten * thiaminB1_mg / 100);
            this.riboflavinB2_mg = BigDecimal.valueOf(this.riboflavinB2_mg.floatValue() + amountEaten * riboflavinB2_mg / 100);
            this.niacinB3_mg = BigDecimal.valueOf(this.niacinB3_mg.floatValue() + amountEaten * niacinB3_mg / 100);
            this.vitaminB6_mg = BigDecimal.valueOf(this.vitaminB6_mg.floatValue() + amountEaten * vitaminB6_mg / 100);
            this.folateB9_mcg = BigDecimal.valueOf(this.folateB9_mcg.floatValue() + amountEaten * folateB9_mcg / 100);
            this.vitaminB12_mcg = BigDecimal.valueOf(this.vitaminB12_mcg.floatValue() + amountEaten * vitaminB12_mcg / 100);
            this.pantothenicAcidB5_mg = BigDecimal.valueOf(this.pantothenicAcidB5_mg.floatValue() + amountEaten * pantothenicAcidB5_mg / 100);
            this.biotinB7_mcg = BigDecimal.valueOf(this.biotinB7_mcg.floatValue() + amountEaten * biotinB7_mcg / 100);
            this.choline_mg = BigDecimal.valueOf(this.choline_mg.floatValue() + amountEaten * choline_mg / 100);
            this.calcium_mg += amountEaten * calcium_mg / 100;
            this.chromium_mcg = BigDecimal.valueOf(this.chromium_mcg.floatValue() + amountEaten * chromium_mcg / 100);
            this.copper_mcg = BigDecimal.valueOf(this.copper_mcg.floatValue() + amountEaten * copper_mcg / 100);
            this.fluoride_mg = BigDecimal.valueOf(this.fluoride_mg.floatValue() + amountEaten * fluoride_mg / 100);
            this.iodine_mcg = BigDecimal.valueOf(this.iodine_mcg.floatValue() + amountEaten * iodine_mcg / 100);
            this.iron_mg = BigDecimal.valueOf(this.iron_mg.floatValue() + amountEaten * iron_mg / 100);
            this.magnesium_mg = BigDecimal.valueOf(this.magnesium_mg.floatValue() + amountEaten * magnesium_mg / 100);
            this.manganese_mg = BigDecimal.valueOf(this.manganese_mg.floatValue() + amountEaten * manganese_mg / 100);
            this.molybdenum_mcg = BigDecimal.valueOf(this.molybdenum_mcg.floatValue() + amountEaten * molybdenum_mcg / 100);
            this.phosphorus_mg += amountEaten * phosphorus_mg / 100;
            this.selenium_mcg = BigDecimal.valueOf(this.selenium_mcg.floatValue() + amountEaten * selenium_mcg / 100);
            this.zinc_mg = BigDecimal.valueOf(this.zinc_mg.floatValue() + amountEaten * zinc_mg / 100);
            this.potassium_mg += amountEaten * potassium_mg / 100;
            this.sodium_mg += amountEaten * sodium_mg / 100;
            this.chloride_g = BigDecimal.valueOf(this.chloride_g.floatValue() + amountEaten * chloride_g / 100);
            this.lycopene_mcg = BigDecimal.valueOf(this.lycopene_mcg.floatValue() + amountEaten * lycopene_mcg / 100);
            this.lutZea_mcg = BigDecimal.valueOf(this.lutZea_mcg.floatValue() + amountEaten * lutZea_mcg / 100);
        } else {
            this.energy_kcal = (amountEaten * energy_kcal / 100);
            this.water_g = BigDecimal.valueOf(amountEaten * water_g / 100);
            this.carbohydrates_g = BigDecimal.valueOf(amountEaten * carbohydrates_g / 100);
            this.fiber_g = BigDecimal.valueOf(amountEaten * fiber_g / 100);
            this.fat_g = BigDecimal.valueOf(amountEaten * fat_g / 100);
            this.satFat_g = BigDecimal.valueOf(amountEaten * satFat_g / 100);
            this.monoFat_g = BigDecimal.valueOf(amountEaten * monoFat_g / 100);
            this.polyFat_g = BigDecimal.valueOf(amountEaten * polyFat_g / 100);
            this.omega6_g = BigDecimal.valueOf(amountEaten * omega6_g / 100);
            this.omega3_g = BigDecimal.valueOf(amountEaten * omega3_g / 100);
            this.protein_g = BigDecimal.valueOf(amountEaten * protein_g / 100);
            this.cholesterol_mg = (amountEaten * cholesterol_mg / 100);
            this.sugar_g = BigDecimal.valueOf(amountEaten * sugar_g / 100);
            this.sucrose_g = BigDecimal.valueOf(amountEaten * sucrose_g / 100);
            this.vitaminA_mcg = BigDecimal.valueOf(amountEaten * vitaminA_mcg / 100);
            this.vitaminC_mg = BigDecimal.valueOf(amountEaten * vitaminC_mg / 100);
            this.vitaminD_mcg = BigDecimal.valueOf(amountEaten * vitaminD_mcg / 100);
            this.vitaminE_mg = BigDecimal.valueOf(amountEaten * vitaminE_mg / 100);
            this.vitaminK_mcg = BigDecimal.valueOf(amountEaten * vitaminK_mcg / 100);
            this.thiaminB1_mg = BigDecimal.valueOf(amountEaten * thiaminB1_mg / 100);
            this.riboflavinB2_mg = BigDecimal.valueOf(amountEaten * riboflavinB2_mg / 100);
            this.niacinB3_mg = BigDecimal.valueOf(amountEaten * niacinB3_mg / 100);
            this.vitaminB6_mg = BigDecimal.valueOf(amountEaten * vitaminB6_mg / 100);
            this.folateB9_mcg = BigDecimal.valueOf(amountEaten * folateB9_mcg / 100);
            this.vitaminB12_mcg = BigDecimal.valueOf(amountEaten * vitaminB12_mcg / 100);
            this.pantothenicAcidB5_mg = BigDecimal.valueOf(amountEaten * pantothenicAcidB5_mg / 100);
            this.biotinB7_mcg = BigDecimal.valueOf(amountEaten * biotinB7_mcg / 100);
            this.choline_mg = BigDecimal.valueOf(amountEaten * choline_mg / 100);
            this.calcium_mg = (amountEaten * calcium_mg / 100);
            this.chromium_mcg = BigDecimal.valueOf(amountEaten * chromium_mcg / 100);
            this.copper_mcg = BigDecimal.valueOf(amountEaten * copper_mcg / 100);
            this.fluoride_mg = BigDecimal.valueOf(amountEaten * fluoride_mg / 100);
            this.iodine_mcg = BigDecimal.valueOf(amountEaten * iodine_mcg / 100);
            this.iron_mg = BigDecimal.valueOf(amountEaten * iron_mg / 100);
            this.magnesium_mg = BigDecimal.valueOf(amountEaten * magnesium_mg / 100);
            this.manganese_mg = BigDecimal.valueOf(amountEaten * manganese_mg / 100);
            this.molybdenum_mcg = BigDecimal.valueOf(amountEaten * molybdenum_mcg / 100);
            this.phosphorus_mg = (amountEaten * phosphorus_mg / 100);
            this.selenium_mcg = BigDecimal.valueOf(amountEaten * selenium_mcg / 100);
            this.zinc_mg = BigDecimal.valueOf(amountEaten * zinc_mg / 100);
            this.potassium_mg = (amountEaten * potassium_mg / 100);
            this.sodium_mg = (amountEaten * sodium_mg / 100);
            this.chloride_g = BigDecimal.valueOf(amountEaten * chloride_g / 100);
            this.lycopene_mcg = BigDecimal.valueOf(amountEaten * lycopene_mcg / 100);
            this.lutZea_mcg = BigDecimal.valueOf(amountEaten * lutZea_mcg / 100);
        }
    }

    public NutritionStateDto convertToDto() {
        NutritionStateDto nutritionStateDto = new NutritionStateDto(
                this.date,
                this.energy_kcal
        );

        nutritionStateDto.setMacroNutrients(
                this.water_g.floatValue(),
                this.carbohydrates_g.floatValue(),
                this.fiber_g.floatValue(),
                this.fat_g.floatValue(),
                this.satFat_g.floatValue(),
                this.monoFat_g.floatValue(),
                this.polyFat_g.floatValue(),
                this.omega6_g.floatValue(),
                this.omega3_g.floatValue(),
                this.protein_g.floatValue(),
                this.cholesterol_mg,
                this.sugar_g.floatValue(),
                this.sucrose_g.floatValue()
        );
        nutritionStateDto.setMinerals(
            this.calcium_mg,
            this.chromium_mcg.floatValue(),
            this.copper_mcg.floatValue(),
            this.fluoride_mg.floatValue(),
            this.iodine_mcg.floatValue(),
            this.iron_mg.floatValue(),
            this.magnesium_mg.floatValue(),
            this.manganese_mg.floatValue(),
            this.molybdenum_mcg.floatValue(),
            this.phosphorus_mg,
            this.selenium_mcg.floatValue(),
            this.zinc_mg.floatValue(),
            this.potassium_mg,
            this.sodium_mg,
            this.chloride_g.floatValue()
        );

        nutritionStateDto.setVitamins(
                this.vitaminA_mcg.floatValue(),
                this.vitaminC_mg.floatValue(),
                this.vitaminD_mcg.floatValue(),
                this.vitaminE_mg.floatValue(),
                this.vitaminK_mcg.floatValue(),
                this.thiaminB1_mg.floatValue(),
                this.riboflavinB2_mg.floatValue(),
                this.niacinB3_mg.floatValue(),
                this.vitaminB6_mg.floatValue(),
                this.folateB9_mcg.floatValue(),
                this.vitaminB12_mcg.floatValue(),
                this.pantothenicAcidB5_mg.floatValue(),
                this.biotinB7_mcg.floatValue(),
                this.choline_mg.floatValue()
        );


        return nutritionStateDto;
    }
}
