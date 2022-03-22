'use strict';

const fetch = require('node-fetch');

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res) {

      if (Array.isArray(req.query.stock)) {
        let apiResponse = {
          stockData: [{
            stock: "",
            price: "",
            rel_likes: 0
          },{
            stock: "",
            price: "",
            rel_likes: 0
          }]
        };

        let stock0 = fetch(
          "https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/" + 
          req.query.stock[0] + 
          "/quote"
        )
          .then(response => response.json())
          .then(data => {
            apiResponse.stockData[0].stock = data.symbol;
            apiResponse.stockData[0].price = data.iexRealtimePrice;
            apiResponse.stockData[0].rel_likes = 0;
          });

        let stock1 = fetch(
          "https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/" +
            req.query.stock[1] +
            "/quote"
        )
          .then((response) => response.json())
          .then((data) => {
            apiResponse.stockData[1].stock = data.symbol;
            apiResponse.stockData[1].price = data.iexRealtimePrice;
            apiResponse.stockData[1].rel_likes = 0;
          });

        Promise.allSettled([stock0, stock1]).then(response => {
          console.log(apiResponse);
        });


      } else {
        fetch(
          "https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/" +
            req.query.stock +
            "/quote"
        )
          .then((response) => response.json())
          .then((data) => {
            res.send({
              stockData: {
                stock: data.symbol,
                price: data.iexRealtimePrice,
                likes: 0,
              },
            });
          }); 
      }   
    });
};
