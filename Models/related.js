var Sequelize = require('sequelize');
const { Op } = require('sequelize');
var db = new Sequelize('products_sdc', 'root', 'student', {
  dialect: 'mysql'
});

var Related = db.define('related', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  currentProduct: Sequelize.INTEGER,
  relatedProduct: Sequelize.INTEGER
}, {
  freezeTableName: true,
});

exports.getRelated = (req, res) => {
  Related.findAll({
    where: {
      currentProduct: req.params.id
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
  .then(function(relatedProducts) {
    var result = [];
    relatedProducts.map(item => {
      result.push(item.relatedProduct);
    })
    res.send(result);
  })
  .catch(function(err) {
    throw err;
    db.close();
  })
}