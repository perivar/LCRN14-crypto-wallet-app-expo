export const SET_TRADE_MODAL_VISIBILITY = 'SET_TRADE_MODAL_VISIBILITY';

export const setTradeModalVisibility = (isVisible: boolean) => ({
  type: SET_TRADE_MODAL_VISIBILITY,
  payload: isVisible,
});
