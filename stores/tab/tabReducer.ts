import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../configureStore';

interface ITabState {
  isTradeModalVisible: boolean;
}

const initialState: ITabState = {
  isTradeModalVisible: false,
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setTradeModalVisibility: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isTradeModalVisible: action.payload,
      };
    },
  },
});

// Actions generated from the slice
export const { setTradeModalVisibility } = tabSlice.actions;

// export cart selector to get the slice in any component
export const tabSelector = (state: RootState) => state.tabReducer;

// export the reducer
const tabReducer = tabSlice.reducer;
export default tabReducer;
