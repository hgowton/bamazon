# bamazon

## Overview
 The Bamazon application works in two parts to create an online store accessible through the terminal.  The customer side can view inventory.  Then make purchases based on the current stock.  From the manager side, you can view current and low inventory, add to inventory, and add new products.

## Bamazon Customer 
  A customer can access the Bamazon options by typing, node bamazonCustomer.js.  Upon entering, a display will appear including all items for sale, their department, price, and current stocks.  Users will be prompted to determine which item s/he would like to purchse. 

  Then a condensed version of the original display with only the specific item the user would like to purchase will appear.  A second prompt asks the user how many of the particular item s/he would like to purchase.

  A transaction is successful if the store currently has enough stock to fulfill the order.  If a user's request exceeds the current stock, the transaction will be denied.

## Bamazon Manager
 A manager can access the backend of the store by typing node bamazonManager.js.  Once inside, a prompt will ask whether the manager would like to view products or low inventory, add to inventory, or add a new product.
 1. `View Products for Sale`: Manager can view a table of all the current items for sale including their department, product sales, price, and current stock.

 2. `View Low Invetory`: Displays a table of all the current items with an inventory of 5 or less.
 
 3. `Add to Inventory`: Through a series of prompts the manager is able to select a current item and add to the current stock quantity.

 4. `Add New Product~: A series of prompts enables the manager to add a new item.  Through the prompts the manager is able to select the department, identify the price, and assign a current stock quantity for any new item.