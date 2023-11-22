package com.dng.foodmanager.domain;

import com.dng.foodmanager.dto.nutrition_dtos.NutritionRdaDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "[nutrition_rda]")
public class NutritionRDA {

    @Id
    private String lifeStageGroupId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "lifeStageGroupId")
    @JsonIgnore
    private LifeStageGroup lifeStageGroup;

    //--MacroNutrients--

    @Column(name = "[water_(l)]")
    private Float water_kg;// L/d
    @Column(name = "[carb_(g)]")
    private Integer carbohydrates_g; // g/d
    @Column(name = "[fiber_(g)]")
    private Integer fiber_g; // g/d
    @Column(name = "[fat_(g)]")
    private Integer fat_g; // g/d
    @Column(name = "[omega_6_(g)]") //linolenic
    private Float omega6_g; // g/d
    @Column(name = "[omega_3_(g)]") //alpha-linolenic
    private Float omega3_g; // g/d
    @Column(name = "[protein_(g)]")
    private Integer protein_g; // g/d
    @Column(name = "[cholesterol_(mg)]")
    private Integer cholesterol_mg; // mg/d(CLVC)

    //Acceptable MacroNutrient Distribution Ranges:
    @Column(name = "[fat_l_limit_(%)]")
    private Integer fatLLimit; // %
    @Column(name = "[fat_u_limit_(%)]")
    private Integer fatULimit; // %

    @Column(name = "[mono_fat_l_limit_(%)]")
    private Integer monoFatLLimit; // %(CLVC)
    @Column(name = "[mono_fat_u_limit_(%)]")
    private Integer monoFatULimit; // %(CLVC)

    @Column(name = "[poly_fat_l_limit_(%)]")
    private Integer polyFatLLimit; // %(CLVC)
    @Column(name = "[poly_fat_u_limit_(%)]")
    private Integer polyFatULimit; // %(CLVC)

    @Column(name = "[omega6_l_limit_(%)]")
    private Float omega6LLimit; // %
    @Column(name = "[omega6_limit_(%)]")
    private Float omega6ULimit; // %

    @Column(name = "[omega_3_l_limit_(%)]")
    private Float omega3LLimit; // %
    @Column(name = "[omega3_u_limit_(%)]")
    private Float omega3ULimit; // %

    @Column(name = "[carb_l_limit_(%)]")
    private Integer carbLLimit; // %
    @Column(name = "[carb_u_limit_(%)]")
    private Integer carbULimit; // %

    @Column(name = "[sat_fat_l_limit_(%)]")
    private Integer satFatLLimit; // % (CLVC)
    @Column(name = "[sat_fat_u_limit_(%)]")
    private Integer satFatULimit; // % (CLVC)


    @Column(name = "[sugar_u_limit_(%)]")
    private Integer sugarULimit; // % (British Nutrition Foundation)

    @Column(name = "[protein_l_limit_(%)]")
    private Integer proteinLLimit; // %
    @Column(name = "[protein_u_limit_(%)]")
    private Integer proteinULimit; // %

    //--Tolerable Upper Intakes Levels--

    //----Vitamins----
    @Column(name = "[vitamin_a_upper_(μg)]")
    private Integer vitaminAUpper_mcg; // μg/d
    @Column(name = "[vitamin_c_upper_(mg)]")
    private Integer vitaminCUpper_mg; // mg/d
    @Column(name = "[vitamin_d_upper(μg)]")
    private Integer vitaminDUpper_mcg; // μg/d
    @Column(name = "[vitamin_e_upper_(mg)]")
    private Integer vitaminEUpper_mg; // mg/d
    @Column(name = "[niacin_b3_upper_(mg)]")
    private Integer niacinB3Upper_mg; // mg/d
    @Column(name = "[vitamin_b6_upper_(mg)]")
    private Integer vitaminB6Upper_mg; // mg/d
    @Column(name = "[folate_b9_upper_(μg)]")
    private Integer folateB9Upper_mcg; // μg/d
    @Column(name = "[choline_upper(mg)]")
    private Integer cholineUpper_mg; // mg/d

    //----Minerals----
    @Column(name = "[calcium_upper_(mg)]")
    private Integer calciumUpper_mg; // mg/d
    @Column(name = "[copper_upper_(μg)]")
    private Integer copperUpper_mcg; // μg/d
    @Column(name = "[fluoride_upper_(mg)]")
    private Integer fluorideUpper_mg; // mg/d
    @Column(name = "[iodine_upper_(μg)]")
    private Integer iodineUpper_mcg; // μg/d
    @Column(name = "[iron_upper_(mg)]")
    private Integer ironUpper_mg; // mg/d
    @Column(name = "[magnesium_upper_(mg)]")
    private Integer magnesiumUpper_mg; // mg/d
    @Column(name = "[manganese_upper_(mg)]")
    private Integer manganeseUpper_mg; // mg/d
    @Column(name = "[molybdenum_upper_(μg)]")
    private Integer molybdenumUpper_mcg; // μg/d
    @Column(name = "[phosphorus_upper_(mg)]")
    private Integer phosphorusUpper_mg; // mg/d
    @Column(name = "[selenium_upper_(μg)]")
    private Integer seleniumUpper_mcg; // μg/d
    @Column(name = "[zinc_upper_(mg)]")
    private Integer zincUpper_mg; // mg/d
    @Column(name = "[chloride_upper_(g)]")
    private Float chlorideUpper_g; // g/d


    //----MicroNutrients----

    //Vitamins
    @Column(name = "[vitamin_a_(μg)]")
    private Integer vitaminA_mcg; // μg/d RAE
    @Column(name = "[vitamin_c_(mg)]")
    private Integer vitaminC_mg; // mg/d
    @Column(name = "[vitamin_d_(μg)]")
    private Integer vitaminD_mcg; // μg/d
    @Column(name = "[vitamin_e_(mg)]")
    private Integer vitaminE_mg; // mg/d
    @Column(name = "[vitamin_k_(μg)]")
    private Integer vitaminK_mcg; // μg/d
    @Column(name = "[thiamin_b1_(mg)]")
    private Integer thiaminB1_mg; // mg/d
    @Column(name = "[riboflavin_b2_(mg)]")
    private Integer riboflavinB2_mg; // mg/d
    @Column(name = "[niacin_b3_(mg)]")
    private Integer niacinB3_mg; // mg/d
    @Column(name = "[vitamin_b6_(mg)]")
    private Integer vitaminB6_mg; // mg/d
    @Column(name = "[folate_b9_(μg)]")
    private Integer folateB9_mcg; // μg/d
    @Column(name = "[vitamin_b12_(μg)]")
    private Integer vitaminB12_mcg; // μg/d
    @Column(name = "[pantothenic_acid_b5_(mg)]")
    private Integer pantothenicAcidB5_mg; // mg/d
    @Column(name = "[biotin_b7_(μg)]")
    private Integer biotinB7_mcg; // μg/d
    @Column(name = "[choline_(mg)]")
    private Integer choline_mg; // mg/d

    //Minerals
    @Column(name = "[calcium_(mg)]")
    private Integer calcium_mg; // mg/d
    @Column(name = "[chromium_(μg)]")
    private Integer chromium_mcg; // μg/d
    @Column(name = "[copper_(μg)]")
    private Integer copper_mcg; // μg/d
    @Column(name = "[fluoride_(mg)]")
    private Integer fluoride_mg; // mg/d
    @Column(name = "[iodine_(μg)]")
    private Integer iodine_mcg; // μg/d
    @Column(name = "[iron_(mg)]")
    private Integer iron_mg; // mg/d
    @Column(name = "[magnesium_(mg)]")
    private Integer magnesium_mg; // mg/d
    @Column(name = "[manganese_(mg)]")
    private Integer manganese_mg; // mg/d
    @Column(name = "[molybdenum_(μg)]")
    private Integer molybdenum_mcg; // μg/d
    @Column(name = "[phosphorus_(mg)]")
    private Integer phosphorus_mg; // mg/d
    @Column(name = "[selenium_(μg)]")
    private Integer selenium_mcg; // μg/d
    @Column(name = "[zinc_(mg)]")
    private Integer zinc_mg; // mg/d
    @Column(name = "[potassium_(mg)]")
    private Integer potassium_mg; // mg/d
    @Column(name = "[sodium_(mg)]")
    private Integer sodium_mg; // mg/d
    @Column(name = "[chloride_(g)]")
    private Float chloride_g; // g/d

    public NutritionRdaDto convertToDto() {
        return new NutritionRdaDto(
                this.water_kg * 1000,
                this.carbohydrates_g,
                this.fiber_g,
                this.fat_g,
                this.omega6_g,
                this.omega3_g,
                this.protein_g,
                this.cholesterol_mg,
                this.fatLLimit,
                this.fatULimit,
                this.monoFatLLimit,
                this.monoFatULimit,
                this.polyFatLLimit,
                this.polyFatULimit,
                this.omega6LLimit,
                this.omega6ULimit,
                this.omega3LLimit,
                this.omega3ULimit,
                this.carbLLimit,
                this.carbULimit,
                this.satFatLLimit,
                this.satFatULimit,
                this.sugarULimit,
                this.proteinLLimit,
                this.proteinULimit,
                this.vitaminAUpper_mcg,
                this.vitaminCUpper_mg,
                this.vitaminDUpper_mcg,
                this.vitaminEUpper_mg,
                this.niacinB3Upper_mg,
                this.vitaminB6Upper_mg,
                this.folateB9Upper_mcg,
                this.cholineUpper_mg,
                this.calciumUpper_mg,
                this.copperUpper_mcg,
                this.fluorideUpper_mg,
                this.iodineUpper_mcg,
                this.ironUpper_mg,
                this.magnesiumUpper_mg,
                this.manganeseUpper_mg,
                this.molybdenumUpper_mcg,
                this.phosphorusUpper_mg,
                this.seleniumUpper_mcg,
                this.zincUpper_mg,
                this.chlorideUpper_g,
                this.vitaminA_mcg,
                this.vitaminC_mg,
                this.vitaminD_mcg,
                this.vitaminE_mg,
                this.vitaminK_mcg,
                this.thiaminB1_mg,
                this.riboflavinB2_mg,
                this.niacinB3_mg,
                this.vitaminB6_mg,
                this.folateB9_mcg,
                this.vitaminB12_mcg,
                this.pantothenicAcidB5_mg,
                this.biotinB7_mcg,
                this.choline_mg,
                this.calcium_mg,
                this.chromium_mcg,
                this.copper_mcg,
                this.fluoride_mg,
                this.iodine_mcg,
                this.iron_mg,
                this.magnesium_mg,
                this.manganese_mg,
                this.molybdenum_mcg,
                this.phosphorus_mg,
                this.selenium_mcg,
                this.zinc_mg,
                this.potassium_mg,
                this.sodium_mg,
                this.chloride_g
        );
    }


}
