const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const cPath = path.join(__dirname)
const app = express()

//встановлення статичних файлів
app.use(express.static(cPath))

//підключення до бази данних MySQL
const mysql = require("mysql2");
//const { request } = require('http')
  
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "zippo",
  password: "65eneven"
});

connection.connect(function(err){
    if (err) {
      return console.error("Помилка: " + err.message);
    }
    else{
      console.log("Підключення до серверу бд встановлено");
    }
 });

// створюємо парсер application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
})

app.get('/categories', urlencodedParser, function (
  request,
  response
) {
  response.sendFile(__dirname + './categories.html')
})
app.post('/categories', urlencodedParser, function (
  request,
  response
) {
  var name_1= request.body.name;
  var opis_1 =  request.body.opis;
  if (!request.body) return response.sendStatus(400)
  connection.query("insert into manager(name, opis) values(?, ?)", [name_1, opis_1], (err, results, fields) => {
    if(err) console.log(err);
      else console.log("Данные добавлены"); console.log(results);
       
      connection.query("SELECT * FROM manager",
      function(err, results, fields) {
        console.log(err);
        console.log(results); 
        var res = results;
        fs.truncate('./data.json', err => {
          if(err) throw err; // не удалось очистить файл
          console.log('Файл успешно очищен');
       });
        let data = JSON.stringify(res);
        fs.writeFile('./data.json', data, (err) => {
          if (err) throw err;
          console.log("written");
        });
     
      });
  })

  app.get('/categories', urlencodedParser, function (
    request,
    response){
      response.sendFile(__dirname + './categories.html');
 response.redirect("./caregories.html");
});
});

app.post('/createtran', urlencodedParser, function (
  request,
  response
) {
  var name_1 = request.body.cat;
  var opis_1 =  request.body.opistran;
  var sum_1 = request.body.sum;
  var type_1 = request.body.type;
  var date_1 = request.body.date;
  if (!request.body) return response.sendStatus(400)
  connection.query("insert into transaction(name, type, sum, date, opis) values(?, ?, ?, ?, ?)", [name_1, type_1, sum_1, date_1, opis_1], (err, results, fields) => {
    if(err) console.log(err);
      else console.log("Данные добавлены"); console.log(results);
       
      connection.query("SELECT * FROM transaction",
      function(err, results, fields) {
        console.log(err);
        console.log(results); 
        var res = results;
        fs.truncate('./tran.json', err => {
          if(err) throw err; // не удалось очистить файл
          console.log('Файл успешно очищен');
       });
        let data = JSON.stringify(res);
        fs.writeFile('./tran.json', data, (err) => {
          if (err) throw err;
          console.log("written");
        });
     
      });
  })
 
})

 




app.listen(3001, () =>{
  console.log("Server start ok")
})
