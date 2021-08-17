const express = require('express');
const mysql = require('mysql');
const app = express();

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
app.get('/products', (req, res) => {
  let sql = `SELECT * FROM products WHERE id < 6`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  })
})

// get a Product w/ features

app.get('/products/:id', (req, res) => {
  let sql = `SELECT * FROM products WHERE id = ${req.params.id}`;
  let featureQuery = `SELECT features.feature, features.value FROM features WHERE product_id = ${req.params.id}`;

  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    db.query(featureQuery, (err, featureResult) => {
      if (err) {
        throw err;
      }
      result[0]['features'] = featureResult;
      res.send(result[0]);
    });
  })
})

// get related products
app.get('/products/:id/related', (req, res) => {
  let sql = `SELECT relatedProduct FROM related WHERE currentProduct = ${req.params.id}`
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    let related = [];
    result.forEach(obj => {
      related.push(obj.relatedProduct);
    })
    res.send(related);
  })
})

app.get('/products/:id/styles', (req, res) => {
  var obj = {};
  let sql = `SELECT * FROM styles WHERE id = ${req.params.id}`
  let photoSql = `SELECT thumbnail_url, url FROM photos WHERE currentProduct = ${req.params.id}`
  let skuSql = `SELECT size, quantity FROM skus WHERE styleid = ${req.params.id}`
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    obj.product_id = req.params.id;
    obj.results = result;
    db.query(photoSql, (err, photoResults) => {
      if (err) {
        throw err;
      }
      obj.results[0].photos = photoResults;
      db.query(skuSql, (err, skuResult) => {
        if (err) {
          throw err;
        }
        obj.skus = skuResult;
        res.send(obj);
      })
    })
  })

})

app.listen('3000', () => {
  console.log('Server started on port 3000');
})