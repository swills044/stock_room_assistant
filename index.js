const { ocrSpace } = require('ocr-space-api-wrapper');
const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const app = express()
const port = 3000

//What happens when someone sends a requests to the program. does it start a new program everytime?

app.get('/', (req, res) => {
  res.send('Hello World!')
  main().then((res)=>{console.log(res)});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

async function main () {
  try {

    // Using your personal API key + local file
    const res2 = await ocrSpace('http://dl.a9t9.com/ocrbenchmark/eng.png', { apiKey: '83e4ad974c88957' });
    
    return res2;
  } catch (error) {
    console.error(error);
  }
}

let db = new sqlite3.Database('stock.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

var sqlINSERT = `INSERT INTO stock (contact_id, first_name, last_name, email, phone)VALUES(1,'sean', 'a', 'b', 'c')`
var sqlREAD = `SELECT 'contact_id', 'first_name' FROM contacts;`

db.all(sqlINSERT,[],(err, rows ) => {
  // process rows here 
  if (err) {
    throw err;
  }
  console.log(rows);
  rows.forEach((row) => {
    console.log(row.name);
  });   
});


// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});

//Create DB

// CREATE TABLE contacts (
// 	contact_id INTEGER PRIMARY KEY,
// 	first_name TEXT NOT NULL,
// 	last_name TEXT NOT NULL,
// 	email TEXT NOT NULL UNIQUE,
// 	phone TEXT NOT NULL UNIQUE
// );

//Insert DB

// INSERT INTO table1 (column1,column2 ,..)
// VALUES 
//    (value1,value2 ,...),
//    (value1,value2 ,...),
//     ...
//    (value1,value2 ,...);

//Find rows DB

// SELECT column_list
// FROM table;
