package com.dng.foodmanager.receiptservice.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.List;
import java.util.Optional;

@Data
@Entity
@Table(name = "food_nutrition")
public class FoodNutrition {

    @Id
    @Column(name = "[NDB_No]")
    private Long ndbNo;

    @Column(name = "[Shrt_Desc]")
    private String shrtDesc;

    @Column(name = "[Water_(g)]")
    private Double water_g;

    @Column(name = "[Energ_Kcal]")
    private Integer energy_kcal;

    @Column(name = "[Protein_(g)]")
    private Double protein_g;

    @Column(name = "[Lipid_Tot_(g)]")
    private Double fat_g;

    @Column(name = "[Ash_(g)]")
    private Double ash_g;// NOT INCLUDED IN RDA YET

    @Column(name = "[Carbohydrt_(g)]")
    private Double carbohydrates_g;

    @Column(name = "[Fiber_TD_(g)]")
    private Double fiber_g;

    @Column(name = "[Sugar_Tot_(g)]")
    private Double sugar_g; // included (British Nutrition found)

    @Column(name = "[Sucrose_(g)]")
    private Double sucrose_g;

    @Column(name = "[Calcium_(mg)]")
    private Integer calcium_mg;

    @Column(name = "[Iron_(mg)]")
    private Double iron_mg;

    @Column(name = "[Magnesium_(mg)]")
    private Double magnesium_mg;

    @Column(name = "[Phosphorus_(mg)]")
    private Integer phosphorus_mg;

    @Column(name = "[Potassium_(mg)]")
    private Integer potassium_mg;

    @Column(name = "[Sodium_(mg)]")
    private Integer sodium_mg;

    @Column(name = "[Zinc_(mg)]")
    private Double zinc_mg;

    @Column(name = "[Copper_(mg)]")
    private Double copper_mg;

    @Column(name = "[Manganese_(mg)]")
    private Double manganese_mg;

    @Column(name = "[Selenium_(μg)]")
    private Double selenium_mcg;

    @Column(name = "[Vit_C_(mg)]")
    private Double vitaminC_mg;

    @Column(name = "[Thiamin_(mg)]")
    private Double thiaminB1_mg;

    @Column(name = "[Riboflavin_(mg)]")
    private Double riboflavinB2_mg;

    @Column(name = "[Niacin_(mg)]")
    private Double niacinB3_mg;

    @Column(name = "[Panto_Acid_(mg)]")
    private Double pantothenicAcidB5_mg;
    @Column(name = "[Vit_B6_(mg)]")
    private Double vitaminB6_mg;

    @Column(name = "[Folate_Tot_(μg)]")
    private Double folateB9_mcg;

    @Column(name = "[Folic_Acid_(μg)]")
    private Double folicAcid_mcg; // NOT INCLUDED IN RDA

    @Column(name = "[Food_Folate_(μg)]")
    private Double foodFolate_mcg; // NOT INCLUDED IN RDA

    @Column(name = "[Folate_DFE_(μg)]")
    private Double folateDFE_mcg; // NOT INCLUDED IN RDA

    @Column(name = "[Choline_Tot_(mg)]")
    private Double choline_mg;

    @Column(name = "[Vit_B12_(μg)]")
    private Double vitaminB12_mcg;


    //VITAMIN A
    @Column(name = "[Vit_A_RAE]")
    private Double vitaminA_mcg; //RAE Mcg
    @Column(name = "[Vit_A_IU]")
    private Integer vitAIU; // NOT INCLUDED IN RDA
    @Column(name = "[Retinol_(μg)]")
    private Double retinol; // NOT INCLUDED IN RDA
    @Column(name = "[Alpha_Carot_(μg)]")
    private Double alphaCarot; // NOT INCLUDED IN RDA
    @Column(name = "[Beta_Carot_(μg)]")
    private Double betaCarot; // NOT INCLUDED IN RDA
    @Column(name = "[Beta_Crypt_(μg)]")
    private Double betaCrypt; // NOT INCLUDED IN RDA


    @Column(name = "[Lycopene_(μg)]")
    private Double lycopene_mcg; // NOT INCLUDED IN RDA

    @Column(name = "[Lut+Zea_(μg)]")
    private Double lutZea_mcg; // NOT INCLUDED IN RDA

    @Column(name = "[Vit_E_(mg)]")
    private Double vitaminE_mg;

    @Column(name = "[Vit_D_μg]")
    private Double vitaminD_mcg;

    @Column(name = "[Vit_D_IU]")
    private Double vitDUI; // NOT INCLUDED IN RDA

    @Column(name = "[Vit_K_(μg)]")
    private Double vitaminK_mcg;

    @Column(name = "[FA_Sat_(g)]")
    private Double satFat_g;

    @Column(name = "[FA_Mono_(g)]")
    private Double monoFat_g; // manually included CLVC

    @Column(name = "[FA_Poly_(g)]")
    private Double polyFat_g; // manually included CLVC

    @Column(name = "[omega_3_(g)]")
    private Double omega3_g;

    @Column(name = "[omega_6_(g)]")
    private Double omega6_g;

    @Column(name = "[Cholestrl_(mg)]")
    private Integer cholesterol_mg; // mi CLVC

    @Column(name = "[Gmwt_1]")
    private Double serving1_g;

    @Column(name = "[Gmwt_Desc1]")
    private String serving1_desc;

    @Column(name = "[Gmwt_2]")
    private Double serving2_g;

    @Column(name = "[Gmwt_Desc2]")
    private String serving2_desc;
    
    @Nullable
    @Column(name = "[Refuse_Pct]")
    private Integer refuse; // NOT INCLUDED IN RDA

    public Optional<String> getShrtDesc() {
        return Optional.ofNullable(shrtDesc);
    }

    public Optional<Double> getWater_g() {
        return Optional.ofNullable(water_g);
    }

    public Optional<Integer> getEnergy_kcal() {
        return Optional.ofNullable(energy_kcal);
    }

    public Optional<Double> getProtein_g() {
        return Optional.ofNullable(protein_g);
    }

    public Optional<Double> getFat_g() {
        return Optional.ofNullable(fat_g);
    }

    public Optional<Double> getAsh_g() {
        return Optional.ofNullable(ash_g);
    }

    public Optional<Double> getCarbohydrates_g() {
        return Optional.ofNullable(carbohydrates_g);
    }

    public Optional<Double> getFiber_g() {
        return Optional.ofNullable(fiber_g);
    }

    public Optional<Double> getSucrose_g() {
        return Optional.ofNullable(sucrose_g);
    }
    public Optional<Double> getSugar_g() {
        return Optional.ofNullable(sugar_g);
    }

    public Optional<Integer> getCalcium_mg() {
        return Optional.ofNullable(calcium_mg);
    }

    public Optional<Double> getIron_mg() {
        return Optional.ofNullable(iron_mg);
    }

    public Optional<Double> getMagnesium_mg() {
        return Optional.ofNullable(magnesium_mg);
    }

    public Optional<Integer> getPhosphorus_mg() {
        return Optional.ofNullable(phosphorus_mg);
    }

    public Optional<Integer> getPotassium_mg() {
        return Optional.ofNullable(potassium_mg);
    }

    public Optional<Integer> getSodium_mg() {
        return Optional.ofNullable(sodium_mg);
    }

    public Optional<Double> getZinc_mg() {
        return Optional.ofNullable(zinc_mg);
    }

    public Optional<Double> getCopper_mg() {
        return Optional.ofNullable(copper_mg);
    }

    public Optional<Double> getManganese_mg() {
        return Optional.ofNullable(manganese_mg);
    }

    public Optional<Double> getSelenium_mcg() {
        return Optional.ofNullable(selenium_mcg);
    }

    public Optional<Double> getVitaminC_mg() {
        return Optional.ofNullable(vitaminC_mg);
    }

    public Optional<Double> getThiaminB1_mg() {
        return Optional.ofNullable(thiaminB1_mg);
    }

    public Optional<Double> getRiboflavinB2_mg() {
        return Optional.ofNullable(riboflavinB2_mg);
    }

    public Optional<Double> getNiacinB3_mg() {
        return Optional.ofNullable(niacinB3_mg);
    }

    public Optional<Double> getPantothenicAcidB5_mg() {
        return Optional.ofNullable(pantothenicAcidB5_mg);
    }

    public Optional<Double> getVitaminB6_mg() {
        return Optional.ofNullable(vitaminB6_mg);
    }

    public Optional<Double> getFolateB9_mcg() {
        return Optional.ofNullable(folateB9_mcg);
    }

    public Optional<Double> getFolicAcid_mcg() {
        return Optional.ofNullable(folicAcid_mcg);
    }

    public Optional<Double> getFoodFolate_mcg() {
        return Optional.ofNullable(foodFolate_mcg);
    }

    public Optional<Double> getFolateDFE_mcg() {
        return Optional.ofNullable(folateDFE_mcg);
    }

    public Optional<Double> getCholine_mg() {
        return Optional.ofNullable(choline_mg);
    }

    public Optional<Double> getVitaminB12_mcg() {
        return Optional.ofNullable(vitaminB12_mcg);
    }

    public Optional<Double> getVitaminA_mcg() {
        return Optional.ofNullable(vitaminA_mcg);
    }

    public Optional<Integer> getVitAIU() {
        return Optional.ofNullable(vitAIU);
    }

    public Optional<Double> getRetinol() {
        return Optional.ofNullable(retinol);
    }

    public Optional<Double> getAlphaCarot() {
        return Optional.ofNullable(alphaCarot);
    }

    public Optional<Double> getBetaCarot() {
        return Optional.ofNullable(betaCarot);
    }

    public Optional<Double> getBetaCrypt() {
        return Optional.ofNullable(betaCrypt);
    }

    public Optional<Double> getLycopene_mcg() {
        return Optional.ofNullable(lycopene_mcg);
    }

    public Optional<Double> getLutZea_mcg() {
        return Optional.ofNullable(lutZea_mcg);
    }

    public Optional<Double> getVitaminE_mg() {
        return Optional.ofNullable(vitaminE_mg);
    }

    public Optional<Double> getVitaminD_mcg() {
        return Optional.ofNullable(vitaminD_mcg);
    }

    public Optional<Double> getVitDUI() {
        return Optional.ofNullable(vitDUI);
    }

    public Optional<Double> getVitaminK_mcg() {
        return Optional.ofNullable(vitaminK_mcg);
    }

    public Optional<Double> getSatFat_g() {
        return Optional.ofNullable(satFat_g);
    }

    public Optional<Double> getMonoFat_g() {
        return Optional.ofNullable(monoFat_g);
    }

    public Optional<Double> getPolyFat_g() {
        return Optional.ofNullable(polyFat_g);
    }

    public Optional<Double> getOmega3_g() {
        return Optional.ofNullable(omega3_g);
    }

    public Optional<Double> getOmega6_g() {
        return Optional.ofNullable(omega6_g);
    }

    public Optional<Integer> getCholesterol_mg() {
        return Optional.ofNullable(cholesterol_mg);
    }

    public Optional<Double> getServing1_g() {
        return Optional.ofNullable(serving1_g);
    }

    public Optional<String> getServing1_desc() {
        return Optional.ofNullable(serving1_desc);
    }

    public Optional<Double> getServing2_g() {
        return Optional.ofNullable(serving2_g);
    }

    public Optional<String> getServing2_desc() {
        return Optional.ofNullable(serving2_desc);
    }

    public Optional<Integer> getRefuse() {
        return Optional.ofNullable(refuse);
    }
}