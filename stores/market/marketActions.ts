import axios from 'axios';

import store from '../configureStore';

// import store from '../configureStore';

export const GET_HOLDINGS_BEGIN = 'GET_HOLDINGS_BEGIN';
export const GET_HOLDINGS_SUCCESS = 'GET_HOLDINGS_SUCCESS';
export const GET_HOLDINGS_FAILURE = 'GET_HOLDINGS_FAILURE';
export const GET_COIN_MARKET_BEGIN = 'GET_COIN_MARKET_BEGIN';
export const GET_COIN_MARKET_SUCCESS = 'GET_COIN_MARKET_SUCCESS';
export const GET_COIN_MARKET_FAILURE = 'GET_COIN_MARKET_FAILURE';

// Holdings

export const getHoldingsBegin = () => ({
  type: GET_HOLDINGS_BEGIN,
});
export const getHoldingsSuccess = (myHoldings: any[]) => ({
  type: GET_HOLDINGS_SUCCESS,
  payload: myHoldings,
});
export const getHoldingsFailure = (error: any[]) => ({
  type: GET_HOLDINGS_FAILURE,
  payload: error,
});

export const getHoldings = async (
  holdings: any[] = [],
  currency = 'usd',
  orderBy = 'market_cap_desc',
  sparkline = true,
  priceChangePerc = '7d',
  perPage = 10,
  page = 1
) => {
  store.dispatch(getHoldingsBegin());

  let ids = holdings.map(item => item.id).join(', ');
  let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`;

  return await axios({
    url: apiUrl,
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then(res => {
      if (res.status === 200) {
        let myHoldings = res.data.map((item: any) => {
          let coin = holdings.find(holding => holding.id === item.id);

          let price7d =
            item.current_price /
            (1 + item.price_change_percentage_7d_in_currency * 0.01);

          return {
            id: item.id,
            symbol: item.symbol,
            name: item.name,
            image: item.image,
            current_price: item.current_price,
            qty: coin.qty,
            total: coin.qty * item.current_price,
            price_change_percentage_7d_in_currency:
              item.price_change_percentage_7d_in_currency,
            holding_value_change_7d: (item.current_price - price7d) * coin.qty,
            sparkline_in_7d: {
              value: item.sparkline_in_7d.price.map((price: number) => {
                return price * coin.qty;
              }),
            },
          };
        });
        store.dispatch(getHoldingsSuccess(myHoldings));
      } else {
        store.dispatch(getHoldingsFailure(res.data));
      }
    })
    .catch(error => {
      store.dispatch(getHoldingsFailure(error));
    });
};

// Coin market

export const getCoinMarketBegin = () => ({
  type: GET_COIN_MARKET_BEGIN,
});
export const getCoinMarketSuccess = (coins: any[]) => ({
  type: GET_COIN_MARKET_SUCCESS,
  payload: coins,
});
export const getCoinMarketFailure = (error: any[]) => ({
  type: GET_COIN_MARKET_FAILURE,
  payload: error,
});

export const getCoinMarket = async (
  currency = 'usd',
  orderBy = 'market_cap_desc',
  sparkline = true,
  priceChangePerc = '7d',
  perPage = 10,
  page = 1
) => {
  store.dispatch(getCoinMarketBegin());

  let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`;

  return await axios({
    url: apiUrl,
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then(res => {
      if (res.status === 200) {
        store.dispatch(getCoinMarketSuccess(res.data));
      } else {
        store.dispatch(getCoinMarketFailure(res.data));
      }
    })
    .catch(error => {
      store.dispatch(getCoinMarketFailure(error));
    });
};
