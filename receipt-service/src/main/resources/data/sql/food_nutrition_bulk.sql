DELETE FROM food_nutrition

BULK INSERT food_nutrition
FROM '/var/lib/mssql/data/food_nutrition/NUTRITION_MAIN.csv'
WITH (
KEEPIDENTITY,
FORMAT='CSV',
FIRSTROW=2
)