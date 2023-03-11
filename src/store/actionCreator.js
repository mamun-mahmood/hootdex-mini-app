import axios from 'axios';
import * as actionTypes from './actionTypes';
import url from '../serverUrl';

export function PecuPrice() {
  const action = { type: actionTypes.PECU_PRICE };
  return PecuPriceHttpRequest(action);
}

export function PecuPriceHttpRequest(action) {
  return async (dispatch) => {
    axios
      .get(`${url}/wallet/get_current_index_coin`)
      .then((res) => {
        const price = res.data[0].value;
        console.log('action type', action.type);
        dispatch({ type: action.type, price: price });
      })
      .catch((err) => console.log(err));
  };
}
