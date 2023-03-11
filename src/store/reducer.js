import * as actionTypes from './actionTypes';
const initialState = {
  PecuPrice: 0,
  cryptoData: [],
  projectTokens: [],
  wrapTokens: [],
  holdingTokens: [],
  liquidityPools: [],
  stocks: [],
  forex: [],
  commodities: [],
  derivatives: [],
  synthetics: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PECU_PRICE:
      return { ...state, PecuPrice: action.price };
    case actionTypes.CRYPTO_DATA:
      return { ...state, CryptoData: action.cryptoData };
    case actionTypes.FETCH_HOLDING_TOKENS:
      return { ...state, holdingTokens: action.holdingTokens };
    case actionTypes.FETCH_PROJECT_TOKENS:
      return { ...state, projectTokens: action.projectTokens };
    case actionTypes.FETCH_WRAP_TOKENS:
      return { ...state, wrapTokens: action.wrapTokens };
    case actionTypes.FETCH_STOCKS:
      return { ...state, stocks: action.stocks };
    case actionTypes.FETCH_COMMODITY:
      return { ...state, commodities: action.commodities };
    case actionTypes.FETCH_FOREX:
      return { ...state, forex: action.forex };
    case actionTypes.FETCH_DERIVATIVES:
      return { ...state, derivatives: action.derivatives };
    case actionTypes.FETCH_SYNTHETICS:
      return { ...state, synthetics: action.synthetics };

    case actionTypes.FETCH_LIQUIDITY_POOLS:
      return { ...state, liquidityPools: action.liquidityPools };

    default:
      return state;
  }
};

export default reducer;
