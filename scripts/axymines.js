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
      
      
      
      
      
       async function secondtry(val) {
         const confirmed = parseFloat(val.confirmed).toFixed(5);
         const exConfirmed = parseFloat(val.ae_confirmed + val.exchange).toFixed(5);
        const mktcap = await axios.get('https://api.coinmarketcap.com/v1/ticker/' + val.coin + '/', {responseType: 'application/json'})
            .then(function (response) {
              var mktArr = Object.values(response.data);
                finalCoin = mktArr[0].id;
                finalOwned = parseFloat(mktArr[0].price_usd*confirmed).toFixed(2);
                finalEx = parseFloat(mktArr[0].price_usd*exConfirmed).toFixed(2);
                return ({'coinName': finalCoin, 'coinOwned': confirmed, 'coinOwnedVal': finalOwned, 'coinExchange': exConfirmed, 'coinExchangeVal': finalEx})
        
            })
            .catch(function (error) {
              // console.log(error);
            });
            return mktcap;
          }
      
          async function mktGet(array) {
            var arrayCoin =[]
            for (const item of array) {
              await secondtry(item).then(mktcap => {arrayCoin.push(mktcap)});
            }
            res.send({ data: arrayCoin });
          }
          


          mphfunction()
          .then(mph => {mktGet(mph)});
    
    });
    