var Sequelize = require('sequelize');
const { Op } = require('sequelize');
var db = new Sequelize('products_sdc', 'root', 'student', {
  dialect: 'mysql'
});

var Styles = db.define('styles', {
  id : {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING,
  sale_price: Sequelize.INTEGER,
  original_price: Sequelize.INTEGER,
  default_style: Sequelize.INTEGER
});

exports.getStyles = (req, res) => {
  Styles.findAll({
    where: {
      product_id: req.params.id
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
  .then(function(result) {
    res.send(result);
  })
  .catch(function(err) {
    throw err;
    db.close();
  })
}