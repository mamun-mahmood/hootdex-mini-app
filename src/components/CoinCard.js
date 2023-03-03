import { Avatar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom/dist";

const CoinCard = ({ name, symbol, price, volume, logo }) => {
  const navigate = useNavigate();
  return (
    <div
      className="d-flex-j-between"
      style={{ marginBottom: 20 }}
      onClick={() =>
        navigate(`/t/${symbol}`)
      }
    >
      <div className="d-flex-j-between">
        <Avatar src={logo && logo} />
        <div style={{ marginLeft: 5 }}>
          <Typography className="font-size-18">{name && name}</Typography>
          <Typography className="font-size-14">{symbol && symbol}</Typography>
        </div>
      </div>
      <div>
        <Typography className="font-size-18">${price && price}</Typography>
        <Typography className="font-size-14">{volume && volume}</Typography>
      </div>
    </div>
  );
};

export default CoinCard;
