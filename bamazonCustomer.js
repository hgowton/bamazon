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
        var x = answer.itemChoice
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
        var stock = res[0].stock_quantity
        console.log("from START: stock , amount of item: " + stock)
         quantity(x, stock); 
    })
  }

  //asks user how many of the item s/he would like to purchase
function quantity(x, stock) {
  //x is the user's selected item from the previous -- based on item_id
  console.log("item choice: " + x)
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
    // connection.query("SELECT product_name, department_name, price, stock_quantity FROM products WHERE item_id = ?"), x, function(err, res){
    //   if(err) throw err;

    if(answer.quantity > stock) {
      console.log("Insufficient quantity! We do not have enough of that item in stock.")
      start();
    }
    //subract the user amount from the original stock to create update variable
    //Use the updated variable to update the stock in the table
    var update = stock - answer.quantity
    console.log("update in stock: " + update)
    connection.query("UPDATE products SET ? WHERE ?",
    [
      {
      stock_quantity: update
    },
  {
    item_id: x
  }],
  function(error) {
    if(error) throw err;
    console.log("You have purchased " + answer.quantity + " of your item!")
    start();
  });
  });
}
});
