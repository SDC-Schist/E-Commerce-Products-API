const express = require('express');
const mysql = require('mysql');
const app = express();
const { getRelated } = require('./Models/related');
const { getProduct } = require('./Models/product');
const { getProducts } = require('./Models/products');
const { getStyles } = require('./Models/styles');

//Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'student',
  database: 'products_sdc'
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySql Connected...');
});

// get a list of products
app.get('/products', getProducts);

// get a Product w/ features

app.get('/products/:id', getProduct);

// get related products
app.get('/products/:id/related', getRelated);

//get products with styles
app.get('/products/:id/styles', getStyles);

app.listen('3000', () => {
  console.log('Server started on port 3000');
})