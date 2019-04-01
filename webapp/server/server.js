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

app.get('/attend_name_empid', function (req, res) {

  connection.query('SELECT DISTINCT ATTENDENCE.EMP_ID, EMP_DETAILS.NAME FROM EMP_DETAILS, ATTENDENCE WHERE EMP_DETAILS.EMP_ID = ATTENDENCE.EMP_ID',
   function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });

});


app.post('/dynamic_name_empid', function (req, res) {
  const date = req.body.date;
  connection.query(`SELECT DISTINCT ATTENDENCE.EMP_ID, EMP_DETAILS.NAME FROM EMP_DETAILS, ATTENDENCE WHERE EMP_DETAILS.EMP_ID = ATTENDENCE.EMP_ID AND DATE="${date}"`,
   function (error, results, fields) {
    if (error) throw error;
    console.log(results)
    res.send(results)
  });

});

// Start the server
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/data to see posts');
});