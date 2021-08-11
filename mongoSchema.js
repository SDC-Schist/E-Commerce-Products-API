const mongoose = require('mongoose');

const Products = new mongoose.Schema({
  _ProductName {
    type: string,
  },,
  _Slogan {
    type: string,
  },,
  _ProductDescription {
    type: string,
  },,
  _Category {
    type: string,
  },,
  _Price {
    type: Number,
  },
})

const Features = new mongoose.Schema({
  Features {
    type: string,
  },,
  Values {
    type: string,
  }
})


const RelatedProducts = new mongoose.Schema({
  OriginProducts {
    type: Number,
  }
})
