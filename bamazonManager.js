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

function managerOptions() {

    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product"],
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
              addProduct();
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
            for (var i = 0; i < res.length; i++) // for-loop to add items to an array for better user readability in Terminal
            {
                itemArray.push(res[i].item_id + ". " + res[i].product_name + " - $" + res[i].price + ". Stock: " + res[i].stock_quantity);
            };

            console.log(itemArray);
        }
    );
    
    setTimeout(managerOptions, 500); //called to present the user with a list of options
};