var express = require('express');
var router = express.Router();
const axios = require('axios');
const https = require('https');
/* GET users listing. */


router.get('/', function(req, res, next) {

  async function mphfunction() {
    const mphurl = 'https://miningpoolhub.com/index.php?page=api&action=getuserallbalances&api_key=1b68f23f8c2759fcebe7acbc458b0db979b024d2cff051939a3441432449fe15';
    const mph = await axios.get(mphurl, {responseType: 'application/json'})
        .then(function (response) {
          var mphArr = Object.values(response.data.getuserallbalances.data);
          return mphArr;
      })
        .catch(function (error) {
          console.log(error);
        });
    // console.log(mph);
      return mph;
    }
  
  
  
  async function mktGet(array) {
    var arrayCoin =[]
    for (const item of array) {
      // console.log(item);
      await secondtry(item).then(mktcap => {arrayCoin.push(mktcap)});
    }
    console.log(arrayCoin);
    res.send({ data: arrayCoin, title: "Users" });
    // return arrayCoin;
  }
  
  
   async function secondtry(val) {
     const confirmed = parseFloat(val.confirmed).toFixed(5);
     const exConfirmed = parseFloat(val.ae_confirmed + val.exchange).toFixed(5);
    //  console.log(val);
    //  console.log(confirmed);
    const mktcap = await axios.get('https://api.coinmarketcap.com/v1/ticker/' + val.coin + '/', {responseType: 'application/json'})
        .then(function (response) {
          var mktArr = Object.values(response.data);
            finalCoin = mktArr[0].id;
            finalOwned = parseFloat(mktArr[0].price_usd*confirmed).toFixed(2);
            finalEx = parseFloat(mktArr[0].price_usd*exConfirmed).toFixed(2);
            return ({'coinName': finalCoin, 'coinOwned': confirmed, 'coinOwnedVal': finalOwned, 'coinExchange': exConfirmed, 'coinExchangeVal': finalEx})
            // return converted;
            // console.log(converted)
            // return (mktArr[i].id, parseFloat(mktArr[i].price_usd*confirmed).toFixed(2),  parseFloat(mktArr[i].price_usd*exConfirmed).toFixed(2) );
            // console.log(mktArr[i].id, parseFloat(mktArr[i].price_usd*confirmed).toFixed(2),  parseFloat(mktArr[i].price_usd*exConfirmed).toFixed(2) );
        })
        .catch(function (error) {
          // console.log(error);
        });
        return mktcap;
      }
  
      mphfunction()
      .then(mph => {mktGet(mph)});



});


module.exports = router;


