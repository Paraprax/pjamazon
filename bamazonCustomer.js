var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");

var connection = mysql.createConnection(
    {
    host: "localhost", 

    port: 3306,

    user: "root",

    password: "parkpass",

    database: "greatBay_DB" //created manually in mySQLworkbench

    }
);