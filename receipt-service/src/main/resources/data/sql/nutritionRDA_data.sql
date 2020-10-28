USE [fm_dev]
GO

DELETE FROM nutrition_rda
DBCC CHECKIDENT ('nutrition_rda', RESEED, 1);

INSERT INTO
    [nutrition_rda] (
        --LifeStageGroup
        [life_stage_group_id],

        --MacroNutrients
        [water_(l)], [carb_(g)], [fiber_(g)], [fat_(g)], [omega_6_(g)], [omega_3_(g)], [protein_(g)], [cholesterol_(mg)],

        --Acceptable MacroNutrient Distribution Ranges:
        [fat_l_limit_(%)], [fat_u_limit_(%)], [omega6_l_limit_(%)], [omega6_limit_(%)], [omega_3_l_limit_(%)], [omega3_u_limit_(%)],
        [carb_l_limit_(%)], [carb_u_limit_(%)], [protein_l_limit_(%)], [protein_u_limit_(%)],
        [mono_fat_l_limit_(%)], [mono_fat_u_limit_(%)], [poly_fat_l_limit_(%)], [poly_fat_u_limit_(%)], [sat_fat_u_limit_(%)], [sugar_u_limit_(%)],

        --Tolerable Upper Intakes Levels--
        ----Vitamins----
        [vitamin_a_upper_(μg)], [vitamin_c_upper_(mg)], [vitamin_d_upper(μg)], [vitamin_e_upper_(mg)], [niacin_b3_upper_(mg)],
        [vitamin_b6_upper_(mg)],[folate_b9_upper_(μg)], [choline_upper(mg)],
        ----Minerals----
        [calcium_upper_(mg)], [copper_upper_(μg)],
        [fluoride_upper_(mg)], [iodine_upper_(μg)],[iron_upper_(mg)], [magnesium_upper_(mg)], [manganese_upper_(mg)],
        [molybdenum_upper_(μg)], [phosphorus_upper_(mg)], [selenium_upper_(μg)],[zinc_upper_(mg)], [chloride_upper_(g)],


        --MicroNutrients
        ----Vitamins
        [vitamin_a_(μg)],  [vitamin_c_(mg)],  [vitamin_d_(μg)], 
        [vitamin_e_(mg)],  [vitamin_k_(μg)], [thiamin_b1_(mg)], [riboflavin_b2_(mg)], [niacin_b3_(mg)],
         [vitamin_b6_(mg)],  [folate_b9_(μg)],  [vitamin_b12_(μg)],
        [pantothenic_acid_b5_(mg)], [biotin_b7_(μg)], [choline_(mg)], 
        ----Minerals
        [calcium_(mg)],  [chromium_(μg)], [copper_(μg)],  [fluoride_(mg)],
        [iodine_(μg)],  [iron_(mg)],  [magnesium_(mg)],
        [manganese_(mg)], [molybdenum_(μg)],  [phosphorus_(mg)],
        [selenium_(μg)], [zinc_(mg)],  [potassium_(mg)],
        [sodium_(mg)], [chloride_(g)]
        )
VALUES
    (
        --LifeStageGroup
        'c1-3',

        --MacroNutrients
        1.3, 130, 19, null, 7, 0.7, 13, 300,

        --Acceptable MacroNutrient Distribution Ranges:
        30, 40, 5, 10, 0.6, 1.2, 45, 65, 5, 20,
        15, 20, 5, 10, 10, 5,

        --Tolerable Upper Intakes Levels--
        ----Vitamins----
        600, 400, 63, 200, 10,30, 300, 1.0,
        ----Minerals----
        2500, 1000, 1.3, 200, 40, 65, 2, 300, 3, 90, 7, 2.3,
        --MicroNutrients
        ----Vitamins
        300, 15, 15, 6, 30, 0.5, 0.5, 6, 0.5, 150, 0.9, 2, 8, 200,
        ----Minerals
        700, 11, 340, 0.7, 90, 7, 80, 1.2, 17, 460, 20, 3, 2000, 800, 1.5
    )
,
    (
        --LifeStageGroup
        'c4-8',

        --MacroNutrients 7
        1.7, 130, 25, null, 10, 0.9, 19, 300,

        --Acceptable MacroNutrient Distribution Ranges:
        25, 35, 5, 10, 0.6, 1.2, 45, 65, 10, 30,
        15, 20, 5, 10, 10, 5,
        --Tolerable Upper Intakes Levels--
        ----Vitamins---- 8
        900, 650, 75, 300, 15, 40, 400, 1.0,
        ----Minerals---- 12
        2500, 3000, 2.2, 300, 40, 110, 3, 600, 3, 150, 12, 2.9,
        --MicroNutrients
        ----Vitamins
        400, 25, 15, 7, 55, 0.6, 0.6, 8, 0.6, 200, 1.2, 3, 12, 250,
        ----Minerals
        1000, 15, 440, 1, 90, 10, 130, 1.5, 22, 500, 30, 5, 2300, 1000, 1.9
    )
,
    (
        --LifeStageGroup
        'm9-13',

        --MacroNutrients 7
        2.4, 130, 31, null, 12, 1.2, 34, 300,

        --Acceptable MacroNutrient Distribution Ranges:
        25, 35, 5, 10, 0.6, 1.2, 45, 65, 10, 30,
        15, 20, 5, 10, 10, 5,
        --Tolerable Upper Intakes Levels--
        ----Vitamins---- 8
        1700, 1200, 100, 600, 20, 60, 600, 2.0,
        ----Minerals---- 12
        3000, 5000, 10, 600, 40, 350, 6, 1100, 4, 280, 23, 3.4,
        --MicroNutrients
        ----Vitamins
        600, 45, 15, 11, 60, 0.9, 0.9, 12, 1.0, 300, 1.8, 4, 20, 375,
        ----Minerals
        1300, 25, 700, 2, 120, 8, 240, 1.9, 34, 1250, 40, 8, 2500, 1200, 2.3
    )
,
    (
        --LifeStageGroup
        'm14-18',

        --MacroNutrients 7
        3.3, 130, 38, null, 16, 1.6, 52, 300,

        --Acceptable MacroNutrient Distribution Ranges:
        25, 35, 5, 10, 0.6, 1.2, 45, 65, 10, 30,
        15, 20, 5, 10, 10, 5,
        --Tolerable Upper Intakes Levels--
        ----Vitamins---- 8
        2800, 1800, 100, 800, 30, 80, 800, 3.0,
        ----Minerals---- 12
        3000, 8000, 10, 900, 45, 350, 9, 1700, 4, 400, 34, 3.6,
        --MicroNutrients
        ----Vitamins
        900, 75, 15, 15, 75, 1.2, 1.3, 16, 1.3, 400, 2.4, 5, 25, 550,
        ----Minerals
        1300, 35, 890, 3, 150, 11, 410, 2.2, 43, 1250, 55, 11, 3000, 1500, 2.3
    )
,
    (
        --LifeStageGroup
        'm19-30',

        --MacroNutrients 7
        3.7, 130, 38, null, 17, 1.6, 56, 300,

        --Acceptable MacroNutrient Distribution Ranges:
        20, 35, 5, 10, 0.6, 1.2, 45, 65, 10, 35,
        15, 20, 5, 10, 10, 5,
        --Tolerable Upper Intakes Levels--
        ----Vitamins---- 8
        3000, 2000, 100, 1000, 35, 100, 1000, 3.5,
        ----Minerals---- 12
        2500, 10000, 10, 1100, 45, 350, 11, 2000, 4, 400, 40, 3.6,
        --MicroNutrients
        ----Vitamins
        900, 90, 15, 15, 120, 1.2, 1.3, 16, 1.3, 400, 2.4, 5, 30, 550,
        ----Minerals
        1000, 35, 900, 4, 150, 8, 400, 2.3, 45, 700, 55, 11, 3400, 1500, 2.3
    )
,
    (
        --LifeStageGroup
        'm31-50',

        --MacroNutrients 7
        3.7, 130, 38, null, 17, 1.6, 56, 300,

        --Acceptable MacroNutrient Distribution Ranges:
        20, 35, 5, 10, 0.6, 1.2, 45, 65, 10, 35,
        15, 20, 5, 10, 10, 5,
        --Tolerable Upper Intakes Levels--
        ----Vitamins---- 8
        3000, 2000, 100, 1000, 35, 100, 1000, 3.5,
        ----Minerals---- 12
        2500, 10000, 10, 1100, 45, 350, 11, 2000, 4, 400, 40, 3.6,
        --MicroNutrients
        ----Vitamins
        900, 90, 15, 15, 120, 1.2, 1.3, 16, 1.3, 400, 2.4, 5, 30, 550,
        ----Minerals
        1000, 35, 900, 4, 150, 8, 400, 2.3, 45, 700, 55, 11, 3400, 1500, 2.3
    )
,
    (
        --LifeStageGroup
        'm51-70',

        --MacroNutrients 7
        3.7, 130, 30, null, 14, 1.6, 56, 300,

        --Acceptable MacroNutrient Distribution Ranges:
        20, 35, 5, 10, 0.6, 1.2, 45, 65, 10, 35,
        15, 20, 5, 10, 10, 5,
        --Tolerable Upper Intakes Levels--
        ----Vitamins---- 8
        3000, 2000, 100, 1000, 35, 100, 1000, 3.5,
        ----Minerals---- 12
        2000, 10000, 10, 1100, 45, 350, 11, 2000, 4, 400, 40, 3.6,
        --MicroNutrients
        ----Vitamins
        900, 90, 15, 15, 120, 1.2, 1.3, 16, 1.7, 400, 2.4, 5, 30, 550,
        ----Minerals
        1000, 30, 900, 4, 150, 8, 420, 2.3, 45, 700, 55, 11, 3400, 1500, 2.0
    )
,
    (
        --LifeStageGroup
        'm70+',

        --MacroNutrients 7
        3.7, 130, 30, null, 14, 1.6, 56, 300,

        --Acceptable MacroNutrient Distribution Ranges:
        20, 35, 5, 10, 0.6, 1.2, 45, 65, 10, 35,
        15, 20, 5, 10, 10, 5,
        --Tolerable Upper Intakes Levels--
        ----Vitamins---- 8
        3000, 2000, 100, 1000, 35, 100, 1000, 3.5,
        ----Minerals---- 12
        2000, 10000, 10, 1100, 45, 350, 11, 2000, 3, 400, 40, 3.6,
        --MicroNutrients
        ----Vitamins
        900, 90, 20, 15, 120, 1.2, 1.3, 16, 1.7, 400, 2.4, 5, 30, 550,
        ----Minerals
        1200, 30, 900, 4, 150, 8, 420, 2.3, 45, 700, 55, 11, 3400, 1500, 1.8
    )
,
    (
        --LifeStageGroup
        'f9-13',

        --MacroNutrients 7
        2.1, 130, 26, null, 10, 1.0, 34, 300,

        --Acceptable MacroNutrient Distribution Ranges:
        25, 35, 5, 10, 0.6, 1.2, 45, 65, 10, 30,
        15, 20, 5, 10, 10, 5,
        --Tolerable Upper Intakes Levels--
        ----Vitamins---- 8
        1700, 1200, 100, 600, 20, 60, 600, 2.0,
        ----Minerals---- 12
        3000, 5000, 10, 600, 40, 350, 6, 1100, 4, 280, 23, 3.4,
        --MicroNutrients
        ----Vitamins
        600, 45, 15, 11, 60, 0.9, 0.9, 12, 1.0, 300, 1.8, 4, 20, 375,
        ----Minerals
        1300, 21, 700, 2, 120, 8, 240, 1.6, 34, 1250, 40, 8, 2300, 1200, 2.3
    )
,
    (
        --LifeStageGroup
        'f14-18',

        --MacroNutrients 7
       2.3, 130, 26, null, 11, 1.1, 46, 300,

        --Acceptable MacroNutrient Distribution Ranges:
        25, 35, 5, 10, 0.6, 1.2, 45, 65, 10, 30,
        15, 20, 5, 10, 10, 5,
        --Tolerable Upper Intakes Levels--
        ----Vitamins---- 8
        2800, 1800, 100, 800, 30, 80, 800, 3.0,
        ----Minerals---- 12
        3000, 8000, 10, 900, 45, 350, 9, 1700, 4, 400, 34, 3.6,
        --MicroNutrients
        ----Vitamins
        700, 65, 15, 15, 75, 1.0, 1.0, 14, 1.2, 400, 2.4, 5, 25, 400,
        ----Minerals
        1300, 24, 890, 3, 150, 15, 360, 1.6, 43, 1250, 55, 9, 2300, 1500, 2.3
    )
,
    (
        --LifeStageGroup
        'f19-30',

        --MacroNutrients 7
        2.7, 130, 25, null, 12, 1.1, 46, 300,

        --Acceptable MacroNutrient Distribution Ranges:
        20, 35, 5, 10, 0.6, 1.2, 45, 65, 10, 35,
        15, 20, 5, 10, 10, 5,
        --Tolerable Upper Intakes Levels--
        ----Vitamins---- 8
        3000, 2000, 100, 1000, 35, 100, 1000, 3.5,
        ----Minerals---- 12
        2500, 10000, 10, 1100, 45, 350, 11, 2000, 4, 400, 40, 3.6,
        --MicroNutrients
        ----Vitamins
        700, 75, 15, 15, 90, 1.1, 1.1, 14, 1.3, 400, 2.4, 5, 30, 425,
        ----Minerals
        1000, 25, 900, 3, 150, 18, 310, 1.8, 45, 700, 55, 8, 2600, 1500, 2.3
    )
,
    (
        --LifeStageGroup
        'f31-50',

        --MacroNutrients 7
        2.7, 130, 25, null, 12, 1.1, 46, 300,

        --Acceptable MacroNutrient Distribution Ranges:
        20, 35, 5, 10, 0.6, 1.2, 45, 65, 10, 35,
        15, 20, 5, 10, 10, 5,
        --Tolerable Upper Intakes Levels--
        ----Vitamins---- 8
        3000, 2000, 100, 1000, 35, 100, 1000, 3.5,
        ----Minerals---- 12
        2500, 10000, 10, 1100, 45, 350, 11, 2000, 4, 400, 40, 3.6,
        --MicroNutrients
        ----Vitamins
        700, 75, 15, 15, 90, 1.1, 1.1, 14, 1.3, 400, 2.4, 5, 30, 425,
        ----Minerals
        1000, 25, 900, 3, 150, 18, 310, 1.8, 45, 700, 55, 8, 2600, 1500, 2.3
    )
,
    (
        --LifeStageGroup
        'f51-70',

        --MacroNutrients 7
        2.7, 130, 21, null, 11, 1.1, 46, 300,

        --Acceptable MacroNutrient Distribution Ranges:
        20, 35, 5, 10, 0.6, 1.2, 45, 65, 10, 35,
        15, 20, 5, 10, 10, 5,
        --Tolerable Upper Intakes Levels--
        ----Vitamins---- 8
        3000, 2000, 100, 1000, 35, 100, 1000, 3.5,
        ----Minerals---- 12
        2000, 10000, 10, 1100, 45, 350, 11, 2000, 4, 400, 40, 3.6,
        --MicroNutrients
        ----Vitamins
        700, 75, 15, 15, 90, 1.1, 1.1, 14, 1.5, 400, 2.4, 5, 30, 425,
        ----Minerals
        1200, 20, 900, 3, 150, 8, 320, 1.8, 45, 700, 55, 8, 2600, 1500, 2.0
    )
,
    (
        --LifeStageGroup
        'f70+',

        --MacroNutrients 7
        2.7, 130, 21, null, 11, 1.1, 46, 300,

        --Acceptable MacroNutrient Distribution Ranges:
        20, 35, 5, 10, 0.6, 1.2, 45, 65, 10, 35,
        15, 20, 5, 10, 10, 5,
        --Tolerable Upper Intakes Levels--
        ----Vitamins---- 8
        3000, 2000, 100, 1000, 35, 100, 1000, 3.5,
        ----Minerals---- 12
        2000, 10000, 10, 1100, 45, 350, 11, 2000, 3, 400, 40, 3.6,
        --MicroNutrients
        ----Vitamins
        700, 75, 20, 15, 90, 1.1, 1.1, 14, 1.5, 400, 2.4, 5, 30, 425,
        ----Minerals
        1200, 20, 900, 3, 150, 8, 320, 1.8, 45, 700, 55, 8, 2600, 1500, 1.8
    )
,
    (
        --LifeStageGroup
        'p14-18',

        --MacroNutrients 7
        3.0, 175, 28, null, 13, 1.4, 71, 300,

        --Acceptable MacroNutrient Distribution Ranges:
        25, 35, 5, 10, 0.6, 1.2, 45, 65, 10, 30,
        15, 20, 5, 10, 10, 5,
        --Tolerable Upper Intakes Levels--
        ----Vitamins---- 8
        2800, 1800, 100, 800, 30, 80, 800, 3.0,
        ----Minerals---- 12
        3000, 8000, 10, 900, 45, 350, 9, 1700, 4, 400, 34, 3.6,
        --MicroNutrients
        ----Vitamins
        750, 80, 15, 15, 75, 1.4, 1.4, 18, 1.9, 600, 2.6, 6, 30, 450,
        ----Minerals
        1300, 29, 1000, 3, 220, 27, 400, 2.0, 50, 1250, 60, 12, 2600, 1500, 2.3
    )
,
    (
        --LifeStageGroup
        'p19-50',

        --MacroNutrients 7
        3.0, 175, 28, null, 13, 1.4, 71, 300,

        --Acceptable MacroNutrient Distribution Ranges:
        20, 35, 5, 10, 0.6, 1.2, 45, 65, 10, 35,
        15, 20, 5, 10, 10, 5,
        --Tolerable Upper Intakes Levels--
        ----Vitamins---- 8
        3000, 2000, 100, 1000, 35, 100, 1000, 3.5,
        ----Minerals---- 12
        2500, 10000, 10, 1100, 45, 350, 11, 2000, 3.5, 400, 40, 3.6,
        --MicroNutrients
        ----Vitamins
        770, 85, 15, 15, 90, 1.4, 1.4, 18, 1.9, 600, 2.6, 6, 30, 450,
        ----Minerals
        1000, 30, 1000, 3, 220, 27, 350, 2.0, 50, 700, 60, 11, 2900, 1500, 2.3
    )
,
    (
        --LifeStageGroup
        'l14-18',

        --MacroNutrients 7
        3.8, 210, 29, null, 13, 1.3, 71, 300,

        --Acceptable MacroNutrient Distribution Ranges:
        25, 35, 5, 10, 0.6, 1.2, 45, 65, 10, 30,
        15, 20, 5, 10, 10, 5,
        --Tolerable Upper Intakes Levels--
        ----Vitamins---- 8
        2800, 1800, 100, 800, 30, 80, 800, 3.0,
        ----Minerals---- 12
        3000, 8000, 10, 900, 45, 350, 9, 1700, 4, 400, 34, 3.6,
        --MicroNutrients
        ----Vitamins
        1200, 115, 15, 19, 75, 1.4, 1.6, 17, 2.0, 500, 2.8, 7, 35, 550,
        ----Minerals
        1300, 44, 1300, 3, 290, 10, 360, 2.6, 50, 1250, 70, 13, 2500, 1500, 2.3
    )
,
    (
        --LifeStageGroup
        'l19-50',

        --MacroNutrients 7
        3.8, 210, 29, null, 13, 1.3, 71, 300,

        --Acceptable MacroNutrient Distribution Ranges:
        20, 35, 5, 10, 0.6, 1.2, 45, 65, 10, 35,
        15, 20, 5, 10, 10, 5,
        --Tolerable Upper Intakes Levels--
        ----Vitamins---- 8
        3000, 2000, 100, 1000, 35, 100, 1000, 3.5,
        ----Minerals---- 12
        2500, 10000, 10, 1100, 45, 350, 11, 2000, 4, 400, 40, 3.6,
        --MicroNutrients
        ----Vitamins
        1300, 120, 15, 19, 90, 1.4, 1.6, 17, 2.0, 500, 2.8, 7, 35, 550,
        ----Minerals
        1000, 45, 1300, 3, 290, 9, 310, 2.6, 50, 700, 70, 12, 2800, 1500, 2.3
    )
