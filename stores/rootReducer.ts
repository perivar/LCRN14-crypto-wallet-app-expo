import { combineReducers } from '@reduxjs/toolkit';

import marketReducer from './market/marketReducer';
import tabReducer from './tab/tabReducer';

const rootReducer = combineReducers({
  tabReducer,
  marketReducer,
});

export default rootReducer;
