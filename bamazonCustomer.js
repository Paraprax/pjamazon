var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors"); //package of functions for colouring and styling command line output text
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
    console.log("\nWelcome to Pjamazon!".bold);
    console.log("connected as id" + connection.threadId + "\n");

   //display all the products in the bamazon_DB once the connection is established
   printDatabase();
});

function printDatabase() {
    console.log("Displaying full catalogue available from Pjamazon.... \n");
    connection.query(
        "SELECT * FROM products", function(err, res) { //concatenate input args into an SQL command
        if (err) throw err;
        console.log(res); // print the whole response from this query to the console
        userOptions(); //called to present the user with a list of options
        }
    )
};

function userOptions() {
    console.log("Heeryor options. Haffa nice day.");
    exitPjamazon();
}

//close the connection to the SQL database
function exitPjamazon() {
    console.log("See you next time.... :)");
    connection.end();
}