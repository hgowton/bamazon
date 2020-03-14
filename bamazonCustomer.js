 var mysql = require("mysql");
 var inquirer = require("inquirer");
 var {table} = require("table");

 //connection to the mysql bamazon database
 var connection = mysql.createConnection({
     host: "localhost",
     port: 3306,
     user: "test",
     password: "",
     database: "bamazon"
 });


 connection.connect(function(err) {
     if (err) throw err;
     //run initial prompt;
     console.log(query);
     var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products";
        connection.query(query, function(err, res) {
          if (err) throw err;
          var productDisplay = [
              ['Item_ID', 'product', 'department', 'price', 'stock']
            ];
          for (var i = 0; i < res.length; i++) {
            productDisplay.push([res[i].item_id ,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
          }
          output = table(productDisplay);
          console.log(output)
    //  start();
    connection.end();
    });
    
    // function start() {
    //     inquirer.prompt({
    //         name: "choice",
    //         type: "rawlist",
    //         choices: function() {
    //             var itemArray = [];
    //             for (var i = 0; i<results.length; i++) {
    //                 itemArray.push(results)
    //             }
    //         }
    //         message: "What is the ID of the item you would like to purchase?"
    //     }).then(function(answer) {
            
    //     })
    // }
});
