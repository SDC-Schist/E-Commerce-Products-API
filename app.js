const fs = require('fs');
const mysql = require('mysql');
const fastcsv = require('fast-csv');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'student',
  database: 'products_sdc'
})

let stream = fs.createReadStream('products.csv');
let csvStream = fastcsv
  .parse()
  .on('data', function(data) {
    let id = Number(data[0]);
    data[0] = id;
    let query =
      'INSERT INTO products (id, name, slogan, description, category, price) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, data);
  })

  .on('end', function() {
    console.log('Data Uploaded to Database...');
    return;
  })

let featuresStream = fs.createReadStream('features.csv');
let csvFeatureStream = fastcsv
  .parse()
  .on('data', function(data) {
    let id = Number(data[0]);
    data[0] = id;
    let product_id = Number(data[1]);
    data[1] = product_id;
    let query =
    'INSERT INTO features (id, product_id, feature, value) VALUES (?, ?, ?, ?)';
    connection.query(query, data);
  })

  .on('end', function() {
    console.log('Uploading Data to Table Features...');
    return;
  })

let relatedStream = fs.createReadStream('related.csv');
let csvRelatedStream = fastcsv
  .parse()
  .on('data', function(data) {
    let id = Number(data[0]);
    data[0] = id;
    let currentProduct = Number(data[1]);
    data[1] = currentProduct;
    let relatedProduct = Number(data[2]);
    data[2] = relatedProduct;
    let query =
    'INSERT INTO related (id, currentProduct, relatedProduct) VALUES (?, ?, ?)';
    connection.query(query, data);
  })

  .on('end', function() {
    console.log('Uploading Data to Table Related...');
    return;
  })
//*******************/

//stream.pipe(csvStream);
// featuresStream.pipe(csvFeatureStream);
// relatedStream.pipe(csvRelatedStream);

