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