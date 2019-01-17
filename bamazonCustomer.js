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
    console.log("\nWelcome to Bamazon!".bold);
    console.log("connected as id" + connection.threadId + "\n");

   //present the user with options via this function once the connection is established:
   //userOptions();
});