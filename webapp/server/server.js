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

app.get('/all_attend_tbl', function (req, res) {

    connection.query('SELECT * FROM ATTENDENCE', function (error, results, fields) {
      if (error) throw error;
      res.send(results)
    });

});

app.get('/attend_name_empid', function (req, res) {

  connection.query('SELECT ATTENDENCE.EMP_ID, EMP_DETAILS.NAME FROM EMP_DETAILS, ATTENDENCE WHERE EMP_DETAILS.EMP_ID = ATTENDENCE.EMP_ID',
   function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });

});

// Start the server
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/data to see posts');
});