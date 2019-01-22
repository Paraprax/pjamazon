# pjamazon


A JavaScript Command-Line-Interface for accessing and updating a mySQL database of products, prices and inventory a la an online storefront.

As mySQLworkbench requires a user password, their own must added to a local, .env file, which will be referenced by the app via "keys.js".

- - - -

**To use as a "customer",** run bamazonCustomer.js in your command line with node and enter the ID number of one of the products listed in the catalog. This will reveal the number of units of that item in stock, according to the database, and give the user the option to "buy" it.

**To use as a "manager",** run bamazonManager.js in your command line with node and use the arrow keys to choose from one of the five options listed below:

- "View Products For Sale" to see the complete list of products in the database, their price, and the number of units in stock
- "View Low Inventory" to see a list of only the products in the database with less than five units in stock
- "Add To Inventory" to choose any product in the database via its ID number and enter the number of units you'd like to add to its stock count
- "Add New Product" to create an entirely new listing for a product and add it to the database(the user will be prompted to enter a product name, department, price, and initial quantity of stock for the new item)
- "Exit" to end the database connection and close the program.

Watch a video of both views of this app in action [here!](https://drive.google.com/open?id=1A2UYursYHXDNGZSpj2KOwYvGWukdHAN1)

See screenshots of examples of pjamazon's output [here!](https://drive.google.com/open?id=1jO0HIeNBkhEwkjHa_A-hH8REdgr5W0so)
