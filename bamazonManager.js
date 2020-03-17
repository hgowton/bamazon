var mysql = require("mysql");
var inquirer = require("inquirer");
var {table} = require("table");

//connection to mysql bamazon database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "test",
    password: "",
    database: "bamazon"
});
start();

function start() {
    inquirer.prompt({
        name: "actionToTake",
        type: "list",
        message: "What would you like to do?",
        choices: ["View products for sale", "View low inventory", "Add to Inventory", "Add New Product", "Exit" ]
    }).then(function(answer){
        if(answer.actionToTake === "View products for sale"){
            inventory();
        }
        else if(answer.actionToTake === "View low inventory"){
            lowInventory();
        }
        else if(answer.actionToTake === "Add to Inventory"){
            addInventory();

        }
        else if(answer.actionToTake === "Add New Product"){
            addProduct();
        }
        else if(answer.actionToTake === "Exit"){
            connection.end();
        }
        else{
            connection.end();
        }
    })
}

function inventory() {
    connection.connect(function(err) {
        if (err) throw err;
        var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products";
        connection.query(query, function(err, res){
            if (err) throw err;
            var productDisplay=[
                ['Item_id', 'product', 'sales', 'department', 'price', 'stock']
            ];
            for (var i = 0; i < res.length; i++) {
                productDisplay.push([
                    res[i].item_id,
                    res[i].product_name,
                    res[i].product_sales,
                    res[i].department_name,
                    res[i].price,
                    res[i].stock_quantity
                ]);
            }
                output = table(productDisplay);
                console.log(output);
                connection.end;
                start();
        });
    });
}

function lowInventory () {
    var query = "SELECT * FROM products WHERE stock_quantity <=20";
    connection.query(query, function(err, res) {
        var inventoryDisplay=[
            ['Item_id', 'product', 'sales', 'department', 'price', 'stock']
        ];
        for (var i=0; i<res.length; i++) {
            inventoryDisplay.push([
                res[i].item_id,
                res[i].product_name,
                res[i].product_sales,
                res[i].department_name,
                res[i].price,
                res[i].stock_quantity
            ]);
        }
            output = table(inventoryDisplay);
            console.log(output);
            connection.end;
            start();
    })
}

function addInventory() {
    connection.connect(function(err) {
        if (err) throw err;
        var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products";
        connection.query(query, function(err, res){
            if (err) throw err;
            var productDisplay=[
                ['Item_id', 'product', 'sales', 'department', 'price', 'stock']
            ];
            for (var i = 0; i < res.length; i++) {
                productDisplay.push([
                    res[i].item_id,
                    res[i].product_name,
                    res[i].product_sales,
                    res[i].department_name,
                    res[i].price,
                    res[i].stock_quantity
                ]);
            }
                output = table(productDisplay);
                console.log(output);
                connection.end;
                addQuestions();
        });
    });
}

function addQuestions() {
    inquirer.prompt([
        {
            name: "itemID",
            type: "number",
            message: "What is the ID of the item you would like to add to?"
        },
        {
            name: "addedStock",
            type: "number",
            message: "How many would you like to add?"
        }
    ]).then(function(answer){
        var itemID = parseInt(answer.itemID);
        var addStock = parseInt(answer.addedStock)
        console.log("Selected number: " + itemID + "\n Amount to Add: "
        + addStock)
        })
}

