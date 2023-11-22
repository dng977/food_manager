BEGIN TRANSACTION;

DELETE FROM food_nutrition;

COPY food_nutrition (ndb_no, "alpha_carot_(μg)", "ash_(g)", "beta_carot_(μg)", "beta_crypt_(μg)", "calcium_(mg)", "carbohydrt_(g)", "cholestrl_(mg)", "choline_tot_(mg)", "copper_(mg)", energ_kcal, "lipid_tot_(g)", "fiber_td_(g)", "folate_tot_(μg)", "folate_dfe_(μg)", "folic_acid_(μg)", "food_folate_(μg)", "iron_(mg)", "lut+zea_(μg)", "lycopene_(μg)", "magnesium_(mg)", "manganese_(mg)", "fa_mono_(g)", "niacin_(mg)", "omega_3_(g)", "omega_6_(g)", "panto_acid_(mg)", "phosphorus_(mg)", "fa_poly_(g)", "potassium_(mg)", "protein_(g)", refuse_pct, "retinol_(μg)", "riboflavin_(mg)", "fa_sat_(g)", "selenium_(μg)", gmwt_desc1, gmwt_1, gmwt_desc2, gmwt_2, shrt_desc, "sodium_(mg)", "sucrose_(g)", "sugar_tot_(g)", "thiamin_(mg)", vit_a_iu, vit_d_iu, vit_a_rae, "vit_b12_(μg)", "vit_b6_(mg)", "vit_c_(mg)", vit_d_μg, "vit_e_(mg)", "vit_k_(μg)", "water_(g)", "zinc_(mg)")
FROM '/var/lib/postgresql/data/food_nutrition/NUTRITION_MAIN.csv'
DELIMITER ','
CSV HEADER;

COMMIT;