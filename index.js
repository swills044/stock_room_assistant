const { ocrSpace } = require('ocr-space-api-wrapper'); //https://www.npmjs.com/package/ocr-space-api-wrapper
const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const app = express();
const cors = require("cors");
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const port = 3000

app.use(cors())

app.use(express.static(__dirname + '/public'));

//What happens when someone sends a requests to the program. does it start a new program everytime?

app.get('/', (req, res) => {
  res.send('Hello World!')
  main().then((res)=>{console.log(res)});
})

app.post('/sendText', (req, res) => {
  console.log(req.body);
  extractDetails(req.body);
  res.send('Hello World!');
})

function extractDetails(text) {

  //There should be 5 lines with an additional line for random code at the top of the label

  //Two codes, store both in main style code and secondary style code (put longest style code in main)

  //Two texts the main text (item name) and secondary text (style colour) *The name of the colour matters because they will be seperate entries (keep aware of same colour names with different wording, may be useful to store colour code), put the first one in main text (item name)

  //Price will always have £ symbol

  //The size will either be xs, s, m, xl, xxl (2xl), xxxl (3xl), xxxxl (4xl), 5xl -> IGNORE size for now

  //The barcode will always be 12 or 13 characters (should be 13)

}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// async function main () {
//   try {

//     // Using your personal API key + local file
//     const res2 = await ocrSpace('http://dl.a9t9.com/ocrbenchmark/eng.png', { apiKey: '83e4ad974c88957' });
    
//     return res2;
//   } catch (error) { 
//     console.error(error);
//   }
// }

let db = new sqlite3.Database('stock.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});


var sqlDROPTABLE = `DROP TABLE contacts;`
var sqlCREATETABLE = `CREATE TABLE IF NOT EXISTS items (
  item_id INTEGER PRIMARY KEY,
  item_code TEXT,
  item_name TEXT,
  item_colour TEXT,
  item_size TEXT,
  item_barcode TEXT
);
`
sqlINSERT = `INSERT INTO items (item_code, item_name, item_name, item_colour, item_size, item_barcode)
VALUES (value1,value2 ,...)`

function sqlRUN(query) {
  db.all(query,[],(err, rows ) => {
    // process rows here 
    if (err) {
      throw err;
    }
    console.log(rows);
    rows.forEach((row) => {
      console.log(row.name);
    });   
  });
  
}

//sqlRUN(sqlCREATETABLE);

/*
let db = new sqlite3.Database('stock.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

var sqlINSERT = `INSERT INTO stock (contact_id, first_name, last_name, email, phone)VALUES(1,'sean', 'a', 'b', 'c')`
var sqlREAD = `SELECT 'contact_id', 'first_name' FROM contacts;`

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});

//Find rows DB

// SELECT column_list
// FROM table;
*/