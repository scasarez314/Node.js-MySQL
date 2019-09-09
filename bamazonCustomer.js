var mysql = require("mysql");
require("dotenv").config();
var env = process.env;
var inquirer = require("inquirer");
var Table = require('cli-table');

//create the connection to mySQL
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: env.PASSWORD,
    database: "bamazon_db"
});
//Making sure that the connection is running
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    showTable();
    connection.end();

});
//Show the user the table with all the IDs etc..
// console.log the table

function showTable() {
    // console.log("I am working")
    var query = "Select * FROM products";
    connection.query(query, function (err, result) {
        // if (err) throw err;
        var table = new Table({
            head: ["Item ID", "Name", "Category", "Price", "Stock"],
            colWidths: [10, 10, 10, 10, 10]
        });
        // console.log(result)
        for (let i = 0; i < result.length; i++) {
            table.push([result[i].id, result[i].product_name, result[i].department_name, result[i].price, result[i].stock_quantity]);
        }
        console.log(table.toString());

        promptMessages();
    })

};

function promptMessages() {
    inquirer.prompt([
        {
            type: "iput",
            message: "What is the ID of the product you would like to buy?",
            name: 'productID',

        },
        {
            type: "input",
            message: "How many units of this product would you like to buy?",
            name: "unitquantity",

        }
    ]).then(function checkRequest(userAnswers) {

        //console.log(userAnswers)

        var requestedproduct = userAnswers.productID
        var requestedquanitiy = userAnswers.unitquantity
        checkRequest(requestedproduct, requestedquanitiy);

        connection.query("Select * FROM products WHERE id = ?", [requestedquanitiy], function (err, result, fields) {
            console.log(result)
            if (requestedquanitiy > result[i].stock_quantity) {
                console.log("not enough stock!")
            } else {
                console.log("your order has been placed")
            }
            // connection.query("UPDATE products )

        });


    });

}
