
USE [fm_dev]
GO

DELETE FROM life_stage_groups

--children
INSERT INTO
    life_stage_groups (id, lower_limit, upper_limit, male, pregnancy, lactation, description)
VALUES
    ('c1-3',1, 3, 0, 0, 0, 'children')
,
    ('c4-8',4, 8, 0, 0, 0, 'children');

--males
INSERT INTO
    life_stage_groups (id, lower_limit, upper_limit, male, pregnancy, lactation, description)
VALUES
    ('m9-13',9, 13, 1, 0, 0, 'males')
,
    ('m14-18',14, 18, 1, 0, 0, 'males')
,
    ('m19-30',19, 30, 1, 0, 0, 'males')
,
    ('m31-50',31, 50, 1, 0, 0, 'males')
,
    ('m51-70',51, 70, 1, 0, 0, 'males')
,
    ('m70+',70, 150, 1, 0, 0, 'males');

--females
INSERT INTO
    life_stage_groups (id, lower_limit, upper_limit, male, pregnancy, lactation, description)
VALUES
    ('f9-13',9, 13, 0, 0, 0, 'females')
,
    ('f14-18',14, 18, 0, 0, 0, 'females')
,
    ('f19-30',19, 30, 0, 0, 0, 'females')
,
    ('f31-50',31, 50, 0, 0, 0, 'females')
,
    ('f51-70',51, 70, 0, 0, 0, 'females')
,
    ('f70+',70, 150, 0, 0, 0, 'females');

--pregnancy
INSERT INTO
    life_stage_groups (id, lower_limit, upper_limit, male, pregnancy, lactation, description)
VALUES
    ('p14-18',14, 18, 0, 1, 0, 'pregnancy')
,
    ('p19-50',19, 50, 0, 1, 0, 'pregnancy')
--lactation
INSERT INTO
    life_stage_groups (id, lower_limit, upper_limit, male, pregnancy, lactation, description)
VALUES
    ('l14-18',14, 18, 0, 0, 1, 'lactation')
,
    ('l19-50',19, 50, 0, 0, 1, 'lactation')