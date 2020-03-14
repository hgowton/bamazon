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
          start(res);

    });
     
  function start(res) {
    //user picks one of the items based on the id
      inquirer.prompt({
          name: "itemChoice",
          type: "input",
          message: "What is the ID of the item you would like to purchase?",
          validate: function(value) {
            if (isNaN(value) === false && value <= res.length) {
              return true;
            }
            return false;
          }
      }).then(function(answer) {
        // pick a specific item and from list
        connection.query("SELECT product_name, department_name, price, stock_quantity FROM products WHERE item_id = ?", answer.itemChoice,
        function(err, res) {
          if(err) throw err;
          //new query with relevant information for specific product based on selection 
          //updating incase quantity has changed between user selection
          console.log(
            "Product: " + res[0].product_name +
            " || Price: " + res[0].price +
            " || Stock: " + res[0].stock_quantity
          );
        })
        //Function quantity --> how much would you like
         quantity(); 
    })
  }

  function quantity() {
    inquirer.prompt({
      name: "quantity",
      type: "input",
      message: "How many would you like?",
      validate: function(value) {
        if (isNaN(value) === false && value > 0 && value <=res[0].stock_quantity) {
          return true;
        }
        return false;
      }
    }).then(function(answer){
      
      //IF or switch statement
      //
      console.log("Insufficient quantity! We do not have enough of that item in stock.")
      start();
    })

  }
});
