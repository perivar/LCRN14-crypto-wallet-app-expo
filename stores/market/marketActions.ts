import axios from 'axios';

import { AppDispatch, RootState } from '../configureStore';
import {
  getCoinMarketBegin,
  getCoinMarketFailure,
  getCoinMarketSuccess,
  getHoldingsBegin,
  getHoldingsFailure,
  getHoldingsSuccess,
} from './marketReducer';

// Holdings
export const getHoldings = (
  holdings: any[] = [],
  currency = 'usd',
  orderBy = 'market_cap_desc',
  sparkline = true,
  priceChangePerc = '7d',
  perPage = 10,
  page = 1
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(getHoldingsBegin());

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
              holding_value_change_7d:
                (item.current_price - price7d) * coin.qty,
              sparkline_in_7d: {
                value: item.sparkline_in_7d.price.map((price: number) => {
                  return price * coin.qty;
                }),
              },
            };
          });
          dispatch(getHoldingsSuccess(myHoldings));
        } else {
          dispatch(getHoldingsFailure(res.data));
        }
      })
      .catch(error => {
        dispatch(getHoldingsFailure(error));
      });
  };
};

// Coin market
export const getCoinMarket = (
  currency = 'usd',
  orderBy = 'market_cap_desc',
  sparkline = true,
  priceChangePerc = '7d',
  perPage = 10,
  page = 1
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(getCoinMarketBegin());

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
          dispatch(getCoinMarketSuccess(res.data));
        } else {
          dispatch(getCoinMarketFailure(res.data));
        }
      })
      .catch(error => {
        dispatch(getCoinMarketFailure(error));
      });
  };
};
