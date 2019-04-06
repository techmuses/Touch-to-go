const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
// https://github.com/mysqljs/mysql
const connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'COMPANY'
});

// Initialize the app
const app = express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/all_attend_tbl', function (req, res) {

    connection.query('SELECT * FROM ATTENDENCE', function (error, results, fields) {
      if (error) throw error;
      res.send(results)
    });

});

// connection.query('SELECT IN_TIME, OUT_TIME FROM ATTENDENCE', function (error, results, fields) {
//   if (error) throw error;
//   console.log(results)
// });

connection.query('SELECT UPDATE_TIME FROM information_schema.tables WHERE TABLE_SCHEMA = "COMPANY" AND TABLE_NAME = "ATTENDENCE" ORDER BY UPDATE_TIME DESC, TABLE_SCHEMA, TABLE_NAME', function (error, results, fields) {
  if (error) throw error;
  console.log(results)
});


app.get('/getDBTime', function (req, res) {

  connection.query('SELECT UPDATE_TIME FROM information_schema.tables WHERE TABLE_SCHEMA = "COMPANY" AND TABLE_NAME = "ATTENDENCE" ORDER BY UPDATE_TIME DESC, TABLE_SCHEMA, TABLE_NAME', function (error, results, fields) {
    if (error) throw error;
    console.log(results)
    res.send(results)

  });

});


// Start the server
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/data to see posts');
});


