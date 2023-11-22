BEGIN TRANSACTION
DELETE FROM whole_food
DBCC CHECKIDENT ('whole_food', RESEED, 1)

INSERT INTO whole_food
WITH(KEEPIDENTITY)
(id, default_quantity,name, serving_desc, serving_size, serving_unit, fk_nutrition_cooked, fk_nutrition_raw)
SELECT id, default_quantity,name, serving_desc, CAST(serving_size AS float), serving_unit, fk_nutrition_cooked, fk_nutrition_raw FROM OPENROWSET(
	BULK '/usr/src/app/sql/food_items_data/food_items_data.csv',
	FORMATFILE = '/usr/src/app/sql/food_items_data/food_items_format.bcp',
	FORMAT='CSV',
	FIRSTROW=3
	) as FItems WHERE ISNUMERIC(FItems.ID) = 1 AND FItems.name IS NOT NULL

COMMIT

--DELETE FROM food_items
--DBCC CHECKIDENT ('food_items', RESEED, 1)

--BULK INSERT food_items
--FROM '/var/lib/mssql/data/food_items_data/food_items_veg.csv'
--WITH (
--FORMAT='CSV',
--FIRSTROW=3,
--LASTROW=40)

