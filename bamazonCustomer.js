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
     //Show table to customer of all products, categories, price, and quantity
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
        
        //x sets the array number based on item_id
        var x = answer.itemChoice - 1
        console.log(
          "Product: " + res[x].product_name +
          " || Price: " + res[x].price +
          " || Stock: " + res[x].stock_quantity + "\n"
        );
        var stock = res[x].stock_quantity

         quantity(x, stock); 
    })
  }

function quantity(x, stock) {
  inquirer.prompt({
    name: "quantity",
    type: "input",
    message: "How many would you like to purchase?",
    validate: function(value){
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  }).then(function(answer){

    //setting answer for quantity to z to be able to reuse and pass into functions
    var z = answer.quantity 
    if(z < stock) {
      updateStock(x, z, stock);
    }  
    else {
      console.log("Insufficient quantity! We do not have enough of that item in stock.")
    }
    connection.end();
  });
}

  function updateStock(x, z, stock) {
    //update determinew the change in stock based on the quantity of items the user selects
    var update = stock - z

    //y goes back to item_id insteado of array number
    var y = x + 1
    connection.query("UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: update
      },
      {
        item_id: y
      }],
      function(error) {
        if(error) throw err;
        console.log("You have purchased " + z + " of your item! \n")
      });
    }
});