const axios = require('axios');
const keys = require('./config/keys');

let data = {
  coin: 'bitcoin-private',
  confirmed: 0.01632659,
  unconfirmed: 0,
  ae_confirmed: 0,
  ae_unconfirmed: 0,
  exchange: 0
};

async function secondtry(val) {
  try {
    const confirmed = parseFloat(val.confirmed).toFixed(5);
    const exConfirmed = parseFloat(val.ae_confirmed + val.exchange).toFixed(5);
    const mktcap = await axios.get(
      'https://api.coinmarketcap.com/v1/ticker/' + val.coin + '/',
      {
        responseType: 'application/json'
      }
    );

    var mktArr = Object.values(mktcap.data);
    finalCoin = mktArr[0].id;
    finalOwned = parseFloat(mktArr[0].price_usd * confirmed).toFixed(2);
    finalEx = parseFloat(mktArr[0].price_usd * exConfirmed).toFixed(2);

    let databack = {
      coinName: finalCoin,
      coinOwned: confirmed,
      coinOwnedVal: `$${finalOwned}`,
      coinExchange: exConfirmed,
      coinExchangeVal: finalEx
    };

    console.log(databack);

    return databack;
  } catch (e) {
    console.error(e);
  }
  //   return mktcap;
}

secondtry(data);
