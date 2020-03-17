var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306, 
    user: "test", 
    password: "", 
    database: "bamazon"
})

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id" + connection.threadId)
    fixes();
    connection.end();
})

function fixes () {
    connection.query(
        "DELETE FROM products WHERE ?",
        {
            item_id: 5
        },
        function(err, res) {
            if (err) throw err;
            console.log("deletion successful")
        }
    );
}