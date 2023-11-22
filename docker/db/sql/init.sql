USE master
GO
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'fm_db')
BEGIN
  CREATE DATABASE fm_db;
END;
GO