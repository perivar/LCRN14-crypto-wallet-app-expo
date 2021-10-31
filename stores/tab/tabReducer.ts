import { PayloadAction } from '@reduxjs/toolkit';

import * as tabActionTypes from './tabActions';

interface ITabState {
  isTradeModalVisible: boolean;
}

const initialState: ITabState = {
  isTradeModalVisible: false,
};

type TabReducer = typeof initialState;

const tabReducer = (
  state = initialState,
  action: PayloadAction<boolean>
): TabReducer => {
  switch (action.type) {
    case tabActionTypes.SET_TRADE_MODAL_VISIBILITY:
      return {
        ...state,
        isTradeModalVisible: action.payload,
      };

    default:
      return state;
  }
};

export default tabReducer;
