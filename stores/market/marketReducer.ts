import { PayloadAction } from '@reduxjs/toolkit';

import * as marketActions from './marketActions';

interface IMarketState {
  myHoldings: any[];
  coins: any[];
  error: any[];
  loading: boolean;
}

const initialState: IMarketState = {
  myHoldings: [],
  coins: [],
  error: null,
  loading: false,
};

type MarketReducer = typeof initialState;

const marketReducer = (
  state = initialState,
  action: PayloadAction<any>
): MarketReducer => {
  switch (action.type) {
    case marketActions.GET_HOLDINGS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case marketActions.GET_HOLDINGS_SUCCESS:
      return {
        ...state,
        myHoldings: action.payload,
      };
    case marketActions.GET_HOLDINGS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case marketActions.GET_COIN_MARKET_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case marketActions.GET_COIN_MARKET_SUCCESS:
      return {
        ...state,
        coins: action.payload,
      };
    case marketActions.GET_COIN_MARKET_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return initialState;
  }
};

export default marketReducer;
