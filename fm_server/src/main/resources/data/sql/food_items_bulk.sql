BEGIN TRANSACTION;

DELETE FROM whole_food;

COPY whole_food (id,name, default_quantity, serving_desc,serving_size,serving_unit,fk_nutrition_raw,fk_nutrition_cooked)
FROM '/var/lib/postgresql/data/food_items_data/food_items_data.csv'
DELIMITER ','
CSV
HEADER
ENCODING 'UTF8';

COMMIT;
