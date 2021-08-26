var Sequelize = require('sequelize');
const { Op } = require('sequelize');
var db = new Sequelize('products_sdc', 'root', 'student', {
  dialect: 'mysql'
});

var Products = db.define('products', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING,
  slogan: Sequelize.STRING,
  description: Sequelize.STRING,
  category: Sequelize.STRING,
  price: Sequelize.STRING
});


exports.getProducts = (req, res) => {
  Products.findAll({
      where: {
        id: {
          [Op.lte]: '5'
        }
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
  .then(function(products) {
    var result = [];
    products.map(item => {
      result.push(item.dataValues);
    })
    res.send(result);
  })
  .catch(function(err) {
    throw err;
    db.close();
  })
}