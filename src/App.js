import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter } from "react-router-dom";
import BottomNavbar from "./components/BottomNavbar";
import { Route, Routes } from "react-router-dom/dist";
import TokenPage from "./screens/TokenPage";
import hootdexLogo from "./assets/images/logov.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import url from "./serverUrl";
import * as actionTypes from './store/actionTypes';
import {
  fetchProjectTokens,
  fetchWrapTokens,
  fecthHoldingTokens,
  fetchPools,
  fetchStocks,
  fetchForex,
  fetchCommodity,
  fetchDerivatives,
  fetchSynthetics
} from './utils';
function App() {
  const [user, setUser] = useState(null);
  //fecth token by uid after wallet connected
  const [pecuCoins, setPecuCoins] = useState({});
  const [wallet, setWallet] = useState({});
  const dispatch = useDispatch();
  const fetchWallet = () => {
    const wall = JSON.parse(
      localStorage.getItem("hootdex_secretcookie_wallet")
    );
    setWallet(wall);
    if (wall?.userFound) {
      axios.get(`${url}//hootdex/getMycoins/${wall.uid}`).then((res) => {
        setPecuCoins(res.data[0]);
      });
    }
  };
  useEffect(() => {
    let data = localStorage.getItem("hootdex_secretcookie");

    if (data) {
      setUser(JSON.parse(data));
    }
    fetchWallet();
  }, []);

  const handleUserToken = (e) => {
    setUser(e);
  };
  function PecuPriceHttpRequest() {
    axios
      .get(`${url}/wallet/get_current_index_coin`)
      .then((res) => {
        const price = res.data[0].value;
        dispatch({ type: actionTypes.PECU_PRICE, price: price });
      })
      .catch((err) => console.log(err));
  }

  const get_crypto_Data = () => {
    axios.get(`${url}/crypto/index`).then((res) => {
      dispatch({ type: actionTypes.CRYPTO_DATA, cryptoData: res.data });
    });
  };

  useEffect(() => {
    PecuPriceHttpRequest();
    get_crypto_Data();
    fetchProjectTokens(dispatch, actionTypes.FETCH_PROJECT_TOKENS);
    fetchWrapTokens(dispatch, actionTypes.FETCH_WRAP_TOKENS);
    fecthHoldingTokens(dispatch, actionTypes.FETCH_HOLDING_TOKENS);
    fetchPools(dispatch, actionTypes.FETCH_LIQUIDITY_POOLS);
    fetchStocks(dispatch, actionTypes.FETCH_STOCKS);
    fetchForex(dispatch, actionTypes.FETCH_FOREX);
    fetchDerivatives(dispatch, actionTypes.FETCH_DERIVATIVES);
  });

  useEffect(() => {
    setInterval(() => {
      PecuPriceHttpRequest();
      get_crypto_Data();
      fetchProjectTokens(dispatch, actionTypes.FETCH_PROJECT_TOKENS);
      fecthHoldingTokens(dispatch, actionTypes.FETCH_HOLDING_TOKENS);
      fetchPools(dispatch, actionTypes.FETCH_LIQUIDITY_POOLS);
    }, 60000);
  });

  useEffect(() => {
    setInterval(() => {
      fetchWrapTokens(dispatch, actionTypes.FETCH_WRAP_TOKENS);
      fetchStocks(dispatch, actionTypes.FETCH_STOCKS);
      fetchCommodity(dispatch, actionTypes.FETCH_COMMODITY);
      fetchForex(dispatch, actionTypes.FETCH_FOREX);
      fetchDerivatives(dispatch, actionTypes.FETCH_DERIVATIVES);
      fetchSynthetics(dispatch, actionTypes.FETCH_SYNTHETICS);
    }, 1000);
  });
  return (
    <BrowserRouter>
      <div style={{ position: "relative", zIndex: 1 }}>
        <img
          src={hootdexLogo}
          alt="hootdex logo"
          width="40%"
          height="30px"
          style={{ marginLeft: "30%" }}
        />
        <BottomNavbar wallet={wallet} fetchWallet={fetchWallet}  />
        <div style={{ padding: 10, paddingBottom: 70 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/t/:tokenSymbol" element={<TokenPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
