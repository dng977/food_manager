package com.dng.foodmanager.receiptservice.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "[nutrition_rda]")
public class NutritionRDA extends BaseEntity{

    @OneToOne
    private LifeStageGroup lifeStageGroup;

    //--MacroNutrients--

    @Column(name = "[water_(l)]")
    private Float water;// L/d
    @Column(name = "[carb_(g)]")
    private Integer carbohydrates; // g/d
    @Column(name = "[fiber_(g)]")
    private Integer fiber; // g/d
    @Column(name = "[fat_(g)]")
    private Integer fat; // g/d
    @Column(name = "[omega_6_(g)]") //linolenic
    private Float omega6; // g/d
    @Column(name = "[omega_3_(g)]") //alpha-linolenic
    private Float omega3; // g/d
    @Column(name = "[protein_(g)]")
    private Integer protein; // g/d

    //Acceptable MacroNutrient Distribution Ranges:
    @Column(name = "[fat_l_limit_(%)]")
    private Integer fatLLimit; // %
    @Column(name = "[fat_u_limit_(%)]")
    private Integer fatULimit; // %

    @Column(name = "[omega6_l_limit_(%)]")
    private Integer omega6LLimit; // %
    @Column(name = "[omega6_limit_(%)]")
    private Integer omega6ULimit; // %

    @Column(name = "[omega_3_l_limit_(%)]")
    private Integer omega3LLimit; // %
    @Column(name = "[omega3_u_limit_(%)]")
    private Integer omega3ULimit; // %

    @Column(name = "[carb_l_limit_(%)]")
    private Integer carbLLimit; // %
    @Column(name = "[carb_u_limit_(%)]")
    private Integer carbULimit; // %

    @Column(name = "[protein_l_limit_(%)]")
    private Integer proteinLLimit; // %
    @Column(name = "[protein_u_limit_(%)]")
    private Integer proteinULimit; // %

    //--Tolerable Upper Intakes Levels--
    //----Vitamins----
    @Column(name = "[vitamin_a_upper_(μg)]")
    private Integer vitaminAUpper; // μg/d
    @Column(name = "[vitamin_c_upper_(mg)]")
    private Integer vitaminCUpper; // mg/d
    @Column(name = "[vitamin_d_upper(μg)]")
    private Integer vitaminDUpper; // μg/d
    @Column(name = "[vitamin_e_upper_(mg)]")
    private Integer vitaminEUpper; // mg/d
    @Column(name = "[niacin_b3_upper_(mg)]")
    private Integer niacinB3Upper; // mg/d
    @Column(name = "[vitamin_b6_upper_(mg)]")
    private Integer vitaminB6Upper; // mg/d
    @Column(name = "[folate_b9_upper_(μg)]")
    private Integer folateB9Upper; // μg/d
    @Column(name = "[choline_upper(mg)]")
    private Integer cholineUpper; // mg/d

    //----Minerals----
    @Column(name = "[calcium_upper_(mg)]")
    private Integer calciumUpper; // mg/d
    @Column(name = "[copper_upper_(μg)]")
    private Integer copperUpper; // μg/d
    @Column(name = "[fluoride_upper_(mg)]")
    private Integer fluorideUpper; // mg/d
    @Column(name = "[iodine_upper_(μg)]")
    private Integer iodineUpper; // μg/d
    @Column(name = "[iron_upper_(mg)]")
    private Integer ironUpper; // mg/d
    @Column(name = "[magnesium_upper_(mg)]")
    private Integer magnesiumUpper; // mg/d
    @Column(name = "[manganese_upper_(mg)]")
    private Integer manganeseUpper; // mg/d
    @Column(name = "[molybdenum_upper_(μg)]")
    private Integer molybdenumUpper; // μg/d
    @Column(name = "[phosphorus_upper_(mg)]")
    private Integer phosphorusUpper; // mg/d
    @Column(name = "[selenium_upper_(μg)]")
    private Integer seleniumUpper; // μg/d
    @Column(name = "[zinc_upper_(mg)]")
    private Integer zincUpper; // mg/d
    @Column(name = "[chloride_upper_(g)]")
    private Float chlorideUpper; // g/d



    //----MicroNutrients----

    //Vitamins
    @Column(name = "[vitamin_a_(μg)]")
    private Integer vitaminA; // μg/d

    @Column(name = "[vitamin_c_(mg)]")
    private Integer vitaminC; // mg/d

    @Column(name = "[vitamin_d_(μg)]")
    private Integer vitaminD; // μg/d

    @Column(name = "[vitamin_e_(mg)]")
    private Integer vitaminE; // mg/d

    @Column(name = "[vitamin_k_(μg)]")
    private Integer vitaminK; // μg/d
    @Column(name = "[thiamin_b1_(mg)]")
    private Integer thiaminB1; // mg/d
    @Column(name = "[riboflavin_b2_(mg)]")
    private Integer riboflavinB2; // mg/d

    @Column(name = "[niacin_b3_(mg)]")
    private Integer niacinB3; // mg/d

    @Column(name = "[vitamin_b6_(mg)]")
    private Integer vitaminB6; // mg/d

    @Column(name = "[folate_b9_(μg)]")
    private Integer folateB9; // μg/d

    @Column(name = "[vitamin_b12_(μg)]")
    private Integer vitaminB12; // μg/d
    @Column(name = "[pantothenic_acid_b5_(mg)]")
    private Integer pantothenicAcidB5; // mg/d
    @Column(name = "[biotin_b7_(μg)]")
    private Integer biotinB7; // μg/d

    @Column(name = "[choline_(mg)]")
    private Integer choline; // mg/d


    //Minerals
    @Column(name = "[calcium_(mg)]")
    private Integer calcium; // mg/d

    @Column(name = "[chromium_(μg)]")
    private Integer chromium; // μg/d

    @Column(name = "[copper_(μg)]")
    private Integer copper; // μg/d

    @Column(name = "[fluoride_(mg)]")
    private Integer fluoride; // mg/d

    @Column(name = "[iodine_(μg)]")
    private Integer iodine; // μg/d

    @Column(name = "[iron_(mg)]")
    private Integer iron; // mg/d

    @Column(name = "[magnesium_(mg)]")
    private Integer magnesium; // mg/d

    @Column(name = "[manganese_(mg)]")
    private Integer manganese; // mg/d

    @Column(name = "[molybdenum_(μg)]")
    private Integer molybdenum; // μg/d

    @Column(name = "[phosphorus_(mg)]")
    private Integer phosphorus; // mg/d

    @Column(name = "[selenium_(μg)]")
    private Integer selenium; // μg/d

    @Column(name = "[zinc_(mg)]")
    private Integer zinc; // mg/d

    @Column(name = "[potassium_(mg)]")
    private Integer potassium; // mg/d
    @Column(name = "[sodium_(mg)]")
    private Integer sodium; // mg/d

    @Column(name = "[chloride_(g)]")
    private Float chloride; // g/d





}
