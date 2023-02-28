import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useState } from "react";
import CoinCard from "../components/CoinCard";
export default function Home() {
  const navigate = useNavigate();
  const [availableCoins, setAvailableCoins] = useState([
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: "34237.333",
      volume: "34237.333",
      logo: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: "34237.333",
      volume: "34237.333",
      logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
      // ehetherum logo
    },
    {
      name: "Ripple",
      symbol: "XRP",
      price: "34237.333",
      volume: "34237.333",
      logo: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731",
    },
    {
      name: "Bitcoin Cash",
      symbol: "BCH",
      price: "34237.333",
      volume: "34237.333",
      logo: "https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png?1594689492",
    },
    {
      name: "Binance Coin",
      symbol: "BNB",
      price: "34237.333",
      volume: "34237.333",
      logo: "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615",
    },
    {
      name: "Stellar",
      symbol: "XLM",
      price: "34237.333",
      volume: "34237.333",
      logo: "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1552356157",
    },
  ]);

  return (
    <>
      <div className="d-flex-j-between">
        <div>
          <p>Lorem, ipsum.</p>
          <h2>$34237.333</h2>
        </div>
        <IconButton>
          <MonetizationOnOutlinedIcon
            fontSize="large"
            style={{ color: "#01402b" }}
          />
        </IconButton>
      </div>
      <Typography sx={{ mb: 1, fontSize: 18 }}>Watchlist</Typography>
      <div className="border-green padding-5 border-radius-10">
        <div className="coin-container">
          {availableCoins?.map((coin) => (
            <CoinCard
              key={coin.symbol}
              name={coin.name}
              symbol={coin.symbol}
              price={coin.price}
              volume={coin.volume}
              logo={coin.logo}
            />
          ))}
        </div>
      </div>
    </>
  );
}
