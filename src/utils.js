import axios from 'axios';
import url from './serverUrl';
export function convertToInternationalCurrencySystem(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'b'
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'm'
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + 'k'
    : Math.abs(Number(labelValue))
    ? Math.abs(Number(labelValue))?.toFixed(2)
    : '0.00';
}

export const removeDuplicatedToken = (allData) => {
  for (let i = 0; i < allData.length; i++) {
    for (let j = i + 1; j < allData.length; j++) {
      if (allData[i].symbol == allData[j].symbol) {
        allData[i].wrapAmount = allData[j].wrapAmount + allData[i].wrapAmount;
        allData[i].initialFinal =
          allData[j].initialFinal + allData[i].initialFinal;

        allData = allData.filter((e) => e !== allData[j]);
      }
    }
  }

  for (let i = 0; i < allData.length; i++) {
    for (let j = i + 1; j < allData.length; j++) {
      if (allData[i].symbol == allData[j].symbol) {
        return removeDuplicatedToken(allData);
      }
    }
  }

  return allData;
};

export function PecuPriceHttpRequest(dispatch, actionType) {
  axios
    .get(`${url}/wallet/get_current_index_coin`)
    .then((res) => {
      const price = res.data[0].value;
      dispatch({ type: actionType, price: price });
    })
    .catch((err) => console.log(err));
}

export const get_crypto_Data = (dispatch, actionType) => {
  axios.get(`${url}/crypto/index`).then((res) => {
    dispatch({ type: actionType, cryptoData: res.data });
  });
};

export const fetchProjectTokens = (dispatch, actionType) => {
  axios
    .get(`${url}/hootdex/all-project-token`)
    .then((res) => {
      res?.data?.data?.sort((a, b) =>
        a?.token_symbol[0]?.localeCompare(b?.token_symbol[0])
      );
      dispatch({ type: actionType, projectTokens: res.data.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchStocks = (dispatch, actionType) => {
  axios
    .get(`${url}/crypto/get_all_stocks`)
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: actionType, stocks: res.data.tokens });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const fetchCommodity = (dispatch, actionType) => {
  axios
    .get(`${url}/crypto/get_all_commodity`)
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: actionType, commodities: res.data.tokens });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchForex = (dispatch, actionType) => {
  axios
    .get(`${url}/crypto/get_all_forex`)
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: actionType, forex: res.data.tokens });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const fetchDerivatives = (dispatch, actionType) => {
  axios
    .get(`${url}/crypto/get_all_derivatives`)
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: actionType, derivatives: res.data.tokens });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const fetchSynthetics = (dispatch, actionType) => {
  axios
    .get(`${url}/crypto/get_all_synthetics`)
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: actionType, synthetics: res.data.tokens });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchWrapTokens = (dispatch, actionType) => {
  axios
    .get(`${url}/wallet/get_all_tokens_wrap_new`)
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: actionType, wrapTokens: res.data.tokens });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fecthHoldingTokens = (dispatch, actionType) => {
  axios
    .get(`${url}/wallet/get_all_tokens_holding`)
    .then((res) => {
      if (res.data.status) {
        res.data?.tokens?.sort((a, b) =>
          a?.token_symbol[0].localeCompare(b?.token_symbol[0])
        );
        dispatch({ type: actionType, holdingTokens: res.data.tokens });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchPools = (dispatch, actionType) => {
  axios
    .get(`${url}/hootdex/liquidity-pool-info-all`)
    .then((res) => {
      dispatch({
        type: actionType,
        liquidityPools: res.data.data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
