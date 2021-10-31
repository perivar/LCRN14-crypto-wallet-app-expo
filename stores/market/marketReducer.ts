import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../configureStore';

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

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    getHoldingsBegin: state => {
      return {
        ...state,
        loading: true,
      };
    },
    getHoldingsSuccess: (state, action: PayloadAction<any[]>) => {
      return {
        ...state,
        myHoldings: action.payload,
      };
    },
    getHoldingsFailure: (state, action: PayloadAction<any[]>) => {
      return {
        ...state,
        error: action.payload,
      };
    },
    getCoinMarketBegin: state => {
      return {
        ...state,
        loading: true,
      };
    },
    getCoinMarketSuccess: (state, action: PayloadAction<any[]>) => {
      return {
        ...state,
        coins: action.payload,
      };
    },
    getCoinMarketFailure: (state, action: PayloadAction<any[]>) => {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});

// Actions generated from the slice
export const {
  getHoldingsBegin,
  getHoldingsSuccess,
  getHoldingsFailure,
  getCoinMarketBegin,
  getCoinMarketSuccess,
  getCoinMarketFailure,
} = marketSlice.actions;

// export cart selector to get the slice in any component
export const marketSelector = (state: RootState) => state.marketReducer;

// export the reducer
const marketReducer = marketSlice.reducer;
export default marketReducer;
