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

var Features = db.define('features', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  product_id: Sequelize.INTEGER,
  feature: Sequelize.STRING,
  value: Sequelize.STRING
})

Products.belongsTo(Features);

exports.getProduct = (req, res) => {
  var result;
  Products.findAll({
    where: {
      id: req.params.id
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    include: [{
      model: Features,
      attributes: ['feature', 'value']
    }]
  })
  .then(function(result) {
    res.send(result);
  })
  // .then(function(newProduct) {
  //   result = newProduct[0].dataValues;
  //   return Features.findAll({
  //     where: {
  //       product_id: req.params.id
  //     },
  //     attributes: {
  //       exclude: ['createdAt', 'updatedAt']
  //     }
  //   })
  // })
  // .then(function(fetchedFeatures) {
  //   result.features = [];
  //   fetchedFeatures.map(item => {
  //     result.features.push({'feature': item.dataValues.feature, 'value': item.dataValues.value})
  //   })
  //   res.send(result);
  // })
  .catch(function(err) {
    throw err;
    db.close();
  })
}