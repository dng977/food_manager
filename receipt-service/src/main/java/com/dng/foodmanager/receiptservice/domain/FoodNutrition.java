package com.dng.foodmanager.receiptservice.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "food_nutrition")
public class FoodNutrition extends BaseEntity {

    private String ndbNo;

    @Column(name = "[shrt_desc]")
    private String shrtDesc;

    @Column(name = "[Water_(g)]")
    private Float water;

    @Column(name = "[energ_kcal]")
    private Integer energy;

    @Column(name = "[protein_(g)]")
    private Float protein;

    @Column(name = "[lipid_Tot_(g)]")
    private Float lipid;

    @Column(name = "[Ash_(g)]")
    private Float ash;

    @Column(name = "[Carbohydrt_(g)]")
    private Float carbohydrate;

    @Column(name = "[Fiber_TD_(g)]")
    private Float fiber;

    @Column(name = "[Sugar_Tot_(g)]")
    private Float sugar;

    @Column(name = "[Calcium_(mg)]")
    private Integer calcium;

    @Column(name = "[Iron_(mg)]")
    private Float iron;

    @Column(name = "[Magnesium_(mg)]")
    private Float magnesium;

    @Column(name = "[Phosphorus_(mg)]")
    private Integer phosphorus;

    @Column(name = "[Potassium_(mg)]")
    private Integer potassium;

    @Column(name = "[Sodium_(mg)]")
    private Integer sodium;

    @Column(name = "[Zinc_(mg)]")
    private Float zinc;

    @Column(name = "[Copper_(mg)]")
    private Float copper;

    @Column(name = "[Manganese_(mg)]")
    private Float manganese;

    @Column(name = "[Selenium_(μg)]")
    private Float selenium;

    @Column(name = "[Vit_C_(mg)]")
    private Float vitaminC;

    @Column(name = "[Thiamin_(mg)]")
    private Float thiamin;

    @Column(name = "[Riboflavin_(mg)]")
    private Float riboflavin;

    @Column(name = "[Niacin_(mg)]")
    private Float niacin;

    @Column(name = "[Panto_Acid_(mg)]")
    private Float pantoAcid;

    @Column(name = "[Vit_B6_(mg)]")
    private Float vitB6;

    @Column(name = "[Folate_Tot_(μg)]")
    private Float folate;

    @Column(name = "[Folic_Acid_(μg)]")
    private Float folicAcid;

    @Column(name = "[Food_Folate_(μg)]")
    private Float foodFolate;

    @Column(name = "[Folate_DFE_(μg)]")
    private Float folateDFE;

    @Column(name = "[Choline_Tot_(mg)]")
    private Float choline;

    @Column(name = "[Vit_B12_(μg)]")
    private Float vitaminB12;

    @Column(name = "[Vit_A_IU]")
    private Integer vitAIU;

    @Column(name = "[Vit_A_RAE]")
    private Float vitARAE;

    @Column(name = "[Retinol_(μg)]")
    private Float retinol;

    @Column(name = "[Alpha_Carot_(μg)]")
    private Float alphaCarot;

    @Column(name = "[Beta_Carot_(μg)]")
    private Float betaCarot;

    @Column(name = "[Beta_Crypt_(μg)]")
    private Float betaCrypt;

    @Column(name = "[Lycopene_(μg)]")
    private Float lycopene;

    @Column(name = "[Lut+Zea_ (μg)]")
    private Float lutZea;

    @Column(name = "[Vit_E_(mg)]")
    private Float vitE;

    @Column(name = "[Vit_D_μg]")
    private Float vitD;

    @Column(name = "[Vit_D_IU]")
    private Float vitDUI;

    @Column(name = "[Vit_K_(μg)]")
    private Float vitK;

    @Column(name = "[FA_Sat_(g)]")
    private Float fatSat;

    @Column(name = "[FA_Mono_(g)]")
    private Float fatMono;

    @Column(name = "[FA_Poly_(g)]")
    private Float fatPoly;

    @Column(name = "[omega_3_(g)]")
    private Float omega_3;

    @Column(name = "[omega_6_(g)]")
    private Float omega_6;

    @Column(name = "[Cholestrl_(mg)]")
    private Integer cholesterol;

    @Column(name = "[Refuse_Pct]")
    private Integer refuse;







}