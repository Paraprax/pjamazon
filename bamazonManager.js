var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors"); //pack for colouring and styling command line output text
require("dotenv").config();

var keys = require('./keys.js'); //using gitignored key referencing method for workbench password
var mySQLpass = keys.workbench.key;

//on to the app:
var connection = mysql.createConnection(
    {
    host: "localhost", 

    port: 3306,

    user: "root",

    password: mySQLpass,

    database: "bamazon_DB"

    }
);

connection.connect(function(err) { //run the 'connect' method on the 'connection' var to get results
    if(err) throw err; 
    //else if no error
    console.log("\nWelcome to Pjamazon!".bold); //bolded text via 'colors' package
    console.log("connected as MANAGER, id" + connection.threadId + "\n");

   //display all the products in the bamazon_DB once the connection is established
   managerOptions();
});


//functions = = = = = = = = =
function managerOptions() { //main menu

    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product", "Exit"],
            name: "options",
        }
    ]).then(function(user) {

        switch(user.options) {
            case "View Products For Sale":
              viewProducts();
              break;
            case "View Low Inventory":
              viewLow();
              break;
            case "Add To Inventory":
              addInventory();
              break;
            case "Add New Product":
              newProduct();
              break;
            case "Exit":
              exitPjamazon();
              break;
            default:
              connection.end();
          }
    
    });
}

var itemArray = [];

function viewProducts() {
    var query = connection.query(
        "SELECT * FROM products",
        
        function(err, res) {
            if (err) throw err;
            //else
            itemArray = []; //empty the array each time this is run so it doesn't start printing everything multiple times

            for (var i = 0; i < res.length; i++) // for-loop to add items to an array for better user readability in Terminal
            {
                itemArray.push(res[i].item_id + ". " + res[i].product_name + " - $" + res[i].price + ". Stock: " + res[i].stock_quantity);
            };

            console.log(itemArray);
        }
    );
    
    setTimeout(managerOptions, 500); //return to main menu
};

function viewLow() {
    var query = connection.query(
        "SELECT * FROM products WHERE (`stock_quantity` < 5)",
        
        function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) // for-loop to add items to an array for better user readability in Terminal
            {
                itemArray.push(res[i].item_id + ". " + res[i].product_name + " - $" + res[i].price + ". Stock: " + res[i].stock_quantity).red;
            };

            console.log(itemArray);
        }
    );
    
    setTimeout(managerOptions, 500);
};

function addInventory() {
    var query = connection.query( //print the product list again first
        "SELECT * FROM products",
        
        function(err, res) {
            if (err) throw err;
            //else
            itemArray = [];
            for (var i = 0; i < res.length; i++) // for-loop to add items to an array for better user readability in Terminal
            {
                itemArray.push(res[i].item_id + ". " + res[i].product_name + " - $" + res[i].price + ". Stock: " + res[i].stock_quantity);
            };
            
            console.log(itemArray);
        }
    );

    inquirer.prompt([
        {
            type: "input",
            message: "Enter the id number of the product you'd like to add stock to:",
            name: "product_pick",
        }
    ]).then(function(user) {
        var product_pick = parseInt(user.product_pick);

        inquirer.prompt([
            {
                type: "input",
                message: "Enter the number of units to add:",
                name: "added_stock",
            }
        ]).then(function(user) {
            var query = connection.query(
                "SELECT * FROM products WHERE (`item_id` = " + product_pick + ")",
                function(err, res) {
                    if (err) throw err;
                    //else
                    var new_quantity = (parseInt(user.added_stock) + res[0].stock_quantity); //add the number of new units input by the user to the number of units currently in stock

                    var query = connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: new_quantity
                            },
                            {
                                item_id: product_pick
                            }
                        ],
                        function(err, res) {
                            if (err) throw err;
                            //else
                            console.log("New stock added!\n".yellow);
                            managerOptions();
                        }
                    );
            });
        })
    });
}

function newProduct() {
    console.log("What would you like to post today?");
    inquirer.prompt([ //prompt them for the three required pieces of info on the item
        {
            type: "input",
            message: "Enter the product's name:",
            name: "product_name",
        },
        {
            type: "input",
            message: "Enter the department the product will be listed in:",
            name: "department_name",
        },
        {
            type: "input",
            message: "Enter the retail price for the product(D.CC)",
            name: "price",
        },
        {
            type: "input",
            message: "Enter how many units will initially be stocked:",
            name: "stock_quantity",
        }
    ]).then(function(user){
        addProduct(user.product_name, user.department_name, user.price, user.stock_quantity); //pass the three inputs to the postItem function
    });
};

function addProduct(name, department, price, quantity) { // four arguments are ready to go as your table info for the new item
    var query = connection.query(
        "INSERT INTO products SET ?",
        {
            product_name: name,
            department_name: department,
            price: price,
            stock_quantity: quantity
        },
        function(err, res) {
            if (err) throw err;
            //else
            console.log(res.affectedRows + " new item(s) now being sold by Pjamazon!\n".cyan);
        }
    );
    setTimeout(managerOptions, 3000);
};

function exitPjamazon() {
    console.log("\nSee you next time :)\n");
    connection.end();
}