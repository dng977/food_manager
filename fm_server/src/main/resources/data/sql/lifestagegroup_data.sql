DELETE FROM life_stage_groups;

--children
INSERT INTO
    life_stage_groups (id, lower_limit, upper_limit, male, pregnancy, lactation, description)
VALUES
    ('c1-3',1, 3, false, false, false, 'children')
,
    ('c4-8',4, 8, false, false, false, 'children');

--males
INSERT INTO
    life_stage_groups (id, lower_limit, upper_limit, male, pregnancy, lactation, description)
VALUES
    ('m9-13',9, 13, true, false, false, 'males')
,
    ('m14-18',14, 18, true, false, false, 'males')
,
    ('m19-30',19, 30, true, false, false, 'males')
,
    ('m31-50',31, 50, true, false, false, 'males')
,
    ('m51-70',51, 70, true, false, false, 'males')
,
    ('m70+',70, 150, true, false, false, 'males');

--females
INSERT INTO
    life_stage_groups (id, lower_limit, upper_limit, male, pregnancy, lactation, description)
VALUES
    ('f9-13',9, 13, false, false, false, 'females')
,
    ('f14-18',14, 18, false, false, false, 'females')
,
    ('f19-30',19, 30, false, false, false, 'females')
,
    ('f31-50',31, 50, false, false, false, 'females')
,
    ('f51-70',51, 70, false, false, false, 'females')
,
    ('f70+',70, 150, false, false, false, 'females');

--pregnancy
INSERT INTO
    life_stage_groups (id, lower_limit, upper_limit, male, pregnancy, lactation, description)
VALUES
    ('p14-18',14, 18, false, true, false, 'pregnancy')
,
    ('p19-50',19, 50, false, true, false, 'pregnancy');
--lactation
INSERT INTO
    life_stage_groups (id, lower_limit, upper_limit, male, pregnancy, lactation, description)
VALUES
    ('l14-18',14, 18, false, false, true, 'lactation')
,
    ('l19-50',19, 50, false, false, true, 'lactation');