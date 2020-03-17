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
            addInventory1();

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

function addInventory1() {
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
                addQuestions(res);
        });
    });
}



function addQuestions(res) {
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
        var oStock = res[itemID-1].stock_quantity
        console.log("Selected number: " + itemID + "\n Amount to Add: "
        + addStock)
        var query = connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: addStock + oStock
            },
            {
                item_id: itemID
            }
        ], function(err, res) {
            if(err) throw err;
            console.log(res.affectedRows + " products updated!\n");
            connection.end();
            console.log(query.sql)
        });
    })
}

function addProduct() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "productAdd",
                type: "input",
                message: "What is the name of the product you would like to add?"
            },
            {
                name: "department",
                type: "rawlist",
                choices: function() {
                    var choiceArray = []; 
                    for (var i=0; i<results.length; i++) {
                        choiceArray.push(results[i].department_name);
                    }
                    return choiceArray;
                },
                message: "Which department does this product fall into?"
            },
            {
                name: "cost",
                type: "number",
                message: "How much does it cost?"
            },
            {
                name: "stock",
                type: "number",
                message: "What is the original stock of the item?"
            }
        ]).then(function(answer) {
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.productAdd,
                    department_name: answer.department,
                    price: answer.cost,
                    stock_quantity: answer.stock
                },
                function(err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + "product added!\n");
                    connection.end();
                }
            );
        });
    });
} 