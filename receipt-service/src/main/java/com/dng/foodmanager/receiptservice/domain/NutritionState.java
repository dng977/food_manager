package com.dng.foodmanager.receiptservice.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "[nutrition_state]")
@IdClass(NutritionStateId.class)
public class NutritionState {
    @Id
    private String userId;

    @Id
    @Temporal(TemporalType.DATE)
    private Date date;

    @ManyToOne
    @MapsId
    @JoinColumn(name = "userId")
    private User user;



    //----Nutrition----

    @Column(name = "[energy_(kcal)]")
    private int energy;

    //----MacroNutrients----

    @Column(name = "[water_(l)]")
    private float water;// L/d
    @Column(name = "[carb_(g)]")
    private int carbohydrates; // g/d
    @Column(name = "[fiber_(g)]")
    private int fiber; // g/d
    @Column(name = "[fat_(g)]")
    private int fat; // g/d
    @Column(name = "[omega_6_(g)]") //linolenic
    private float omega6; // g/d
    @Column(name = "[omega_3_(g)]") //alpha-linolenic
    private float omega3; // g/d
    @Column(name = "[protein_(g)]")
    private int protein; // g/d


    //----MicroNutrients----

    //Vitamins
    @Column(name = "[vitamin_a_(μg)]")
    private int vitaminA; // μg/d



    @Column(name = "[vitamin_c_(mg)]")
    private int vitaminC; // mg/d



    @Column(name = "[vitamin_d_(μg)]")
    private int vitaminD; // μg/d



    @Column(name = "[vitamin_e_(mg)]")
    private int vitaminE; // mg/d



    @Column(name = "[vitamin_k_(μg)]")
    private int vitaminK; // μg/d
    @Column(name = "[thiamin_b1_(mg)]")
    private int thiaminB1; // mg/d
    @Column(name = "[riboflavin_b2_(mg)]")
    private int riboflavinB2; // mg/d

    @Column(name = "[niacin_b3_(mg)]")
    private int niacinB3; // mg/d



    @Column(name = "[vitamin_b6_(mg)]")
    private int vitaminB6; // mg/d



    @Column(name = "[folate_b9_(μg)]")
    private int folateB9; // μg/d



    @Column(name = "[vitamin_b12_(μg)]")
    private int vitaminB12; // μg/d
    @Column(name = "[pantothenic_acid_b5_(mg)]")
    private int pantothenicAcidB5; // mg/d
    @Column(name = "[biotin_b7_(μg)]")
    private int biotinB7; // μg/d

    @Column(name = "[choline_(mg)]")
    private int choline; // mg/d



    //Minerals
    @Column(name = "[calcium_(mg)]")
    private int calcium; // mg/d



    @Column(name = "[chromium_(μg)]")
    private int chromium; // μg/d

    @Column(name = "[copper_(μg)]")
    private int copper; // μg/d



    @Column(name = "[fluoride_(mg)]")
    private int fluoride; // mg/d



    @Column(name = "[iodine_(μg)]")
    private int iodine; // μg/d



    @Column(name = "[iron_(mg)]")
    private int iron; // mg/d



    @Column(name = "[magnesium_(mg)]")
    private int magnesium; // mg/d



    @Column(name = "[manganese_(mg)]")
    private int manganese; // mg/d



    @Column(name = "[molybdenum_(μg)]")
    private int molybdenum; // μg/d



    @Column(name = "[phosphorus_(mg)]")
    private int phosphorus; // mg/d



    @Column(name = "[selenium_(μg)]")
    private int selenium; // μg/d



    @Column(name = "[zinc_(mg)]")
    private int zinc; // mg/d



    @Column(name = "[potassium_(mg)]")
    private int potassium; // mg/d
    @Column(name = "[sodium_(mg)]")
    private int sodium; // mg/d

    @Column(name = "[chloride_(g)]")
    private float chloride; // g/d



}
