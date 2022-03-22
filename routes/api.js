'use strict';

const fetch = require('node-fetch');

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){

      fetch("https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/" + req.query.stock + "/quote")
        .then(response => response.json())
        .then(data => {
          console.log(data);
          res.send({
            stockData: {
              stock: data.symbol,
              price: data.iexRealtimePrice,
              likes: 0
            },
          });
        });      
    });
    
};
