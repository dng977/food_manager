USE [fm_dev]
GO

DELETE FROM food_items
DBCC CHECKIDENT ('food_items', RESEED, 1)
--VEGETABLES
INSERT INTO food_items (name,serving_size, serving_desc, countable, fk_nutrition_cooked, fk_nutrition_raw) 
VALUES 
  ('cabbage', 100,'', 1, 11110,11109)
, ('eggplant', 100,'',1, 11210,11209)
, ('carrot', 100,'',1, 11125,11124)
, ('courgette', 100,'',1, 11478,11477)
, ('artichoke', 100,'',1, 11008,11007)
, ('beets', 100,'',1, 11081,11080)
, ('broccoli', 100,'',1, 11091,11090)
, ('cauliflower', 100,'',0, 11136,11135)
, ('cucumber', 100,'',1, null,11206)
, ('pickled cucumber',100,'', 1, 11937,null)
, ('leek', 100,'',1, 11247,11246)
, ('romaine lettuce', 100,'',1, null,11251)
, ('iceberg lettuce', 100,'',1, null,11252)
, ('green leaf lettuce', 100,'',1, null,11253)
, ('white mushroom', 100,'',1, 11261,11260)
, ('onion', 100,'',1, 11283,11282)
, ('spring onion', 100,'',1, null,11291)
, ('peas freezed', 160,'',0, 11313,11312)
, ('green pepper', 70,'',1, 11334,11333)
, ('red pepper', 70,'',1, 11822,11821)
, ('yellow pepper', 70,'',1, 11823,11951)
, ('chilli pepper', 70,'',1, null,11819)
, ('potato', 200,'',1, 11363,null)
, ('pumpkin', 245,'',0, 11423,11422)
, ('brussels sprout', 19,'',1, 11099,11098)
, ('corn', 100,'',0, 11168,11167)
, ('corn freezed', 100,'',0, 11179,null)
, ('corn canned', 100,'',0, null,11172)
, ('sweet potato', 100,'',1, 11510,null)
, ('tomato', 100,'',1, 11530,11529)
, ('tomato puree', 100,'',0, null,11547)
, ('tomato canned', 100,'',0, null,11547)
, ('celery', 40,'',1, 11144,11143)

--FRUITS
INSERT INTO food_items (name,serving_size, serving_desc, countable, fk_nutrition_cooked, fk_nutrition_raw) 
VALUES 
  ('banana', 100,'',1, null,9040)
, ('banana dried', 100,'',1, null,9041)
, ('pear', 100,'',1, null,9252)
, ('pear dried', 100,'',1, null,9259)
, ('apple', 100,'',1, 9005,9003)
, ('apple dried', 100,'Cooked: stewed',1, 9012,9011)
, ('orange', 184,'',1, null,9200)
, ('peach', 100,'',1, null,9236)
, ('peach dried', 100,'',1, 9247,9246)
, ('apricot', 100,'',1, null,9021)
, ('lemon', 100,'',1, null,9150)
, ('plum', 100,'',1, null,9279)
, ('fig', 100,'',1, null,9089)
, ('pineapple', 100,'',1, null,9266)
--berries
, ('strawberry', 100,'',1, null,9316)
, ('raspberry', 100,'',1, null,9302)
, ('blueberry', 100,'',1, null,9050)

--MEAT
INSERT INTO food_items (name,serving_size, serving_desc, countable, fk_nutrition_cooked, fk_nutrition_raw) 
VALUES 
  ('chicken breast', 100,'Roasted',1, 5064,null)
, ('chicken thigh', 100,'Roasted',1, 5098,null)