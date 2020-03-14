-- Drops bamazon database if it exsists
DROP DATABASE IF EXISTS bamazon;

--Use specific database
USE bamazon;

--Adding inventory to the products table
INSERT INTO products(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("20-medium legal pads", 0, "Office", 12.84, 100);

INSERT INTO products(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("Doggie Dailies Probiotics, 225", 0, "Pets", 27.99, 40);

INSERT INTO products(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("RXBar Peanut Butter, 12 ct", 0, "Food", 18.89, 50);

INSERT INTO products(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("RXBar Banana Chocolate, 12 ct", 0, "Food", 18.89, 70);

INSERT INTO products(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("Blue Pens, Fine Point, 12 ct", 0, "Office", 17.04, 20);

INSERT INTO products(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("Black Pens, Extra Fine Point, 24 ct", 0, "Office", 32.67, 30);

INSERT INTO products(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("Car Seat Covers", 0, "Pets", 39.99, 10);

INSERT INTO products(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("Citrus Pet Odor Eliminator", 0, "Pets", 20.97, 90);

INSERT INTO products(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("Trial Mix", 0, "Food", 4.87, 25);

INSERT INTO products(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("EPIC Bison Bacon Bars, 12 ct", 0, "Food", 26.18, 80);

INSERT INTO products(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("EPIC Venison Sea Salt & Pepper Bars, 12 ct", 0, "Food", 26.18, 80);

SELECT * FROM products;