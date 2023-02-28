import { Avatar, Typography } from "@mui/material";
import React from "react";

const CoinCard = ({ name, symbol, price, volume, logo }) => {
  return (
    <div className="d-flex-j-between" style={{marginBottom: 10}} >
      <div className="d-flex-j-between">
        <Avatar src={logo} />
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
