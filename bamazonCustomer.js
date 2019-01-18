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
    console.log("connected as id" + connection.threadId + "\n");

   //display all the products in the bamazon_DB once the connection is established
   printDatabase();
});

//functions - - - - - - - -

var itemArray = [];

function printDatabase() {
    console.log("Displaying full catalogue available from Pjamazon.... \n");
    
    
    var query = connection.query(
        "SELECT * FROM products",
        
        function(err, res) {
            if (err) throw err;
            //else
            for (var i = 0; i < res.length; i++) // for-loop to add items to an array for better user readability in Terminal
            {
                var stockMessage = "; IN STOCK"; 
                if (res[i].stock_quantity == 0)
                {
                    stockMessage = "; OUT OF STOCK";
                }
                itemArray.push(res[i].item_id + ". " + res[i].product_name + " - $" + res[i].price + stockMessage);
            };

            console.log(itemArray);
        }
    );
    
    setTimeout(callOptions, 500); //called to present the user with a list of options
};

function callOptions() { 
    userOptions(); // enclosed userOptions in a separate function so it can be called recursively
}

//display a functional options list using the inquirer package
function userOptions() {

    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID number of the item you'd like to purchase:",
            name: "buy_id",
        }
    ]).then(function(user) {

        if(0 < user.buy_id && user.buy_id <= itemArray.length)
        {
            console.log(user.buy_id);
            console.log("Buy this item?");
            exitPjamazon();
        }
        else 
        {
            console.log("Sorry, we don't have any products with an id of " + user.buy_id + ". Please enter a number from our catalog!");
            callOptions(); //callOptions calls userOptions again on input failure
        }
    
    });
}

//close the connection to the SQL database
function exitPjamazon() {
    console.log("See you next time.... :)");
    connection.end();
}