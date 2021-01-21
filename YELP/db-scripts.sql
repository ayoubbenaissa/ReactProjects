-- for help: \?

-- list databases: \l

-- create database: CREATE DATABASE db_name;

-- list tables: \d

-- table info: \d table_name

-- modify table: ALTER TABLE table_name operation...
-- exp: add new column => ALTER TABLE table_name ADD COLUMN column_name column_type


-- toy table:
CREATE TABLE products (
	id INT,
	name VARCHAR(50),
	price INT,
	on_sale BOOLEAN
);

-- table used in the app:
CREATE TABLE restaurants(
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	location VARCHAR(50) NOT NULL,
	price_range INT NOT NULL CHECK(price_range >= 1 AND price_range <= 5)
);

-- insert values:
INSERT INTO restaurants (id, name, location, price_range) VALUES (123, 'mcdonalds', 'new york', 3);

-- reviews table:
CREATE TABLE reviews (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
	name VARCHAR(50) NOT NULL,
	review TEXT NOT NULL,
	rating INT NOT NULL check(rating >= 1 AND rating <= 5)
)